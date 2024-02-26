'use strict';

const ananosjs = require('../../index.js');

const AnanodeApi = require('./mock-ananode-api.js');

const process = async (block, subtype) => {
  if (block == undefined) {
    throw Error(`'block' is a required parameter.'`);
  }
  if (subtype == undefined) {
    throw Error(`'subtype' is a required parameter.'`);
  }
  const hash = ananosjs.getBlockHash(block);
  return new Promise((resolve, reject) => {
    reject(Error(`process block:${hash}`));
  });
};

exports.getAccountBalanceRaw = AnanodeApi.getAccountBalanceRaw;
exports.getAccountRepresentative = AnanodeApi.getAccountRepresentative;
exports.getPrevious = AnanodeApi.getPrevious;
exports.process = process;
exports.getGeneratedWork = AnanodeApi.getGeneratedWork;
exports.getAccountInfo = AnanodeApi.getAccountInfo;
exports.getAccountsPending = AnanodeApi.getAccountsPending;
exports.getAccountHistory = AnanodeApi.getAccountHistory;
exports.getFrontiers = AnanodeApi.getFrontiers;
