#!/bin/bash

# Check if required arguments are provided
if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <year> <day> <datafile>"
  exit 1
fi

# Extract arguments
year="$1"
day="$2"
datafile="$3"

# Run the TypeScript file using ts-node

time ts-node "advent${year}/advent${day}.ts" -f "advent${year}/data/advent${day}/${datafile}"