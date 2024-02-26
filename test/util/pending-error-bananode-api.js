'use strict';

const AnanodeApi = require('./mock-ananode-api.js');

const getAccountsPending = async (accounts, count) => {
  return undefined;
};

exports.getAccountBalanceRaw = AnanodeApi.getAccountBalanceRaw;
exports.getAccountRepresentative = AnanodeApi.getAccountRepresentative;
exports.getPrevious = AnanodeApi.getPrevious;
exports.process = AnanodeApi.getPrevious;
exports.getGeneratedWork = AnanodeApi.getGeneratedWork;
exports.getAccountInfo = AnanodeApi.getAccountInfo;
exports.getAccountsPending = getAccountsPending;
exports.getAccountHistory = AnanodeApi.getAccountHistory;
exports.getFrontiers = AnanodeApi.getFrontiers;
