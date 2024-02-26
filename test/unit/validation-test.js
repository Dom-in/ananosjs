'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');
const ananosjs = testUtil.getAnanosjsWithMockApi();

const ananosAccount = ananosTest.ananosAccount;
const nanoAccount = ananosTest.nanoAccount;

describe('account-validation', () => {
  describe('ananos', () => {
    it('getAnanosAccountValidationInfo valid account matches expected', () => {
      const validationInfo =
        ananosjs.getAnanosAccountValidationInfo(ananosAccount);
      expect(validationInfo).to.deep.equal({
        valid: true,
        message: 'valid',
      });
    });
    it('getAnanosAccountValidationInfo null account matches expected', () => {
      const validationInfo = ananosjs.getAnanosAccountValidationInfo(null);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid ANANOS Account (null)',
      });
    });
    it('getAnanosAccountValidationInfo undefined account matches expected', () => {
      const validationInfo = ananosjs.getAnanosAccountValidationInfo(undefined);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid ANANOS Account (undefined)',
      });
    });
    it('getAnanosAccountValidationInfo too short account matches expected', () => {
      const badAccount = 'ana_1bad1not64chars';
      const validationInfo =
        ananosjs.getAnanosAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid ANANOS Account (not 64 characters)',
      });
    });
    it('getAnanosAccountValidationInfo malformed prefix account matches expected', () => {
      const badAccount =
        'ana_4bad1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq';
      const validationInfo =
        ananosjs.getAnanosAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid ANANOS Account (does not start with ana_1 or ana_3)',
      });
    });
    it('getAnanosAccountValidationInfo incorrect alphabet account matches expected', () => {
      const badAccount =
        'ana_1BAD1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq';
      const validationInfo =
        ananosjs.getAnanosAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message:
          'Invalid ANANOS account (characters after ana_ must be one of:13456789abcdefghijkmnopqrstuwxyz)',
      });
    });
    it('getAnanosAccountValidationInfo checksum alphabet account matches expected', () => {
      const badAccount =
        'ana_1111111111111111111111111111111111111111111111111111hifc8npq';
      const validationInfo =
        ananosjs.getAnanosAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message:
          'Invalid ANANOS account (Incorrect checksum hifc8npq <> hifc8npp)',
      });
    });
  });
  describe('nano', () => {
    it('getNanoAccountValidationInfo valid account matches expected', () => {
      const validationInfo = ananosjs.getNanoAccountValidationInfo(nanoAccount);
      expect(validationInfo).to.deep.equal({
        valid: true,
        message: 'valid',
      });
    });
    it('getNanoAccountValidationInfo null account matches expected', () => {
      const validationInfo = ananosjs.getNanoAccountValidationInfo(null);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid NANO Account (null)',
      });
    });
    it('getNanoAccountValidationInfo undefined account matches expected', () => {
      const validationInfo = ananosjs.getNanoAccountValidationInfo(undefined);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid NANO Account (undefined)',
      });
    });
    it('getNanoAccountValidationInfo too short account matches expected', () => {
      const badAccount = 'nano_1bad1not65chars';
      const validationInfo = ananosjs.getNanoAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid NANO Account (not 65 characters)',
      });
    });
    it('getNanoAccountValidationInfo malformed prefix account matches expected', () => {
      const badAccount =
        'nano_4bad1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq';
      const validationInfo = ananosjs.getNanoAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message: 'Invalid NANO Account (does not start with nano_1 or nano_3)',
      });
    });
    it('getNanoAccountValidationInfo incorrect alphabet account matches expected', () => {
      const badAccount =
        'nano_1BAD1ppzmj146pdxgbmph3wmeg15t8zk1yfwbozysoxtti3xqa15qufta5tq';
      const validationInfo = ananosjs.getNanoAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message:
          'Invalid NANO account (characters after nano_ must be one of:13456789abcdefghijkmnopqrstuwxyz)',
      });
    });
    it('getNanoAccountValidationInfo checksum alphabet account matches expected', () => {
      const badAccount =
        'nano_1111111111111111111111111111111111111111111111111111hifc8npq';
      const validationInfo = ananosjs.getNanoAccountValidationInfo(badAccount);
      expect(validationInfo).to.deep.equal({
        valid: false,
        message:
          'Invalid NANO account (Incorrect checksum hifc8npq <> hifc8npp)',
      });
    });
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
