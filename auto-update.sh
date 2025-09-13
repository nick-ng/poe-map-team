#!/bin/bash

./update.sh

git add LAB_GEMS.md
git add README.md

git commit -m "chore: update - $(date)"
git push
