-- ox_lib require implementation for FiveM
-- Source: https://github.com/CommunityOx/ox_lib/blob/main/imports/require/shared.lua
-- Allows using require() with FiveM's module system

---@class RequireCache
---@field loaded table<string, unknown>
---@field loading table<string, true>

---@type RequireCache
local cache = {
    loaded = {},
    loading = {}
}

---@param modname string
---@param env? table
---@return unknown
function require(modname, env)
    assert(type(modname) == 'string', ('modname must be a string (received %s)'):format(type(modname)))

    local module = cache.loaded[modname]

    if module then
        return module
    end

    if cache.loading[modname] then
        error(("^1Circular dependency occurred when loading module '%s'^0"):format(modname))
    end

    local resourceName = 'tsfx_bridge'
    local fileContent, err

    for _, ext in ipairs({ '.lua', '' }) do
        local path = ('@@%s/%s%s'):format(resourceName, modname, ext)
        fileContent = LoadResourceFile(resourceName, ('%s%s'):format(modname, ext))

        if fileContent then
            err = nil
            break
        end

        if not err then
            err = ('^1require: module not found: %s^0'):format(path)
        end
    end

    if not fileContent then
        error(err)
    end

    cache.loading[modname] = true
    local compiledChunk
    compiledChunk, err = load(fileContent, ('@@%s/%s'):format(resourceName, modname), 't', env or _ENV)

    if not compiledChunk then
        cache.loading[modname] = nil
        error(err)
    end

    module = compiledChunk()

    cache.loading[modname] = nil
    cache.loaded[modname] = module

    return module
end
