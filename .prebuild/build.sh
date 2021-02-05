#!/bin/sh

. /etc/os-release

cd /node-pty
rm -rf node_modules

echo "Building for $(uname -m)..."

npm install --only=prod --ignore-scripts

cp abi_registry.json $(npm -g prefix)/lib/node_modules/prebuild/node_modules/node-abi/

prebuild -t 14.14.0

if [ $ID = "debian" ] && [ "$(uname -m)" = "x86_64" ]; then
  echo "Building x86_64 32bit versions..."
  apt-get install -y g++-multilib gcc-multilib
  prebuild -t 14.14.0 -a ia32
fi
