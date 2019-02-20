#!/bin/sh
npm run build
rm -rf ../../../notes/build
cp -r build ../../../notes/
