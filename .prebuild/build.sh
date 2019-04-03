#!/bin/sh

. /etc/os-release

cd /node-pty
rm -rf node_modules

npm install --only=prod --ignore-scripts

prebuild --all

if [ $ID = "debian" ] && [ "$(uname -m)" = "x86_64" ]; then
  echo "Building x86_64 32bit versions..."
  apt-get install -y g++-multilib gcc-multilib
  prebuild --all -a ia32
fi
