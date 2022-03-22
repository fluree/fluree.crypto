# Change Log

## 0.3.9
- Pad another code path's hex strings of compressed encoding keys for
  decodePoint compatibility

## 0.3.8
- Pad hex strings of compressed encoding keys to 64 chars so bouncycastle's
  decodePoint method doesn't blow up

## 0.3.6
- Bump bcprov-jdk15on from 1.66 to 1.69
- Add type hints to prevent reflection (performance improvement)
