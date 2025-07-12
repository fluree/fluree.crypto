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
    "scryptCheck",
    "scryptEncrypt",
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

test("jws test", () => {
  const myprivkey = "42827e1ee6580a3cd367f31c4af2528db7269b8ea30c6cdff0af6e52d0c4480a";
  const mypubkey = "03ef89c5add9879110a18f107fe0f71879af36296f2984040d9b2816958d22fbab";

  const secret = "abcdefg";

  const headerb64 = "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19";
  const payloadb64 = "YWJjZGVmZw";

  const jws = flureecrypto.createJWS(secret, myprivkey);
  const verified = flureecrypto.verifyJWS(jws);

  const {payload, pubkey} = verified;

  expect(payload).toStrictEqual(secret);
  expect(pubkey).toStrictEqual(mypubkey);
})
