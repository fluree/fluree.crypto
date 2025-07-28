// Main test for fluree crypto (ESM)
// Tests the ESM build with full @noble/ed25519 v2 compatibility

import * as flureecrypto from '@fluree/crypto';

console.log("Testing fluree crypto...\n");

// Test 1: API completeness
console.log("Test 1: Checking ESM exports...");
const expectedExports = [
  'accountIdFromPrivate',
  'accountIdFromPublic',
  'aesDecrypt',
  'aesEncrypt',
  'byteArrayToString',
  'createJWS',
  'didKeyFromPublic',
  'generateKeyPair',
  'normalizeString',
  'publicKeyFromPrivate',
  'randomBytes',
  'sha2_256',
  'sha2_256_normalize',
  'sha2_512',
  'sha2_512_normalize',
  'signMessage',
  'stringToByteArray',
  'verifyJWS',
  'verifySignature'
];

const actualExports = Object.keys(flureecrypto).sort();
const missingExports = expectedExports.filter(f => !actualExports.includes(f));

if (missingExports.length === 0) {
  console.log("✅ All expected exports present");
} else {
  console.log("❌ Missing exports:", missingExports);
  process.exit(1);
}

// Test 2: Key generation and signing
console.log("\nTest 2: Key generation and signing...");
try {
  const keyPair = flureecrypto.generateKeyPair();
  console.log("✅ Key pair generated");
  
  const message = "Hello from ESM test";
  const signature = flureecrypto.signMessage(message, keyPair.private);
  console.log("✅ Message signed");
  
  const isValid = flureecrypto.verifySignature(keyPair.public, message, signature);
  if (isValid) {
    console.log("✅ Signature verified");
  } else {
    console.log("❌ Signature verification failed");
    process.exit(1);
  }
} catch (e) {
  console.log("❌ Key generation/signing error:", e.message);
  process.exit(1);
}

// Test 3: New API functions
console.log("\nTest 3: Testing new API functions...");
try {
  const testPrivateKey = "64b254b7436c359e33a8c1642fd0b4d70df976811ce97fc710127fbe75713033";
  
  // Test public key derivation
  const derivedPublic = flureecrypto.publicKeyFromPrivate(testPrivateKey);
  const expectedPublic = "a8def12ad736f8840f836a46c66c9f3e2015d1ea2c69d546c050fef746bd63b3";
  if (derivedPublic === expectedPublic) {
    console.log("✅ Public key derivation correct");
  } else {
    console.log("❌ Public key derivation failed");
    process.exit(1);
  }
  
  // Test account ID from private
  const accountId = flureecrypto.accountIdFromPrivate(testPrivateKey);
  const expectedAccountId = "CNCfXkDndYJKLAydyYUYRn6pXo2KYYTvKigGjKwZeaTc";
  if (accountId === expectedAccountId) {
    console.log("✅ Account ID from private correct");
  } else {
    console.log("❌ Account ID from private failed");
    process.exit(1);
  }
} catch (e) {
  console.log("❌ New API functions error:", e.message);
  process.exit(1);
}

// Test 4: JWS operations
console.log("\nTest 4: JWS operations...");
try {
  const keyPair = flureecrypto.generateKeyPair();
  const payload = "Test JWS payload";
  
  const jws = flureecrypto.createJWS(payload, keyPair.private, { "include-pubkey": true });
  console.log("✅ JWS created");
  
  const result = flureecrypto.verifyJWS(jws);
  if (result && result.payload === payload) {
    console.log("✅ JWS verified");
  } else {
    console.log("❌ JWS verification failed");
    console.log("Result:", result);
    process.exit(1);
  }
} catch (e) {
  console.log("❌ JWS error:", e.message);
  process.exit(1);
}

// Test 5: Hash functions
console.log("\nTest 5: Hash functions...");
try {
  const testString = "Hello World";
  const hash = flureecrypto.sha2_256(testString);
  if (hash && hash.length === 64) {
    console.log("✅ SHA2-256 working");
  } else {
    console.log("❌ SHA2-256 failed");
    process.exit(1);
  }
} catch (e) {
  console.log("❌ Hash function error:", e.message);
  process.exit(1);
}

console.log("\n🎉 All tests passed!");
console.log("fluree crypto is working correctly");
process.exit(0);