#!/bin/sh

if [ -f /usr/src/app/dist/main.js ]; then
  exec node /usr/src/app/dist/main.js
elif [ -f /usr/src/app/dist/src/main.js ]; then
  exec node /usr/src/app/dist/src/main.js
else
  echo 'Error: main.js not found'
  exit 1
fi
