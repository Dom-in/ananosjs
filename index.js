'use strict';

// STARTED TOP nodejs/browser hack
(function() {
  // FINISHED TOP nodejs/browser hack

  const AnanosUtil = require('./app/scripts/ananos-util.js');
  const realAnanodeApi = require('./app/scripts/ananode-api.js');
  const camoUtil = require('./app/scripts/camo-util.js');
  const depositUtil = require('./app/scripts/deposit-util.js');
  const withdrawUtil = require('./app/scripts/withdraw-util.js');
  const loggingUtil = require('./app/scripts/logging-util.js');

  /**
   * @constant {string}
   * @memberof Main
   */
  const ANANOS_PREFIX = 'ana_';

  const NANO_PREFIX = 'nano_';

  let AnanodeApi = realAnanodeApi;

  /**
   * Sets the Ananode Api (useful for overriding some methods)
   * @memberof Main
   * @param {string} _AnanodeApi the new AnanodeApi
   * @return {undefined} returns nothing.
   */
  const setAnanodeApi = (_AnanodeApi) => {
    AnanodeApi = _AnanodeApi;
  };

  /**
   * Sets the Ananode Api Authorization
   * @memberof Main
   * @param {string} auth the new authorization
   * @return {undefined} returns nothing.
   */
  const setAuth = (auth) => {
    if (AnanodeApi !== undefined) {
      AnanodeApi.setAuth(auth);
    }
  };

  /**
   * Sets the Ananode Api Proxy (http pr https proxy)
   * @memberof Main
   * @param {Object} proxy the new proxy
   * @return {undefined} returns nothing.
   */
  const setAnanodeApiProxy = (proxy) => {
    AnanodeApi.setModuleRef(proxy);
  };

  /**
   * Gets the Ananode Api Proxy (http pr https proxy)
   * @memberof Main
   * @return {Object} returns the module.
   */
  const getAnanodeApiProxy = () => {
    return AnanodeApi.getModuleRef();
  };

  /**
   * converts amount from decimal to ananosParts.
   * @memberof AnanosUtil
   * @param {string} decimalAmount the decimal amount of ananos.
   * @return {AnanosParts} returns the ananos parts of the decimal amount.
   */
  const getAnanosPartsFromDecimal = (decimalAmount) => {
    const raw = getAnanosDecimalAmountAsRaw(decimalAmount);
    const ananosParts = getAnanosPartsFromRaw(raw);
    return ananosParts;
  };

  /**
   * converts amount from ananosParts to decimal.
   * @memberof AnanosUtil
   * @param {AnanosParts} ananosParts the ananos parts to describe.
   * @return {string} returns the decimal amount of ananoss.
   */
  const getAnanosPartsAsDecimal = (ananosParts) => {
    let ananosDecimal = '';
    const ananos = ananosParts[ananosParts.majorName];
    if (ananos !== undefined) {
      ananosDecimal += ananos;
    } else {
      ananosDecimal += '0';
    }

    const anaoshi = ananosParts[ananosParts.minorName];
    if (anaoshi !== undefined || ananosParts.raw !== undefined) {
      ananosDecimal += '.';
    }

    if (anaoshi !== undefined) {
      if (anaoshi.length == 1) {
        ananosDecimal += '0';
      }
      ananosDecimal += anaoshi;
    }

    if (ananosParts.raw !== undefined) {
      if (anaoshi === undefined) {
        ananosDecimal += '00';
      }
      const count = 27 - ananosParts.raw.length;
      if (count < 0) {
        throw Error(
            `too many numbers in ananosParts.raw '${
              ananosParts.raw
            }', remove ${-count} of them.`,
        );
      }
      ananosDecimal += '0'.repeat(count);
      ananosDecimal += ananosParts.raw;
    }

    return ananosDecimal;
  };

  /**
   * converts amount from decimal to raw.
   * @memberof AnanosUtil
   * @param {string} amount the decimal amount.
   * @return {string} returns amount in raw.
   */
  const getAnanosDecimalAmountAsRaw = (amount) => {
    const amountStr = amount.toString();
    const decimal = amountStr.indexOf('.');
    let ananosBigInt;
    if (decimal < 0) {
      ananosBigInt = BigInt(getRawStrFromAnanosStr(amountStr));
    } else {
      ananosBigInt = BigInt(
          getRawStrFromAnanosStr(amountStr.substring(0, decimal)),
      );
    }
    let anaoshiBigInt;
    if (decimal < 0) {
      anaoshiBigInt = BigInt(0);
    } else {
      let anaoshiRaw = amountStr.substring(decimal + 1);
      // console.log('anaoshiRaw', anaoshiRaw);
      // console.log('anaoshiRaw.length', anaoshiRaw.length);
      const count = 29 - anaoshiRaw.length;
      if (count < 0) {
        throw Error(
            `too many numbers past the decimal in '${amountStr}', remove ${-count} of them.`,
        );
      }
      anaoshiRaw += '0'.repeat(count);
      anaoshiBigInt = BigInt(anaoshiRaw);
    }
    const rawBigInt = anaoshiBigInt + ananosBigInt;
    const rawStr = rawBigInt.toString(10);
    return rawStr;
  };

  /**
   * describes the ananos parts in an english description.
   * @memberof AnanosUtil
   * @param {ananosParts} ananosParts the ananos parts to describe.
   * @return {string} returns the description of the ananos parts.
   */
  const getananosPartsDescription = (ananosParts) => {
    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    let ananosAmountDesc = '';
    if (ananosParts[ananosParts.majorName] !== '0') {
      ananosAmountDesc += numberWithCommas(ananosParts[ananosParts.majorName]);
      ananosAmountDesc += ' ';
      ananosAmountDesc += ananosParts.majorName;
    }
    if (ananosParts[ananosParts.minorName] !== '0') {
      if (ananosAmountDesc.length > 0) {
        ananosAmountDesc += ' ';
      }
      ananosAmountDesc += ananosParts[ananosParts.minorName];
      ananosAmountDesc += ' ';
      ananosAmountDesc += ananosParts.minorName;
    }
    if (ananosParts.raw !== '0') {
      if (ananosAmountDesc.length > 0) {
        ananosAmountDesc += ' ';
      }
      ananosAmountDesc += numberWithCommas(ananosParts.raw);
      ananosAmountDesc += ' raw';
    }

    if (ananosAmountDesc.length === 0) {
      ananosAmountDesc = '0 ';
      ananosAmountDesc += ananosParts.majorName;
    }

    return ananosAmountDesc;
  };

  /**
   * Sends the amount to the account with an optional representative and
   * previous block hash.
   * If the representative is not sent, it will be pulled from the api.
   * If the previous is not sent, it will be pulled from the api.
   * Be very careful with previous, as setting it incorrectly
   * can cause an incorrect amount of funds to be sent.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} destAccount the destination account.
   * @param {string} amountRaw the amount to send, in raw.
   * @param {string} representative the representative (optional).
   * @param {string} previousHash the previous hash (optional).
   * @return {Promise<string>} returns the hash returned by the send.
   */
  const sendAmountToAnanosAccountWithRepresentativeAndPrevious = async (
      seed,
      seedIx,
      destAccount,
      amountRaw,
      representative,
      previousHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const hash =
      await AnanosUtil.sendFromPrivateKeyWithRepresentativeAndPrevious(
          AnanodeApi,
          privateKey,
          destAccount,
          amountRaw,
          representative,
          previousHash,
          ANANOS_PREFIX,
      );
    return hash;
  };

  /**
   * Sends the amount to the account with an optional representative and
   * previous block hash.
   * If the representative is not sent, it will be pulled from the api.
   * If the previous is not sent, it will be pulled from the api.
   * Be very careful with previous, as setting it incorrectly
   * can cause an incorrect amount of funds to be sent.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} destAccount the destination account.
   * @param {string} amountRaw the amount to send, in raw.
   * @param {string} representative the representative (optional).
   * @param {string} previousHash the previous hash (optional).
   * @return {Promise<string>} returns the hash returned by the send.
   */
  const sendAmountToNanoAccountWithRepresentativeAndPrevious = async (
      seed,
      seedIx,
      destAccount,
      amountRaw,
      representative,
      previousHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const hash =
      await AnanosUtil.sendFromPrivateKeyWithRepresentativeAndPrevious(
          AnanodeApi,
          privateKey,
          destAccount,
          amountRaw,
          representative,
          previousHash,
          NANO_PREFIX,
      );
    return hash;
  };

  /**
   * Sends the amount to the ananos account with a callback for success and failure.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} destAccount the destination account.
   * @param {string} amountRaw the amount to send, in raw.
   * @param {string} successCallback the callback to call upon success.
   * @param {string} failureCallback the callback to call upon failure.
   * @return {Promise<string>} returns the hash returned by the send.
   */
  const sendAmountToAnanosAccount = async (
      seed,
      seedIx,
      destAccount,
      amountRaw,
      successCallback,
      failureCallback,
  ) => {
    return await AnanosUtil
        .send(
            AnanodeApi,
            seed,
            seedIx,
            destAccount,
            amountRaw,
            successCallback,
            failureCallback,
            ANANOS_PREFIX,
        )
        .catch((error) => {
        // console.trace(error);
          throw Error(error);
        });
  };

  /**
   * Sends the amount to the nano account with a callback for success and failure.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} destAccount the destination account.
   * @param {string} amountRaw the amount to send, in raw.
   * @param {string} successCallback the callback to call upon success.
   * @param {string} failureCallback the callback to call upon failure.
   * @return {Promise<string>} returns the hash returned by the send.
   */
  const sendAmountToNanoAccount = async (
      seed,
      seedIx,
      destAccount,
      amountRaw,
      successCallback,
      failureCallback,
  ) => {
    return await AnanosUtil
        .send(
            AnanodeApi,
            seed,
            seedIx,
            destAccount,
            amountRaw,
            successCallback,
            failureCallback,
            NANO_PREFIX,
        )
        .catch((error) => {
        // console.trace(error);
          throw Error(error);
        });
  };

  /**
   * Sets the rep for an account with a given seed.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @return {Promise<string>} returns the hash returned by the change.
   */
  const changeAnanosRepresentativeForSeed = async (
      seed,
      seedIx,
      representative,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const response = await AnanosUtil.change(
        AnanodeApi,
        privateKey,
        representative,
        ANANOS_PREFIX,
    );
    return response;
  };

  /**
   * Sets the rep for an account with a given seed.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @return {Promise<string>} returns the hash returned by the change.
   */
  const changeNanoRepresentativeForSeed = async (
      seed,
      seedIx,
      representative,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const response = await AnanosUtil.change(
        AnanodeApi,
        privateKey,
        representative,
        NANO_PREFIX,
    );
    return response;
  };

  /**
   * Recieve deposits for a nano account with a given seed.
   * @memberof DepositUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @param {string} specificPendingBlockHash a specific block hash to receive (optional).
   * @return {Promise<object>} returns the response returned by the receive.
   */
  const receiveNanoDepositsForSeed = async (
      seed,
      seedIx,
      representative,
      specificPendingBlockHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    const account = AnanosUtil.getAccount(publicKey, NANO_PREFIX);
    const response = await depositUtil.receive(
        loggingUtil,
        AnanodeApi,
        account,
        privateKey,
        representative,
        specificPendingBlockHash,
        NANO_PREFIX,
    );
    return response;
  };

  /**
   * Recieve deposits for a ananos account with a given seed.
   * @memberof DepositUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @param {string} specificPendingBlockHash a specific block hash to receive (optional).
   * @return {Promise<object>} returns the response returned by the receive.
   */
  const receiveAnanosDepositsForSeed = async (
      seed,
      seedIx,
      representative,
      specificPendingBlockHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    const account = AnanosUtil.getAccount(publicKey, ANANOS_PREFIX);
    const response = await depositUtil.receive(
        loggingUtil,
        AnanodeApi,
        account,
        privateKey,
        representative,
        specificPendingBlockHash,
        ANANOS_PREFIX,
    );
    return response;
  };

  /**
   * Send a withdrawal from a ananos account with a given seed.
   * @memberof WithdrawUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} toAccount the account to send to.
   * @param {string} amountAnanos the amount of ananoss.
   * @param {string} representative the new representative (optional).
   * @param {string} previous the new previous (optional).
   * @return {Promise<object>} returns the response returned by the withdraw.
   */
  const sendAnanosWithdrawalFromSeed = async (
      seed,
      seedIx,
      toAccount,
      amountAnanos,
      representative,
      previous,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const response = withdrawUtil.withdraw(
        loggingUtil,
        AnanodeApi,
        privateKey,
        toAccount,
        amountAnanos,
        ANANOS_PREFIX,
        representative,
        previous,
    );
    return response;
  };

  /**
   * Send a withdrawal from a nano account with a given seed.
   * @memberof WithdrawUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} toAccount the account to send to.
   * @param {string} amountAnanos the amount of ananoss.
   * @param {string} representative the new representative (optional).
   * @param {string} previous the new previous (optional).
   * @return {Promise<object>} returns the response returned by the withdraw.
   */
  const sendNanoWithdrawalFromSeed = async (
      seed,
      seedIx,
      toAccount,
      amountAnanos,
      representative,
      previous,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const response = withdrawUtil.withdraw(
        loggingUtil,
        AnanodeApi,
        privateKey,
        toAccount,
        amountAnanos,
        NANO_PREFIX,
        representative,
        previous,
    );
    return response;
  };

  /**
   * Get the balance, in raw, for an account.
   *
   * (use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
   * @memberof AnanodeApi
   * @param {string} account the account to use.
   * @return {Promise<string>} the account's balance, in raw.
   */
  const getAccountBalanceRaw = async (account) => {
    return await AnanodeApi.getAccountBalanceRaw(account);
  };

  /**
   * Get the balance and pending values, in raw, as an object like this one:
   * { balance: '123', pending: '123' } for an account.
   *
   * (use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
   * @memberof AnanodeApi
   * @param {string} account the account to use.
   * @return {Promise<object>} the account's balances, in raw.
   */
  const getAccountBalanceAndPendingRaw = async (account) => {
    return await AnanodeApi.getAccountBalanceAndPendingRaw(account);
  };

  /**
   * Get the balances and pending values, in raw, as an object for all given account. Returns the Node object without transformation.
   *
   * (use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
   * @memberof AnanodeApi
   * @param {string[]} accounts the account to use.
   * @return {Promise<object>} the account's balances, in raw.
   */
  const getAccountsBalances = async (accounts) => {
    return await AnanodeApi.getAccountsBalances(accounts);
  };

  /**
   * Get the history for an account.
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#account_history}
   * @memberof AnanodeApi
   * @param {string} account the account to use.
   * @param {number} count the count to use (use -1 for all).
   * @param {string} head the head to start at (optional).
   * @param {string} raw if true, return raw history (optional).
   * @return {Promise<object>} the account's history.
   */
  const getAccountHistory = async (account, count, head, raw) => {
    return await AnanodeApi.getAccountHistory(account, count, head, raw);
  };

  /**
   * Get the ananos account with a given seed and index.
   *
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @return {Promise<string>} the account.
   */
  const getAnanosAccountFromSeed = async (seed, seedIx) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    const account = AnanosUtil.getAccount(publicKey, ANANOS_PREFIX);
    return account;
  };

  /**
   * Get the ananos account with a given seed and index.
   *
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @return {Promise<string>} the account.
   */
  const getNanoAccountFromSeed = async (seed, seedIx) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    const account = AnanosUtil.getAccount(publicKey, NANO_PREFIX);
    return account;
  };

  /**
   * Sets the URL to use for the node behind the Ananode Api
   * @memberof Main
   * @param {string} url the new url
   * @return {undefined} returns nothing.
   */
  const setAnanodeApiUrl = (url) => {
    AnanodeApi.setUrl(url);
  };

  /**
   * Get the account info for an account.
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#account_info}
   * @memberof AnanodeApi
   * @param {string} account the account to use.
   * @param {boolean} representativeFlag the representativeFlag to use (optional).
   * @return {Promise<object>} the account's info.
   */
  const getAccountInfo = async (account, representativeFlag) => {
    return await AnanodeApi.getAccountInfo(account, representativeFlag);
  };

  /**
   * Get the network block count.
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#block_count}
   * @memberof AnanodeApi
   * @return {Promise<object>} the block count.
   */
  const getBlockCount = async () => {
    return await AnanodeApi.getBlockCount();
  };

  /**
   * Enables rate limiting, which looks for the rate limiting headers in the response.
   *
   * @memberof AnanodeApi
   * @param {string} flag the flag to use.
   * @return {undefined} returns nothing.
   */
  const setUseRateLimit = async (flag) => {
    AnanodeApi.setUseRateLimit(flag);
  };

  /**
   * Open a ananos account with a given seed.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @param {string} pendingBlockHash the pending block hash.
   * @param {string} pendingValueRaw the pending block hash.
   * @return {Promise<string>} returns the hash returned by the open.
   */
  const openAnanosAccountFromSeed = async (
      seed,
      seedIx,
      representative,
      pendingBlockHash,
      pendingValueRaw,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    return await AnanosUtil.open(
        AnanodeApi,
        privateKey,
        publicKey,
        representative,
        pendingBlockHash,
        pendingValueRaw,
        ANANOS_PREFIX,
    );
  };

  /**
   * Open a nano account with a given seed.
   * @memberof AnanosUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} representative the representative.
   * @param {string} pendingBlockHash the pending block hash.
   * @param {string} pendingValueRaw the pending block hash.
   * @return {Promise<string>} returns the hash returned by the open.
   */
  const openNanoAccountFromSeed = async (
      seed,
      seedIx,
      representative,
      pendingBlockHash,
      pendingValueRaw,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = await AnanosUtil.getPublicKey(privateKey);
    return await AnanosUtil.open(
        AnanodeApi,
        privateKey,
        publicKey,
        representative,
        pendingBlockHash,
        pendingValueRaw,
        NANO_PREFIX,
    );
  };

  /**
   * Get the hash for a given block.
   *
   * @memberof AnanosUtil
   * @param {string} block the seed to use to find the account.
   * @return {string} the block's hash.
   */
  const getBlockHash = (block) => {
    return AnanosUtil.hash(block);
  };

  /**
   * signs a dummy block with a hash of the utf-8 message using private key.
   *
   * @memberof AnanosUtil
   * @param {string} privateKeyOrSigner the private key to use to sign.
   * @param {string} message the utf-8 message to sign.
   * @return {string} the message's signature.
   */
  const signMessage = (privateKeyOrSigner, message) => {
    return AnanosUtil.signMessage(privateKeyOrSigner, message);
  };

  /**
   * signs a utf-8 message with private key. Only used internally and for testing.
   *
   * @memberof AnanosUtil
   * @param {string} message the utf-8 message to sign.
   * @return {Uint8Array} hashed message's bytes.
   */
  const hashMessageToBytes = (message) => {
    return AnanosUtil.hashMessageToBytes(message);
  };

  /**
   * generates a dummy block hash that is used for message signing.
   *
   * @memberof AnanosUtil
   * @param {string} privateKey the private key to use to sign.
   * @param {string} message the utf-8 message to sign.
   * @return {Uint8Array} hashed dummy block's bytes.
   */
  const messageDummyBlockHashBytes = (privateKey, message) => {
    return AnanosUtil.messageDummyBlockHashBytes(privateKey, message);
  };

  /**
   * generates a dummy block that is used for message signing.
   *
   * @memberof AnanosUtil
   * @param {string} privateKey the private key to use to sign.
   * @param {string} message the utf-8 message to sign.
   * @return {string} the message's block.
   */
  const messageDummyBlock = (privateKey, message) => {
    return AnanosUtil.messageDummyBlock(privateKey, message);
  };

  /**
   * verifies a utf-8 message with public key from a dummy block signature.
   *
   * @memberof AnanosUtil
   * @param {string} publicKey the public key to use to sign.
   * @param {string} message the utf-8 message to verify.
   * @param {string} signature hex of signature.
   * @return {boolean} whether the signature was verified.
   */
  const verifyMessage = (publicKey, message, signature) => {
    return AnanosUtil.verifyMessage(publicKey, message, signature);
  };

  /**
   * signs a hash.
   *
   * @memberof AnanosUtil
   * @param {string} privateKey the private key to use to sign.
   * @param {string} hash the hash to sign.
   * @return {string} the block's hash.
   */
  const signHash = (privateKey, hash) => {
    return AnanosUtil.signHash(privateKey, hash);
  };

  /**
   * verifys a hash.
   *
   * @memberof AnanosUtil
   * @param {string} hash the hash to verify.
   * @param {string} signature the signature to verify.
   * @param {string} publicKey the public key to use to sign.
   * @return {string} true if verification passed.
   */
  const verify = (hash, signature, publicKey) => {
    return AnanosUtil.verify(hash, signature, publicKey);
  };

  /**
   * Get the signature for a given block (gets the hash of the block, and signs the hash).
   *
   * @memberof AnanosUtil
   * @param {string} privateKey the private key used to sign the block.
   * @param {string} block the block to sign.
   * @return {string} the block's signature.
   */
  const getSignature = (privateKey, block) => {
    return AnanosUtil.sign(privateKey, block);
  };

  /**
   * Converts a hex string to bytes in a Uint8Array.
   *
   * @memberof AnanosUtil
   * @param {string} hex the hex string to use.
   * @return {Uint8Array} the bytes in a Uint8Array.
   */
  const getBytesFromHex = (hex) => {
    return AnanosUtil.hexToBytes(hex);
  };

  /**
   * Converts bytes in a Uint8Array to a hex string.
   *
   * @memberof AnanosUtil
   * @param {Uint8Array} bytes the bytes to use.
   * @return {string} the hex string.
   */
  const getHexFromBytes = (bytes) => {
    return AnanosUtil.bytesToHex(bytes);
  };

  /**
   * gets work bytes using the CPU.
   *
   * @memberof AnanosUtil
   * @param {string} hash the hash to use to calculate work bytes.
   * @param {Uint8Array} workBytes the Uint8Array(8) used to store temporary calculations.
   * @return {string} the work bytes as a hex string.
   */
  const getWorkUsingCpu = (hash, workBytes) => {
    return AnanosUtil.getHashCPUWorker(hash, workBytes);
  };

  /**
   * receives ananos funds at a camo address.
   *
   * @memberof CamoUtil
   * @param {string} toPrivateKey the private key that receives the funds.
   * @param {string} fromPublicKey the public key that sent the funds.
   * @return {Promise<string[]>} the received hashes in an array.
   */
  const camoAnanosReceive = async (toPrivateKey, fromPublicKey) => {
    return await camoUtil.receive(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        ANANOS_PREFIX,
    );
  };

  /**
   * receives nano funds at a camo address.
   *
   * @memberof CamoUtil
   * @param {string} toPrivateKey the private key that receives the funds.
   * @param {string} fromPublicKey the public key that sent the funds.
   * @return {Promise<string[]>} the received hashes in an array.
   */
  const camoNanoReceive = async (toPrivateKey, fromPublicKey) => {
    return await camoUtil.receive(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        NANO_PREFIX,
    );
  };

  /**
   * finds a new private key to recieve more ananos funds. the key would have no history.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @return {Promise<string>} the private key to use.
   */
  const getCamoAnanosNextPrivateKeyForReceive = async (seed) => {
    return await camoUtil.getFirstUnopenedPrivateKey(
        AnanodeApi,
        seed,
        ANANOS_PREFIX,
    );
  };

  /**
   * finds a new private key to recieve more ananos funds. the key would have no history.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @return {Promise<string>} the private key to use.
   */
  const getCamoNanoNextPrivateKeyForReceive = async (seed) => {
    return await camoUtil.getFirstUnopenedPrivateKey(
        AnanodeApi,
        seed,
        NANO_PREFIX,
    );
  };

  /**
   * sends ananos funds to a camo address.
   *
   * @memberof CamoUtil
   * @param {string} fundingPrivateKey the private key that sends the funds.
   * @param {string} fromCamoPrivateKey the private key used to generate the shared seed.
   * @param {string} toCamoPublicKey the public key that receives the funds.
   * @param {string} amountAnanos the amount of ananoss.
   * @return {Promise<string[]>} the sent hashes in an array.
   */
  const camoAnanosSend = async (
      fundingPrivateKey,
      fromCamoPrivateKey,
      toCamoPublicKey,
      amountAnanos,
  ) => {
    const amountRaw = getRawStrFromAnanosStr(amountAnanos);
    return await camoUtil.send(
        AnanodeApi,
        fundingPrivateKey,
        fromCamoPrivateKey,
        toCamoPublicKey,
        amountRaw,
        ANANOS_PREFIX,
    );
  };

  /**
   * sends camo funds to a camo address.
   *
   * @memberof CamoUtil
   * @param {string} fundingPrivateKey the private key that sends the funds.
   * @param {string} fromCamoPrivateKey the private key used to generate the shared seed.
   * @param {string} toCamoPublicKey the public key that receives the funds.
   * @param {string} amountAnanos the amount of ananoss.
   * @return {Promise<string[]>} the sent hashes in an array.
   */
  const camoNanoSend = async (
      fundingPrivateKey,
      fromCamoPrivateKey,
      toCamoPublicKey,
      amountAnanos,
  ) => {
    const amountRaw = getRawStrFromNanoStr(amountAnanos);
    return await camoUtil.send(
        AnanodeApi,
        fundingPrivateKey,
        fromCamoPrivateKey,
        toCamoPublicKey,
        amountRaw,
        NANO_PREFIX,
    );
  };

  /**
   * sends ananos funds to a camo account.
   * This function uses seed index 0 to generate the shared secret,
   * and seed index "seedIx" to get the private key that contains funds to send.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} toAccount the account to send to.
   * @param {string} amountAnanos the amount of ananoss.
   * @return {Promise<string[]>} the sent hashes in an array.
   */
  const camoAnanosSendWithdrawalFromSeed = async (
      seed,
      seedIx,
      toAccount,
      amountAnanos,
  ) => {
    const accountValid = getCamoAccountValidationInfo(toAccount);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const fundingPrivateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const fromCamoPrivateKey = AnanosUtil.getPrivateKey(seed, 0);
    const toCamoPublicKey = AnanosUtil.getAccountPublicKey(toAccount);
    return await camoAnanosSend(
        fundingPrivateKey,
        fromCamoPrivateKey,
        toCamoPublicKey,
        amountAnanos,
    );
  };

  /**
   * sends nano funds to a camo account.
   * This function uses seed index 0 to generate the shared secret,
   * and seed index "seedIx" to get the private key that contains funds to send.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} toAccount the account to send to.
   * @param {string} amountAnanos the amount of ananoss.
   * @return {Promise<string[]>} the sent hashes in an array.
   */
  const camoNanoSendWithdrawalFromSeed = async (
      seed,
      seedIx,
      toAccount,
      amountAnanos,
  ) => {
    const accountValid = getCamoAccountValidationInfo(toAccount);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const fundingPrivateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const fromCamoPrivateKey = AnanosUtil.getPrivateKey(seed, 0);
    const toCamoPublicKey = AnanosUtil.getAccountPublicKey(toAccount);
    return await camoNanoSend(
        fundingPrivateKey,
        fromCamoPrivateKey,
        toCamoPublicKey,
        amountAnanos,
    );
  };

  /**
   * get the pending blocks for the camo ananos account.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} fromAccount the account to recieve from.
   * @param {number} sharedSeedIx the index to use with the shared seed.
   * @param {number} count the max count to get.
   * @return {Promise<string[]>} the pending hashes in an array.
   */
  const camoAnanosGetAccountsPending = async (
      seed,
      seedIx,
      fromAccount,
      sharedSeedIx,
      count,
  ) => {
    const accountValid = getCamoAccountValidationInfo(fromAccount);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const toPrivateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const fromPublicKey = AnanosUtil.getAccountPublicKey(fromAccount);
    return await camoUtil.getAccountsPending(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        sharedSeedIx,
        count,
        ANANOS_PREFIX,
    );
  };

  /**
   * get the pending blocks for the camo nano account.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} fromAccount the account to recieve from.
   * @param {number} sharedSeedIx the index to use with the shared seed.
   * @param {number} count the max count to get.
   * @return {Promise<string[]>} the pending hashes in an array.
   */
  const camoNanoGetAccountsPending = async (
      seed,
      seedIx,
      fromAccount,
      sharedSeedIx,
      count,
  ) => {
    const accountValid = getCamoAccountValidationInfo(fromAccount);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const toPrivateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const fromPublicKey = AnanosUtil.getAccountPublicKey(fromAccount);
    return await camoUtil.getAccountsPending(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        sharedSeedIx,
        count,
        NANO_PREFIX,
    );
  };

  /**
   * returns data on whether a camo account is valid or not, and why.
   *
   * @memberof CamoUtil
   * @param {string} account the account to check.
   * @return {object} the account validity data.
   */
  const getCamoAccountValidationInfo = (account) => {
    const accountValid = camoUtil.isCamoAccountValid(account);
    return accountValid;
  };

  /**
   * get the ananos shared account, used as an intermediary to send finds between the seed and the camo account.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} account the camo account to send or recieve from.
   * @param {string} sharedSeedIx the index to use with the shared seed.
   * @return {Promise<string>} the shared account.
   */
  const getCamoAnanosSharedAccountData = async (
      seed,
      seedIx,
      account,
      sharedSeedIx,
  ) => {
    const accountValid = getCamoAccountValidationInfo(account);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = AnanosUtil.getAccountPublicKey(account);
    return await camoUtil.getSharedAccountData(
        AnanodeApi,
        privateKey,
        publicKey,
        sharedSeedIx,
        ANANOS_PREFIX,
    );
  };

  /**
   * get the nano shared account, used as an intermediary to send finds between the seed and the camo account.
   *
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} account the camo account to send or recieve from.
   * @param {string} sharedSeedIx the index to use with the shared seed.
   * @return {Promise<string>} the shared account.
   */
  const getCamoNanoSharedAccountData = async (
      seed,
      seedIx,
      account,
      sharedSeedIx,
  ) => {
    const accountValid = getCamoAccountValidationInfo(account);
    if (!accountValid.valid) {
      throw Error(accountValid.message);
    }
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = AnanosUtil.getAccountPublicKey(account);
    return await camoUtil.getSharedAccountData(
        AnanodeApi,
        privateKey,
        publicKey,
        sharedSeedIx,
        NANO_PREFIX,
    );
  };

  /**
   * Recieve ananos deposits for a camo account with a given seed.
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} account the camo account to send or recieve from.
   * @param {string} sharedSeedIx the index to use with the shared seed.
   * @param {string} specificPendingBlockHash the pending block to recieve.
   * @return {Promise<string>} the response from receiving the block.
   */
  const receiveCamoAnanosDepositsForSeed = async (
      seed,
      seedIx,
      account,
      sharedSeedIx,
      specificPendingBlockHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = AnanosUtil.getAccountPublicKey(account);
    const sharedSecret = await camoUtil.getSharedSecretFromRepresentative(
        AnanodeApi,
        privateKey,
        publicKey,
        ANANOS_PREFIX,
    );
    if (sharedSecret) {
      const sharedSeed = sharedSecret;
      const privateKey = AnanosUtil.getPrivateKey(sharedSeed, sharedSeedIx);
      const camoPublicKey = await camoUtil.getCamoPublicKey(privateKey);
      const camoRepresentative = await camoUtil.getCamoAccount(camoPublicKey);
      const repPublicKey = await AnanosUtil.getAccountPublicKey(
          camoRepresentative,
      );
      const representative = await AnanosUtil.getAccount(
          repPublicKey,
          ANANOS_PREFIX,
      );
      const response = await receiveAnanosDepositsForSeed(
          sharedSeed,
          sharedSeedIx,
          representative,
          specificPendingBlockHash,
      );
      return response;
    } else {
      return undefined;
    }
  };

  /**
   * Recieve nano deposits for a camo account with a given seed.
   * @memberof CamoUtil
   * @param {string} seed the seed to use to find the account.
   * @param {string} seedIx the index to use with the seed.
   * @param {string} account the camo account to send or recieve from.
   * @param {string} sharedSeedIx the index to use with the shared seed.
   * @param {string} specificPendingBlockHash the pending block to recieve.
   * @return {Promise<string>} the response from receiving the block.
   */
  const receiveCamoNanoDepositsForSeed = async (
      seed,
      seedIx,
      account,
      sharedSeedIx,
      specificPendingBlockHash,
  ) => {
    const privateKey = AnanosUtil.getPrivateKey(seed, seedIx);
    const publicKey = AnanosUtil.getAccountPublicKey(account);
    const sharedSecret = await camoUtil.getSharedSecretFromRepresentative(
        AnanodeApi,
        privateKey,
        publicKey,
        NANO_PREFIX,
    );
    if (sharedSecret) {
      const sharedSeed = sharedSecret;
      const privateKey = AnanosUtil.getPrivateKey(sharedSeed, sharedSeedIx);
      const camoPublicKey = await camoUtil.getCamoPublicKey(privateKey);
      const camoRepresentative = await camoUtil.getCamoAccount(camoPublicKey);
      const repPublicKey = await AnanosUtil.getAccountPublicKey(
          camoRepresentative,
      );
      const representative = await AnanosUtil.getAccount(
          repPublicKey,
          NANO_PREFIX,
      );
      const response = await receiveNanoDepositsForSeed(
          sharedSeed,
          sharedSeedIx,
          representative,
          specificPendingBlockHash,
      );
      return response;
    } else {
      return undefined;
    }
  };

  /**
   * gets the total ananos account balance, in raw.
   *
   * @memberof CamoUtil
   * @param {string} toPrivateKey the private key that receives the funds.
   * @param {string} fromPublicKey the public key that sent the funds.
   * @return {Promise<string>} the account balance, in raw.
   */
  const getCamoAnanosAccountBalanceRaw = async (
      toPrivateKey,
      fromPublicKey,
  ) => {
    return await camoUtil.getBalanceRaw(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        ANANOS_PREFIX,
    );
  };

  /**
   * gets the total nano account balance, in raw.
   *
   * @memberof CamoUtil
   * @param {string} toPrivateKey the private key that receives the funds.
   * @param {string} fromPublicKey the public key that sent the funds.
   * @return {Promise<string>} the account balance, in raw.
   */
  const getCamoNanoAccountBalanceRaw = async (toPrivateKey, fromPublicKey) => {
    return await camoUtil.getBalanceRaw(
        AnanodeApi,
        toPrivateKey,
        fromPublicKey,
        NANO_PREFIX,
    );
  };

  /**
   * Get the pending blocks for the account.
   *
   * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_pending}
   * @memberof AnanodeApi
   * @param {string[]} accounts the array of pending accounts.
   * @param {number} count the max count to get.
   * @param {string} source if true, get source.
   * @return {Promise<object>} the account's pending blocks.
   */
  const getAccountsPending = async (accounts, count, source) => {
    return await AnanodeApi.getAccountsPending(accounts, count, source);
  };

  /**
   * Converts an amount into a raw amount.
   *
   * @memberof Main
   * @param {string} amountStr the amount, as a string.
   * @param {string} amountPrefix the amount, as a string.
   * @return {string} the ananos as a raw value.
   */
  const getRawStrFromAnanosStr = (amountStr) => {
    return AnanosUtil.getRawStrFromMajorAmountStr(amountStr, ANANOS_PREFIX);
  };

  /**
   * Converts an amount into a raw amount.
   *
   * @memberof Main
   * @param {string} amountStr the amount, as a string.
   * @param {string} amountPrefix the amount, as a string.
   * @return {string} the ananos as a raw value.
   */
  const getRawStrFromAnaoshiStr = (amountStr) => {
    return AnanosUtil.getRawStrFromMinorAmountStr(amountStr, ANANOS_PREFIX);
  };
  /**
   * Converts an amount into a raw amount.
   *
   * @memberof Main
   * @param {string} amountStr the amount, as a string.
   * @param {string} amountPrefix the amount, as a string.
   * @return {string} the ananos as a raw value.
   */
  const getRawStrFromNanoStr = (amountStr) => {
    return AnanosUtil.getRawStrFromMajorAmountStr(amountStr, NANO_PREFIX);
  };

  /**
   * Converts an amount into a raw amount.
   *
   * @memberof Main
   * @param {string} amountStr the amount, as a string.
   * @param {string} amountPrefix the amount, as a string.
   * @return {string} the ananos as a raw value.
   */
  const getRawStrFromNanoshiStr = (amountStr) => {
    return AnanosUtil.getRawStrFromMinorAmountStr(amountStr, NANO_PREFIX);
  };

  /**
   * Get the ananos account for a given public key.
   *
   * @memberof AnanosUtil
   * @param {string} publicKey the public key.
   * @return {string} the account.
   */
  const getAnanosAccount = (publicKey) => {
    return AnanosUtil.getAccount(publicKey, ANANOS_PREFIX);
  };

  /**
   * Get the ananos account for a given public key.
   *
   * @memberof AnanosUtil
   * @param {string} publicKey the public key.
   * @return {string} the account.
   */
  const getNanoAccount = (publicKey) => {
    return AnanosUtil.getAccount(publicKey, NANO_PREFIX);
  };

  /**
   * Get the ananos parts (ananos, anaoshi, raw) for a given raw value.
   *
   * @memberof AnanosUtil
   * @param {string} amountRawStr the raw amount, as a string.
   * @return {ananosParts} the ananos parts.
   */
  const getAnanosPartsFromRaw = (amountRawStr) => {
    return AnanosUtil.getAmountPartsFromRaw(amountRawStr, ANANOS_PREFIX);
  };

  /**
   * Get the nano parts nano, nanoshi, raw) for a given raw value.
   *
   * @memberof AnanosUtil
   * @param {string} amountRawStr the raw amount, as a string.
   * @return {ananosParts} the ananos parts.
   */
  const getNanoPartsFromRaw = (amountRawStr) => {
    return AnanosUtil.getAmountPartsFromRaw(amountRawStr, NANO_PREFIX);
  };

  // STARTED BOTTOM nodejs/browser hack
  const exports = (() => {
    // istanbul ignore if
    if (typeof BigInt === 'undefined') {
      return;
    }
    const exports = {};
    exports.ANANOS_PREFIX = ANANOS_PREFIX;
    exports.NANO_PREFIX = NANO_PREFIX;
    exports.PREFIXES = [ANANOS_PREFIX, NANO_PREFIX];
    exports.sendNanoWithdrawalFromSeed = sendNanoWithdrawalFromSeed;
    exports.sendAnanosWithdrawalFromSeed = sendAnanosWithdrawalFromSeed;
    exports.getAccountsPending = getAccountsPending;
    exports.getAnanosAccountFromSeed = getAnanosAccountFromSeed;
    exports.getNanoAccountFromSeed = getNanoAccountFromSeed;
    exports.getAccountInfo = getAccountInfo;
    exports.getBlockCount = getBlockCount;

    exports.AnanosUtil = AnanosUtil;
    exports.AnanodeApi = AnanodeApi;
    exports.camoUtil = camoUtil;
    exports.depositUtil = depositUtil;
    exports.withdrawUtil = withdrawUtil;
    exports.loggingUtil = loggingUtil;
    exports.realAnanodeApi = realAnanodeApi;

    exports.Main = exports;
    exports.CamoUtil = camoUtil;
    exports.AnanosUtil = AnanosUtil;
    exports.WithdrawUtil = withdrawUtil;
    exports.DepositUtil = depositUtil;
    exports.AnanodeApi = AnanodeApi;

    exports.setAnanodeApi = setAnanodeApi;
    exports.setUseRateLimit = setUseRateLimit;
    exports.setAuth = setAuth;
    exports.setAnanodeApiProxy = setAnanodeApiProxy;
    exports.getAnanodeApiProxy = getAnanodeApiProxy;
    exports.getAnanosPartsFromDecimal = getAnanosPartsFromDecimal;
    exports.getAnanosPartsAsDecimal = getAnanosPartsAsDecimal;
    exports.getAnanosDecimalAmountAsRaw = getAnanosDecimalAmountAsRaw;
    exports.getananosPartsDescription = getananosPartsDescription;
    exports.getAccountHistory = getAccountHistory;
    exports.openAnanosAccountFromSeed = openAnanosAccountFromSeed;
    exports.openNanoAccountFromSeed = openNanoAccountFromSeed;
    exports.getBlockHash = getBlockHash;
    exports.getAccountBalanceRaw = getAccountBalanceRaw;
    exports.getAccountBalanceAndPendingRaw = getAccountBalanceAndPendingRaw;
    exports.getAccountsBalances = getAccountsBalances;
    exports.getAnanosPartsFromRaw = getAnanosPartsFromRaw;
    exports.getNanoPartsFromRaw = getNanoPartsFromRaw;
    exports.getBlake2bHash = AnanosUtil.getBlake2bHash;
    exports.getUtf8BytesFromString = AnanosUtil.utf8ToBytes;
    exports.getPrivateKey = AnanosUtil.getPrivateKey;
    exports.getPublicKey = AnanosUtil.getPublicKey;
    exports.getAccount = AnanosUtil.getAccount;
    exports.getNanoAccount = getNanoAccount;
    exports.getAnanosAccount = getAnanosAccount;
    exports.getAccountPublicKey = AnanosUtil.getAccountPublicKey;
    exports.sendAmountToNanoAccount = sendAmountToNanoAccount;
    exports.sendAmountToAnanosAccount = sendAmountToAnanosAccount;
    exports.sendAmountToAnanosAccountWithRepresentativeAndPrevious =
      sendAmountToAnanosAccountWithRepresentativeAndPrevious;
    exports.sendAmountToNanoAccountWithRepresentativeAndPrevious =
      sendAmountToNanoAccountWithRepresentativeAndPrevious;
    exports.changeAnanosRepresentativeForSeed =
      changeAnanosRepresentativeForSeed;
    exports.changeNanoRepresentativeForSeed = changeNanoRepresentativeForSeed;
    exports.getSignature = getSignature;
    exports.hashMessageToBytes = hashMessageToBytes;
    exports.messageDummyBlockHashBytes = messageDummyBlockHashBytes;
    exports.messageDummyBlock = messageDummyBlock;
    exports.signMessage = signMessage;
    exports.verifyMessage = verifyMessage;
    exports.signHash = signHash;
    exports.verify = verify;
    exports.getBytesFromHex = getBytesFromHex;
    exports.getHexFromBytes = getHexFromBytes;
    exports.getWorkUsingCpu = getWorkUsingCpu;
    exports.getZeroedWorkBytes = AnanosUtil.getZeroedWorkBytes;
    exports.isWorkValid = AnanosUtil.isWorkValid;
    exports.getNanoAccountValidationInfo =
      AnanosUtil.getNanoAccountValidationInfo;
    exports.getAnanosAccountValidationInfo =
      AnanosUtil.getAnanosAccountValidationInfo;
    exports.receiveAnanosDepositsForSeed = receiveAnanosDepositsForSeed;
    exports.receiveNanoDepositsForSeed = receiveNanoDepositsForSeed;
    exports.getRawStrFromAnanosStr = getRawStrFromAnanosStr;
    exports.getRawStrFromAnaoshiStr = getRawStrFromAnaoshiStr;
    exports.getRawStrFromNanoStr = getRawStrFromNanoStr;
    exports.getRawStrFromNanoshiStr = getRawStrFromNanoshiStr;
    exports.setAnanodeApiUrl = setAnanodeApiUrl;
    exports.getCamoPublicKey = camoUtil.getCamoPublicKey;
    exports.getSharedSecret = camoUtil.getSharedSecret;
    exports.camoAnanosReceive = camoAnanosReceive;
    exports.camoNanoReceive = camoNanoReceive;
    exports.camoAnanosSend = camoAnanosSend;
    exports.camoNanoSend = camoNanoSend;
    exports.camoAnanosSendWithdrawalFromSeed = camoAnanosSendWithdrawalFromSeed;
    exports.camoNanoSendWithdrawalFromSeed = camoNanoSendWithdrawalFromSeed;
    exports.getCamoAccount = camoUtil.getCamoAccount;
    exports.getCamoAnanosAccountBalanceRaw = getCamoAnanosAccountBalanceRaw;
    exports.getCamoNanoAccountBalanceRaw = getCamoNanoAccountBalanceRaw;
    exports.getCamoAnanosNextPrivateKeyForReceive =
      getCamoAnanosNextPrivateKeyForReceive;
    exports.getCamoNanoNextPrivateKeyForReceive =
      getCamoNanoNextPrivateKeyForReceive;
    exports.camoAnanosGetAccountsPending = camoAnanosGetAccountsPending;
    exports.camoNanoGetAccountsPending = camoNanoGetAccountsPending;
    exports.getCamoAnanosSharedAccountData = getCamoAnanosSharedAccountData;
    exports.getCamoNanoSharedAccountData = getCamoNanoSharedAccountData;
    exports.receiveCamoAnanosDepositsForSeed = receiveCamoAnanosDepositsForSeed;
    exports.receiveCamoNanoDepositsForSeed = receiveCamoNanoDepositsForSeed;
    exports.getCamoAccountValidationInfo = getCamoAccountValidationInfo;

    return exports;
  })();

  // istanbul ignore else
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.ananoscoinAnanosjs = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
