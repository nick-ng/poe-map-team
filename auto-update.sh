#!/bin/bash

for ((i = 0 ; i < 50 ; i++)); do
	./update.sh

	git add LAB_GEMS.md
	git add README.md

	git commit -m "chore: auto update - $(date)"
	git push

	sleep 30m
done
