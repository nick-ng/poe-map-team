#!/bin/bash

for ((i = 0 ; i < 50 ; i++)); do
	./update.sh

	echo "updated at $(date). waiting 30 minutes before next update"
	sleep 30m
done
