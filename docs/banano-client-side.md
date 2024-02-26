# client side ananosjs

Client side ananosjs currently uses a field on the window object to store it's code.

This will be updated to use a modular include sometime soon (TM).

For now here's how to get started:

1.  include ananosjs in the web page

    ```html
    <script src="../dist/ananoscoin-ananosjs.js"></script>
    ```

2.  generate a seed

 ```js
function uint8_to_hex(uint8) {
  let hex_string = "";
  for (let i=0; i < uint8.length; i++) {
    let hex = uint8[i].toString(16);
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    hex_string += hex;
  }
    return hex_string.toUpperCase();
  }
const getRandomHex32 = () => {
      const array = new Uint32Array(8);
      window.crypto.getRandomValues(array);
      const hex = uint8_to_hex(array);
      return hex;
    };

    window.localStorage.seed = getRandomHex32();
   ```

3.  look for account balances (will give an error in an unopened account)

   ```js
    const getAccountInfo = async (ix) => {
      const url = 'https://kaliumapi.appditto.com/api';
      const seed = window.localStorage.seed;
      const privateKey = await window.ananoscoinAnanosjs.getPrivateKey(seed, 0);
      const publicKey = await window.ananoscoinAnanosjs.getPublicKey(
        privateKey
      );
      const account = window.ananoscoinAnanosjs.getAnanosAccount(publicKey);
      window.ananoscoinAnanosjs.setAnanodeApiUrl(url);
      const accountInfo = await window.ananoscoinAnanosjs.getAccountInfo(
        account,
        true
      );
      return accountInfo;
    };
```

4.  receive pending deposits

 ```js
    const receiveAnanosDeposits = async () => {
      const seed = window.localStorage.seed;
      const privateKey = await window.ananoscoinAnanosjs.getPrivateKey(seed, 0);
      const publicKey = await window.ananoscoinAnanosjs.getPublicKey(
        privateKey
      );
      const account = window.ananoscoinAnanosjs.getAnanosAccount(publicKey);
      return await window.ananoscoinAnanosjs.receiveAnanosDepositsForSeed(
        seed,
        0,
        account
      );
    };
```

5.  withdraw ananos.

  ```js
    const withdrawAnanos = async (withdrawAccount, withdrawAmount) => {
      const seed = window.localStorage.seed;
      return await window.ananoscoinAnanosjs.sendAnanosWithdrawalFromSeed(
        seed,
        0,
        withdrawAccount,
        withdrawAmount
      );
    };
```
