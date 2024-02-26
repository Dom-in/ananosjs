'use strict';

// STARTED TOP nodejs/browser hack
(function() {
  // FINISHED TOP nodejs/browser hack
  const AnanosUtil = require('./ananos-util.js');

  const LOG_WITHDRAW = false;

  const withdraw = async (
      loggingUtil,
      AnanodeApi,
      privateKey,
      toAccount,
      amountAnanos,
      accountPrefix,
      representative,
      previous,
  ) => {
    /* istanbul ignore if */
    if (loggingUtil === undefined) {
      throw Error('loggingUtil is required.');
    }
    /* istanbul ignore if */
    if (AnanodeApi === undefined) {
      throw Error('AnanodeApi is required.');
    }
    /* istanbul ignore if */
    if (privateKey === undefined) {
      throw Error('privateKey is required.');
    }
    /* istanbul ignore if */
    if (toAccount === undefined) {
      throw Error('toAccount is required.');
    }
    /* istanbul ignore if */
    if (amountAnanos === undefined) {
      throw Error('amountAnanos is required.');
    }
    /* istanbul ignore if */
    if (accountPrefix === undefined) {
      throw Error('accountPrefix is required.');
    }
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    const fromAccount = AnanosUtil.getAccount(publicKey, accountPrefix);
    const amountRaw = AnanosUtil.getRawStrFromMajorAmountStr(
        amountAnanos.toString(),
        accountPrefix,
    );
    /* istanbul ignore if */
    if (LOG_WITHDRAW) {
      loggingUtil.log(
          'STARTED withdraw fromAccount',
          fromAccount,
          'toAccount',
          toAccount,
          'amountRaw',
          amountRaw,
      );
    }
    const response =
      await AnanosUtil.sendFromPrivateKeyWithRepresentativeAndPrevious(
          AnanodeApi,
          privateKey,
          toAccount,
          amountRaw,
          representative,
          previous,
          accountPrefix,
      );
    /* istanbul ignore if */
    if (LOG_WITHDRAW) {
      loggingUtil.log(
          'SUCCESS withdraw fromAccount',
          fromAccount,
          'toAccount',
          toAccount,
          'amountRaw',
          amountRaw,
          'response',
          response,
      );
    }
    return response;
  };

  // STARTED BOTTOM nodejs/browser hack
  const exports = (() => {
    const exports = {};
    exports.withdraw = withdraw;
    return exports;
  })();

  // istanbul ignore else
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.ananoscoin.ananosjs.withdrawUtil = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
