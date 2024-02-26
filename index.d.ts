declare namespace Main {
    const ANANOS_PREFIX = "ana_";
    /**
     * Sets the Ananode Api (useful for overriding some methods)
     * @param _ananodeApi - the new AnanodeApi
     * @returns returns nothing.
     */
    function setAnanodeApi(_ananodeApi: string): undefined;
    /**
     * Sets the Ananode Api Authorization
     * @param auth - the new authorization
     * @returns returns nothing.
     */
    function setAuth(auth: string): undefined;
    /**
     * Sets the Ananode Api Proxy (http pr https proxy)
     * @param proxy - the new proxy
     * @returns returns nothing.
     */
    function setAnanodeApiProxy(proxy: any): undefined;
    /**
     * Gets the Ananode Api Proxy (http pr https proxy)
     * @returns returns the module.
     */
    function getAnanodeApiProxy(): any;
    /**
     * Sets the URL to use for the node behind the Ananode Api
     * @param url - the new url
     * @returns returns nothing.
     */
    function setAnanodeApiUrl(url: string): undefined;
    /**
     * Converts an amount into a raw amount.
     * @param amountStr - the amount, as a string.
     * @param amountPrefix - the amount, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromAnanosStr(amountStr: string, amountPrefix: string): string;
    /**
     * Converts an amount into a raw amount.
     * @param amountStr - the amount, as a string.
     * @param amountPrefix - the amount, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromAnaoshiStr(amountStr: string, amountPrefix: string): string;
    /**
     * Converts an amount into a raw amount.
     * @param amountStr - the amount, as a string.
     * @param amountPrefix - the amount, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromNanoStr(amountStr: string, amountPrefix: string): string;
    /**
     * Converts an amount into a raw amount.
     * @param amountStr - the amount, as a string.
     * @param amountPrefix - the amount, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromNanoshiStr(amountStr: string, amountPrefix: string): string;
}

declare namespace CamoUtil {
    /**
     * receives ananos funds at a camo address.
     * @param toPrivateKey - the private key that receives the funds.
     * @param fromPublicKey - the public key that sent the funds.
     * @returns the received hashes in an array.
     */
    function camoAnanosReceive(toPrivateKey: string, fromPublicKey: string): Promise<string[]>;
    /**
     * receives nano funds at a camo address.
     * @param toPrivateKey - the private key that receives the funds.
     * @param fromPublicKey - the public key that sent the funds.
     * @returns the received hashes in an array.
     */
    function camoNanoReceive(toPrivateKey: string, fromPublicKey: string): Promise<string[]>;
    /**
     * finds a new private key to recieve more ananos funds. the key would have no history.
     * @param seed - the seed to use to find the account.
     * @returns the private key to use.
     */
    function getCamoAnanosNextPrivateKeyForReceive(seed: string): Promise<string>;
    /**
     * finds a new private key to recieve more ananos funds. the key would have no history.
     * @param seed - the seed to use to find the account.
     * @returns the private key to use.
     */
    function getCamoNanoNextPrivateKeyForReceive(seed: string): Promise<string>;
    /**
     * sends ananos funds to a camo address.
     * @param fundingPrivateKey - the private key that sends the funds.
     * @param fromCamoPrivateKey - the private key used to generate the shared seed.
     * @param toCamoPublicKey - the public key that receives the funds.
     * @param amountAnanos - the amount of ananos.
     * @returns the sent hashes in an array.
     */
    function camoAnanosSend(fundingPrivateKey: string, fromCamoPrivateKey: string, toCamoPublicKey: string, amountAnanos: string): Promise<string[]>;
    /**
     * sends camo funds to a camo address.
     * @param fundingPrivateKey - the private key that sends the funds.
     * @param fromCamoPrivateKey - the private key used to generate the shared seed.
     * @param toCamoPublicKey - the public key that receives the funds.
     * @param amountAnanos - the amount of nano.
     * @returns the sent hashes in an array.
     */
    function camoNanoSend(fundingPrivateKey: string, fromCamoPrivateKey: string, toCamoPublicKey: string, amountAnanos: string): Promise<string[]>;
    /**
     * sends ananos funds to a camo account.
     * This function uses seed index 0 to generate the shared secret,
     * and seed index "seedIx" to get the private key that contains funds to send.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param toAccount - the account to send to.
     * @param amountAnanos - the amount of ananos.
     * @returns the sent hashes in an array.
     */
    function camoAnanosSendWithdrawalFromSeed(seed: string, seedIx: string, toAccount: string, amountAnanos: string): Promise<string[]>;
    /**
     * sends nano funds to a camo account.
     * This function uses seed index 0 to generate the shared secret,
     * and seed index "seedIx" to get the private key that contains funds to send.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param toAccount - the account to send to.
     * @param amountAnanos - the amount of nano.
     * @returns the sent hashes in an array.
     */
    function camoNanoSendWithdrawalFromSeed(seed: string, seedIx: string, toAccount: string, amountAnanos: string): Promise<string[]>;
    /**
     * get the pending blocks for the camo ananos account.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param fromAccount - the account to recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @param count - the max count to get.
     * @returns the pending hashes in an array.
     */
    function camoAnanosGetAccountsPending(seed: string, seedIx: string, fromAccount: string, sharedSeedIx: number, count: number): Promise<string[]>;
    /**
     * get the pending blocks for the camo nano account.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param fromAccount - the account to recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @param count - the max count to get.
     * @returns the pending hashes in an array.
     */
    function camoNanoGetAccountsPending(seed: string, seedIx: string, fromAccount: string, sharedSeedIx: number, count: number): Promise<string[]>;
    /**
     * returns data on whether a camo account is valid or not, and why.
     * @param account - the account to check.
     * @returns the account validity data.
     */
    function getCamoAccountValidationInfo(account: string): any;
    /**
     * get the ananos shared account, used as an intermediary to send finds between the seed and the camo account.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param account - the camo account to send or recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @returns the shared account.
     */
    function getCamoAnanosSharedAccountData(seed: string, seedIx: string, account: string, sharedSeedIx: string): Promise<string>;
    /**
     * get the nano shared account, used as an intermediary to send finds between the seed and the camo account.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param account - the camo account to send or recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @returns the shared account.
     */
    function getCamoNanoSharedAccountData(seed: string, seedIx: string, account: string, sharedSeedIx: string): Promise<string>;
    /**
     * Recieve ananos deposits for a camo account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param account - the camo account to send or recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @param specificPendingBlockHash - the pending block to recieve.
     * @returns the response from receiving the block.
     */
    function receiveCamoAnanosDepositsForSeed(seed: string, seedIx: string, account: string, sharedSeedIx: string, specificPendingBlockHash: string): Promise<string>;
    /**
     * Recieve nano deposits for a camo account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param account - the camo account to send or recieve from.
     * @param sharedSeedIx - the index to use with the shared seed.
     * @param specificPendingBlockHash - the pending block to recieve.
     * @returns the response from receiving the block.
     */
    function receiveCamoNanoDepositsForSeed(seed: string, seedIx: string, account: string, sharedSeedIx: string, specificPendingBlockHash: string): Promise<string>;
    /**
     * gets the total ananos account balance, in raw.
     * @param toPrivateKey - the private key that receives the funds.
     * @param fromPublicKey - the public key that sent the funds.
     * @returns the account balance, in raw.
     */
    function getCamoAnanosAccountBalanceRaw(toPrivateKey: string, fromPublicKey: string): Promise<string>;
    /**
     * gets the total nano account balance, in raw.
     * @param toPrivateKey - the private key that receives the funds.
     * @param fromPublicKey - the public key that sent the funds.
     * @returns the account balance, in raw.
     */
    function getCamoNanoAccountBalanceRaw(toPrivateKey: string, fromPublicKey: string): Promise<string>;
    /**
     * Gets the camo public key from a private key.
     *
     * a normal ananos public key is used in ECDSA.
     *
     * a camo public key is used in ECDH.
     *
     * this is why the derivation is different for the two keys.
     * @param privateKey - the private key.
     * @returns the camo public key.
     */
    function getCamoPublicKey(privateKey: string): string;
    /**
     * Gets the shared secret from a camo public key and a private key.
     * @param privateKey - the private key.
     * @param publicKey - the public key.
     * @returns the shared secret.
     */
    function getSharedSecret(privateKey: string, publicKey: string): string;
    /**
     * Get the camo account for a given camo public key.
     * @param camoPublicKey - the camo public key.
     * @returns the camo account.
     */
    function getCamoAccount(camoPublicKey: string): string;
    /**
     * checks if a camo account is valid.
     * @param camoAccount - the camo account.
     * @returns true if the camo account is valid.
     */
    function isCamoAccountValid(camoAccount: string): boolean;
}

declare namespace AnanosUtil {
    /**
     * converts amount from decimal to ananosParts.
     * @param decimalAmount - the decimal amount of ananos.
     * @returns returns the ananos parts of the decimal amount.
     */
    function getAnanosPartsFromDecimal(decimalAmount: string): AnanosParts;
    /**
     * converts amount from ananosParts to decimal.
     * @param ananosParts - the ananos parts to describe.
     * @returns returns the decimal amount of Ananos.
     */
    function getAnanosPartsAsDecimal(ananosParts: AnanosParts): string;
    /**
     * converts amount from decimal to raw.
     * @param amount - the decimal amount.
     * @returns returns amount in raw.
     */
    function getAnanosDecimalAmountAsRaw(amount: string): string;
    /**
     * describes the ananos parts in an english description.
     * @param ananosParts - the ananos parts to describe.
     * @returns returns the description of the ananos parts.
     */
    function getAnanosPartsDescription(ananosParts: AnanosParts): string;
    /**
     * Sends the amount to the account with an optional representative and
     * previous block hash.
     * If the representative is not sent, it will be pulled from the api.
     * If the previous is not sent, it will be pulled from the api.
     * Be very careful with previous, as setting it incorrectly
     * can cause an incorrect amount of funds to be sent.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param destAccount - the destination account.
     * @param amountRaw - the amount to send, in raw.
     * @param representative - the representative (optional).
     * @param previousHash - the previous hash (optional).
     * @returns returns the hash returned by the send.
     */
    function sendAmountToAnanosAccountWithRepresentativeAndPrevious(seed: string, seedIx: string, destAccount: string, amountRaw: string, representative: string, previousHash: string): Promise<string>;
    /**
     * Sends the amount to the account with an optional representative and
     * previous block hash.
     * If the representative is not sent, it will be pulled from the api.
     * If the previous is not sent, it will be pulled from the api.
     * Be very careful with previous, as setting it incorrectly
     * can cause an incorrect amount of funds to be sent.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param destAccount - the destination account.
     * @param amountRaw - the amount to send, in raw.
     * @param representative - the representative (optional).
     * @param previousHash - the previous hash (optional).
     * @returns returns the hash returned by the send.
     */
    function sendAmountToNanoAccountWithRepresentativeAndPrevious(seed: string, seedIx: string, destAccount: string, amountRaw: string, representative: string, previousHash: string): Promise<string>;
    /**
     * Sends the amount to the ananos account with a callback for success and failure.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param destAccount - the destination account.
     * @param amountRaw - the amount to send, in raw.
     * @param successCallback - the callback to call upon success.
     * @param failureCallback - the callback to call upon failure.
     * @returns returns the hash returned by the send.
     */
    function sendAmountToAnanosAccount(seed: string, seedIx: string, destAccount: string, amountRaw: string, successCallback: string, failureCallback: string): Promise<string>;
    /**
     * Sends the amount to the nano account with a callback for success and failure.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param destAccount - the destination account.
     * @param amountRaw - the amount to send, in raw.
     * @param successCallback - the callback to call upon success.
     * @param failureCallback - the callback to call upon failure.
     * @returns returns the hash returned by the send.
     */
    function sendAmountToNanoAccount(seed: string, seedIx: string, destAccount: string, amountRaw: string, successCallback: string, failureCallback: string): Promise<string>;
    /**
     * Sets the rep for an account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @returns returns the hash returned by the change.
     */
    function changeAnanosRepresentativeForSeed(seed: string, seedIx: string, representative: string): Promise<string>;
    /**
     * Sets the rep for an account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @returns returns the hash returned by the change.
     */
    function changeNanoRepresentativeForSeed(seed: string, seedIx: string, representative: string): Promise<string>;
    /**
     * Get the ananos account with a given seed and index.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @returns the account.
     */
    function getAnanosAccountFromSeed(seed: string, seedIx: string): Promise<string>;
    /**
     * Get the ananos account with a given seed and index.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @returns the account.
     */
    function getNanoAccountFromSeed(seed: string, seedIx: string): Promise<string>;
    /**
     * Open a ananos account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @param pendingBlockHash - the pending block hash.
     * @param pendingValueRaw - the pending block hash.
     * @returns returns the hash returned by the open.
     */
    function openAnanosAccountFromSeed(seed: string, seedIx: string, representative: string, pendingBlockHash: string, pendingValueRaw: string): Promise<string>;
    /**
     * Open a nano account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @param pendingBlockHash - the pending block hash.
     * @param pendingValueRaw - the pending block hash.
     * @returns returns the hash returned by the open.
     */
    function openNanoAccountFromSeed(seed: string, seedIx: string, representative: string, pendingBlockHash: string, pendingValueRaw: string): Promise<string>;
    /**
     * Get the hash for a given block.
     * @param block - the seed to use to find the account.
     * @returns the block's hash.
     */
    function getBlockHash(block: string): string;
    /**
     * signs a dummy block with a hash of the utf-8 message using private key.
     * @param privateKeyOrSigner - the private key to use to sign.
     * @param message - the utf-8 message to sign.
     * @returns the message's signature.
     */
    function signMessage(privateKeyOrSigner: string, message: string): string;
    /**
     * signs a utf-8 message with private key. Only used internally and for testing.
     * @param message - the utf-8 message to sign.
     * @returns hashed message's bytes.
     */
    function hashMessageToBytes(message: string): Uint8Array;
    /**
     * generates a dummy block hash that is used for message signing.
     * @param privateKey - the private key to use to sign.
     * @param message - the utf-8 message to sign.
     * @returns hashed dummy block's bytes.
     */
    function messageDummyBlockHashBytes(privateKey: string, message: string): Uint8Array;
    /**
     * generates a dummy block that is used for message signing.
     * @param privateKey - the private key to use to sign.
     * @param message - the utf-8 message to sign.
     * @returns the message's block.
     */
    function messageDummyBlock(privateKey: string, message: string): string;
    /**
     * verifies a utf-8 message with public key from a dummy block signature.
     * @param publicKey - the public key to use to sign.
     * @param message - the utf-8 message to verify.
     * @param signature - hex of signature.
     * @returns whether the signature was verified.
     */
    function verifyMessage(publicKey: string, message: string, signature: string): boolean;
    /**
     * signs a hash.
     * @param privateKey - the private key to use to sign.
     * @param hash - the hash to sign.
     * @returns the block's hash.
     */
    function signHash(privateKey: string, hash: string): string;
    /**
     * verifys a hash.
     * @param hash - the hash to verify.
     * @param signature - the signature to verify.
     * @param publicKey - the public key to use to sign.
     * @returns true if verification passed.
     */
    function verify(hash: string, signature: string, publicKey: string): string;
    /**
     * Get the signature for a given block (gets the hash of the block, and signs the hash).
     * @param privateKey - the private key used to sign the block.
     * @param block - the block to sign.
     * @returns the block's signature.
     */
    function getSignature(privateKey: string, block: string): string;
    /**
     * Converts a hex string to bytes in a Uint8Array.
     * @param hex - the hex string to use.
     * @returns the bytes in a Uint8Array.
     */
    function getBytesFromHex(hex: string): Uint8Array;
    /**
     * Converts bytes in a Uint8Array to a hex string.
     * @param bytes - the bytes to use.
     * @returns the hex string.
     */
    function getHexFromBytes(bytes: Uint8Array): string;
    /**
     * gets work bytes using the CPU.
     * @param hash - the hash to use to calculate work bytes.
     * @param workBytes - the Uint8Array(8) used to store temporary calculations.
     * @returns the work bytes as a hex string.
     */
    function getWorkUsingCpu(hash: string, workBytes: Uint8Array): string;
    /**
     * Get the ananos account for a given public key.
     * @param publicKey - the public key.
     * @returns the account.
     */
    function getAnanosAccount(publicKey: string): string;
    /**
     * Get the ananos account for a given public key.
     * @param publicKey - the public key.
     * @returns the account.
     */
    function getNanoAccount(publicKey: string): string;
    /**
     * Get the ananos parts (Ananos, anaoshi, raw) for a given raw value.
     * @param amountRawStr - the raw amount, as a string.
     * @returns the ananos parts.
     */
    function getAnanosPartsFromRaw(amountRawStr: string): AnanosParts;
    /**
     * Get the nano parts nano, nanoshi, raw) for a given raw value.
     * @param amountRawStr - the raw amount, as a string.
     * @returns the ananos parts.
     */
    function getNanoPartsFromRaw(amountRawStr: string): AnanosParts;
    /**
     * Converts an amount into a raw amount.
     * @param amountStr - the amount, as a string.
     * @param amountPrefix - the amount, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromMajorAmountStr(amountStr: string, amountPrefix: string): string;
    /**
     * Converts a anaoshi amount into a raw amount.
     * @param amountStr - the anaoshi, as a string.
     * @param amountPrefix - the amount prefix, as a string.
     * @returns the ananos as a raw value.
     */
    function getRawStrFromMinorAmountStr(amountStr: string, amountPrefix: string): string;
    /**
     * Get the ananos parts (Ananos, anaoshi, raw) for a given raw value.
     * @param amountRawStr - the raw amount, as a string.
     * @param amountPrefix - the amount prefix, as a string.
     * @returns the ananos parts.
     */
    function getAmountPartsFromRaw(amountRawStr: string, amountPrefix: string): AnanosParts;
    /**
     * Get the public key for a given account.
     * @param account - the account.
     * @returns the public key.
     */
    function getAccountPublicKey(account: string): string;
    /**
     * Get the account suffix for a given public key (everything but ana_ or camo_ or nano_).
     * @param publicKey - the public key.
     * @returns the account suffix.
     */
    function getAccountSuffix(publicKey: string): string;
    /**
     * Get the account for a given public key.
     * @param publicKey - the public key.
     * @param accountPrefix - the prefix. ana_ or nano_.
     * @returns the account.
     */
    function getAccount(publicKey: string, accountPrefix: string): string;
    /**
     * signs a block and returns the signature.
     * @param privateKeyOrSigner - the private key to use to sign or signer object (ledger).
     * @param block - block to sign
     * @returns the signature
     */
    function sign(privateKeyOrSigner: string, block: Block): string;
    /**
     * returns true if the work (in bytes) for the hash (in bytes) is valid.
     * @param bytes - the bytes to hash.
     * @param size - the digest size
     * @returns the bytes of the hash.
     */
    function getBlake2bHash(bytes: Uint8Array, size: any): Uint8Array;
    /**
     * returns true if the work (in bytes) for the hash (in bytes) is valid.
     * @param hashBytes - the hash bytes to check.
     * @param workBytes - the work bytes to check.
     * @returns true if the work is valid for the hash.
     */
    function isWorkValid(hashBytes: string, workBytes: Uint8Array): boolean;
    /**
     * creates a new Uint8Array(8) to calculate work bytes.
     * @returns the bytes in a Uint8Array.
     */
    function getZeroedWorkBytes(): Uint8Array;
    /**
     * Get the public key for a given private key.
     * @param privateKeyOrSigner - the private key or signer object (ledger).
     * @returns the public key.
     */
    function getPublicKey(privateKeyOrSigner: string): Promise<string>;
    /**
     * validates a seed.
     * @param seed - the seed to use to validate.
     * @param seedIx - the index to use with the seed.
     * @returns {valid:[true/false] message:[if false, why]}.
     */
    function isSeedValid(seed: string, seedIx: string): any;
    /**
     * Get the private key for a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @returns the private key.
     */
    function getPrivateKey(seed: string, seedIx: number): string;
    /**
     * Returns an object saying if the ananos account is valid or not.
     * If the account is not valid, the message describes why it is not valid.
     * @param account - the account.
     * @returns an object saying if the account is valid, and why.
     */
    function getAnanosAccountValidationInfo(account: string): AccountValidationInfo;
    /**
     * Returns an object saying if the nano account is valid or not.
     * If the account is not valid, the message describes why it is not valid.
     * @param account - the account.
     * @returns an object saying if the account is valid, and why.
     */
    function getNanoAccountValidationInfo(account: string): AccountValidationInfo;
}

declare namespace WithdrawUtil {
    /**
     * Send a withdrawal from a ananos account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param toAccount - the account to send to.
     * @param amountAnanos - the amount of Ananos.
     * @param representative - the new representative (optional).
     * @param previous - the new previous (optional).
     * @returns returns the response returned by the withdraw.
     */
    function sendAnanosWithdrawalFromSeed(seed: string, seedIx: string, toAccount: string, amountAnanos: string, representative: string, previous: string): Promise<object>;
    /**
     * Send a withdrawal from a nano account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param toAccount - the account to send to.
     * @param amountAnanos - the amount of Ananos.
     * @param representative - the new representative (optional).
     * @param previous - the new previous (optional).
     * @returns returns the response returned by the withdraw.
     */
    function sendNanoWithdrawalFromSeed(seed: string, seedIx: string, toAccount: string, amountAnanos: string, representative: string, previous: string): Promise<object>;
}

declare namespace DepositUtil {
    /**
     * Recieve deposits for a nano account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @param specificPendingBlockHash - a specific block hash to receive (optional).
     * @returns returns the response returned by the receive.
     */
    function receiveNanoDepositsForSeed(seed: string, seedIx: string, representative: string, specificPendingBlockHash: string): Promise<object>;
    /**
     * Recieve deposits for a ananos account with a given seed.
     * @param seed - the seed to use to find the account.
     * @param seedIx - the index to use with the seed.
     * @param representative - the representative.
     * @param specificPendingBlockHash - a specific block hash to receive (optional).
     * @returns returns the response returned by the receive.
     */
    function receiveAnanosDepositsForSeed(seed: string, seedIx: string, representative: string, specificPendingBlockHash: string): Promise<object>;
}

declare namespace AnanodeApi {
    /**
     * Get the balance, in raw, for an account.
     *
     * (use other methods like getAnanosPartsFromRaw to convert to Ananos or anaoshi)
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
     * @param account - the account to use.
     * @returns the account's balance, in raw.
     */
    function getAccountBalanceRaw(account: string): Promise<string>;
    /**
     * Get the balance and pending values, in raw, as an object like this one:
     * { balance: '123', pending: '123' } for an account.
     *
     * (use other methods like getAnanosPartsFromRaw to convert to Ananos or anaoshi)
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
     * @param account - the account to use.
     * @returns the account's balances, in raw.
     */
    function getAccountBalanceAndPendingRaw(account: string): Promise<object>;
    /**
     * Get the balances and pending values, in raw, as an object for all given account. Returns the Node object without transformation.
     *
     * (use other methods like getAnanosPartsFromRaw to convert to ananos or anaoshi)
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_balances}
     * @param accounts - the account to use.
     * @returns the account's balances, in raw.
     */
    function getAccountsBalances(accounts: string[]): Promise<object>;
    /**
     * Get the history for an account.
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#account_history}
     * @param account - the account to use.
     * @param count - the count to use (use -1 for all).
     * @param head - the head to start at (optional).
     * @param raw - if true, return raw history (optional).
     * @returns the account's history.
     */
    function getAccountHistory(account: string, count: number, head: string, raw: string): Promise<object>;
    /**
     * Get the account info for an account.
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#account_info}
     * @param account - the account to use.
     * @param representativeFlag - the representativeFlag to use (optional).
     * @returns the account's info.
     */
    function getAccountInfo(account: string, representativeFlag: boolean): Promise<object>;
    /**
     * Get the network block count.
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#block_count}
     * @returns the block count.
     */
    function getBlockCount(): Promise<object>;
    /**
     * Enables rate limiting, which looks for the rate limiting headers in the response.
     * @param flag - the flag to use.
     * @returns returns nothing.
     */
    function setUseRateLimit(flag: string): undefined;
    /**
     * Get the pending blocks for the account.
     *
     * Calls {@link https://docs.nano.org/commands/rpc-protocol/#accounts_pending}
     * @param accounts - the array of pending accounts.
     * @param count - the max count to get.
     * @param source - if true, get source.
     * @returns the account's pending blocks.
     */
    function getAccountsPending(accounts: string[], count: number, source: string): Promise<object>;
    /**
     * Sets an authorization string (http 'Authorization' header), useful if node requires api key.
     * @param authString - api key as a string\
     * @returns returns nothing.
     */
    function setAuth(authString: string): undefined;
}

/**
 * @property ananos - The amount of Ananos.
 * @property anaoshi - The amount of anaoshi (not counting whole Ananos).
 * @property raw - The amount of raw (not counting whole ananos and whole anaoshi).
 */
declare type AnanosParts = {
    ananos: string;
    anaoshi: string;
    raw: string;
};

declare type Block = {
    type: string;
    account: string;
    previous: string;
    representative: string;
    balance: string;
    link: string;
    signature: string;
    work?: string;
};

/**
 * @property message - The message describing why the account is valid or not.
 * @property valid - True if account is valid.
 */
declare type AccountValidationInfo = {
    message: string;
    valid: boolean;
};


export {
  Block,
  Main,
  CamoUtil,
  AnanosUtil,
  WithdrawUtil,
  DepositUtil,
  AnanodeApi,
  AnanosParts,
  AccountValidationInfo,
}
