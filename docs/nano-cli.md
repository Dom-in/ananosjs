# get private key from seed:

```
    npm start ngetprivatekey ${seed} ${seedIx}
```

# get the account for the private key:

```
    npm start ngetaccount ${privateKey}

    npm start ngetaccount 1111111111111111111111111111111111111111111111111111111111111111
    ananosjs
    nano getaccount publicKey ACA68A2D52FE17BAB36D48456569FE7F91F23CB57B971B13FAF236EBBCC7FA94
    ananos getaccount account ana_3d78japo7ziqqcsptk47eonzwzwjyaydcywq5ebzowjpxgyehynnjc9pd5zj
```

# check pending using private key:

```
    npm start ncheckpending ${account} ${maxAccountsPending}

    npm start ncheckpending nano_3d78japo7ziqqcsptk47eonzwzwjyaydcywq5ebzowjpxgyehynnjc9pd5zj 10

    ananosjs
    nano checkpending response {
      blocks: {
        nano_3d78japo7ziqqcsptk47eonzwzwjyaydcywq5ebzowjpxgyehynnjc9pd5zj: {
          '48818DC7E09AA8EE12A62D23FBB4AD0D687087C8B3D2C5B5835951162D5DA615': '100000000000000000000000000000'
        }
      }
    }
```

# receive pending using private key:

```
    npm start nreceive ${privateKey} ${hash}

    npm start nreceive 1111111111111111111111111111111111111111111111111111111111111111 48818DC7E09AA8EE12A62D23FBB4AD0D687087C8B3D2C5B5835951162D5DA615

    ananosjs
    nano receive response {
      pendingCount: 1,
      receiveCount: 1,
      pendingMessage: 'pending 1 blocks, of max 10.',
      receiveMessage: 'received 1 blocks.'
    }
```

# send using private key:

```
    npm start nsendraw ${privateKey} ${destAccount} ${amountRaw}

    npm start nsendraw 1111111111111111111111111111111111111111111111111111111111111111 nano_3d78japo7ziqqcsptk47eonzwzwjyaydcywq5ebzowjpxgyehynnjc9pd5zj 1

    ananosjs
    nano sendnano response BF3BA5C6F91D52E88658E6AB800237C4023AD59392B4AB203EBA1E5BF706E535
```

# check account info

```
    npm start naccountinfo nano_3d78japo7ziqqcsptk47eonzwzwjyaydcywq5ebzowjpxgyehynnjc9pd5zj

    ananosjs
    nano accountinfo response {
      frontier: 'A9A8AED92C5B6C2CFF7A6954690C0763CFF1ADC906B8CF056BA1B20678A101C7',
      open_block: 'B6BD40F6F400BF0D81F2A28218039EBB1E6B9EE2764A0EFF344F7B9A123D5067',
      representative_block: 'A9A8AED92C5B6C2CFF7A6954690C0763CFF1ADC906B8CF056BA1B20678A101C7',
      balance: '344319743000000000000000000000000594',
      modified_timestamp: '1577058733',
      block_count: '630',
      account_version: '0',
      confirmation_height: '630',
      representative: 'nano_1ananosbh5rat99qfgt1ptpieie5swmoth87thi74qgbfrij7dcgjiij94xr'
    }
```
