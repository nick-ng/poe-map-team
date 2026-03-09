#!/bin/bash

echo "# Map Team Notes" > README.md
echo "" >> README.md

echo "Getting transfigured gem prices"
node ./js/lab-gems.js
cat ./LAB_GEMS.md >> README.md

cat ./other-notes/heist.md >> README.md
echo "" >> README.md

git add ./LAB_GEMS.md
git add ./README.md

echo "Done"
