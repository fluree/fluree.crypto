const sjcl = {};

/* sjcl.bn */

sjcl.bn = class {
  constructor(it) {
    /** @type {number} */
    this.radix;

    /** @type {number} */
    this.maxMul;
  }

  initWith(it) {}

  /** @param {sjcl.bn} that */
  /** @return {boolean} */
  equals(that) {}

  getLimb(i) {}

  /** @param {sjcl.bn} that */
  /** @return {boolean} */
  greaterEquals(that) {}

  toString() {}

  addM(that) {}

  doubleM() {}

  halveM() {}

  subM(that) {}

  mod(that) {}

  inverseMod(p) {}

  add(that) {}

  sub(that) {}

  mul(that) {}

  square() {}

  power(l) {}

  mulmod(that, N) {}

  powermod(x, N) {}

  montpowermod(x, N) {}

  trim() {}

  reduce() {}

  fullReduce() {}

  normalize() {}

  cnormalize() {}

  toBits(len) {}

  bitLength() {}
}

/* sjcl.ecc */

sjcl.ecc = {};
sjcl.ecc.ecdsa = {};
sjcl.ecc.ecdsa.generateKeys = function(curve) {};

sjcl.ecc.curve = class {
  constructor(field, r, a, b, x, y) {
    this.field;
    this.r;
    this.a;
    this.b;
    this.G
  }
}

sjcl.curve.field.modulus = {};

sjcl.ecc.curves = {};
sjcl.ecc.curves.k256 = sjcl.ecc.curve;

sjcl.ecc.point = function(curve, x, y) {};
sjcl.ecc.point.prototype.mult = function(k) {};

/* sjcl.codec */

sjcl.codec = {};
sjcl.codec.bytes = {};
sjcl.codec.bytes.toBits = function() {};
sjcl.codec.bytes.fromBits = function() {};

sjcl.codec.hex = {};
sjcl.codec.hex.toBits = function() {};
sjcl.codec.hex.fromBits = function() {};

/* sjcl.hash */

sjcl.hash = {};
sjcl.hash.ripemd160 = {};
sjcl.hash.ripemd160.hash = function() {};

/* sjcl.misc */

sjcl.misc.hmac = class {
  constructor(key, hash) {}

  encrypt(data) {}
  mac(data) {}
  reset() {}
  update(data) {}
  digest() {}
}