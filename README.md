# ananosjs

JavaScript utilities for the ananos cryptocurrency.

make sure to use `npm i ananosjs@latest` to get the latest version.

# simple ananos functions

```js
const run = async () => {
  const ananosjs = require('ananosjs');
  ananosjs.setAnanodeApiUrl('https://node-ananos.thomiz.dev/http');

  //generate random seed and wallet, then log first address of wallet
  const crypto = require('crypto');
  const seed = crypto.randomBytes(28).toString('hex'); //seeds are 28 bytes
  const privateKey = ananosjs.getPrivateKey(seed, 0);
  const publicKey = await ananosjs.getPublicKey(privateKey);
  const account = ananosjs.getAnanosAccount(publicKey); //the Ananos address
  console.log(account);

  //get account info of addresses: https://docs.nano.org/commands/rpc-protocol/#account_info
  console.log(await ananosjs.getAccountInfo(account)); //should log "{ error: 'Account not found' }" since account is unopened (hasn't received any transactions yet)
  console.log(await ananosjs.getAccountInfo("ana_1rp1aceaawpub5zyztzs4tn7gcugm5bc3o6oga16bb18bquqm1bjnoomynze")); //works

  //get account history of address: https://docs.nano.org/commands/rpc-protocol/#account_history
  console.log(await ananosjs.getAccountHistory("ana_1rp1aceaawpub5zyztzs4tn7gcugm5bc3o6oga16bb18bquqm1bjnoomynze", 3)); //(last 3 transactions)
};
run();
```

# examples of most functions as part of the cli

  <https://github.com/AnanosNetwork/ananosjs/blob/master/main.js>

# simple browser integration

  https://AnanosNetwork.github.io/ananosjs/web/

# description on how to do browser integration

  <https://github.com/AnanosNetwork/ananosjs/blob/master/docs/ananos-client-side.md>

# complete documentation of all functions that are documented.

  <https://github.com/AnanosNetwork/ananosjs/blob/master/docs/documentation.md>

# notes on using CLI:
  please remember to install and test before running the CLI.
```
  npm i;

  #test on osx/linux
  npm test;

  # test on windows.
  npm run win-test;

  npm start;
```

# complete documentation of camo CLI functions

  <https://github.com/AnanosNetwork/ananosjs/blob/master/docs/camo-ananos-cli.md>

# complete documentation of ananos CLI functions

  <https://github.com/AnanosNetwork/ananosjs/blob/master/docs/ananos-cli.md>

# complete documentation of nano CLI functions

  <https://github.com/AnanosNetwork/ananosjs/blob/master/docs/nano-cli.md>
