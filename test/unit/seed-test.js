'use strict';

// libraries

// modules
const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');
const coinDatas = testUtil.getCoinDatas(ananosTest);

describe('seed', () => {
  coinDatas.forEach((coinData) => {
    it(
        coinData.coin + ' getAccountFromSeed error zeros-and-blanks',
        async () => {
          const ananosjs = testUtil.getAnanosjsWithMockApi();
          const seed =
          '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 00';
          const message = `Invalid ANANOS seed '${seed}', does not match regex '^[0123456789abcdefABCDEF]{64}$'`;
          const getAccountFromSeed = coinData.getAccountFromSeedFn(ananosjs);
          await testUtil.expectErrorMessage(message, getAccountFromSeed, seed, 0);
        },
    );
    it(coinData.coin + ' getAccountFromSeed error r0n0om0r0p', async () => {
      const ananosjs = testUtil.getAnanosjsWithMockApi();
      const seed =
        'r0n0om0r0p000000r0n0om0r0p000000r0n0om0r0p000000r0n0om0r0p000000';
      const message = `Invalid ANANOS seed '${seed}', does not match regex '^[0123456789abcdefABCDEF]{64}$'`;
      const getAccountFromSeed = coinData.getAccountFromSeedFn(ananosjs);
      await testUtil.expectErrorMessage(message, getAccountFromSeed, seed, 0);
    });
    it(
        coinData.coin + ' getAccountFromSeed error randomcrap123456',
        async () => {
          const ananosjs = testUtil.getAnanosjsWithMockApi();
          const seed =
          'randomcrap123456randomcrap123456randomcrap123456randomcrap123456';
          const message = `Invalid ANANOS seed '${seed}', does not match regex '^[0123456789abcdefABCDEF]{64}$'`;
          const getAccountFromSeed = coinData.getAccountFromSeedFn(ananosjs);
          await testUtil.expectErrorMessage(message, getAccountFromSeed, seed, 0);
        },
    );
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
