#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <year> <day>"
  exit 1
fi

year=$1
day=$2
baseDir="advent${year}"
dataDir="${baseDir}/data/advent${day}"
testDir="${baseDir}/test"
templateFile="adventTemplate.txt"

# Create directories if they don't exist
if [ ! -d "${baseDir}" ]; then
  mkdir -p "${baseDir}"
fi

# Create directories if they don't exist
if [ ! -d "${testDir}" ]; then
  mkdir -p "${testDir}"
fi


# Create TypeScript file using template if it doesn't exist
tsFile="${baseDir}/advent${day}.ts"
if [ ! -f "${tsFile}" ]; then
  if [ -f "${templateFile}" ]; then
    cat "${templateFile}" > "${tsFile}"
  else
    cat <<EOL >"${tsFile}"
// advent${year}/advent${day}.ts

console.log("Hello, Advent of Code!");
EOL
  fi
  echo "Created TypeScript file: ${tsFile}"
fi

# Create Jest test file if it doesn't exist
testFile="${testDir}/advent${day}.spec.ts"
if [ ! -f "${testFile}" ]; then
  cat <<EOL >"${testFile}"
// test/advent${day}.spec.js

import * from '../${dayDir}/advent${day}';

test('Example Test', () => {
  expect(exampleFunction()).toBe('expectedValue');
});
EOL
  echo "Created Jest test file: ${testFile}"
fi

# Create data directory and test.txt file if they don't exist
testFile="${dataDir}/test.txt"
if [ ! -d "${dataDir}" ]; then
  mkdir -p "${dataDir}"
fi
if [ ! -f "${testFile}" ]; then
  touch "${testFile}"
  echo "Created test.txt file: ${testFile}"
fi

# Download input file using wget
inputFile="${dataDir}/input.txt"
if [ ! -f "${inputFile}" ]; then
  echo "Downloading input file..."
  wget --load-cookies cookies.txt -O "${inputFile}" "https://adventofcode.com/${year}/day/${day}/input"
  echo "Downloaded input file: ${inputFile}"
fi
