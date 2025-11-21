#!/bin/bash

for ((i = 0 ; i < 50 ; i++)); do
	./update.sh

	git add LAB_GEMS.md
	git add README.md

	git commit -m "chore: auto update - $(date)"
	git push

	echo "updated at $(date). waiting 30 minutes before next update"
	echo "visit https://github.com/nick-ng/poe-map-team?tab=readme-ov-file#merclab to see what is profitable in merclab"
	sleep 30m
done
