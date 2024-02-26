'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');
const coinDatas = testUtil.getCoinDatas(ananosTest);

const expectedWorkStart = 'FD7B270000000000';
const expectedWork = 'FD7B280000000000';
const expectedWorkHash =
  '000D1BAEC8EC208142C99059B393051BAC8380F9B5A2E6B2489A277D81789F3F';

const privateKey = ananosTest.privateKey;
const block = ananosTest.block;
const signature = ananosTest.signature;
const hash = ananosTest.hash;
const accountPublicKey = ananosTest.accountPublicKey;
const ananosSeed = ananosTest.seed;

describe('block-sign', () => {
  coinDatas.forEach((coinData) => {
    const bad = coinData.bad;
    const ananosAccount = coinData.toAccount;
    it(coinData.coin + ' send works, good account', (done) => {
      const ananosjs = testUtil.getAnanosjsWithMockApi();
      const successCallback = () => {
        done();
      };
      const failureCallback = (error) => {
        throw error;
      };
      const sendAmountToAccount = coinData.getSendAmountToAccountFn(ananosjs);
      sendAmountToAccount(
          ananosSeed,
          0,
          ananosAccount,
          1,
          successCallback,
          failureCallback,
      );
    });
    it(coinData.coin + ' send works, bad account', (done) => {
      const ananosjs = testUtil.getAnanosjsWithMockApi();
      const successCallback = () => {
        done();
      };
      const failureCallback = (error) => {
        throw error;
      };
      const sendAmountToAccount = coinData.getSendAmountToAccountFn(ananosjs);
      sendAmountToAccount(
          bad.seed,
          0,
          bad.account,
          1,
          successCallback,
          failureCallback,
      );
    });
  });

  it('accountPublicKey matches expected', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expectedAccountPublicKey = accountPublicKey;
    const actualAccountPublicKey = ananosjs.getAccountPublicKey(block.account);
    expect(expectedAccountPublicKey).to.deep.equal(actualAccountPublicKey);
  });
  it('hash of block matches expected', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expectedHash = hash;
    const actualHash = ananosjs.getBlockHash(block);
    expect(expectedHash).to.deep.equal(actualHash);
  });
  it('signature of block matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expectedSignature = signature;
    const actualSignature = await ananosjs.getSignature(privateKey, block);
    expect(expectedSignature).to.deep.equal(actualSignature);
  });
  it('getHexFromBytes and getHexFromBytes works', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const workBytes = ananosjs.getBytesFromHex(expectedWorkStart);
    const actualWorkStart = ananosjs.getHexFromBytes(workBytes);
    expect(expectedWorkStart).to.deep.equal(actualWorkStart);
  });
  it('getZeroedWorkBytes', () => {
    const expectedWorkBytes = new Uint8Array(8);
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const actualWorkBytes = ananosjs.getZeroedWorkBytes();
    expect(expectedWorkBytes).to.deep.equal(actualWorkBytes);
  });
  it('getWork works', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const workBytes = ananosjs.getBytesFromHex(expectedWorkStart).reverse();
    const actualWork = ananosjs.getWorkUsingCpu(expectedWorkHash, workBytes);
    expect(expectedWork).to.deep.equal(actualWork);
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
