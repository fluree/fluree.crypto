const flureecrypto = require("@fluree/crypto");

test("api contains all functions we expect", () => {
  expect(Object.keys(flureecrypto).sort()).toStrictEqual(
   ["accountIdFromPrivate",
    "accountIdFromPublic",
    "aesDecrypt",
    "aesEncrypt",
    "byteArrayToString",
    "createJWS",
    "didKeyFromPublic",
    "generateKeyPair",
    "normalizeString",
    "publicKeyFromPrivate",
    "randomBytes",
    "sha2_256",
    "sha2_256_normalize",
    "sha2_512",
    "sha2_512_normalize",
    "signMessage",
    "stringToByteArray",
    "verifyJWS",
    "verifySignature"]
    );
})

test("simple sign/verify test", () => {
  // Generate a new key pair for Ed25519 testing - now synchronous
  const keyPair = flureecrypto.generateKeyPair();
  const message = "test message";

  // Test simple signing - now synchronous
  const signature = flureecrypto.signMessage(message, keyPair.private);
  expect(signature).toBeTruthy();
  expect(typeof signature).toBe('string');
  expect(signature.length).toBe(128); // 64 bytes in hex
  
  // Test simple verification - now synchronous
  const isValid = flureecrypto.verifySignature(keyPair.public, message, signature);
  expect(isValid).toBe(true);
})

test("jws test", () => {
  // Generate a new key pair for Ed25519 testing - now synchronous
  const keyPair = flureecrypto.generateKeyPair();
  const secret = "abcdefg";

  // Create JWS using the private key hex string directly - now synchronous
  const jws = flureecrypto.createJWS(secret, keyPair.private);
  expect(jws).toBeTruthy();
  expect(typeof jws).toBe('string');
  expect(jws.split('.').length).toBe(3); // JWS has 3 parts
  
  // Verify JWS with the public key hex string directly - now synchronous
  const verified = flureecrypto.verifyJWS(jws, keyPair.public);
  expect(verified).toBeTruthy();
  expect(verified).not.toBeInstanceOf(Error);

  const {payload, pubkey} = verified;

  expect(payload).toStrictEqual(secret);
  expect(pubkey).toStrictEqual(keyPair.public);
})

test("account id and did key generation", () => {
  const keyPair = flureecrypto.generateKeyPair();
  
  // Test account ID generation
  const accountId = flureecrypto.accountIdFromPublic(keyPair.public);
  expect(accountId).toBeTruthy();
  expect(typeof accountId).toBe('string');
  expect(accountId.length).toBe(44); // Base58 account ID length
  
  // Test DID key generation
  const didKey = flureecrypto.didKeyFromPublic(keyPair.public);
  expect(didKey).toBeTruthy();
  expect(typeof didKey).toBe('string');
  expect(didKey.startsWith('did:key:z')).toBe(true);
})

test("hash functions", () => {
  const message = "Hello World";
  
  // Test SHA2-256
  const sha256Hash = flureecrypto.sha2_256(message);
  expect(sha256Hash).toBeTruthy();
  expect(typeof sha256Hash).toBe('string');
  expect(sha256Hash.length).toBe(64); // 32 bytes in hex
  
  // Test SHA2-512
  const sha512Hash = flureecrypto.sha2_512(message);
  expect(sha512Hash).toBeTruthy();
  expect(typeof sha512Hash).toBe('string');
  expect(sha512Hash.length).toBe(128); // 64 bytes in hex
  
  // Test normalization
  const normalizedHash = flureecrypto.sha2_256_normalize(message);
  expect(normalizedHash).toBeTruthy();
  expect(typeof normalizedHash).toBe('string');
})

test("public key derivation from private key", () => {
  const testPrivateKey = "162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5";
  const expectedPublicKey = "7f1215858ac4aa71a95b16b1ef024b1c344d5c25b6df3fe90a9f1513a4d2411e";
  
  // Test deriving public key from private key
  const derivedPublicKey = flureecrypto.publicKeyFromPrivate(testPrivateKey);
  expect(derivedPublicKey).toBe(expectedPublicKey);
  
  // Test that derived key works for verification
  const message = "test message";
  const signature = flureecrypto.signMessage(message, testPrivateKey);
  const isValid = flureecrypto.verifySignature(derivedPublicKey, message, signature);
  expect(isValid).toBe(true);
})

test("account id derivation from private key", () => {
  const testPrivateKey = "64b254b7436c359e33a8c1642fd0b4d70df976811ce97fc710127fbe75713033";
  const expectedPublicKey = "a8def12ad736f8840f836a46c66c9f3e2015d1ea2c69d546c050fef746bd63b3";
  const expectedAccountId = "CNCfXkDndYJKLAydyYUYRn6pXo2KYYTvKigGjKwZeaTc";
  
  // Test account ID derivation from private key
  const accountIdFromPrivate = flureecrypto.accountIdFromPrivate(testPrivateKey);
  expect(accountIdFromPrivate).toBe(expectedAccountId);
  
  // Verify it matches account ID derived from public key
  const accountIdFromPublic = flureecrypto.accountIdFromPublic(expectedPublicKey);
  expect(accountIdFromPrivate).toBe(accountIdFromPublic);
})
