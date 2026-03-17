fx_version 'cerulean'
game 'gta5'
lua54 'yes'
name "krs_cityhall"
description "React + Mantine"
author "Krs Scripts - karos7804"
version "1.0.0"

shared_scripts {
  '@ox_lib/init.lua',
  '@qbx_core/modules/lib.lua',
  "shared/**/*.lua"
}

client_scripts {
  '@qbx_core/modules/playerdata.lua',
  "client/**/*.lua"
}

server_scripts {
  "server/**/*.lua",
}
ui_page "web/build/index.html"

files {
  "web/build/index.html",
  "web/build/**/*",
  "web/images/*.png",
  "web/sounds/*.mp3"
}