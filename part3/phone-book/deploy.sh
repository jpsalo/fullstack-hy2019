#!/bin/sh
npm run build
rm -rf ../../../phone-book/build
cp -r build ../../../phone-book/
