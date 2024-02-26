'use strict';

const AnanodeApi = require('./mock-ananode-api.js');

const getAccountInfo = async (account) => {
  const accountInfo = {};
  accountInfo.balance = undefined;
  return accountInfo;
};

exports.getAccountBalanceRaw = AnanodeApi.getAccountBalanceRaw;
exports.getAccountRepresentative = AnanodeApi.getAccountRepresentative;
exports.getPrevious = AnanodeApi.getPrevious;
exports.process = AnanodeApi.process;
exports.getGeneratedWork = AnanodeApi.getGeneratedWork;
exports.getAccountInfo = getAccountInfo;
exports.getAccountsPending = AnanodeApi.getAccountsPending;
exports.getAccountHistory = AnanodeApi.getAccountHistory;
exports.getFrontiers = AnanodeApi.getFrontiers;
