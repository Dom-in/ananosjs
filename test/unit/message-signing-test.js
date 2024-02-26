'use strict';

// libraries
const chai = require('chai');

// modules
const expect = chai.expect;

const ananosTest = require('./ananos-test.json');

const testUtil = require('../util/test-util.js');

const expectedMessageSignature =
  '36DA6CEE694A54F40A82C62C3DBF75AAF8425D50821DCCECCB931DCEB6B4938F7FD9B420FDFB1924BE2208085FD607471A57649E7DB964623D280D3AD37C2D0A';

const privateKey = ananosTest.privateKey;

describe('message-sign', () => {
  it('signature matches expected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const actualMessageSignature = await ananosjs.signMessage(privateKey, 'test');
    expect(actualMessageSignature).to.deep.equal(expectedMessageSignature);
  });

  it('signed string message is verified', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const signature = await ananosjs.signMessage(privateKey, 'test');
    const publicKey = await ananosjs.getPublicKey(privateKey);
    const signatureVerify = ananosjs.verifyMessage(publicKey, 'test', signature);
    expect(signatureVerify).to.deep.equal(true);
  });

  it('signed Uint8Array message is verified', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const message = new Uint8Array(1);
    message[0] = 1;
    const signature = await ananosjs.signMessage(privateKey, message);
    const publicKey = await ananosjs.getPublicKey(privateKey);
    const signatureVerify = ananosjs.verifyMessage(publicKey, message, signature);
    expect(signatureVerify).to.deep.equal(true);
  });

  it('different signed messages generates different signatures', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const signature1 = await ananosjs.signMessage(privateKey, 'test1');
    const signature2 = await ananosjs.signMessage(privateKey, 'test2');
    expect(signature1).to.not.equal(signature2);
  });

  it('different signed messages without numbers generates different signatures', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const signature1 = await ananosjs.signMessage(privateKey, 'abcd');
    const signature2 = await ananosjs.signMessage(privateKey, 'test');
    expect(signature1).to.not.equal(signature2);
  });

  it('invalid message is rejected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const signature = await ananosjs.signMessage(privateKey, 'test');
    const publicKey = await ananosjs.getPublicKey(privateKey);
    const signatureVerify = ananosjs.verifyMessage(publicKey, 'afjskfjsd7', signature);
    expect(signatureVerify).to.deep.equal(false);
  });

  it('generates expected dummy block hash from public key bytes', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const publicKey = await ananosjs.getPublicKey(privateKey);
    const publicKeyBytes = ananosjs.AnanosUtil.hexToBytes(publicKey);
    const block = ananosjs.messageDummyBlock(publicKeyBytes, 'test');
    const account = ananosjs.getAccount(publicKey, 'ana_');
    expect(account).to.equal(block.account);
  });

  it('generates expected dummy block hash', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    const publicKey = await ananosjs.getPublicKey(privateKey);
    const hashedMessageBytes = ananosjs.hashMessageToBytes('test');
    const dummyBlockHashBytes = ananosjs.messageDummyBlockHashBytes(publicKey, 'test');

    const dummyBlockHash = ananosjs.getHexFromBytes(dummyBlockHashBytes);

    const block = ananosjs.messageDummyBlock(publicKey, 'test');

    const hashedMessage = ananosjs.getHexFromBytes(hashedMessageBytes);
    const representative = ananosjs.getAccount(hashedMessage, 'ana_');
    expect(representative).to.equal(block.representative);

    const manualDummyBlockHash = ananosjs.getBlockHash(block);
    expect(dummyBlockHash).to.equal(manualDummyBlockHash);
  });

  it('invalid message type is rejected', async () => {
    const ananosjs = testUtil.getAnanosjsWithMockApi();
    let actualErrorMessage = 'no error was thrown';
    try {
      await ananosjs.signMessage(privateKey, 12);
    } catch (e) {
      actualErrorMessage = e.message;
    }
    const expectedErrorMessage = 'Expected message to be of type Uint8Array or string';
    expect(expectedErrorMessage).to.equal(actualErrorMessage);
  });

  beforeEach(async () => {});

  afterEach(async () => {
    testUtil.deactivate();
  });
});
