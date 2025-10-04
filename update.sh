#!/bin/bash

echo "# Map Team Notes" > README.md
echo "" >> README.md

cat ./other-notes/heist.md >> README.md
echo "" >> README.md

echo "Getting transfigured gem prices"
node ./js/lab-gems.js
cat ./LAB_GEMS.md >> README.md

echo "Done"
