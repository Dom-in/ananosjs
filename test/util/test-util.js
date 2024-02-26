'use strict';

// libraries
const chai = require('chai');

// modules
const ananosjs = require('../../index.js');
const assert = chai.assert;
const expect = chai.expect;

const getTimeNanos = () => {
  return BigInt(process.hrtime.bigint());
};

const getCoinDatas = (ananosTest) => {
  if (ananosTest == undefined) {
    throw Error('ananosTest is a required parameter.');
  }
  return [
    {
      coin: 'ananos',
      coinPrefix: 'ban',
      getChangeRepresentativeForSeedFn: (ananosjs) => {
        return ananosjs.changeAnanosRepresentativeForSeed;
      },
      getSendWithdrawalFromSeedFn: (ananosjs) => {
        return ananosjs.sendAnanosWithdrawalFromSeed;
      },
      getSendAmountToAccountFn: (ananosjs) => {
        return ananosjs.sendAmountToAnanosAccount;
      },
      getSendAmountToAccountWithRepresentativeAndPreviousFn: (ananosjs) => {
        return ananosjs.sendAmountToAnanosAccountWithRepresentativeAndPrevious;
      },
      getAccountFromSeedFn: (ananosjs) => {
        return ananosjs.getAnanosAccountFromSeed;
      },
      getReceiveDepositsForSeedFn: (ananosjs) => {
        return ananosjs.receiveAnanosDepositsForSeed;
      },
      getOpenAccountFromSeedFn: (ananosjs) => {
        return ananosjs.openAnanosAccountFromSeed;
      },
      getReceiveCamoDepositsForSeedFn: (ananosjs) => {
        return ananosjs.receiveCamoAnanosDepositsForSeed;
      },
      getCamoReceiveFn: (ananosjs) => {
        return ananosjs.camoAnanosReceive;
      },
      getCamoSendFn: (ananosjs) => {
        return ananosjs.camoAnanosSend;
      },
      getCamoAccountBalanceRawFn: (ananosjs) => {
        return ananosjs.getCamoAnanosAccountBalanceRaw;
      },
      getCamoGetNextPrivateKeyForReceiveFn: (ananosjs) => {
        return ananosjs.getCamoAnanosNextPrivateKeyForReceive;
      },
      getCamoSendWithdrawalFromSeedFn: (ananosjs) => {
        return ananosjs.camoAnanosSendWithdrawalFromSeed;
      },
      getCamoSharedAccountDataFn: (ananosjs) => {
        return ananosjs.getCamoAnanosSharedAccountData;
      },
      getCamoGetAccountsPendingFn: (ananosjs) => {
        return ananosjs.camoAnanosGetAccountsPending;
      },
      representative1: ananosTest.ananosRepresentative1,
      toAccount: ananosTest.ananosAccount,
      bad: {
        seed: 'F975E272ECAF243CB30D3DAB4473F14A482A255A46AE140B1F96F5A1F32F3D51',
        account:
          'ana_1bad1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq',
      },
    },
    {
      coin: 'nano',
      coinPrefix: 'nano',
      getChangeRepresentativeForSeedFn: (ananosjs) => {
        return ananosjs.changeNanoRepresentativeForSeed;
      },
      getSendWithdrawalFromSeedFn: (ananosjs) => {
        return ananosjs.sendNanoWithdrawalFromSeed;
      },
      getSendAmountToAccountFn: (ananosjs) => {
        return ananosjs.sendAmountToNanoAccount;
      },
      getSendAmountToAccountWithRepresentativeAndPreviousFn: (ananosjs) => {
        return ananosjs.sendAmountToNanoAccountWithRepresentativeAndPrevious;
      },
      getAccountFromSeedFn: (ananosjs) => {
        return ananosjs.getNanoAccountFromSeed;
      },
      getReceiveDepositsForSeedFn: (ananosjs) => {
        return ananosjs.receiveNanoDepositsForSeed;
      },
      getOpenAccountFromSeedFn: (ananosjs) => {
        return ananosjs.openNanoAccountFromSeed;
      },
      getReceiveCamoDepositsForSeedFn: (ananosjs) => {
        return ananosjs.receiveCamoNanoDepositsForSeed;
      },
      getCamoReceiveFn: (ananosjs) => {
        return ananosjs.camoNanoReceive;
      },
      getCamoSendFn: (ananosjs) => {
        return ananosjs.camoNanoSend;
      },
      getCamoAccountBalanceRawFn: (ananosjs) => {
        return ananosjs.getCamoNanoAccountBalanceRaw;
      },
      getCamoGetNextPrivateKeyForReceiveFn: (ananosjs) => {
        return ananosjs.getCamoNanoNextPrivateKeyForReceive;
      },
      getCamoSendWithdrawalFromSeedFn: (ananosjs) => {
        return ananosjs.camoNanoSendWithdrawalFromSeed;
      },
      getCamoSharedAccountDataFn: (ananosjs) => {
        return ananosjs.getCamoNanoSharedAccountData;
      },
      getCamoGetAccountsPendingFn: (ananosjs) => {
        return ananosjs.camoNanoGetAccountsPending;
      },
      representative1: ananosTest.nanoRepresentative1,
      toAccount: ananosTest.nanoAccount,
      bad: {
        seed: 'F975E272ECAF243CB30D3DAB4473F14A482A255A46AE140B1F96F5A1F32F3D51',
        account:
          'nano_1bad1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq',
      },
    },
  ];
};

const getAnanosjsWithMockApi = () => {
  const AnanodeApi = require('./mock-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithRealApi = () => {
  ananosjs.setAnanodeApi(ananosjs.realAnanodeApi);
  return ananosjs;
};

const getAnanosjsWithErrorApi = () => {
  const AnanodeApi = require('./everything-error-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithProcessErrorApi = () => {
  const AnanodeApi = require('./process-error-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithProcessForkApi = () => {
  const AnanodeApi = require('./process-fork-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithPendingErrorApi = () => {
  const AnanodeApi = require('./pending-error-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithAccountRepresentativeUndefinedApi = () => {
  const AnanodeApi = require('./representative-undefined-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithAccountInfoBalanceErrorApi = () => {
  const AnanodeApi = require('./account-info-balance-error-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithAccountInfoErrorApi = () => {
  const AnanodeApi = require('./account-info-error-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const getAnanosjsWithCamoApi = () => {
  const AnanodeApi = require('./camo-ananode-api.js');
  ananosjs.setAnanodeApi(AnanodeApi);
  return ananosjs;
};

const expectErrorMessage = async (
    errorMessage,
    fn,
    arg1,
    arg2,
    arg3,
    arg4,
    arg5,
    arg6,
) => {
  try {
    await fn(arg1, arg2, arg3, arg4, arg5, arg6);
  } catch (err) {
    assert.isDefined(err);
    // console.trace('expectErrorMessage', errorMessage, fn, err.message);
    expect(errorMessage).to.deep.equal(err.message);
    if (err.message != errorMessage) {
      // console.trace('expectErrorMessage', errorMessage, fn, err);
      assert.fail(`expected:'${errorMessage}'<>actual:'${err.message}'`);
    }
    return;
  }
  assert.fail(`no error was thrown, expected err.message='${errorMessage}'`);
};

const deactivate = () => {
  ananosjs.setAnanodeApi(undefined);
  ananosjs.setAuth(undefined);
};

exports.getTimeNanos = getTimeNanos;
exports.getAnanosjsWithRealApi = getAnanosjsWithRealApi;
exports.getAnanosjsWithMockApi = getAnanosjsWithMockApi;
exports.getAnanosjsWithErrorApi = getAnanosjsWithErrorApi;
exports.getAnanosjsWithProcessErrorApi = getAnanosjsWithProcessErrorApi;
exports.getAnanosjsWithAccountInfoBalanceErrorApi =
  getAnanosjsWithAccountInfoBalanceErrorApi;
exports.getAnanosjsWithAccountInfoErrorApi = getAnanosjsWithAccountInfoErrorApi;
exports.getAnanosjsWithCamoApi = getAnanosjsWithCamoApi;
exports.getAnanosjsWithPendingErrorApi = getAnanosjsWithPendingErrorApi;
exports.getAnanosjsWithAccountRepresentativeUndefinedApi =
  getAnanosjsWithAccountRepresentativeUndefinedApi;
exports.getAnanosjsWithProcessForkApi = getAnanosjsWithProcessForkApi;
exports.expectErrorMessage = expectErrorMessage;
exports.getCoinDatas = getCoinDatas;
exports.deactivate = deactivate;
