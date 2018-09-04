#!/bin/zsh -f

find . -type f -name '*.jpeg' -exec xattr -c {} \;
find . -type f -name '*.jpg' -exec xattr -c {} \;
find . -type f -name '*.png' -exec xattr -c {} \;
find . -type f -name '*.json' -exec xattr -c {} \;
