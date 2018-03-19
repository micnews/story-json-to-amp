#!/usr/bin/env node
/* eslint-disable no-console, import/no-commonjs */
const argv = require('minimist')(process.argv.slice(2), {
  string: ['output'],
  boolean: ['help'],
});
const fs = require('fs');
const storyJsonToAmp = require('../dist').default;

function usage() {
  console.log('USAGE: story-json-to-amp [options] <story.json>');
  console.log('');
  console.log('OPTIONS:');
  console.log('  --help                   Show this message');
  console.log('  --output                 Write AMP HTML to print to standard output');
  process.exit(1);
}

if (argv.help) {
  usage();
}

const inputPath = argv._[0];
const outputPath = argv.output;
if (!inputPath) {
  usage();
}

let json;
let validFile;

try {
  validFile = fs.readFileSync(inputPath, 'utf8');
} catch (e) {
  console.error(`${inputPath} does not exist`);
  process.exit(1);
}
try {
  json = JSON.parse(validFile);
} catch (e) {
  console.error(`Unable to load json ${validFile}`);
  process.exit(1);
}

const ampHtml = storyJsonToAmp(json);

if (outputPath) {
  try {
    fs.writeFileSync(outputPath, ampHtml);
  } catch (error) {
    console.error(`There was an error writing file ${outputPath}`);
  }
} else {
  console.log(ampHtml);
}
