# Change Log

## 0.4.0
- **Breaking change:** `crypto/generate-key-pair` no longer returns a JS object
  in JS environments (i.e. node, web browser). Use the new
  `crypto/generateKeyPair` fn if you want that. We may do more conversions like
  this in the near future.
- Several JS bug fixes deep in the code--especially for the browser--for
  secp256k1 fns.
- Added several more sjcl/bn names to the sjcl-externs.js resource so they will
  work in the browser (which uses advanced Closure compilation).
- Fixed a bug where our use of sjcl/bn.greaterEquals would always result in
  "true" due to the differences between JS & CLJS truthiness semantics.
- Fixed more "incorrect length for compressed encoding" bugs.

## 0.3.10
- Bump alphabase dep to include base32 encoding

## 0.3.9
- Pad another code path's hex strings of compressed encoding keys for
  decodePoint compatibility

## 0.3.8
- Pad hex strings of compressed encoding keys to 64 chars so bouncycastle's
  decodePoint method doesn't blow up

## 0.3.6
- Bump bcprov-jdk15on from 1.66 to 1.69
- Add type hints to prevent reflection (performance improvement)
