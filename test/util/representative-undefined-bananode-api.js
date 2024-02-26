'use strict';

const AnanodeApi = require('./mock-ananode-api.js');

const getAccountRepresentative = (account) => {
  return undefined;
};

exports.getAccountBalanceRaw = AnanodeApi.getAccountBalanceRaw;
exports.getAccountRepresentative = getAccountRepresentative;
exports.getPrevious = AnanodeApi.getPrevious;
exports.process = AnanodeApi.process;
exports.getGeneratedWork = AnanodeApi.getGeneratedWork;
exports.getAccountInfo = AnanodeApi.getAccountInfo;
exports.getAccountsPending = AnanodeApi.getAccountsPending;
exports.getAccountHistory = AnanodeApi.getAccountHistory;
exports.getFrontiers = AnanodeApi.getFrontiers;
