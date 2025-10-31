#!/bin/bash

end=$((SECONDS+3600))

while [ $SECONDS -lt $end ]; do
    # Do what you want.
	xdotool key Enter
	sleep 1s
done
