'use strict';

const AnanodeApi = require('./mock-ananode-api.js');

const process = async (block, subtype) => {
  if (block == undefined) {
    throw Error(`'block' is a required parameter.'`);
  }
  if (subtype == undefined) {
    throw Error(`'subtype' is a required parameter.'`);
  }
  return new Promise((resolve, reject) => {
    const json = {};
    json.error = 'Fork';
    reject(Error(JSON.stringify(json)));
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
