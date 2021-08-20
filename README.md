## Cryptography Library for Fluree

A collection of Javascript cryptography functions for Fluree.

## Utility Functions

### Normalize String

- Arguments: `string`
- Returns: `string`

Normalizes string using the [NKFC](http://unicode.org/reports/tr15/) standard to ensure consistent hashing.

`const normalApple = crypto.normalize_string("\u0041\u030apple")`

For example, we can see that:

`crypto.sha2_256("\u0041\u030apple")` results in `6e9288599c1ff90127459f82285327c83fa0541d8b7cd215d0cd9e587150c15f`.

While using the normalized version of the string

`crypto.sha2_256_normalize(normalApple)` results in `58acf888b520fe51ecc0e4e5eef46c3bea3ca7df4c11f6719a1c2471bbe478bf`.

### String to Byte Array

- Arguments: `string` or `byte-array`
- Returns: `byte-array`

This functions normalizes a string and returns a byte-array. If it is already a byte-array, it returns itself.

For example:

`crypto.string__GT_byte_array("hi there")` results in `[104, 105, 32, 116, 104, 101, 114, 101]`.


### Byte Array to String

- Arguments: `byte-array`
- Returns: `byte-array`

This functions takes a byte-array and returns a string.

`crypto.byte_array__GT_string([104, 105, 32, 116, 104, 101, 114, 101])` results in `hi there`.

## Public-key Cryptography

### Generate Key Pair

- Arguments: `none` or `private-key-as-hex-string`
- Returns: `{ private: "private-key-as-hex-string", public: "public-key-as-hex-string" } `

This function will return a map with a public and private key:

`crypto.generate_key_pair();` will return a valid public-private key pair.

For example, this might return:

`{ private: "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2",
public: "02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391"}`.

You can also call this function with a private key already provided.

`crypto.generate_key_pair("6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2");`

This will return:

`{ private: "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2",
public: "02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391"}`.

### Public Key from Private

- Arguments: `private-key-as-hex-string`
- Returns: `public-key-as-hex-string`

Given a private key, this returns a public key:

`crypto.pub_key_from_private("6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2");`

This will return: `02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391`;

### Account Id from Private

- Arguments: `private-key-as-hex-string`
- Returns: `account-id`

Given a private key, this will return an account id:

`crypto.account_id_from_private("6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2");`

This will return `TfGvAdKH2nRdV4zP4yBz4kJ2R9WzYHDe2EV`.

### Account Id from Public

- Arguments: `public-key-as-hex-string`
- Returns: `account-id`

Given a public key, this will return an account id:

`crypto.account_id_from_public("02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391");`

This will return `TfGvAdKH2nRdV4zP4yBz4kJ2R9WzYHDe2EV`.

### Sign Message

- Arguments: `message, private-key-as-hex-string`
- Returns: `signature`

Given a message and a private key, this will return a signature.

```
const message = "hi there";
const privateKey = "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2";

crypto.sign_message(message, privateKey);
```

This returns:

```
1b3046022100cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc022100fcf81206277aa1b86d2667b4003f44643759b8f4684097efd92d56129cd89ea8
```
### Verify Signature

- Arguments: `public-key-as-hex-string, message, signature`
- Returns: `true` or `false`

Given a public key, message, and a signature, this function will return true or false.

```
const message = "hi there";
const privateKey = "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2";
const publicKey = "02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391";
const signature = crypto.sign_message(message, privateKey);

crypto.verify_signature(publicKey, message, signature);

```

This returns `true`.

### Public Key from Message

- Arguments: `message, signature`
- Returns: `true` or `false`

```
const message = "hi there";
const signature = crypto.sign_message(message, "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2");

crypto.pub_key_from_message(message, signature);
```

This returns `02991719b37817f6108fc8b0e824d3a9daa3d39bc97ecfd4f8bc7ef3b71d4c6391`.

### Account Id from Message

- Arguments: `message, signature`
- Returns: `true` or `false`

```
const message = "hi there";
const signature = crypto.sign_message(message, "6a5f415f49986006815ae7887016275aac8ffb239f9a2fa7172300578582b6c2");

crypto.account_id_from_message(message, signature);
```

This returns `TfGvAdKH2nRdV4zP4yBz4kJ2R9WzYHDe2EV`.

## Hashing

### SHA2 256

- Arguments: `string or byte-array` or `string or byte-array, output-format` or `input in input format, output-format, input-format`
- Returns: By default `hex-string`.

Valid input and output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha2_256("hi");` returns:

`8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4`.

### SHA2 256 Normalize

- Arguments: `string` or `string, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha2_256_normalize("hi")` returns:

`8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4`.

### SHA2 512

- Arguments: `string or byte-array` or `string or byte-array, output-format` or `input in input format, output-format, input-format`
- Returns: By default `hex-string`.

Valid input and output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha2_512("hi");` returns:

`150a14ed5bea6cc731cf86c41566ac427a8db48ef1b9fd626664b3bfbb99071fa4c922f33dde38719b8c8354e2b7ab9d77e0e67fc12843920a712e73d558e197`.

### SHA2 512 Normalize

- Arguments: `string` or `string, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha2_512_normalize("hi");` returns:

`150a14ed5bea6cc731cf86c41566ac427a8db48ef1b9fd626664b3bfbb99071fa4c922f33dde38719b8c8354e2b7ab9d77e0e67fc12843920a712e73d558e197`.

### SHA3 256

- Arguments: `string or byte-array` or `string or byte-array, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha3_256("hi");` returns:
crypto
`b39c14c8da3b23811f6415b7e0b33526d7e07a46f2cf0484179435767e4a8804`.

### SHA3 256 Normalize

- Arguments: `string` or `string, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha3_256_normalize("hi");` returns:

`b39c14c8da3b23811f6415b7e0b33526d7e07a46f2cf0484179435767e4a8804`.

### SHA3 512

- Arguments: `string or byte-array` or `string or byte-array, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha3_512("hi");` returns:

`154013cb8140c753f0ac358da6110fe237481b26c75c3ddc1b59eaf9dd7b46a0a3aeb2cef164b3c82d65b38a4e26ea9930b7b2cb3c01da4ba331c95e62ccb9c3`.

### SHA3 512 Normalize

- Arguments: `string` or `string, output-format`
- Returns: By default `hex string`.

Valid output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.sha3_512_normalize("hi");` returns:

`154013cb8140c753f0ac358da6110fe237481b26c75c3ddc1b59eaf9dd7b46a0a3aeb2cef164b3c82d65b38a4e26ea9930b7b2cb3c01da4ba331c95e62ccb9c3`.

### RIPEMD-160

- Arguments: `string` or `string, output-format` or `string, output-format, input-format`
- Returns: By default `hex-string`.

Valid input or output formats: `hex`, `bytes`, `base64`, `base58`, `string`.

This function: `crypto.ripemd_160("hi");` returns `242485ab6bfd3502bcb3442ea2e211687b8e4d89`.

## Encryption

### AES Encrypt

- Arguments: `message, iv, key` or `message, iv, key, output-format`
- Returns: By default `hex-string`.

Valid output formats: `hex`, `base64`.

```
const initialization_vector = [6, 224, 71, 170, 241, 204, 115, 21, 30, 8, 46, 223, 106, 207, 55, 42];
const message = "hi";
const key = "there";

crypto.aes_encrypt(message, initialization_vector, key);
```

This returns: `668cd07d1a17cc7a8a0390cf017ac7ef`.

### AES Decrypt

- Arguments: `x, iv, key` or `x, iv, key, output-format` or `x, iv, key, output-format, input-format`
- Returns: By default `hex-string`.

```
const initialization_vector = [6, 224, 71, 170, 241, 204, 115, 21, 30, 8, 46, 223, 106, 207, 55, 42];
const message = "hi";
const key = "there";
const encrypted = crypto.aes_encrypt(message, initialization_vector, key);

crypto.aes_decrypt(encrypted, initialization_vector, key);
```

This returns: `hi`.

### Scrypt Encrypt

- Arguments: `message` or `message, salt` or `message, salt, n` or `message, salt, n, r, p` or `message, salt, n, r, p, dk-len`
- Returns: `hex-string`.

The arguments by default:

- `salt`: 16 random bytes
- `n`: 32,768
- `r`: 8
- `p`: 1
- `dk-len`: 32


```
const salt = [172, 28, 242, 108, 175, 130, 214, 6, 249, 61, 244, 178, 34, 8, 13, 178];

crypto.scrypt_encrypt("hi", salt)
```

This results in `57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4`.

### Scrypt Check

- Arguments: `message, encrypted, salt` or `message, encrypted, salt, n, r, p`
- Returns: `true` or `false`

The arguments by default:

- `n`: 32,768
- `r`: 8
- `p`: 1

```
const salt = [172, 28, 242, 108, 175, 130, 214, 6, 249, 61, 244, 178, 34, 8, 13, 178];

crypto.scrypt_encrypt("hi", salt, 32768, 8, 1)

crypto.scrypt_check("hi", "57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4", salt, 32768, 8, 1)
```

## Contributing

Clone this repo to your local machine and create a new branch for your work.

You'll need the Clojure CLI tools installed for development and testing of this library.

- macOS
    - `brew install clojure/tools/clojure`
 
You will also need the NodeJS and NPM tools installed.

- macOS
    - `brew install node`
    - `brew install npm`

### Tests

For CLJS tests to work, you'll need to do the following things:

- `npm install -g karma-cli`
- Install Google Chrome if you don't already have it.
- You might also want to run `npx webpack` to make sure that has everything it needs to run.

You can run the CLJ and CLJS test suites like this: `make test`.

If you want to run one or the other you can do `make cljtest` or `make cljstest`.

### Building

Run `make` to build the library. It will create or update `target/fluree-crypto.jar`.

### Installing

You can install the JAR locally with:

`make install`

### Deploying

You can deploy to Clojars with the following:

`env CLOJARS_USERNAME=your-user CLOJARS_PASSWORD=your-deploy-token make deploy`

### CI/CD

The CI/CD pipeline is run inside a Docker container. You can run this locally if you have
Docker installed via:

`script/run-in-docker.sh make test`
