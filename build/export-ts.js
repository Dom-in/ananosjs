'use strict';
// libraries
const fs = require('fs');
const path = require('path');

// modules

// constants
const indexTsFileNm = 'index.d.ts';
const lines = [
  'export {',
  '  Block,',
  '  Main,',
  '  CamoUtil,',
  '  AnanosUtil,',
  '  WithdrawUtil,',
  '  DepositUtil,',
  '  AnanodeApi,',
  '  ananosParts,',
  '  AccountValidationInfo,',
  '}',
];

// variables

// functions
const build = () => {
  const fileNm = path.join(__dirname, '..', indexTsFileNm);
  const filePtr = fs.openSync(fileNm, 'a');
  for (const line of lines) {
    fs.writeSync(filePtr, line);
    fs.writeSync(filePtr, '\n');
  }
  fs.closeSync(filePtr);
};

build();
