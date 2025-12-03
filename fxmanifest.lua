fx_version 'cerulean'
game 'gta5'

shared_scripts {
    'lua/require.lua',
    'dist/shared/**/*.js'
}

server_scripts {
    'dist/server/server.js',
    'lua/generated/server/sdk.lua'
}

client_scripts {
    'dist/client/**/*.js'
}

files {
    'lua/generated/**/*.lua'
}
