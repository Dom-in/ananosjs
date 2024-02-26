'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');

const invalidAnaAccount =
  'ana_111111111111111111111111111111111111111111111111111111111112';

const invalidNanoAccount =
  'nano_211111111111111111111111111111111111111111111111111111111111';

const invalidCamoAccount =
  'camo_21111111111111111111111111111111111111111111111111111111111';

describe('corner-cases', () => {
  it('decToHex matches expected', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = '01';
    const actual = ananosjs.AnanosUtil.decToHex(1);
    expect(expected).to.deep.equal(actual);
  });
  it('setAuth', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    ananosjs.setAuth('');
  });
  it('setAnanodeApiProxy', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    ananosjs.setAnanodeApiProxy();
  });
  it('getAnanodeApiProxy', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    ananosjs.getAnanodeApiProxy();
  });
  it('getAccountPublicKey error Undefined ANANOS Account', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = 'Undefined ANANOS Account';
    await testUtil.expectErrorMessage(message, ananosjs.getAccountPublicKey);
  });
  it('getAccountPublicKey error `Not a string', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = `Not a string: '[object Promise]'`;
    const promise = new Promise((resolve) => {
      resolve();
    });
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAccountPublicKey,
        promise,
    );
  });
  it('getAccountPublicKey error Invalid ANANOS Account prefix', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = 'Invalid ANANOS Account prefix \'\'';
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAccountPublicKey,
        '',
    );
  });
  it('getAccountPublicKey error Invalid ANANOS Account', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = `Invalid ANANOS Account \'${invalidAnaAccount}\', does not match regex '^[13456789abcdefghijkmnopqrstuwxyz]+$'`;
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAccountPublicKey,
        invalidAnaAccount,
    );
  });
  it('getAccountPublicKey error Invalid NANO Account', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = `Invalid NANO Account prefix \'${invalidNanoAccount}\'`;
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAccountPublicKey,
        invalidNanoAccount,
    );
  });
  it('getAccountPublicKey error Invalid CAMO ANANOS Account prefix', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = `Invalid CAMO ANANOS Account prefix \'${invalidCamoAccount}\'`;
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAccountPublicKey,
        invalidCamoAccount,
    );
  });
  it('getAccountPublicKey camo', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = ananosTest.accountPublicKey;
    const actual = ananosjs.getAccountPublicKey(ananosTest.camoAccount);
    expect(expected).to.deep.equal(actual);
  });
  it('getRawStrFromAnaoshiStr matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = '1000000000000000000000000000';
    const actual = ananosjs.getRawStrFromAnaoshiStr(1);
    expect(expected).to.deep.equal(actual);
  });
  it('getRawStrFromNanoshiStr matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = '1000000000000000000000000';
    const actual = ananosjs.getRawStrFromNanoshiStr(1);
    expect(expected).to.deep.equal(actual);
  });
  it('getAnanosAccount matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = 'ana_7rmwcs5x';
    const actual = ananosjs.getAnanosAccount('');
    expect(expected).to.deep.equal(actual);
  });
  it('getNanoAccount matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = 'nano_7rmwcs5x';
    const actual = ananosjs.getNanoAccount('');
    expect(expected).to.deep.equal(actual);
  });
  it('getBlockCount matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expected = {count: '1000', unchecked: '10'};
    const actual = await ananosjs.getBlockCount();
    expect(expected).to.deep.equal(actual);
  });
  it('getAnanosDecimalAmountAsRaw matches expected, full decimal', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '1.23456789012345678901234567890';
    const expectedRaw = '123456789012345678901234567890';
    const actualRaw = await ananosjs.getAnanosDecimalAmountAsRaw(decimalAmount);
    expect(actualRaw).to.deep.equal(expectedRaw);
    const ananosParts = await ananosjs.getAnanosPartsFromRaw(actualRaw);
    const actualDesc = await ananosjs.getananosPartsDescription(ananosParts);
    const expectedDesc =
      '1 ananos 23 anaoshi 456,789,012,345,678,901,234,567,890 raw';
    expect(actualDesc).to.deep.equal(expectedDesc);
  });
  it('getAnanosDecimalAmountAsRaw matches expected, whole number', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '1234';
    const expectedRaw = '123400000000000000000000000000000';
    const actualRaw = await ananosjs.getAnanosDecimalAmountAsRaw(decimalAmount);
    expect(actualRaw).to.deep.equal(expectedRaw);
    const ananosParts = await ananosjs.getAnanosPartsFromRaw(actualRaw);
    const actualDesc = await ananosjs.getananosPartsDescription(ananosParts);
    const expectedDesc = '1,234 ananos';
    expect(actualDesc).to.deep.equal(expectedDesc);
  });
  it('getAnanosDecimalAmountAsRaw matches expected, anaoshi only', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '0.12';
    const expectedRaw = '12000000000000000000000000000';
    const actualRaw = await ananosjs.getAnanosDecimalAmountAsRaw(decimalAmount);
    expect(actualRaw).to.deep.equal(expectedRaw);
    const ananosParts = await ananosjs.getAnanosPartsFromRaw(actualRaw);
    const actualDesc = await ananosjs.getananosPartsDescription(ananosParts);
    const expectedDesc = '12 anaoshi';
    expect(actualDesc).to.deep.equal(expectedDesc);
  });
  it('getAnanosDecimalAmountAsRaw matches expected, raw only', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '0.0012';
    const expectedRaw = '120000000000000000000000000';
    const actualRaw = await ananosjs.getAnanosDecimalAmountAsRaw(decimalAmount);
    expect(actualRaw).to.deep.equal(expectedRaw);
    const ananosParts = await ananosjs.getAnanosPartsFromRaw(actualRaw);
    const actualDesc = await ananosjs.getananosPartsDescription(ananosParts);
    const expectedDesc = '120,000,000,000,000,000,000,000,000 raw';
    expect(actualDesc).to.deep.equal(expectedDesc);
  });
  it('getAnanosDecimalAmountAsRaw matches expected, zero', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '0';
    const expectedRaw = '0';
    const actualRaw = await ananosjs.getAnanosDecimalAmountAsRaw(decimalAmount);
    expect(actualRaw).to.deep.equal(expectedRaw);
    const ananosParts = await ananosjs.getAnanosPartsFromRaw(actualRaw);
    const actualDesc = await ananosjs.getananosPartsDescription(ananosParts);
    const expectedDesc = '0 ananos';
    expect(actualDesc).to.deep.equal(expectedDesc);
  });
  it('getAnanosDecimalAmountAsRaw matches expected error', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const decimalAmount = '1.234567890123456789012345678901';
    const message =
      'too many numbers past the decimal in \'1.234567890123456789012345678901\', remove 1 of them.';
    await testUtil.expectErrorMessage(
        message,
        ananosjs.getAnanosDecimalAmountAsRaw,
        decimalAmount,
    );
  });
  describe('getAnanosPartsAsDecimal', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    it('getAnanosPartsAsDecimal matches expected, zero, ananos,anaoshi,raw', async () => {
      const actualananosParts = await ananosjs.getAnanosPartsFromDecimal('0');
      expect(actualananosParts.ananos).to.equal('0');
      expect(actualananosParts.anaoshi).to.equal('0');
      expect(actualananosParts.raw).to.equal('0');
      const actualDecimal = await ananosjs.getAnanosPartsAsDecimal(
          actualananosParts,
      );
      const expectedDecimal = '0.00000000000000000000000000000';
      expect(actualDecimal).to.deep.equal(expectedDecimal);
    });
    it('getAnanosPartsAsDecimal matches expected, zero, raw only', async () => {
      const actualananosParts = await ananosjs.getAnanosPartsFromDecimal('0');
      delete actualananosParts.ananos;
      delete actualananosParts.anaoshi;
      expect(actualananosParts.ananos).to.equal(undefined);
      expect(actualananosParts.anaoshi).to.equal(undefined);
      expect(actualananosParts.raw).to.equal('0');
      const actualDecimal = await ananosjs.getAnanosPartsAsDecimal(
          actualananosParts,
      );
      const expectedDecimal = '0.00000000000000000000000000000';
      expect(actualDecimal).to.deep.equal(expectedDecimal);
    });
    it('getAnanosPartsAsDecimal matches expected, zero, anaoshi only', async () => {
      const actualananosParts = await ananosjs.getAnanosPartsFromDecimal('0');
      delete actualananosParts.ananos;
      delete actualananosParts.raw;
      expect(actualananosParts.ananos).to.equal(undefined);
      expect(actualananosParts.anaoshi).to.equal('0');
      expect(actualananosParts.raw).to.equal(undefined);
      const actualDecimal = await ananosjs.getAnanosPartsAsDecimal(
          actualananosParts,
      );
      const expectedDecimal = '0.00';
      expect(actualDecimal).to.deep.equal(expectedDecimal);
    });
    it('getAnanosPartsAsDecimal matches expected, zero, ananos only', async () => {
      const actualananosParts = await ananosjs.getAnanosPartsFromDecimal('0');
      delete actualananosParts.anaoshi;
      delete actualananosParts.raw;
      expect(actualananosParts.ananos).to.equal('0');
      expect(actualananosParts.anaoshi).to.equal(undefined);
      expect(actualananosParts.raw).to.equal(undefined);
      const actualDecimal = await ananosjs.getAnanosPartsAsDecimal(
          actualananosParts,
      );
      const expectedDecimal = '0';
      expect(actualDecimal).to.deep.equal(expectedDecimal);
    });
    it('getAnanosPartsAsDecimal matches expected error', async () => {
      const actualDecimalAmount = '1.23456789012345678901234567890';
      const actualananosParts = await ananosjs.getAnanosPartsFromDecimal(
          actualDecimalAmount,
      );
      actualananosParts.raw += '1';
      const message =
        'too many numbers in ananosParts.raw \'4567890123456789012345678901\', remove 1 of them.';
      await testUtil.expectErrorMessage(
          message,
          ananosjs.getAnanosPartsAsDecimal,
          actualananosParts,
      );
    });
  });
  it('sign from hardware wallet', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const AnanodeApi = require('../util/mock-ananode-api.js');
    // console.log(`STARTED hw`, ananosjs.AnanodeApi);
    const destAccount =
      'ana_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7';
    const amountRaw = '1';
    const expected =
      'EA94473875A88E3777C7FF4251410F09B82AACECE02901D78FDAE4BC571AF77D';
    const accountSigner = {};
    accountSigner.getPublicKey = async () => {
      return await ananosjs.getPublicKey(destAccount);
    };
    accountSigner.signBlock = async () => {
      return '';
    };
    try {
      const actual = await ananosjs.AnanosUtil.sendFromPrivateKey(
          AnanodeApi,
          accountSigner,
          destAccount,
          amountRaw,
          ananosjs.ANANOS_PREFIX,
      );
      expect(expected).to.deep.equal(actual);
    } catch (e) {
      console.trace(e);
    }
  });

  it('signMessage from hardware wallet', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const destAccount =
      'ana_3i1aq1cchnmbn9x5rsbap8b15akfh7wj7pwskuzi7ahz8oq6cobd99d4r3b7';
    const expected =
      'EA94473875A88E3777C7FF4251410F09B82AACECE02901D78FDAE4BC571AF77D';
    const accountSigner = {};
    accountSigner.getPublicKey = async () => {
      return await ananosjs.getPublicKey(destAccount);
    };
    accountSigner.signBlock = async (block) => {
      block.signature = expected;
      return block;
    };
    try {
      const actual = await ananosjs.signMessage(accountSigner, 'test');
      expect(expected).to.deep.equal(actual);
    } catch (e) {
      console.trace(e);
    }
  });

  it('verify getBlake2bHash ananosjs vs hash', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const bytes = ananosjs.getUtf8BytesFromString('a');
    const hash1Bytes = await ananosjs.getBlake2bHash(bytes, 32);
    const actualHash = ananosjs.getHexFromBytes(hash1Bytes);
    const expectedHash = '8928AAE63C84D87EA098564D1E03AD813F107ADD474E56AEDD286349C0C03EA4';
    expect(expectedHash).to.deep.equal(actualHash);
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
