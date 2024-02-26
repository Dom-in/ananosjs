'use strict';

const index = require('./index.js');
const ananosUtil = require('./app/scripts/ananos-util.js');
const ananodeApi = require('./app/scripts/ananode-api.js');
const camoUtil = require('./app/scripts/camo-util.js');
const loggingUtil = require('./app/scripts/logging-util.js');
const depositUtil = require('./app/scripts/deposit-util.js');
const crypto = require('crypto');
const fs = require('fs');

const configs = {};
configs.ananos = {};
configs.ananos.prefix = index.ANANOS_PREFIX;
configs.ananos.ananosUrl = 'https://node-ananos.thomiz.dev/http';
configs.nano = {};
configs.nano.prefix = index.NANO_PREFIX;
configs.nano.ananosUrl = 'https://app.natrium.io/api';

const commands = {};

commands['cbgetaccount'] = async (seed) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const privateKey = ananosUtil.getPrivateKey(seed, 0);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const camoPublicKey = camoUtil.getCamoPublicKey(privateKey);
  const camoAccount = ananosUtil.getAccount(camoPublicKey, config.prefix);
  console.log('camo ananos getaccount public key', publicKey);
  console.log('camo ananos getaccount camo public key', camoPublicKey);
  console.log('camo ananos getaccount camo account', camoAccount);
};

commands['cbcheckpending'] = async (seed) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const privateKey = ananosUtil.getPrivateKey(seed, 0);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const account = ananosUtil.getAccount(publicKey);
  const accountsPending = await ananodeApi.getAccountsPending([account], -1);
  const blocks = Object.keys(accountsPending.blocks[account]);
  console.log('camo ananos checkpending account', account);
  console.log(
      'camo ananos checkpending ',
      blocks.length,
      'pending blocks',
      blocks,
  );
};

commands['cbregister'] = async (seed) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const privateKey = ananosUtil.getPrivateKey(seed, 0);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const account = ananosUtil.getAccount(publicKey);
  const camoPublicKey = camoUtil.getCamoPublicKey(privateKey);
  const camoAccount = ananosUtil.getAccount(camoPublicKey);
  const pendingResponse = await camoUtil.receiveSeed(
      ananodeApi,
      seed,
      config.prefix,
  );
  console.log('camo ananos register pendingResponse', pendingResponse);
  console.log('camo ananos register ananosAccount', account);
  console.log('camo ananos register camoAccount', camoAccount);
  const response = await ananosUtil.sendFromPrivateKeyWithRepresentative(
      ananodeApi,
      privateKey,
      account,
      1,
      camoAccount,
      config.prefix,
  );
  console.log('camo ananos register account response', response);
};

commands['cbcheckaccount'] = async (account) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const representative = await ananodeApi.getAccountRepresentative(account);
  console.log('camo ananos checkaccount representative', representative);
};

commands['cbcheckseed'] = async (seed) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const privateKey = ananosUtil.getPrivateKey(seed, 0);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const account = ananosUtil.getAccount(publicKey);
  console.log('checkseed ananosAccount', account);
  const representative = await ananodeApi.getAccountRepresentative(account);
  console.log('checkseed camoAccount', representative);
};

commands['cbsendraw'] = async (
    fundingPrivateKey,
    seed,
    toAccount,
    amountRaw,
) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const privateKey = ananosUtil.getPrivateKey(seed, 0);
  const toPublicKey = ananosUtil.getAccountPublicKey(toAccount);
  const hashes = await camoUtil.send(
      ananodeApi,
      fundingPrivateKey,
      privateKey,
      toPublicKey,
      amountRaw,
  );
  console.log('camo ananos sendraw response', hashes);
};

commands['cbreceive'] = async (seed, fromAnanosAccount) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const toPrivateKey = ananosUtil.getPrivateKey(seed, 0);
  const fromPublicKey = ananosUtil.getAccountPublicKey(fromAnanosAccount);
  const hashes = await camoUtil.receive(
      ananodeApi,
      toPrivateKey,
      fromPublicKey,
  );
  console.log('camo ananos receive response', hashes);
};

commands['nsendraw'] = async (privateKey, destAccount, amountRaw) => {
  const config = configs.nano;
  ananodeApi.setUrl(config.ananosUrl);
  const response = await ananosUtil.sendFromPrivateKey(
      ananodeApi,
      privateKey,
      destAccount,
      amountRaw,
      config.prefix,
  );
  console.log('nano sendnano response', response);
};

commands['ncheckpending'] = async (account, maxAccountsPending) => {
  const config = configs.nano;
  ananodeApi.setUrl(config.ananosUrl);
  const pending = await ananodeApi.getAccountsPending(
      [account],
      parseInt(maxAccountsPending),
  );
  console.log('nano checkpending response', pending);
};

commands['ngetaccount'] = async (privateKey) => {
  const config = configs.nano;
  ananodeApi.setUrl(config.ananosUrl);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  console.log('nano getaccount publicKey', publicKey);
  const account = ananosUtil.getAccount(publicKey, config.prefix);
  console.log('nano getaccount account', account);
};

commands['ngetprivatekey'] = async (seed, seedIx) => {
  const privateKey = ananosUtil.getPrivateKey(seed, seedIx);
  console.log('nano getprivatekey privateKey', privateKey);
};

commands['nreceive'] = async (privateKey, specificPendingBlockHash) => {
  const config = configs.nano;
  ananodeApi.setUrl(config.ananosUrl);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const account = ananosUtil.getAccount(publicKey, config.prefix);
  let representative = await ananodeApi.getAccountRepresentative(account);
  if (!representative) {
    representative = account;
  }
  const response = await depositUtil.receive(
      loggingUtil,
      ananodeApi,
      account,
      privateKey,
      representative,
      specificPendingBlockHash,
      config.prefix,
  );
  console.log('nano receive response', response);
};

commands['naccountinfo'] = async (account) => {
  const config = configs.nano;
  ananodeApi.setUrl(config.ananosUrl);
  const response = await ananodeApi.getAccountInfo(account, true);
  response.balanceParts = await ananosUtil.getAmountPartsFromRaw(
      response.balance,
      config.prefix,
  );
  console.log('nano accountinfo response', response);
};

commands['bsendraw'] = async (privateKey, destAccount, amountRaw) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  try {
    const response = await ananosUtil.sendFromPrivateKey(
        ananodeApi,
        privateKey,
        destAccount,
        amountRaw,
        config.prefix,
    );
    console.log('ananos sendananos response', response);
  } catch (error) {
    console.log('ananos sendananos error', error.message);
  }
};

commands['bsendjson'] = async (privateKey, file) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  try {
    const jsonStr = fs.readFileSync(file, 'UTF-8');
    const json = JSON.parse(jsonStr);
    const responses = [];
    const publicKey = await ananosUtil.getPublicKey(privateKey);
    const account = ananosUtil.getAccount(publicKey, config.prefix);
    console.log('ananos sendjson account', account);

    const pending = await ananodeApi.getAccountsPending(
        [account],
        parseInt(1),
    );
    console.log('ananos sendjson pending', pending);
    if (pending.blocks) {
      if (pending.blocks[account]) {
        const pendingBlockhashes = [...Object.keys(pending.blocks[account])];
        const specificPendingBlockHash = pendingBlockhashes[0];
        console.log(
            'ananos sendjson aborting, found pending block ',
            specificPendingBlockHash,
        );
        let representative = await ananodeApi.getAccountRepresentative(
            account,
        );
        if (!representative) {
          representative = account;
        }
        const response = await depositUtil.receive(
            loggingUtil,
            ananodeApi,
            account,
            privateKey,
            representative,
            specificPendingBlockHash,
            config.prefix,
        );
        console.log('ananos sendjson aborted, found pending blocks', response);
        return;
      }
    }

    for (let ix = 0; ix < json.accounts.length; ix++) {
      const elt = json.accounts[ix];
      let destAccount = elt.account;
      if (destAccount.startsWith('nano_')) {
        destAccount = 'ana_' + destAccount.substring(5);
      }
      let amountRaw;
      if (elt.amount !== undefined) {
        amountRaw = await index.getAnanosDecimalAmountAsRaw(elt.amount);
      }
      if (elt.balance !== undefined) {
        amountRaw = await index.getAnanosDecimalAmountAsRaw(elt.balance);
      }
      console.log('ananos sendjson', destAccount, amountRaw);

      const response = await ananosUtil.sendFromPrivateKey(
          ananodeApi,
          privateKey,
          destAccount,
          amountRaw,
          config.prefix,
      );
      responses.push(response);
    }
    console.log('ananos sendjson responses', responses);
  } catch (error) {
    console.trace(error);
    console.log('ananos sendjson error', error.message);
  }
};

commands['bcheckpending'] = async (account, maxAccountsPending) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const pending = await ananodeApi.getAccountsPending(
      [account],
      parseInt(maxAccountsPending),
  );
  console.log('ananos checkpending response', pending);
};

commands['bgetaccount'] = async (privateKey) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  console.log('ananos getaccount publicKey', publicKey);
  const account = ananosUtil.getAccount(publicKey, index.ANANOS_PREFIX);
  console.log('ananos getaccount account', account);
};

commands['bgetprivatekey'] = async (seed, seedIx) => {
  const privateKey = ananosUtil.getPrivateKey(seed, seedIx);
  console.log('ananos getprivatekey privateKey', privateKey);
};

commands['breceive'] = async (privateKey, specificPendingBlockHash) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const publicKey = await ananosUtil.getPublicKey(privateKey);
  const account = ananosUtil.getAccount(publicKey, index.ANANOS_PREFIX);
  let representative = await ananodeApi.getAccountRepresentative(account);
  if (!representative) {
    representative = account;
  }
  const response = await depositUtil.receive(
      loggingUtil,
      ananodeApi,
      account,
      privateKey,
      representative,
      specificPendingBlockHash,
      config.prefix,
  );
  console.log('ananos receive response', response);
};

commands['baccountinfo'] = async (account) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  console.log('ananos accountinfo account', account);
  try {
    ananosUtil.getAccountPublicKey(account);
  } catch (error) {
    console.log('ananos accountinfo error', error);
    return;
  }
  const response = await ananodeApi.getAccountInfo(account, true);
  if (response.error !== undefined) {
    console.log('ananos accountinfo response', response);
    return;
  }

  response.balanceParts = await ananosUtil.getAmountPartsFromRaw(
      response.balance,
      config.prefix,
  );
  response.balanceDescription = await index.getananosPartsDescription(
      response.balanceParts,
  );
  response.balanceDecimal = await index.getAnanosPartsAsDecimal(
      response.balanceParts,
  );
  console.log('ananos accountinfo response', response);
};

commands['bamountraw'] = async (amount) => {
  const response = index.getAnanosDecimalAmountAsRaw(amount);
  console.log('bamountraw response', response);
};

commands['getseed'] = async () => {
  const response = crypto.randomBytes(32).toString('hex').toUpperCase();
  console.log('getseed response', response);
};

commands['reprocess'] = async (subtype, hash) => {
  const config = configs.ananos;
  ananodeApi.setUrl(config.ananosUrl);
  const blocks = await ananodeApi.getBlocks([hash], true);
  const block = blocks.blocks[hash];
  console.log('reprocess block', block);
  const response = await ananodeApi.process(block, subtype);
  console.log('reprocess response', response);
};

const run = async () => {
  console.log('ananosjs');
  if (process.argv.length < 3) {
    console.log('#usage:');
    console.log(
        'https://github.com/AnanosNetwork/ananosjs/blob/master/docs/camo-cli.md',
    );
    console.log(
        'https://github.com/AnanosNetwork/ananosjs/blob/master/docs/ananos-cli.md',
    );
    console.log(
        'https://github.com/AnanosNetwork/ananosjs/blob/master/docs/nano-cli.md',
    );
  } else {
    const command = process.argv[2];
    const arg0 = process.argv[3];
    const arg1 = process.argv[4];
    const arg2 = process.argv[5];
    const arg3 = process.argv[6];

    const fn = commands[command];
    if (fn == undefined) {
      console.log('unknown command', command);
    } else {
      await fn(arg0, arg1, arg2, arg3);
    }
  }
};

run();
