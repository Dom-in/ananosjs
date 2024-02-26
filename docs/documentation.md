## Objects

<dl>
<dt><a href="#Main">Main</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#CamoUtil">CamoUtil</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AnanosUtil">AnanosUtil</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#WithdrawUtil">WithdrawUtil</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#DepositUtil">DepositUtil</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#AnanodeApi">AnanodeApi</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ananosParts">ananosParts</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Block">Block</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AccountValidationInfo">AccountValidationInfo</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Main"></a>

## Main : <code>object</code>
**Kind**: global namespace  

* [Main](#Main) : <code>object</code>
    * [.ANANOS_PREFIX](#Main.ANANOS_PREFIX) : <code>string</code>
    * [.setAnanodeApi(_AnanodeApi)](#Main.setAnanodeApi) ⇒ <code>undefined</code>
    * [.setAuth(auth)](#Main.setAuth) ⇒ <code>undefined</code>
    * [.setAnanodeApiProxy(proxy)](#Main.setAnanodeApiProxy) ⇒ <code>undefined</code>
    * [.getAnanodeApiProxy()](#Main.getAnanodeApiProxy) ⇒ <code>Object</code>
    * [.setAnanodeApiUrl(url)](#Main.setAnanodeApiUrl) ⇒ <code>undefined</code>
    * [.getRawStrFromAnanosStr(amountStr, amountPrefix)](#Main.getRawStrFromAnanosStr) ⇒ <code>string</code>
    * [.getRawStrFromAnaoshiStr(amountStr, amountPrefix)](#Main.getRawStrFromAnaoshiStr) ⇒ <code>string</code>
    * [.getRawStrFromNanoStr(amountStr, amountPrefix)](#Main.getRawStrFromNanoStr) ⇒ <code>string</code>
    * [.getRawStrFromNanoshiStr(amountStr, amountPrefix)](#Main.getRawStrFromNanoshiStr) ⇒ <code>string</code>

<a name="Main.ANANOS_PREFIX"></a>

### Main.ANANOS\_PREFIX : <code>string</code>
**Kind**: static constant of [<code>Main</code>](#Main)  
<a name="Main.setAnanodeApi"></a>

### Main.setAnanodeApi(_AnanodeApi) ⇒ <code>undefined</code>
Sets the Ananode Api (useful for overriding some methods)

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| _AnanodeApi | <code>string</code> | the new AnanodeApi |

<a name="Main.setAuth"></a>

### Main.setAuth(auth) ⇒ <code>undefined</code>
Sets the Ananode Api Authorization

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| auth | <code>string</code> | the new authorization |

<a name="Main.setAnanodeApiProxy"></a>

### Main.setAnanodeApiProxy(proxy) ⇒ <code>undefined</code>
Sets the Ananode Api Proxy (http pr https proxy)

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| proxy | <code>Object</code> | the new proxy |

<a name="Main.getAnanodeApiProxy"></a>

### Main.getAnanodeApiProxy() ⇒ <code>Object</code>
Gets the Ananode Api Proxy (http pr https proxy)

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>Object</code> - returns the module.  
<a name="Main.setAnanodeApiUrl"></a>

### Main.setAnanodeApiUrl(url) ⇒ <code>undefined</code>
Sets the URL to use for the node behind the Ananode Api

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the new url |

<a name="Main.getRawStrFromAnanosStr"></a>

### Main.getRawStrFromAnanosStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts an amount into a raw amount.

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the amount, as a string. |
| amountPrefix | <code>string</code> | the amount, as a string. |

<a name="Main.getRawStrFromAnaoshiStr"></a>

### Main.getRawStrFromAnaoshiStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts an amount into a raw amount.

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the amount, as a string. |
| amountPrefix | <code>string</code> | the amount, as a string. |

<a name="Main.getRawStrFromNanoStr"></a>

### Main.getRawStrFromNanoStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts an amount into a raw amount.

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the amount, as a string. |
| amountPrefix | <code>string</code> | the amount, as a string. |

<a name="Main.getRawStrFromNanoshiStr"></a>

### Main.getRawStrFromNanoshiStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts an amount into a raw amount.

**Kind**: static method of [<code>Main</code>](#Main)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the amount, as a string. |
| amountPrefix | <code>string</code> | the amount, as a string. |

<a name="CamoUtil"></a>

## CamoUtil : <code>object</code>
**Kind**: global namespace  

* [CamoUtil](#CamoUtil) : <code>object</code>
    * [.camoAnanosReceive(toPrivateKey, fromPublicKey)](#CamoUtil.camoAnanosReceive) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoNanoReceive(toPrivateKey, fromPublicKey)](#CamoUtil.camoNanoReceive) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getCamoAnanosNextPrivateKeyForReceive(seed)](#CamoUtil.getCamoAnanosNextPrivateKeyForReceive) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCamoNanoNextPrivateKeyForReceive(seed)](#CamoUtil.getCamoNanoNextPrivateKeyForReceive) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.camoAnanosSend(fundingPrivateKey, fromCamoPrivateKey, toCamoPublicKey, amountAnanos)](#CamoUtil.camoAnanosSend) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoNanoSend(fundingPrivateKey, fromCamoPrivateKey, toCamoPublicKey, amountAnanos)](#CamoUtil.camoNanoSend) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoAnanosSendWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos)](#CamoUtil.camoAnanosSendWithdrawalFromSeed) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoNanoSendWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos)](#CamoUtil.camoNanoSendWithdrawalFromSeed) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoAnanosGetAccountsPending(seed, seedIx, fromAccount, sharedSeedIx, count)](#CamoUtil.camoAnanosGetAccountsPending) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.camoNanoGetAccountsPending(seed, seedIx, fromAccount, sharedSeedIx, count)](#CamoUtil.camoNanoGetAccountsPending) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getCamoAccountValidationInfo(account)](#CamoUtil.getCamoAccountValidationInfo) ⇒ <code>object</code>
    * [.getCamoAnanosSharedAccountData(seed, seedIx, account, sharedSeedIx)](#CamoUtil.getCamoAnanosSharedAccountData) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCamoNanoSharedAccountData(seed, seedIx, account, sharedSeedIx)](#CamoUtil.getCamoNanoSharedAccountData) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.receiveCamoAnanosDepositsForSeed(seed, seedIx, account, sharedSeedIx, specificPendingBlockHash)](#CamoUtil.receiveCamoAnanosDepositsForSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.receiveCamoNanoDepositsForSeed(seed, seedIx, account, sharedSeedIx, specificPendingBlockHash)](#CamoUtil.receiveCamoNanoDepositsForSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCamoAnanosAccountBalanceRaw(toPrivateKey, fromPublicKey)](#CamoUtil.getCamoAnanosAccountBalanceRaw) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCamoNanoAccountBalanceRaw(toPrivateKey, fromPublicKey)](#CamoUtil.getCamoNanoAccountBalanceRaw) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getCamoPublicKey(privateKey)](#CamoUtil.getCamoPublicKey) ⇒ <code>string</code>
    * [.getSharedSecret(privateKey, publicKey)](#CamoUtil.getSharedSecret) ⇒ <code>string</code>
    * [.getCamoAccount(camoPublicKey)](#CamoUtil.getCamoAccount) ⇒ <code>string</code>
    * [.isCamoAccountValid(camoAccount)](#CamoUtil.isCamoAccountValid) ⇒ <code>boolean</code>

<a name="CamoUtil.camoAnanosReceive"></a>

### CamoUtil.camoAnanosReceive(toPrivateKey, fromPublicKey) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
receives ananos funds at a camo address.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the received hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| toPrivateKey | <code>string</code> | the private key that receives the funds. |
| fromPublicKey | <code>string</code> | the public key that sent the funds. |

<a name="CamoUtil.camoNanoReceive"></a>

### CamoUtil.camoNanoReceive(toPrivateKey, fromPublicKey) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
receives nano funds at a camo address.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the received hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| toPrivateKey | <code>string</code> | the private key that receives the funds. |
| fromPublicKey | <code>string</code> | the public key that sent the funds. |

<a name="CamoUtil.getCamoAnanosNextPrivateKeyForReceive"></a>

### CamoUtil.getCamoAnanosNextPrivateKeyForReceive(seed) ⇒ <code>Promise.&lt;string&gt;</code>
finds a new private key to recieve more ananos funds. the key would have no history.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the private key to use.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |

<a name="CamoUtil.getCamoNanoNextPrivateKeyForReceive"></a>

### CamoUtil.getCamoNanoNextPrivateKeyForReceive(seed) ⇒ <code>Promise.&lt;string&gt;</code>
finds a new private key to recieve more ananos funds. the key would have no history.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the private key to use.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |

<a name="CamoUtil.camoAnanosSend"></a>

### CamoUtil.camoAnanosSend(fundingPrivateKey, fromCamoPrivateKey, toCamoPublicKey, amountAnanos) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
sends ananos funds to a camo address.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the sent hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| fundingPrivateKey | <code>string</code> | the private key that sends the funds. |
| fromCamoPrivateKey | <code>string</code> | the private key used to generate the shared seed. |
| toCamoPublicKey | <code>string</code> | the public key that receives the funds. |
| amountAnanos | <code>string</code> | the amount of ananoss. |

<a name="CamoUtil.camoNanoSend"></a>

### CamoUtil.camoNanoSend(fundingPrivateKey, fromCamoPrivateKey, toCamoPublicKey, amountAnanos) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
sends camo funds to a camo address.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the sent hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| fundingPrivateKey | <code>string</code> | the private key that sends the funds. |
| fromCamoPrivateKey | <code>string</code> | the private key used to generate the shared seed. |
| toCamoPublicKey | <code>string</code> | the public key that receives the funds. |
| amountAnanos | <code>string</code> | the amount of ananoss. |

<a name="CamoUtil.camoAnanosSendWithdrawalFromSeed"></a>

### CamoUtil.camoAnanosSendWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
sends ananos funds to a camo account.
This function uses seed index 0 to generate the shared secret,
and seed index "seedIx" to get the private key that contains funds to send.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the sent hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| toAccount | <code>string</code> | the account to send to. |
| amountAnanos | <code>string</code> | the amount of ananoss. |

<a name="CamoUtil.camoNanoSendWithdrawalFromSeed"></a>

### CamoUtil.camoNanoSendWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
sends nano funds to a camo account.
This function uses seed index 0 to generate the shared secret,
and seed index "seedIx" to get the private key that contains funds to send.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the sent hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| toAccount | <code>string</code> | the account to send to. |
| amountAnanos | <code>string</code> | the amount of ananoss. |

<a name="CamoUtil.camoAnanosGetAccountsPending"></a>

### CamoUtil.camoAnanosGetAccountsPending(seed, seedIx, fromAccount, sharedSeedIx, count) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
get the pending blocks for the camo ananos account.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the pending hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| fromAccount | <code>string</code> | the account to recieve from. |
| sharedSeedIx | <code>number</code> | the index to use with the shared seed. |
| count | <code>number</code> | the max count to get. |

<a name="CamoUtil.camoNanoGetAccountsPending"></a>

### CamoUtil.camoNanoGetAccountsPending(seed, seedIx, fromAccount, sharedSeedIx, count) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
get the pending blocks for the camo nano account.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - the pending hashes in an array.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| fromAccount | <code>string</code> | the account to recieve from. |
| sharedSeedIx | <code>number</code> | the index to use with the shared seed. |
| count | <code>number</code> | the max count to get. |

<a name="CamoUtil.getCamoAccountValidationInfo"></a>

### CamoUtil.getCamoAccountValidationInfo(account) ⇒ <code>object</code>
returns data on whether a camo account is valid or not, and why.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>object</code> - the account validity data.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account to check. |

<a name="CamoUtil.getCamoAnanosSharedAccountData"></a>

### CamoUtil.getCamoAnanosSharedAccountData(seed, seedIx, account, sharedSeedIx) ⇒ <code>Promise.&lt;string&gt;</code>
get the ananos shared account, used as an intermediary to send finds between the seed and the camo account.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the shared account.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| account | <code>string</code> | the camo account to send or recieve from. |
| sharedSeedIx | <code>string</code> | the index to use with the shared seed. |

<a name="CamoUtil.getCamoNanoSharedAccountData"></a>

### CamoUtil.getCamoNanoSharedAccountData(seed, seedIx, account, sharedSeedIx) ⇒ <code>Promise.&lt;string&gt;</code>
get the nano shared account, used as an intermediary to send finds between the seed and the camo account.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the shared account.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| account | <code>string</code> | the camo account to send or recieve from. |
| sharedSeedIx | <code>string</code> | the index to use with the shared seed. |

<a name="CamoUtil.receiveCamoAnanosDepositsForSeed"></a>

### CamoUtil.receiveCamoAnanosDepositsForSeed(seed, seedIx, account, sharedSeedIx, specificPendingBlockHash) ⇒ <code>Promise.&lt;string&gt;</code>
Recieve ananos deposits for a camo account with a given seed.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the response from receiving the block.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| account | <code>string</code> | the camo account to send or recieve from. |
| sharedSeedIx | <code>string</code> | the index to use with the shared seed. |
| specificPendingBlockHash | <code>string</code> | the pending block to recieve. |

<a name="CamoUtil.receiveCamoNanoDepositsForSeed"></a>

### CamoUtil.receiveCamoNanoDepositsForSeed(seed, seedIx, account, sharedSeedIx, specificPendingBlockHash) ⇒ <code>Promise.&lt;string&gt;</code>
Recieve nano deposits for a camo account with a given seed.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the response from receiving the block.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| account | <code>string</code> | the camo account to send or recieve from. |
| sharedSeedIx | <code>string</code> | the index to use with the shared seed. |
| specificPendingBlockHash | <code>string</code> | the pending block to recieve. |

<a name="CamoUtil.getCamoAnanosAccountBalanceRaw"></a>

### CamoUtil.getCamoAnanosAccountBalanceRaw(toPrivateKey, fromPublicKey) ⇒ <code>Promise.&lt;string&gt;</code>
gets the total ananos account balance, in raw.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the account balance, in raw.  

| Param | Type | Description |
| --- | --- | --- |
| toPrivateKey | <code>string</code> | the private key that receives the funds. |
| fromPublicKey | <code>string</code> | the public key that sent the funds. |

<a name="CamoUtil.getCamoNanoAccountBalanceRaw"></a>

### CamoUtil.getCamoNanoAccountBalanceRaw(toPrivateKey, fromPublicKey) ⇒ <code>Promise.&lt;string&gt;</code>
gets the total nano account balance, in raw.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the account balance, in raw.  

| Param | Type | Description |
| --- | --- | --- |
| toPrivateKey | <code>string</code> | the private key that receives the funds. |
| fromPublicKey | <code>string</code> | the public key that sent the funds. |

<a name="CamoUtil.getCamoPublicKey"></a>

### CamoUtil.getCamoPublicKey(privateKey) ⇒ <code>string</code>
Gets the camo public key from a private key.

a normal ananos public key is used in ECDSA.

a camo public key is used in ECDH.

this is why the derivation is different for the two keys.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>string</code> - the camo public key.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key. |

<a name="CamoUtil.getSharedSecret"></a>

### CamoUtil.getSharedSecret(privateKey, publicKey) ⇒ <code>string</code>
Gets the shared secret from a camo public key and a private key.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>string</code> - the shared secret.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key. |
| publicKey | <code>string</code> | the public key. |

<a name="CamoUtil.getCamoAccount"></a>

### CamoUtil.getCamoAccount(camoPublicKey) ⇒ <code>string</code>
Get the camo account for a given camo public key.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>string</code> - the camo account.  

| Param | Type | Description |
| --- | --- | --- |
| camoPublicKey | <code>string</code> | the camo public key. |

<a name="CamoUtil.isCamoAccountValid"></a>

### CamoUtil.isCamoAccountValid(camoAccount) ⇒ <code>boolean</code>
checks if a camo account is valid.

**Kind**: static method of [<code>CamoUtil</code>](#CamoUtil)  
**Returns**: <code>boolean</code> - true if the camo account is valid.  

| Param | Type | Description |
| --- | --- | --- |
| camoAccount | <code>string</code> | the camo account. |

<a name="AnanosUtil"></a>

## AnanosUtil : <code>object</code>
**Kind**: global namespace  

* [AnanosUtil](#AnanosUtil) : <code>object</code>
    * [.getAnanosPartsFromDecimal(decimalAmount)](#AnanosUtil.getAnanosPartsFromDecimal) ⇒ [<code>ananosParts</code>](#ananosParts)
    * [.getAnanosPartsAsDecimal(ananosParts)](#AnanosUtil.getAnanosPartsAsDecimal) ⇒ <code>string</code>
    * [.getAnanosDecimalAmountAsRaw(amount)](#AnanosUtil.getAnanosDecimalAmountAsRaw) ⇒ <code>string</code>
    * [.getananosPartsDescription(ananosParts)](#AnanosUtil.getananosPartsDescription) ⇒ <code>string</code>
    * [.sendAmountToAnanosAccountWithRepresentativeAndPrevious(seed, seedIx, destAccount, amountRaw, representative, previousHash)](#AnanosUtil.sendAmountToAnanosAccountWithRepresentativeAndPrevious) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendAmountToNanoAccountWithRepresentativeAndPrevious(seed, seedIx, destAccount, amountRaw, representative, previousHash)](#AnanosUtil.sendAmountToNanoAccountWithRepresentativeAndPrevious) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendAmountToAnanosAccount(seed, seedIx, destAccount, amountRaw, successCallback, failureCallback)](#AnanosUtil.sendAmountToAnanosAccount) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendAmountToNanoAccount(seed, seedIx, destAccount, amountRaw, successCallback, failureCallback)](#AnanosUtil.sendAmountToNanoAccount) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.changeAnanosRepresentativeForSeed(seed, seedIx, representative)](#AnanosUtil.changeAnanosRepresentativeForSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.changeNanoRepresentativeForSeed(seed, seedIx, representative)](#AnanosUtil.changeNanoRepresentativeForSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getAnanosAccountFromSeed(seed, seedIx)](#AnanosUtil.getAnanosAccountFromSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getNanoAccountFromSeed(seed, seedIx)](#AnanosUtil.getNanoAccountFromSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.openAnanosAccountFromSeed(seed, seedIx, representative, pendingBlockHash, pendingValueRaw)](#AnanosUtil.openAnanosAccountFromSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.openNanoAccountFromSeed(seed, seedIx, representative, pendingBlockHash, pendingValueRaw)](#AnanosUtil.openNanoAccountFromSeed) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getBlockHash(block)](#AnanosUtil.getBlockHash) ⇒ <code>string</code>
    * [.signMessage(privateKeyOrSigner, message)](#AnanosUtil.signMessage) ⇒ <code>string</code>
    * [.hashMessageToBytes(message)](#AnanosUtil.hashMessageToBytes) ⇒ <code>Uint8Array</code>
    * [.messageDummyBlockHashBytes(privateKey, message)](#AnanosUtil.messageDummyBlockHashBytes) ⇒ <code>Uint8Array</code>
    * [.messageDummyBlock(privateKey, message)](#AnanosUtil.messageDummyBlock) ⇒ <code>string</code>
    * [.verifyMessage(publicKey, message, signature)](#AnanosUtil.verifyMessage) ⇒ <code>boolean</code>
    * [.signHash(privateKey, hash)](#AnanosUtil.signHash) ⇒ <code>string</code>
    * [.verify(hash, signature, publicKey)](#AnanosUtil.verify) ⇒ <code>string</code>
    * [.getSignature(privateKey, block)](#AnanosUtil.getSignature) ⇒ <code>string</code>
    * [.getBytesFromHex(hex)](#AnanosUtil.getBytesFromHex) ⇒ <code>Uint8Array</code>
    * [.getHexFromBytes(bytes)](#AnanosUtil.getHexFromBytes) ⇒ <code>string</code>
    * [.getWorkUsingCpu(hash, workBytes)](#AnanosUtil.getWorkUsingCpu) ⇒ <code>string</code>
    * [.getAnanosAccount(publicKey)](#AnanosUtil.getAnanosAccount) ⇒ <code>string</code>
    * [.getNanoAccount(publicKey)](#AnanosUtil.getNanoAccount) ⇒ <code>string</code>
    * [.getAnanosPartsFromRaw(amountRawStr)](#AnanosUtil.getAnanosPartsFromRaw) ⇒ [<code>ananosParts</code>](#ananosParts)
    * [.getNanoPartsFromRaw(amountRawStr)](#AnanosUtil.getNanoPartsFromRaw) ⇒ [<code>ananosParts</code>](#ananosParts)
    * [.getRawStrFromMajorAmountStr(amountStr, amountPrefix)](#AnanosUtil.getRawStrFromMajorAmountStr) ⇒ <code>string</code>
    * [.getRawStrFromMinorAmountStr(amountStr, amountPrefix)](#AnanosUtil.getRawStrFromMinorAmountStr) ⇒ <code>string</code>
    * [.getAmountPartsFromRaw(amountRawStr, amountPrefix)](#AnanosUtil.getAmountPartsFromRaw) ⇒ [<code>ananosParts</code>](#ananosParts)
    * [.getAccountPublicKey(account)](#AnanosUtil.getAccountPublicKey) ⇒ <code>string</code>
    * [.getAccountSuffix(publicKey)](#AnanosUtil.getAccountSuffix) ⇒ <code>string</code>
    * [.getAccount(publicKey, accountPrefix)](#AnanosUtil.getAccount) ⇒ <code>string</code>
    * [.sign(privateKeyOrSigner, block)](#AnanosUtil.sign) ⇒ <code>string</code>
    * [.getBlake2bHash(bytes, size)](#AnanosUtil.getBlake2bHash) ⇒ <code>Uint8Array</code>
    * [.isWorkValid(hashBytes, workBytes)](#AnanosUtil.isWorkValid) ⇒ <code>boolean</code>
    * [.getZeroedWorkBytes()](#AnanosUtil.getZeroedWorkBytes) ⇒ <code>Uint8Array</code>
    * [.getPublicKey(privateKeyOrSigner)](#AnanosUtil.getPublicKey) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.isSeedValid(seed, seedIx)](#AnanosUtil.isSeedValid) ⇒ <code>object</code>
    * [.getPrivateKey(seed, seedIx)](#AnanosUtil.getPrivateKey) ⇒ <code>string</code>
    * [.getAnanosAccountValidationInfo(account)](#AnanosUtil.getAnanosAccountValidationInfo) ⇒ [<code>AccountValidationInfo</code>](#AccountValidationInfo)
    * [.getNanoAccountValidationInfo(account)](#AnanosUtil.getNanoAccountValidationInfo) ⇒ [<code>AccountValidationInfo</code>](#AccountValidationInfo)

<a name="AnanosUtil.getAnanosPartsFromDecimal"></a>

### AnanosUtil.getAnanosPartsFromDecimal(decimalAmount) ⇒ [<code>ananosParts</code>](#ananosParts)
converts amount from decimal to ananosParts.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>ananosParts</code>](#ananosParts) - returns the ananos parts of the decimal amount.  

| Param | Type | Description |
| --- | --- | --- |
| decimalAmount | <code>string</code> | the decimal amount of ananoss. |

<a name="AnanosUtil.getAnanosPartsAsDecimal"></a>

### AnanosUtil.getAnanosPartsAsDecimal(ananosParts) ⇒ <code>string</code>
converts amount from ananosParts to decimal.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - returns the decimal amount of ananoss.  

| Param | Type | Description |
| --- | --- | --- |
| ananosParts | [<code>ananosParts</code>](#ananosParts) | the ananos parts to describe. |

<a name="AnanosUtil.getAnanosDecimalAmountAsRaw"></a>

### AnanosUtil.getAnanosDecimalAmountAsRaw(amount) ⇒ <code>string</code>
converts amount from decimal to raw.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - returns amount in raw.  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>string</code> | the decimal amount. |

<a name="AnanosUtil.getananosPartsDescription"></a>

### AnanosUtil.getananosPartsDescription(ananosParts) ⇒ <code>string</code>
describes the ananos parts in an english description.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - returns the description of the ananos parts.  

| Param | Type | Description |
| --- | --- | --- |
| ananosParts | [<code>ananosParts</code>](#ananosParts) | the ananos parts to describe. |

<a name="AnanosUtil.sendAmountToAnanosAccountWithRepresentativeAndPrevious"></a>

### AnanosUtil.sendAmountToAnanosAccountWithRepresentativeAndPrevious(seed, seedIx, destAccount, amountRaw, representative, previousHash) ⇒ <code>Promise.&lt;string&gt;</code>
Sends the amount to the account with an optional representative and
previous block hash.
If the representative is not sent, it will be pulled from the api.
If the previous is not sent, it will be pulled from the api.
Be very careful with previous, as setting it incorrectly
can cause an incorrect amount of funds to be sent.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the send.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| destAccount | <code>string</code> | the destination account. |
| amountRaw | <code>string</code> | the amount to send, in raw. |
| representative | <code>string</code> | the representative (optional). |
| previousHash | <code>string</code> | the previous hash (optional). |

<a name="AnanosUtil.sendAmountToNanoAccountWithRepresentativeAndPrevious"></a>

### AnanosUtil.sendAmountToNanoAccountWithRepresentativeAndPrevious(seed, seedIx, destAccount, amountRaw, representative, previousHash) ⇒ <code>Promise.&lt;string&gt;</code>
Sends the amount to the account with an optional representative and
previous block hash.
If the representative is not sent, it will be pulled from the api.
If the previous is not sent, it will be pulled from the api.
Be very careful with previous, as setting it incorrectly
can cause an incorrect amount of funds to be sent.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the send.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| destAccount | <code>string</code> | the destination account. |
| amountRaw | <code>string</code> | the amount to send, in raw. |
| representative | <code>string</code> | the representative (optional). |
| previousHash | <code>string</code> | the previous hash (optional). |

<a name="AnanosUtil.sendAmountToAnanosAccount"></a>

### AnanosUtil.sendAmountToAnanosAccount(seed, seedIx, destAccount, amountRaw, successCallback, failureCallback) ⇒ <code>Promise.&lt;string&gt;</code>
Sends the amount to the ananos account with a callback for success and failure.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the send.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| destAccount | <code>string</code> | the destination account. |
| amountRaw | <code>string</code> | the amount to send, in raw. |
| successCallback | <code>string</code> | the callback to call upon success. |
| failureCallback | <code>string</code> | the callback to call upon failure. |

<a name="AnanosUtil.sendAmountToNanoAccount"></a>

### AnanosUtil.sendAmountToNanoAccount(seed, seedIx, destAccount, amountRaw, successCallback, failureCallback) ⇒ <code>Promise.&lt;string&gt;</code>
Sends the amount to the nano account with a callback for success and failure.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the send.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| destAccount | <code>string</code> | the destination account. |
| amountRaw | <code>string</code> | the amount to send, in raw. |
| successCallback | <code>string</code> | the callback to call upon success. |
| failureCallback | <code>string</code> | the callback to call upon failure. |

<a name="AnanosUtil.changeAnanosRepresentativeForSeed"></a>

### AnanosUtil.changeAnanosRepresentativeForSeed(seed, seedIx, representative) ⇒ <code>Promise.&lt;string&gt;</code>
Sets the rep for an account with a given seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the change.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |

<a name="AnanosUtil.changeNanoRepresentativeForSeed"></a>

### AnanosUtil.changeNanoRepresentativeForSeed(seed, seedIx, representative) ⇒ <code>Promise.&lt;string&gt;</code>
Sets the rep for an account with a given seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the change.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |

<a name="AnanosUtil.getAnanosAccountFromSeed"></a>

### AnanosUtil.getAnanosAccountFromSeed(seed, seedIx) ⇒ <code>Promise.&lt;string&gt;</code>
Get the ananos account with a given seed and index.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the account.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |

<a name="AnanosUtil.getNanoAccountFromSeed"></a>

### AnanosUtil.getNanoAccountFromSeed(seed, seedIx) ⇒ <code>Promise.&lt;string&gt;</code>
Get the ananos account with a given seed and index.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the account.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |

<a name="AnanosUtil.openAnanosAccountFromSeed"></a>

### AnanosUtil.openAnanosAccountFromSeed(seed, seedIx, representative, pendingBlockHash, pendingValueRaw) ⇒ <code>Promise.&lt;string&gt;</code>
Open a ananos account with a given seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the open.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |
| pendingBlockHash | <code>string</code> | the pending block hash. |
| pendingValueRaw | <code>string</code> | the pending block hash. |

<a name="AnanosUtil.openNanoAccountFromSeed"></a>

### AnanosUtil.openNanoAccountFromSeed(seed, seedIx, representative, pendingBlockHash, pendingValueRaw) ⇒ <code>Promise.&lt;string&gt;</code>
Open a nano account with a given seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - returns the hash returned by the open.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |
| pendingBlockHash | <code>string</code> | the pending block hash. |
| pendingValueRaw | <code>string</code> | the pending block hash. |

<a name="AnanosUtil.getBlockHash"></a>

### AnanosUtil.getBlockHash(block) ⇒ <code>string</code>
Get the hash for a given block.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the block's hash.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>string</code> | the seed to use to find the account. |

<a name="AnanosUtil.signMessage"></a>

### AnanosUtil.signMessage(privateKeyOrSigner, message) ⇒ <code>string</code>
signs a dummy block with a hash of the utf-8 message using private key.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the message's signature.  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyOrSigner | <code>string</code> | the private key to use to sign. |
| message | <code>string</code> | the utf-8 message to sign. |

<a name="AnanosUtil.hashMessageToBytes"></a>

### AnanosUtil.hashMessageToBytes(message) ⇒ <code>Uint8Array</code>
signs a utf-8 message with private key. Only used internally and for testing.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Uint8Array</code> - hashed message's bytes.  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | the utf-8 message to sign. |

<a name="AnanosUtil.messageDummyBlockHashBytes"></a>

### AnanosUtil.messageDummyBlockHashBytes(privateKey, message) ⇒ <code>Uint8Array</code>
generates a dummy block hash that is used for message signing.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Uint8Array</code> - hashed dummy block's bytes.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key to use to sign. |
| message | <code>string</code> | the utf-8 message to sign. |

<a name="AnanosUtil.messageDummyBlock"></a>

### AnanosUtil.messageDummyBlock(privateKey, message) ⇒ <code>string</code>
generates a dummy block that is used for message signing.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the message's block.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key to use to sign. |
| message | <code>string</code> | the utf-8 message to sign. |

<a name="AnanosUtil.verifyMessage"></a>

### AnanosUtil.verifyMessage(publicKey, message, signature) ⇒ <code>boolean</code>
verifies a utf-8 message with public key from a dummy block signature.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>boolean</code> - whether the signature was verified.  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | the public key to use to sign. |
| message | <code>string</code> | the utf-8 message to verify. |
| signature | <code>string</code> | hex of signature. |

<a name="AnanosUtil.signHash"></a>

### AnanosUtil.signHash(privateKey, hash) ⇒ <code>string</code>
signs a hash.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the block's hash.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key to use to sign. |
| hash | <code>string</code> | the hash to sign. |

<a name="AnanosUtil.verify"></a>

### AnanosUtil.verify(hash, signature, publicKey) ⇒ <code>string</code>
verifys a hash.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - true if verification passed.  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | the hash to verify. |
| signature | <code>string</code> | the signature to verify. |
| publicKey | <code>string</code> | the public key to use to sign. |

<a name="AnanosUtil.getSignature"></a>

### AnanosUtil.getSignature(privateKey, block) ⇒ <code>string</code>
Get the signature for a given block (gets the hash of the block, and signs the hash).

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the block's signature.  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | the private key used to sign the block. |
| block | <code>string</code> | the block to sign. |

<a name="AnanosUtil.getBytesFromHex"></a>

### AnanosUtil.getBytesFromHex(hex) ⇒ <code>Uint8Array</code>
Converts a hex string to bytes in a Uint8Array.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Uint8Array</code> - the bytes in a Uint8Array.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | the hex string to use. |

<a name="AnanosUtil.getHexFromBytes"></a>

### AnanosUtil.getHexFromBytes(bytes) ⇒ <code>string</code>
Converts bytes in a Uint8Array to a hex string.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the hex string.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | the bytes to use. |

<a name="AnanosUtil.getWorkUsingCpu"></a>

### AnanosUtil.getWorkUsingCpu(hash, workBytes) ⇒ <code>string</code>
gets work bytes using the CPU.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the work bytes as a hex string.  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | the hash to use to calculate work bytes. |
| workBytes | <code>Uint8Array</code> | the Uint8Array(8) used to store temporary calculations. |

<a name="AnanosUtil.getAnanosAccount"></a>

### AnanosUtil.getAnanosAccount(publicKey) ⇒ <code>string</code>
Get the ananos account for a given public key.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the account.  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | the public key. |

<a name="AnanosUtil.getNanoAccount"></a>

### AnanosUtil.getNanoAccount(publicKey) ⇒ <code>string</code>
Get the ananos account for a given public key.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the account.  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | the public key. |

<a name="AnanosUtil.getAnanosPartsFromRaw"></a>

### AnanosUtil.getAnanosPartsFromRaw(amountRawStr) ⇒ [<code>ananosParts</code>](#ananosParts)
Get the ananos parts (ananos, anaoshi, raw) for a given raw value.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>ananosParts</code>](#ananosParts) - the ananos parts.  

| Param | Type | Description |
| --- | --- | --- |
| amountRawStr | <code>string</code> | the raw amount, as a string. |

<a name="AnanosUtil.getNanoPartsFromRaw"></a>

### AnanosUtil.getNanoPartsFromRaw(amountRawStr) ⇒ [<code>ananosParts</code>](#ananosParts)
Get the nano parts nano, nanoshi, raw) for a given raw value.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>ananosParts</code>](#ananosParts) - the ananos parts.  

| Param | Type | Description |
| --- | --- | --- |
| amountRawStr | <code>string</code> | the raw amount, as a string. |

<a name="AnanosUtil.getRawStrFromMajorAmountStr"></a>

### AnanosUtil.getRawStrFromMajorAmountStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts an amount into a raw amount.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the amount, as a string. |
| amountPrefix | <code>string</code> | the amount, as a string. |

<a name="AnanosUtil.getRawStrFromMinorAmountStr"></a>

### AnanosUtil.getRawStrFromMinorAmountStr(amountStr, amountPrefix) ⇒ <code>string</code>
Converts a anaoshi amount into a raw amount.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the ananos as a raw value.  

| Param | Type | Description |
| --- | --- | --- |
| amountStr | <code>string</code> | the anaoshi, as a string. |
| amountPrefix | <code>string</code> | the amount prefix, as a string. |

<a name="AnanosUtil.getAmountPartsFromRaw"></a>

### AnanosUtil.getAmountPartsFromRaw(amountRawStr, amountPrefix) ⇒ [<code>ananosParts</code>](#ananosParts)
Get the ananos parts (ananos, anaoshi, raw) for a given raw value.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>ananosParts</code>](#ananosParts) - the ananos parts.  

| Param | Type | Description |
| --- | --- | --- |
| amountRawStr | <code>string</code> | the raw amount, as a string. |
| amountPrefix | <code>string</code> | the amount prefix, as a string. |

<a name="AnanosUtil.getAccountPublicKey"></a>

### AnanosUtil.getAccountPublicKey(account) ⇒ <code>string</code>
Get the public key for a given account.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the public key.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account. |

<a name="AnanosUtil.getAccountSuffix"></a>

### AnanosUtil.getAccountSuffix(publicKey) ⇒ <code>string</code>
Get the account suffix for a given public key (everything but ana_ or camo_ or nano_).

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the account suffix.  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | the public key. |

<a name="AnanosUtil.getAccount"></a>

### AnanosUtil.getAccount(publicKey, accountPrefix) ⇒ <code>string</code>
Get the account for a given public key.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the account.  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | the public key. |
| accountPrefix | <code>string</code> | the prefix. ana_ or nano_. |

<a name="AnanosUtil.sign"></a>

### AnanosUtil.sign(privateKeyOrSigner, block) ⇒ <code>string</code>
signs a block and returns the signature.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the signature  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyOrSigner | <code>string</code> | the private key to use to sign or signer object (ledger). |
| block | [<code>Block</code>](#Block) | block to sign |

<a name="AnanosUtil.getBlake2bHash"></a>

### AnanosUtil.getBlake2bHash(bytes, size) ⇒ <code>Uint8Array</code>
returns true if the work (in bytes) for the hash (in bytes) is valid.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Uint8Array</code> - the bytes of the hash.  

| Param | Type | Description |
| --- | --- | --- |
| bytes | <code>Uint8Array</code> | the bytes to hash. |
| size | <code>Object</code> | the digest size |

<a name="AnanosUtil.isWorkValid"></a>

### AnanosUtil.isWorkValid(hashBytes, workBytes) ⇒ <code>boolean</code>
returns true if the work (in bytes) for the hash (in bytes) is valid.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>boolean</code> - true if the work is valid for the hash.  

| Param | Type | Description |
| --- | --- | --- |
| hashBytes | <code>string</code> | the hash bytes to check. |
| workBytes | <code>Uint8Array</code> | the work bytes to check. |

<a name="AnanosUtil.getZeroedWorkBytes"></a>

### AnanosUtil.getZeroedWorkBytes() ⇒ <code>Uint8Array</code>
creates a new Uint8Array(8) to calculate work bytes.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Uint8Array</code> - the bytes in a Uint8Array.  
<a name="AnanosUtil.getPublicKey"></a>

### AnanosUtil.getPublicKey(privateKeyOrSigner) ⇒ <code>Promise.&lt;string&gt;</code>
Get the public key for a given private key.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the public key.  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyOrSigner | <code>string</code> | the private key or signer object (ledger). |

<a name="AnanosUtil.isSeedValid"></a>

### AnanosUtil.isSeedValid(seed, seedIx) ⇒ <code>object</code>
validates a seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>object</code> - {valid:[true/false] message:[if false, why]}.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to validate. |
| seedIx | <code>string</code> | the index to use with the seed. |

<a name="AnanosUtil.getPrivateKey"></a>

### AnanosUtil.getPrivateKey(seed, seedIx) ⇒ <code>string</code>
Get the private key for a given seed.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: <code>string</code> - the private key.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>number</code> | the index to use with the seed. |

<a name="AnanosUtil.getAnanosAccountValidationInfo"></a>

### AnanosUtil.getAnanosAccountValidationInfo(account) ⇒ [<code>AccountValidationInfo</code>](#AccountValidationInfo)
Returns an object saying if the ananos account is valid or not.
If the account is not valid, the message describes why it is not valid.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>AccountValidationInfo</code>](#AccountValidationInfo) - an object saying if the account is valid, and why.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account. |

<a name="AnanosUtil.getNanoAccountValidationInfo"></a>

### AnanosUtil.getNanoAccountValidationInfo(account) ⇒ [<code>AccountValidationInfo</code>](#AccountValidationInfo)
Returns an object saying if the nano account is valid or not.
If the account is not valid, the message describes why it is not valid.

**Kind**: static method of [<code>AnanosUtil</code>](#AnanosUtil)  
**Returns**: [<code>AccountValidationInfo</code>](#AccountValidationInfo) - an object saying if the account is valid, and why.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account. |

<a name="WithdrawUtil"></a>

## WithdrawUtil : <code>object</code>
**Kind**: global namespace  

* [WithdrawUtil](#WithdrawUtil) : <code>object</code>
    * [.sendAnanosWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos, representative, previous)](#WithdrawUtil.sendAnanosWithdrawalFromSeed) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.sendNanoWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos, representative, previous)](#WithdrawUtil.sendNanoWithdrawalFromSeed) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="WithdrawUtil.sendAnanosWithdrawalFromSeed"></a>

### WithdrawUtil.sendAnanosWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos, representative, previous) ⇒ <code>Promise.&lt;object&gt;</code>
Send a withdrawal from a ananos account with a given seed.

**Kind**: static method of [<code>WithdrawUtil</code>](#WithdrawUtil)  
**Returns**: <code>Promise.&lt;object&gt;</code> - returns the response returned by the withdraw.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| toAccount | <code>string</code> | the account to send to. |
| amountAnanos | <code>string</code> | the amount of ananoss. |
| representative | <code>string</code> | the new representative (optional). |
| previous | <code>string</code> | the new previous (optional). |

<a name="WithdrawUtil.sendNanoWithdrawalFromSeed"></a>

### WithdrawUtil.sendNanoWithdrawalFromSeed(seed, seedIx, toAccount, amountAnanos, representative, previous) ⇒ <code>Promise.&lt;object&gt;</code>
Send a withdrawal from a nano account with a given seed.

**Kind**: static method of [<code>WithdrawUtil</code>](#WithdrawUtil)  
**Returns**: <code>Promise.&lt;object&gt;</code> - returns the response returned by the withdraw.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| toAccount | <code>string</code> | the account to send to. |
| amountAnanos | <code>string</code> | the amount of ananoss. |
| representative | <code>string</code> | the new representative (optional). |
| previous | <code>string</code> | the new previous (optional). |

<a name="DepositUtil"></a>

## DepositUtil : <code>object</code>
**Kind**: global namespace  

* [DepositUtil](#DepositUtil) : <code>object</code>
    * [.receiveNanoDepositsForSeed(seed, seedIx, representative, specificPendingBlockHash)](#DepositUtil.receiveNanoDepositsForSeed) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.receiveAnanosDepositsForSeed(seed, seedIx, representative, specificPendingBlockHash)](#DepositUtil.receiveAnanosDepositsForSeed) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="DepositUtil.receiveNanoDepositsForSeed"></a>

### DepositUtil.receiveNanoDepositsForSeed(seed, seedIx, representative, specificPendingBlockHash) ⇒ <code>Promise.&lt;object&gt;</code>
Recieve deposits for a nano account with a given seed.

**Kind**: static method of [<code>DepositUtil</code>](#DepositUtil)  
**Returns**: <code>Promise.&lt;object&gt;</code> - returns the response returned by the receive.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |
| specificPendingBlockHash | <code>string</code> | a specific block hash to receive (optional). |

<a name="DepositUtil.receiveAnanosDepositsForSeed"></a>

### DepositUtil.receiveAnanosDepositsForSeed(seed, seedIx, representative, specificPendingBlockHash) ⇒ <code>Promise.&lt;object&gt;</code>
Recieve deposits for a ananos account with a given seed.

**Kind**: static method of [<code>DepositUtil</code>](#DepositUtil)  
**Returns**: <code>Promise.&lt;object&gt;</code> - returns the response returned by the receive.  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>string</code> | the seed to use to find the account. |
| seedIx | <code>string</code> | the index to use with the seed. |
| representative | <code>string</code> | the representative. |
| specificPendingBlockHash | <code>string</code> | a specific block hash to receive (optional). |

<a name="AnanodeApi"></a>

## AnanodeApi : <code>object</code>
**Kind**: global namespace  

* [AnanodeApi](#AnanodeApi) : <code>object</code>
    * [.getAccountBalanceRaw(account)](#AnanodeApi.getAccountBalanceRaw) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getAccountBalanceAndPendingRaw(account)](#AnanodeApi.getAccountBalanceAndPendingRaw) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getAccountsBalances(accounts)](#AnanodeApi.getAccountsBalances) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getAccountHistory(account, count, head, raw)](#AnanodeApi.getAccountHistory) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getAccountInfo(account, representativeFlag)](#AnanodeApi.getAccountInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getBlockCount()](#AnanodeApi.getBlockCount) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.setUseRateLimit(flag)](#AnanodeApi.setUseRateLimit) ⇒ <code>undefined</code>
    * [.getAccountsPending(accounts, count, source)](#AnanodeApi.getAccountsPending) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.setAuth(authString)](#AnanodeApi.setAuth) ⇒ <code>undefined</code>

<a name="AnanodeApi.getAccountBalanceRaw"></a>

### AnanodeApi.getAccountBalanceRaw(account) ⇒ <code>Promise.&lt;string&gt;</code>
Get the balance, in raw, for an account.

(use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)

Calls [https://docs.nano.org/commands/rpc-protocol/#accounts_balances](https://docs.nano.org/commands/rpc-protocol/#accounts_balances)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;string&gt;</code> - the account's balance, in raw.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account to use. |

<a name="AnanodeApi.getAccountBalanceAndPendingRaw"></a>

### AnanodeApi.getAccountBalanceAndPendingRaw(account) ⇒ <code>Promise.&lt;object&gt;</code>
Get the balance and pending values, in raw, as an object like this one:
{ balance: '123', pending: '123' } for an account.

(use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)

Calls [https://docs.nano.org/commands/rpc-protocol/#accounts_balances](https://docs.nano.org/commands/rpc-protocol/#accounts_balances)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the account's balances, in raw.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account to use. |

<a name="AnanodeApi.getAccountsBalances"></a>

### AnanodeApi.getAccountsBalances(accounts) ⇒ <code>Promise.&lt;object&gt;</code>
Get the balances and pending values, in raw, as an object for all given account. Returns the Node object without transformation.

(use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)

Calls [https://docs.nano.org/commands/rpc-protocol/#accounts_balances](https://docs.nano.org/commands/rpc-protocol/#accounts_balances)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the account's balances, in raw.  

| Param | Type | Description |
| --- | --- | --- |
| accounts | <code>Array.&lt;string&gt;</code> | the account to use. |

<a name="AnanodeApi.getAccountHistory"></a>

### AnanodeApi.getAccountHistory(account, count, head, raw) ⇒ <code>Promise.&lt;object&gt;</code>
Get the history for an account.

Calls [https://docs.nano.org/commands/rpc-protocol/#account_history](https://docs.nano.org/commands/rpc-protocol/#account_history)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the account's history.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account to use. |
| count | <code>number</code> | the count to use (use -1 for all). |
| head | <code>string</code> | the head to start at (optional). |
| raw | <code>string</code> | if true, return raw history (optional). |

<a name="AnanodeApi.getAccountInfo"></a>

### AnanodeApi.getAccountInfo(account, representativeFlag) ⇒ <code>Promise.&lt;object&gt;</code>
Get the account info for an account.

Calls [https://docs.nano.org/commands/rpc-protocol/#account_info](https://docs.nano.org/commands/rpc-protocol/#account_info)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the account's info.  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | the account to use. |
| representativeFlag | <code>boolean</code> | the representativeFlag to use (optional). |

<a name="AnanodeApi.getBlockCount"></a>

### AnanodeApi.getBlockCount() ⇒ <code>Promise.&lt;object&gt;</code>
Get the network block count.

Calls [https://docs.nano.org/commands/rpc-protocol/#block_count](https://docs.nano.org/commands/rpc-protocol/#block_count)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the block count.  
<a name="AnanodeApi.setUseRateLimit"></a>

### AnanodeApi.setUseRateLimit(flag) ⇒ <code>undefined</code>
Enables rate limiting, which looks for the rate limiting headers in the response.

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>string</code> | the flag to use. |

<a name="AnanodeApi.getAccountsPending"></a>

### AnanodeApi.getAccountsPending(accounts, count, source) ⇒ <code>Promise.&lt;object&gt;</code>
Get the pending blocks for the account.

Calls [https://docs.nano.org/commands/rpc-protocol/#accounts_pending](https://docs.nano.org/commands/rpc-protocol/#accounts_pending)

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>Promise.&lt;object&gt;</code> - the account's pending blocks.  

| Param | Type | Description |
| --- | --- | --- |
| accounts | <code>Array.&lt;string&gt;</code> | the array of pending accounts. |
| count | <code>number</code> | the max count to get. |
| source | <code>string</code> | if true, get source. |

<a name="AnanodeApi.setAuth"></a>

### AnanodeApi.setAuth(authString) ⇒ <code>undefined</code>
Sets an authorization string (http 'Authorization' header), useful if node requires api key.

**Kind**: static method of [<code>AnanodeApi</code>](#AnanodeApi)  
**Returns**: <code>undefined</code> - returns nothing.  

| Param | Type | Description |
| --- | --- | --- |
| authString | <code>string</code> | api key as a string\ |

<a name="ananosParts"></a>

## ananosParts : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ananos | <code>string</code> | The amount of ananos. |
| anaoshi | <code>string</code> | The amount of anaoshi (not counting whole ananos). |
| raw | <code>string</code> | The amount of raw (not counting whole ananos and whole anaoshi). |

<a name="Block"></a>

## Block : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| type | <code>string</code> | 
| account | <code>string</code> | 
| previous | <code>string</code> | 
| representative | <code>string</code> | 
| balance | <code>string</code> | 
| link | <code>string</code> | 
| signature | <code>string</code> | 
| work? | <code>string</code> | 

<a name="AccountValidationInfo"></a>

## AccountValidationInfo : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message describing why the account is valid or not. |
| valid | <code>boolean</code> | True if account is valid. |

