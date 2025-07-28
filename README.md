## Cryptography Library for Fluree

A collection of cryptography functions for Fluree, implemented in Clojure/ClojureScript with platform-specific optimizations.

## Features

- **Ed25519 Digital Signatures** - Fast, secure signatures using Noble Ed25519 (JS) and Java 17+ native support (JVM)
- **JWS (JSON Web Signatures)** - RFC 7515/8037 compliant JWS creation and verification
- **DID Support** - Decentralized identifier generation and verification (did:key method)
- **SHA-2 Hashing** - SHA-256 and SHA-512 implementations
- **AES Encryption** - Symmetric encryption/decryption
- **Cross-platform** - Consistent API across JVM, Node.js, and browser environments
- **GraalVM Native Image Support** - Can be compiled to native executables

## Installation

### Clojure/ClojureScript

Add to your `deps.edn`:

```clojure
{:deps {com.fluree/crypto {:mvn/version "4.0.0"}}}
```

### Node.js

```bash
npm install @fluree/crypto
```

### Browser

The browser build is available at `dist/browser/fluree-crypto.js` after building.

## API Reference

### Key Generation

#### Generate Key Pair

```clojure
;; Clojure
(require '[fluree.crypto :as crypto])

;; Generate a new Ed25519 key pair
(crypto/generate-key-pair)
;; => {:private "hex-string", :public "hex-string"}

;; Generate from existing private key
(crypto/generate-key-pair "your-private-key-hex")
```

```javascript
// JavaScript
// Generate a new Ed25519 key pair
const keyPair = crypto.generateKeyPair();
// Returns: { private: "hex-string", public: "hex-string" }

// Generate from existing private key
const keyPair2 = crypto.generateKeyPair("your-private-key-hex");
```

#### Public Key from Private

```clojure
;; Clojure
(crypto/public-key-from-private "private-key-hex")
;; => "public-key-hex"
```

```javascript
// JavaScript
const publicKey = crypto.publicKeyFromPrivate("private-key-hex");
// Returns: "public-key-hex"
```

### Account IDs and DIDs

#### Account ID from Public Key

```clojure
;; Clojure
(crypto/account-id-from-public "public-key-hex")
;; => "base58-account-id" (e.g., "TfGvAdKH2nRdV4zP4yBz4kJ2R9WzYHDe2EV")

;; With output format
(crypto/account-id-from-public "public-key-hex" {:output-format :multibase})
;; => "did:key:z6Mk..." format
```

```javascript
// JavaScript
const accountId = crypto.accountIdFromPublic("public-key-hex");
// Returns: "base58-account-id" (e.g., "TfGvAdKH2nRdV4zP4yBz4kJ2R9WzYHDe2EV")
```

#### Account ID from Private Key

```clojure
;; Clojure
(crypto/account-id-from-private "private-key-hex")
;; => "base58-account-id"
```

```javascript
// JavaScript
const accountId = crypto.accountIdFromPrivate("private-key-hex");
// Returns: "base58-account-id"
```

#### DID from Public Key

```clojure
;; Clojure
(crypto/did-from-public "public-key-hex")
;; => "did:key:z6Mk..." (multibase-encoded DID)
```

```javascript
// JavaScript
const did = crypto.didFromPublic("public-key-hex");
// Returns: "did:key:z6Mk..." (multibase-encoded DID)
```

### Digital Signatures

#### Sign Message

```clojure
;; Clojure
(crypto/sign-message "message" "private-key-hex")
;; => "signature-hex"

;; With key pair map
(crypto/sign-message "message" {:private "private-key-hex" :public "public-key-hex"})
```

```javascript
// JavaScript
const signature = crypto.signMessage("message", "private-key-hex");
// Returns: "signature-hex"
```

#### Verify Signature

```clojure
;; Clojure
(crypto/verify-signature "public-key-hex" "message" "signature-hex")
;; => true or false
```

```javascript
// JavaScript
const isValid = crypto.verifySignature("public-key-hex", "message", "signature-hex");
// Returns: true or false
```

### JWS (JSON Web Signatures)

#### Create JWS

```clojure
;; Clojure
;; Basic JWS
(crypto/create-jws "payload" keypair)
;; => "header.payload.signature"

;; With embedded public key (for self-contained verification)
(crypto/create-jws "payload" keypair {:include-pubkey true})

;; With key ID (account ID)
(crypto/create-jws "payload" keypair {:account-id true})

;; With custom key ID
(crypto/create-jws "payload" keypair {:kid "my-key-id"})
```

```javascript
// JavaScript
// Basic JWS
const jws = crypto.createJWS("payload", keyPair);
// Returns: "header.payload.signature"

// With embedded public key (for self-contained verification)
const jws2 = crypto.createJWS("payload", keyPair, { includePublicKey: true });

// With key ID (account ID)
const jws3 = crypto.createJWS("payload", keyPair, { accountId: true });

// With custom key ID
const jws4 = crypto.createJWS("payload", keyPair, { kid: "my-key-id" });
```

#### Verify JWS

```clojure
;; Clojure
;; Verify with explicit public key
(crypto/verify-jws jws "public-key-hex")
;; => {:payload "original-payload", :pubkey "public-key-hex", :header {...}}

;; Verify self-contained JWS (with embedded key or account ID)
(crypto/verify-jws jws)
;; => {:payload "...", :pubkey "...", :header {...}, :kid "..."}

;; Error case returns an Exception
(crypto/verify-jws "invalid-jws")
;; => #error {:cause "..." :data {...}}
```

```javascript
// JavaScript
// Verify with explicit public key
const result = crypto.verifyJWS(jws, "public-key-hex");
// Returns: { payload: "original-payload", pubkey: "public-key-hex", header: {...} }

// Verify self-contained JWS (with embedded key or account ID)
const result2 = crypto.verifyJWS(jws2);
// Returns: { payload: "...", pubkey: "...", header: {...}, kid: "..." }

// Error case returns an Error object
const error = crypto.verifyJWS("invalid-jws");
// Returns: Error instance
```

### Hashing

#### SHA-256

```clojure
;; Clojure
;; Basic usage
(crypto/sha2-256 "message")
;; => "hex-string"

;; With output format
(crypto/sha2-256 "message" :bytes)
;; Valid formats: :hex, :bytes, :base64, :base58, :string

;; With input and output format
(crypto/sha2-256 "68656c6c6f" :base64 :hex)
```

```javascript
// JavaScript
// Basic usage
const hash = crypto.sha2_256("message");
// Returns: "hex-string"

// With output format
const hashBytes = crypto.sha2_256("message", "bytes");
// Valid formats: "hex", "bytes", "base64", "base58", "string"

// With input and output format
const hash2 = crypto.sha2_256("68656c6c6f", "base64", "hex");
```

#### SHA-256 Normalize

Normalizes the input string using NFKC before hashing:

```clojure
;; Clojure
(crypto/sha2-256-normalize "message")
;; => "hex-string"

;; With output format
(crypto/sha2-256-normalize "message" :base64)
```

```javascript
// JavaScript
const hash = crypto.sha2_256_normalize("message");
// Returns: "hex-string"
```

#### SHA-512

```clojure
;; Clojure
(crypto/sha2-512 "message")
;; => "hex-string"

;; With formats (same as SHA-256)
(crypto/sha2-512 "message" :base64)
```

```javascript
// JavaScript
const hash = crypto.sha2_512("message");
// Returns: "hex-string"

// With formats (same as SHA-256)
const hashBase64 = crypto.sha2_512("message", "base64");
```

### Encryption

#### AES Encrypt

```clojure
;; Clojure
(def iv [6 224 71 170 241 204 115 21 30 8 46 223 106 207 55 42])
(crypto/aes-encrypt "message" iv "password")
;; => "hex-string"

;; With output format
(crypto/aes-encrypt "message" iv "password" :base64)
```

```javascript
// JavaScript
const iv = [6, 224, 71, 170, 241, 204, 115, 21, 30, 8, 46, 223, 106, 207, 55, 42];
const encrypted = crypto.aesEncrypt("message", iv, "password");
// Returns: "hex-string"

// With output format
const encryptedBase64 = crypto.aesEncrypt("message", iv, "password", "base64");
```

#### AES Decrypt

```clojure
;; Clojure
(crypto/aes-decrypt encrypted iv "password")
;; => "message"

;; With input/output formats
(crypto/aes-decrypt encrypted-base64 iv "password" :string :base64)
```

```javascript
// JavaScript
const decrypted = crypto.aesDecrypt(encrypted, iv, "password");
// Returns: "message"

// With input/output formats
const decrypted2 = crypto.aesDecrypt(encryptedBase64, iv, "password", "string", "base64");
```

### Utility Functions

#### Normalize String

```clojure
;; Clojure
(crypto/normalize-string "\u0041\u030apple")
;; => NFKC normalized string
```

```javascript
// JavaScript
const normalized = crypto.normalizeString("\u0041\u030apple");
// Returns NFKC normalized string
```

#### String to Byte Array

```clojure
;; Clojure
(crypto/string->byte-array "hello")
;; => [104 101 108 108 111]
```

```javascript
// JavaScript
const bytes = crypto.stringToByteArray("hello");
// Returns: [104, 101, 108, 108, 111]
```

#### Byte Array to String

```clojure
;; Clojure
(crypto/byte-array->string [104 101 108 108 111])
;; => "hello"
```

```javascript
// JavaScript
const str = crypto.byteArrayToString([104, 101, 108, 108, 111]);
// Returns: "hello"
```

## Platform-Specific Implementation Details

### JavaScript (Node.js/Browser)
- Uses [@noble/ed25519](https://github.com/paulmillr/noble-ed25519) v2.3.0 for Ed25519 operations
- Pure JavaScript implementation ensures consistent behavior

### JVM
- Uses Java 17+ native Ed25519 support via JCA/JCE
- `EdECPrivateKeySpec` and `EdECPublicKeySpec` for key management
- Hardware-accelerated when available

## Development

### Prerequisites

- Clojure CLI tools
- Node.js and npm
- Java 17+

### Building

```bash
# Build everything
make all

# Build JAR only
make jar

# Build Node.js package
make node

# Build browser package
make browser
```

### Testing

```bash
# Run all tests
make test

# Run specific test suites
make cljtest      # JVM tests
make cljstest     # ClojureScript tests
make node-test    # Node.js integration tests
```

### GraalVM Native Image

The library supports GraalVM native image compilation. See `README-graalvm.md` for details.

## Changes from v3.x

- **Ed25519 only**: Removed SECP256K1 support (use v3.x if needed)
- **No SHA-3/RIPEMD**: Removed to improve GraalVM compatibility
- **Upgraded dependencies**: Noble Ed25519 v2.3.0, Java 17+ required
- **New features**: DID support, automatic public key derivation in JWS

## Contributing

1. Fork and clone the repository
2. Create a branch for your feature
3. Write tests for new functionality
4. Ensure all tests pass with `make test`
5. Submit a pull request

## License

Copyright © 2025 Fluree, PBC

Distributed under the MIT License.