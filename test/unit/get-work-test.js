'use strict';

// libraries
const chai = require('chai');
// const crypto = require('crypto');

// modules
const expect = chai.expect;

const testUtil = require('../util/test-util.js');

describe('get-work', () => {
  it('getWork works', () => {
    const expectedWorkStart = 'A6B7F50000000000';
    const expectedWork = 'A6B7F60000000000';
    const expectedWorkHash =
      '2FA4DAA890EABA6A27415D70EEFF265B0744830421C406798C9B1E8B8E46258B';
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const workBytes = ananosjs.getBytesFromHex(expectedWorkStart).reverse();
    const actualWork = ananosjs.getWorkUsingCpu(expectedWorkHash, workBytes);
    expect(expectedWork).to.deep.equal(actualWork);
  });
  it('getWork zero', () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const expectedWorkHash = 'E2D8BD730E1512568378EC61A2367431F8AC35E66C46508CD0F9F3BCD94DE29B';
    // start with zero work bytes, getWorkUsingCpu increments by 1 to find work bytes.
    const workBytes = ananosjs.getZeroedWorkBytes();
    const actualWork = ananosjs.getWorkUsingCpu(expectedWorkHash, workBytes);
    // since we picked the hash to make the test fast.
    // actualWork should be all zeros.
    const expectedWork = ananosjs.getHexFromBytes(workBytes);
    expect(expectedWork).to.deep.equal(actualWork);
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
