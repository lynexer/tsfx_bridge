-- Bridge initialization file
-- Loads and exposes the SDK with lazy-loading of modules
-- Based on ox_lib's init.lua approach

local resourceName = 'tsfx_bridge'
local context = IsDuplicityVersion() and 'server' or 'client'

if GetResourceState(resourceName) ~= 'started' then
    return error(('TSFX Bridge must be started before loading (current state: %s)'):format(GetResourceState(resourceName)))
end

local requireChunk = LoadResourceFile(resourceName, 'lua/require.lua')

if requireChunk then
    local requireFn, err = load(requireChunk, ('@@%s/lua/require.lua'):format(resourceName), 't', _ENV)

    if requireFn and not err then
        requireFn()
    else
        error(('\n^1Error loading require function: %s^0'):format(err), 2)
    end
else
    error('\n^1Failed to load require.lua^0', 2)
end

local noop = function() end

local function loadModule(self, module)
    local path = ('lua/generated/%s/sdk/%s.lua'):format(context, module)
    local chunk = LoadResourceFile(resourceName, path)

    if not chunk then
        return nil
    end

    local fn, err = load(chunk, ('@@%s/%s'):format(resourceName, path), 't')

    if not fn or err then
        return error(('\n^1Error loading module (%s): %s^0'):format(module, err), 3)
    end

    local result = fn()
    self[module] = result or noop

    return self[module]
end

local function call(self, index, ...)
    local module = rawget(self, index)

    if not module then
        self[index] = noop
        module = loadModule(self, index)

        if not module then
            local export = exports[resourceName]

            local function method(...)
                return export[index](nil, ...)
            end

            if not ... then
                self[index] = method
            end

            return method
        end
    end

    return module
end

local bridge = setmetatable({
    name = resourceName,
    context = context
}, {
    __index = call,
    __call = call
})

local mainSDKPath = ('lua/generated/%s/sdk.lua'):format(context)
local mainSDK = LoadResourceFile(resourceName, mainSDKPath)

if mainSDK then
    local fn, err = load(mainSDK, ('@@%s/%s'):format(resourceName, mainSDKPath), 't')

    if not fn or err then
        return error(('\n^1Error loading Bridge SDK: %s^0'):format(err), 2)
    end

    local SDK = fn()

    if SDK then
        for key, value in pairs(SDK) do
            bridge[key] = value
        end
    end
end

_ENV.TSFX = bridge
