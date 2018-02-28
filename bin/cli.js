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
  console.log('  --output                 Write AMP HTML to file');
  process.exit(1);
}

if (argv.help) {
  usage();
}

const input = argv._[0];
const output = argv.output;
if (!input) {
  usage();
}

let json;
try {
  json = JSON.parse(fs.readFileSync(input, 'utf8'));
} catch (e) {
  console.error(`Unable to load json ${input}`);
  process.exit(1);
}

const ampHtml = storyJsonToAmp(json);

if (output) {
  try {
    fs.writeFileSync(output, ampHtml);
  } catch (error) {
    console.error(`There was an error writing file ${output}`);
  }
} else {
  console.log(ampHtml);
}
