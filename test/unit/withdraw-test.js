'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');

const seed0 = ananosTest.seed0;
const seedIx = ananosTest.seedIx;
const coinDatas = testUtil.getCoinDatas(ananosTest);
const amountAnanos = '1';

describe('withdraw', () => {
  coinDatas.forEach((coinData) => {
    it(
        coinData.coin + ' sendWithdrawalFromSeed valid account matches expected',
        async () => {
          const ananosjs = testUtil.getAnanosjsWithMockApi();

          let expectedResponse;
          if (coinData.coin == 'ananos') {
            expectedResponse =
            '5631DAB5FAF51C8163E054E332951E6BE765BFEFA1AE609A8E942D5B090FCE09';
          }
          if (coinData.coin == 'nano') {
            expectedResponse =
            '344E03CA1D0298189B11865FA410E785A3AAEF81D6EFDA95FEA9B7130F3C2476';
          }
          const sendWithdrawalFromSeed =
          coinData.getSendWithdrawalFromSeedFn(ananosjs);
          const toAccount = coinData.toAccount;
          const actualResponse = await sendWithdrawalFromSeed(
              seed0,
              seedIx,
              toAccount,
              amountAnanos,
          );
          expect(actualResponse).to.deep.equal(expectedResponse);
        },
    );
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
