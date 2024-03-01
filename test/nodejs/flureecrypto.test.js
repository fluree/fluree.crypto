const flureecrypto = require("@fluree/crypto");

test("api contains all functions we expect", () => {
  expect(Object.keys(flureecrypto).sort()).toStrictEqual(
   ["accountIdFromMessage",
    "accountIdFromPrivate",
    "accountIdFromPublic",
    "aesDecrypt",
    "aesEncrypt",
    "byteArrayToString",
    "createJWS",
    "generateKeyPair",
    "normalizeString",
    "pubKeyFromMessage",
    "pubKeyFromPrivate",
    "randomBytes",
    "ripemd_160",
    "scryptCheck",
    "scryptEncrypt",
    "sha2_256",
    "sha2_256_normalize",
    "sha2_512",
    "sha2_512_normalize",
    "sha3_256",
    "sha3_256_normalize",
    "sha3_512",
    "sha3_512_normalize",
    "signMessage",
    "stringToByteArray",
    "verifyJWS",
    "verifySignature"]
    );
})

