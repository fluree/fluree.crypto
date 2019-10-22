"use strict";

/** @namespace The Stanford Javascript Crypto Library, top-level namespace. */
var sjcl = {
    /** @namespace Symmetric ciphers. */
    cipher: {},
    hash: {},
    /** @namespace Key exchange functions.  Right now only SRP is implemented. */
    keyexchange: {},

    /** @namespace Block cipher modes of operation. */
    mode: {},

    /** @namespace Miscellaneous.  HMAC and PBKDF2. */
    misc: {},

    /**
     * @namespace Bit array encoders and decoders.
     *
     * @description
     * The members of this namespace are functions which translate between
     * SJCL's bitArrays and other objects (usually strings).  Because it
     * isn't always clear which direction is encoding and which is decoding,
     * the method names are "fromBits" and "toBits".
     */
    codec: {},

    /** @namespace Exceptions. */
    exception: {
        /** @constructor Ciphertext is corrupt. */
        corrupt: function(message) {},

        /** @constructor Invalid parameter. */
        invalid: function(message) {},

        /** @constructor Bug or missing feature in SJCL. @constructor */
        bug: function(message) {},

        /** @constructor Something isn't ready. */
        notReady: function(message) {}
    }
};

/**
 * @constructor
 * @param {Array} key The key as an array of 4, 6 or 8 words.
 * @class Advanced Encryption Standard (low-level interface)
 */
sjcl.cipher.aes = function(key) {};

sjcl.cipher.aes.prototype = {
    /**
     * Encrypt an array of 4 big-endian words.
     * @param {Array} data The plaintext.
     * @return {Array} The ciphertext.
     */
    encrypt: function(data) {},

    /**
     * Decrypt an array of 4 big-endian words.
     * @param {Array} data The ciphertext.
     * @return {Array} The plaintext.
     */
    decrypt: function(data) {}
};

/**
 * @namespace Arrays of bits, encoded as arrays of Numbers.
 */
sjcl.bitArray = {
    /**
     * Array slices in units of bits.
     * @param {bitArray} a The array to slice.
     * @param {Number} bstart The offset to the start of the slice, in bits.
     * @param {Number} bend The offset to the end of the slice, in bits.  If this is undefined,
     * slice until the end of the array.
     * @return {bitArray} The requested slice.
     */
    bitSlice: function(a, bstart, bend) {},

    /**
     * Extract a number packed into a bit array.
     * @param {bitArray} a The array to slice.
     * @param {Number} bstart The offset to the start of the slice, in bits.
     * @param {Number} blength The length of the number to extract.
     * @return {Number} The requested slice.
     */
    extract: function(a, bstart, blength) {},

    /**
     * Concatenate two bit arrays.
     * @param {bitArray} a1 The first array.
     * @param {bitArray} a2 The second array.
     * @return {bitArray} The concatenation of a1 and a2.
     */
    concat: function(a1, a2) {},

    /**
     * Find the length of an array of bits.
     * @param {bitArray} a The array.
     * @return {Number} The length of a, in bits.
     */
    bitLength: function(a) {},

    /**
     * Truncate an array.
     * @param {bitArray} a The array.
     * @param {Number} len The length to truncate to, in bits.
     * @return {bitArray} A new array, truncated to len bits.
     */
    clamp: function(a, len) {},

    /**
     * Make a partial word for a bit array.
     * @param {Number} len The number of bits in the word.
     * @param {Number} x The bits.
     * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
     * @return {Number} The partial word.
     */
    partial: function(len, x, _end) {},

    /**
     * Get the number of bits used by a partial word.
     * @param {Number} x The partial word.
     * @return {Number} The number of bits used by the partial word.
     */
    getPartial: function(x) {},

    /**
     * Compare two arrays for equality in a predictable amount of time.
     * @param {bitArray} a The first array.
     * @param {bitArray} b The second array.
     * @return {boolean} true if a == b; false otherwise.
     */
    equal: function(a, b) {},

    /**
     * byteswap a word array inplace.
     * (does not handle partial words)
     * @param {sjcl.bitArray} a word array
     * @return {sjcl.bitArray} byteswapped array
     */
    byteswapM: function(a) {}
};

/** @namespace UTF-8 strings */
sjcl.codec.utf8String = {
    fromBits: function(arr) {},
    toBits: function(str) {}
};

/** @namespace Hexadecimal */
sjcl.codec.hex = {
    fromBits: function(arr) {},
    toBits: function(str) {}
};

/** @namespace Base32 encoding/decoding */
sjcl.codec.base32 = {
    BITS: 32,
    BASE: 5,
    REMAINING: 27,
    fromBits: function(arr, _noEquals, _hex) {},
    toBits: function(str, _hex) {}
};

sjcl.codec.base32hex = {
    fromBits: function(arr, _noEquals) {},
    toBits: function(str) {}
};

/** @namespace Base64 encoding/decoding */
sjcl.codec.base64 = {
    fromBits: function(arr, _noEquals, _url) {},
    toBits: function(str, _url) {}
};

sjcl.codec.base64url = {
    fromBits: function(arr) {},
    toBits: function(str) {}
};

/** @namespace Arrays of bytes */
sjcl.codec.bytes = {
    fromBits: function(arr) {},
    toBits: function(bytes) {}

};


/**
 * Context for a SHA-256 operation in progress.
 * @constructor
 * @class Secure Hash Algorithm, 256 bits.
 */
sjcl.hash.sha256 = function(hash) {};

/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 16 big-endian words.
 */
sjcl.hash.sha256.hash = function(data) {};

sjcl.hash.sha256.prototype = {
    /**
     * The hash's block size, in bits.
     * @constant
     */
    blockSize: 512,

    /**
     * Reset the hash state.
     * @return this
     */
    reset: function() {},

    /**
     * Input several words to the hash.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
    update: function(data) {},

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 8 big-endian words.
     */
    finalize: function() {}
};


/**
 * Context for a SHA-512 operation in progress.
 * @constructor
 * @class Secure Hash Algorithm, 512 bits.
 */
sjcl.hash.sha512 = function(hash) {};

/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 16 big-endian words.
 */
sjcl.hash.sha512.hash = function(data) {};

sjcl.hash.sha512.prototype = {
    /**
     * The hash's block size, in bits.
     * @constant
     */
    blockSize: 1024,

    /**
     * Reset the hash state.
     * @return this
     */
    reset: function() {},

    /**
     * Input several words to the hash.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
    update: function(data) {},

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 16 big-endian words.
     */
    finalize: function() {},
};

/**
 * Context for a SHA-1 operation in progress.
 * @constructor
 * @class Secure Hash Algorithm, 160 bits.
 */
sjcl.hash.sha1 = function(hash) {};

/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 5 big-endian words.
 */
sjcl.hash.sha1.hash = function(data) {};

sjcl.hash.sha1.prototype = {
    /**
     * The hash's block size, in bits.
     * @constant
     */
    blockSize: 512,

    /**
     * Reset the hash state.
     * @return this
     */
    reset: function() {},

    /**
     * Input several words to the hash.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
    update: function(data) {},

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 5 big-endian words.
     */
    finalize: function() {},
};

/** @namespace CTR mode with CBC MAC. */
sjcl.mode.ccm = {
    /** The name of the mode.
     * @constant
     */
    name: "ccm",

    listenProgress: function(cb) {},

    unListenProgress: function(cb) {},

    /** Encrypt in CCM mode.
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} plaintext The plaintext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=64] The desired tag length, in bits.
     * @return {bitArray} The encrypted data, an array of bytes.
     */
    encrypt: function(prf, plaintext, iv, adata, tlen) {},

    /** Decrypt in CCM mode.
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} ciphertext The ciphertext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=64] The desired tag length, in bits.
     * @return {bitArray} The decrypted data.
     */
    decrypt: function(prf, ciphertext, iv, adata, tlen) {}
};

sjcl.beware = {};

sjcl.beware["CTR mode is dangerous because it doesn't protect message integrity."] = function() {
    /** @namespace
     * Dangerous: CTR mode.
     *
     * @author Torben Haase
     */
    sjcl.mode.ctr = {
        /** The name of the mode.
         * @constant
         */
        name: "ctr",

        /** Encrypt in CTR mode.
         * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
         * @param {bitArray} plaintext The plaintext data.
         * @param {bitArray} iv The initialization value.  It must be 128 bits.
         * @param {bitArray} [adata=[]] The authenticated data.  Must be empty.
         * @return The encrypted data, an array of bytes.
         * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits or if any adata is specified.
         */
        encrypt: function(prf, plaintext, iv, adata) {},

        /** Decrypt in CTR mode.
         * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
         * @param {bitArray} ciphertext The ciphertext data.
         * @param {bitArray} iv The initialization value.  It must be 128 bits.
         * @param {bitArray} [adata=[]] The authenticated data.  It must be empty.
         * @return The decrypted data, an array of bytes.
         * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits or if any adata is specified.
         * @throws {sjcl.exception.corrupt} if if the message is corrupt.
         */
        decrypt: function(prf, ciphertext, iv, adata) {},
    };
};
sjcl.beware["CBC mode is dangerous because it doesn't protect message integrity."] = function() {
    /**
     * @namespace
     * @author Emily Stark
     * @author Mike Hamburg
     * @author Dan Boneh
     */
    sjcl.mode.cbc = {
        /** The name of the mode.
         * @constant
         */
        name: "cbc",

        /**
         * Encrypt in CBC mode with PKCS#5 padding.
         * @param {Object} prp The block cipher.  It must have a block size of 16 bytes.
         * @param {bitArray} plaintext The plaintext data.
         * @param {bitArray} iv The initialization value.
         * @param {bitArray} [adata=[]] The authenticated data.  Must be empty.
         * @return The encrypted data, an array of bytes.
         * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits, or if any adata is specified.
         */
        encrypt: function(prp, plaintext, iv, adata) {},

        /** Decrypt in CBC mode.
         * @param {Object} prp The block cipher.  It must have a block size of 16 bytes.
         * @param {bitArray} ciphertext The ciphertext data.
         * @param {bitArray} iv The initialization value.
         * @param {bitArray} [adata=[]] The authenticated data.  It must be empty.
         * @return The decrypted data, an array of bytes.
         * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits, or if any adata is specified.
         * @throws {sjcl.exception.corrupt} if if the message is corrupt.
         */
        decrypt: function(prp, ciphertext, iv, adata) {}
    };
};

/** @namespace
 * Phil Rogaway's Offset CodeBook mode, version 2.0.
 * May be covered by US and international patents.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */
sjcl.mode.ocb2 = {
    /** The name of the mode.
     * @constant
     */
    name: "ocb2",

    /** Encrypt in OCB mode, version 2.0.
     * @return The encrypted data, an array of bytes.
     * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits.
     */
    encrypt: function(prp, plaintext, iv, adata, tlen, premac) {},

    /** Decrypt in OCB mode.
     * @param {Object} prp The block cipher.  It must have a block size of 16 bytes.
     * @param {bitArray} ciphertext The ciphertext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=64] The desired tag length, in bits.
     * @param {boolean} [premac=false] true if the authentication data is pre-macced with PMAC.
     * @return The decrypted data, an array of bytes.
     * @throws {sjcl.exception.invalid} if the IV isn't exactly 128 bits.
     * @throws {sjcl.exception.corrupt} if if the message is corrupt.
     */
    decrypt: function(prp, ciphertext, iv, adata, tlen, premac) {},

    /** PMAC authentication for OCB associated data.
     * @param {Object} prp The block cipher.  It must have a block size of 16 bytes.
     * @param {bitArray} adata The authenticated data.
     */
    pmac: function(prp, adata) {},

};

/** @namespace
 * Phil Rogaway's Offset CodeBook mode, version 2.0.
 * May be covered by US and international patents.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

sjcl.mode.ocb2progressive = {
    createEncryptor: function(prp, iv, adata, tlen, premac) {},
    createDecryptor: function(prp, iv, adata, tlen, premac) {
        return {
            process: function(data) {},
            finalize: function() {}
        };
    }
};

/** @namespace Galois/Counter mode. */
sjcl.mode.gcm = {
    /** The name of the mode.
     * @constant
     */
    name: "gcm",

    /** Encrypt in GCM mode.
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} plaintext The plaintext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=128] The desired tag length, in bits.
     * @return {bitArray} The encrypted data, an array of bytes.
     */
    encrypt: function(prf, plaintext, iv, adata, tlen) {},

    /** Decrypt in GCM mode.
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} ciphertext The ciphertext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=128] The desired tag length, in bits.
     * @return {bitArray} The decrypted data.
     */
    decrypt: function(prf, ciphertext, iv, adata, tlen) {}
};

/**
 * HMAC with the specified hash function.
 * @constructor
 * @param {bitArray} key the key for HMAC.
 * @param {Object} [Hash=sjcl.hash.sha256] The hash function to use.
 */
sjcl.misc.hmac = function(key, Hash) {};

/** HMAC with the specified hash function.  Also called encrypt since it's a prf.
 * @param {bitArray|String} data The data to mac.
 */
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function(data) {};

sjcl.misc.hmac.prototype.reset = function() {};

sjcl.misc.hmac.prototype.update = function(data) {};

sjcl.misc.hmac.prototype.digest = function() {};

/** Password-Based Key-Derivation Function, version 2.0.
 *
 * Generate keys from passwords using PBKDF2-HMAC-SHA256.
 *
 * This is the method specified by RSA's PKCS #5 standard.
 *
 * @param {bitArray|String} password  The password.
 * @param {bitArray|String} salt The salt.  Should have lots of entropy.
 * @param {Number} [count=1000] The number of iterations.  Higher numbers make the function slower but more secure.
 * @param {Number} [length] The length of the derived key.  Defaults to the
 output size of the hash function.
 * @param {Object} [Prff=sjcl.misc.hmac] The pseudorandom function family.
 * @return {bitArray} the derived key.
 */
sjcl.misc.pbkdf2 = function(password, salt, count, length, Prff) {};

/** scrypt Password-Based Key-Derivation Function.
 *
 * @param {bitArray|String} password  The password.
 * @param {bitArray|String} salt      The salt.  Should have lots of entropy.
 *
 * @param {Number} [N=16384] CPU/Memory cost parameter.
 * @param {Number} [r=8]     Block size parameter.
 * @param {Number} [p=1]     Parallelization parameter.
 *
 * @param {Number} [length] The length of the derived key.  Defaults to the
 *                          output size of the hash function.
 * @param {Object} [Prff=sjcl.misc.hmac] The pseudorandom function family.
 *
 * @return {bitArray} The derived key.
 */
sjcl.misc.scrypt = function(password, salt, N, r, p, length, Prff) {};
sjcl.misc.scrypt.salsa20Core = function(word, rounds) {};
sjcl.misc.scrypt.blockMix = function(blocks) {};
sjcl.misc.scrypt.ROMix = function(block, N) {};
sjcl.misc.scrypt.reverse = function(words) {};
sjcl.misc.scrypt.blockcopy = function(S, Si, D, Di, len) {};
sjcl.misc.scrypt.blockxor = function(S, Si, D, Di, len) {};

/** @constructor
 * @class Random number generator
 */
sjcl.prng = function(defaultParanoia) {};

sjcl.prng.prototype = {
    /** Generate several random words, and return them in an array.
     * A word consists of 32 bits (4 bytes)
     * @param {Number} nwords The number of words to generate.
     */
    randomWords: function(nwords, paranoia) {},

    setDefaultParanoia: function(paranoia, allowZeroParanoia) {},

    /**
     * Add entropy to the pools.
     * @param data The entropic value.  Should be a 32-bit integer, array of 32-bit integers, or string
     * @param {Number} estimatedEntropy The estimated entropy of data, in bits
     * @param {String} source The source of the entropy, eg "mouse"
     */
    addEntropy: function(data, estimatedEntropy, source) {},
    isReady: function(paranoia) {},
    getProgress: function(paranoia) {},
    startCollectors: function() {},
    stopCollectors: function() {},
    addEventListener: function(name, callback) {},
    removeEventListener: function(name, cb) {}
};

/** an instance for the prng.
 * @see sjcl.prng
 */
sjcl.random = new sjcl.prng(6);

/** @namespace JSON encapsulation */
sjcl.json = {
    /** Default values for encryption */
    defaults: {
        v: 1,
        iter: 1000,
        ks: 128,
        ts: 64,
        mode: "ccm",
        adata: "",
        cipher: "aes"
    },

    /** Simple encryption function.
     * @param {String|bitArray} password The password or key.
     * @param {String} plaintext The data to encrypt.
     * @param {Object} [params] The parameters including tag, iv and salt.
     * @param {Object} [rp] A returned version with filled-in parameters.
     * @return {String} The ciphertext serialized data.
     * @throws {sjcl.exception.invalid} if a parameter is invalid.
     */
    encrypt: function(password, plaintext, params, rp) {},

    /** Simple decryption function.
     * @param {String|bitArray} password The password or key.
     * @param {Object} ciphertext The cipher raw data to decrypt.
     * @param {Object} [params] Additional non-default parameters.
     * @param {Object} [rp] A returned object with filled parameters.
     * @return {String} The plaintext.
     * @throws {sjcl.exception.invalid} if a parameter is invalid.
     * @throws {sjcl.exception.corrupt} if the ciphertext is corrupt.
     */
    _decrypt: function(password, ciphertext, params, rp) {
        var p;
        if (p.mode === "ccm" && sjcl.arrayBuffer && sjcl.arrayBuffer.ccm && p.ct) {}
        rp.key = password;
        if (params.raw === 1) {}
    },

    /** Simple decryption function.
     * @param {String|bitArray} password The password or key.
     * @param {String} ciphertext The ciphertext to decrypt.
     * @param {Object} [params] Additional non-default parameters.
     * @param {Object} [rp] A returned object with filled parameters.
     * @return {String} The plaintext.
     * @throws {sjcl.exception.invalid} if a parameter is invalid.
     * @throws {sjcl.exception.corrupt} if the ciphertext is corrupt.
     */
    decrypt: function(password, ciphertext, params, rp) {},

    /** Encode a flat structure into a JSON string.
     * @param {Object} obj The structure to encode.
     * @return {String} A JSON string.
     * @throws {sjcl.exception.invalid} if obj has a non-alphanumeric property.
     * @throws {sjcl.exception.bug} if a parameter has an unsupported type.
     */
    encode: function(obj) {},

    /** Decode a simple (flat) JSON string into a structure.  The ciphertext,
     * adata, salt and iv will be base64-decoded.
     * @param {String} str The string.
     * @return {Object} The decoded structure.
     * @throws {sjcl.exception.invalid} if str isn't (simple) JSON.
     */
    decode: function(str) {}

};

/** Simple encryption function; convenient shorthand for sjcl.json.encrypt.
 * @param {String|bitArray} password The password or key.
 * @param {String} plaintext The data to encrypt.
 * @param {Object} [params] The parameters including tag, iv and salt.
 * @param {Object} [rp] A returned version with filled-in parameters.
 * @return {String} The ciphertext.
 */
sjcl.encrypt = sjcl.json.encrypt;

/** Simple decryption function; convenient shorthand for sjcl.json.decrypt.
 * @param {String|bitArray} password The password or key.
 * @param {String} ciphertext The ciphertext to decrypt.
 * @param {Object} [params] Additional non-default parameters.
 * @param {Object} [rp] A returned object with filled parameters.
 * @return {String} The plaintext.
 */
sjcl.decrypt = sjcl.json.decrypt;

/** Cached PBKDF2 key derivation.
 * @param {String} password The password.
 * @param {Object} [obj] The derivation params (iteration count and optional salt).
 * @return {Object} The derived data in key, the salt in salt.
 */
sjcl.misc.cachedPbkdf2 = function(password, obj) {};

/**
 * @constructor
 * Constructs a new bignum from another bignum, a number or a hex string.
 */
sjcl.bn = function(it) {};

sjcl.bn.prototype = {
    radix: 24,
    maxMul: 8,
    copy: function() {},
    initWith: function(it) {},
    equals: function(that) {},
    getLimb: function(i) {},
    greaterEquals: function(that) {},
    toString: function() {},
    addM: function(that) {},
    doubleM: function() {},
    halveM: function() {},
    subM: function(that) {},
    mod: function(that) {},
    inverseMod: function(p) {},
    add: function(that) {},
    sub: function(that) {},
    mul: function(that) {},
    square: function() {},
    power: function(l) {},
    mulmod: function(that, N) {},
    powermod: function(x, N) {},
    montpowermod: function(x, N) {},
    trim: function() {},
    reduce: function() {},
    fullReduce: function() {},
    normalize: function() {},
    cnormalize: function() {},
    toBits: function(len) {},
    bitLength: function() {}
};

/** @memberOf sjcl.bn
 * @this { sjcl.bn }
 */
sjcl.bn.fromBits = function(bits) {};
sjcl.bn.prototype.ipv = 1 / (sjcl.bn.prototype.placeVal = Math.pow(2, sjcl.bn.prototype.radix));
sjcl.bn.prototype.radixMask = (1 << sjcl.bn.prototype.radix) - 1;

sjcl.bn.pseudoMersennePrime = function(exponent, coeff) {
    /** @constructor
     * @private
     */
    function p(it) {}
    var ppr = p.prototype = new sjcl.bn(),
        i, tmp, mo;
    ppr.exponent = exponent;
    ppr.offset = [];
    ppr.factor = [];
    ppr.minOffset = mo;
    ppr.fullMask = 0;
    ppr.fullOffset = [];
    ppr.fullFactor = [];
    ppr.modulus = p.modulus = {};
    ppr._class = p;
    ppr.modulus.cnormalize();

    /** Approximate reduction mod p.  May leave a number which is negative or slightly larger than p.
     * @memberof sjcl.bn
     * @this { sjcl.bn }
     */
    ppr.reduce = function() {};

    /** @memberof sjcl.bn
     * @this { sjcl.bn }
     */
    ppr._strongReduce = (ppr.fullMask === -1) ? ppr.reduce : function() {};

    /** mostly constant-time, very expensive full reduction.
     * @memberof sjcl.bn
     * @this { sjcl.bn }
     */
    ppr.fullReduce = function() {};

    /** @memberof sjcl.bn
     * @this { sjcl.bn }
     */
    ppr.inverse = function() {};
    p.fromBits = sjcl.bn.fromBits;
};

// a small Mersenne prime
var sbp = sjcl.bn.pseudoMersennePrime;
sjcl.bn.prime = {
    p127: {},
    // Bernstein's prime for Curve25519
    p25519: {},

    // Koblitz primes
    p192k: {},
    p224k: {},
    p256k: {},

    // NIST primes
    p192: {},
    p224: {},
    p256: {},
    p384: {},
    p521: {}
};

sjcl.bn.random = function(modulus, paranoia) {};

/**
 * base class for all ecc operations.
 */
sjcl.ecc = {};

/**
 * Represents a point on a curve in affine coordinates.
 * @constructor
 * @param {sjcl.ecc.curve} curve The curve that this point lies on.
 * @param {bigInt} x The x coordinate.
 * @param {bigInt} y The y coordinate.
 */
sjcl.ecc.point = function(curve, x, y) {};

sjcl.ecc.point.prototype = {
    toJac: function() {},

    mult: function(k) {},

    /**
     * Multiply this point by k, added to affine2*k2, and return the answer in Jacobian coordinates.
     * @param {bigInt} k The coefficient to multiply this by.
     * @param {bigInt} k2 The coefficient to multiply affine2 this by.
     * @param {sjcl.ecc.point} affine2 The other point in affine coordinates.
     * @return {sjcl.ecc.pointJac} The result of the multiplication and addition, in Jacobian coordinates.
     */
    mult2: function(k, k2, affine2) {},
    multiples: function() {},
    negate: function() {},
    isValid: function() {},
    toBits: function() {}
};

/**
 * Represents a point on a curve in Jacobian coordinates. Coordinates can be specified as bigInts or strings (which
 * will be converted to bigInts).
 *
 * @constructor
 * @param {bigInt/string} x The x coordinate.
 * @param {bigInt/string} y The y coordinate.
 * @param {bigInt/string} z The z coordinate.
 * @param {sjcl.ecc.curve} curve The curve that this point lies on.
 */
sjcl.ecc.pointJac = function(curve, x, y, z) {};

sjcl.ecc.pointJac.prototype = {
    /**
     * @param {sjcl.ecc.point} T The other point to add, in affine coordinates.
     * @return {sjcl.ecc.pointJac} The sum of the two points, in Jacobian coordinates.
     */
    add: function(T) {},

    /**
     * Doubles this point.
     * @return {sjcl.ecc.pointJac} The doubled point.
     */
    doubl: function() {},

    /**
     * Returns a copy of this point converted to affine coordinates.
     * @return {sjcl.ecc.point} The converted point.
     */
    toAffine: function() {},

    /**
     * Multiply this point by k and return the answer in Jacobian coordinates.
     * @param {bigInt} k The coefficient to multiply by.
     * @param {sjcl.ecc.point} affine This point in affine coordinates.
     * @return {sjcl.ecc.pointJac} The result of the multiplication, in Jacobian coordinates.
     */
    mult: function(k, affine) {},

    /**
     * Multiply this point by k1, added to affine2*k2, and return the answer in Jacobian coordinates.
     * @param {bigInt} k1 The coefficient to multiply this by.
     * @param {sjcl.ecc.point} affine This point in affine coordinates.
     * @param {bigInt} k2 The coefficient to multiply affine2 this by.
     * @param {sjcl.ecc.point} affine2 The other point in affine coordinates.
     * @return {sjcl.ecc.pointJac} The result of the multiplication and addition, in Jacobian coordinates.
     */
    mult2: function(k1, affine, k2, affine2) {},
    negate: function() {},
    isValid: function() {}
};

/**
 * @constructor
 * @param {bigInt} Field The prime modulus.
 * @param {bigInt} r The prime order of the curve.
 * @param {bigInt} a The constant a in the equation of the curve y^2 = x^3 + ax + b (for NIST curves, a is always -3).
 * @param {bigInt} x The x coordinate of a base point of the curve.
 * @param {bigInt} y The y coordinate of a base point of the curve.
 */
sjcl.ecc.curve = function(Field, r, a, b, x, y) {
    this.field = function() {};
    this.r = {};
    this.a = {};
    this.b = {};
    this.G = {}
};

sjcl.ecc.curve.prototype.fromBits = function(bits) {};

sjcl.ecc.curves = {
    c192: {},
    c224: {},
    c256: {},
    c384: {},
    c521: {},
    k192: {},
    k224: {},
    k256: {}
};

sjcl.ecc.curveName = function(curve) {};
sjcl.ecc.deserialize = function(key) {};
sjcl.ecc.basicKey = {
    /** ecc publicKey.
     * @constructor
     * @param {curve} curve the elliptic curve
     * @param {point} point the point on the curve
     */
    publicKey: function(curve, point) {},

    /** ecc secretKey
     * @constructor
     * @param {curve} curve the elliptic curve
     * @param exponent
     */
    secretKey: function(curve, exponent) {
        this.serialize = function() {};

        /** get this keys exponent data
         * @return {bitArray} exponent
         */
        this.get = function() {
            return this._exponent.toBits();
        };
    }
};

/** @private */
sjcl.ecc.basicKey.generateKeys = function(cn) {
    return function generateKeys(curve, paranoia, sec) {
        return {
            pub: {},
            sec: {}
        };
    };
};

/** elGamal keys */
sjcl.ecc.elGamal = {
    /** generate keys
     * @function
     * @param curve
     * @param {int} paranoia Paranoia for generation (default 6)
     * @param {secretKey} sec secret Key to use. used to get the publicKey for ones secretKey
     */
    generateKeys: sjcl.ecc.basicKey.generateKeys("elGamal"),
    /** elGamal publicKey.
     * @constructor
     * @augments sjcl.ecc.basicKey.publicKey
     */
    publicKey: function(curve, point) {},
    /** elGamal secretKey
     * @constructor
     * @augments sjcl.ecc.basicKey.secretKey
     */
    secretKey: function(curve, exponent) {}
};

sjcl.ecc.elGamal.publicKey.prototype = {
    /** Kem function of elGamal Public Key
     * @param paranoia paranoia to use for randomization.
     * @return {object} key and tag. unkem(tag) with the corresponding secret key results in the key returned.
     */
    kem: function(paranoia) {
        return {
            key: {},
            tag: {}
        };
    },

    getType: function() {
        return "elGamal";
    }
};

sjcl.ecc.elGamal.secretKey.prototype = {
    /** UnKem function of elGamal Secret Key
     * @param {bitArray} tag The Tag to decrypt.
     * @return {bitArray} decrypted key.
     */
    unkem: function(tag) {},

    /** Diffie-Hellmann function
     * @param {elGamal.publicKey} pk The Public Key to do Diffie-Hellmann with
     * @return {bitArray} diffie-hellmann result for this key combination.
     */
    dh: function(pk) {},

    /** Diffie-Hellmann function, compatible with Java generateSecret
     * @param {elGamal.publicKey} pk The Public Key to do Diffie-Hellmann with
     * @return {bitArray} undigested X value, diffie-hellmann result for this key combination,
     * compatible with Java generateSecret().
     */
    dhJavaEc: function(pk) {},

    getType: function() {
        return "elGamal";
    }
};

/** ecdsa keys */
sjcl.ecc.ecdsa = {
    /** generate keys
     * @function
     * @param curve
     * @param {int} paranoia Paranoia for generation (default 6)
     * @param {secretKey} sec secret Key to use. used to get the publicKey for ones secretKey
     */
    generateKeys: function(){
    return { public: {}, private: {}}
    }
};

/** ecdsa publicKey.
 * @constructor
 * @augments sjcl.ecc.basicKey.publicKey
 */
sjcl.ecc.ecdsa.publicKey = function(curve, point) {};

/** specific functions for ecdsa publicKey. */
sjcl.ecc.ecdsa.publicKey.prototype = {
    /** Diffie-Hellmann function
     * @param {bitArray} hash hash to verify.
     * @param {bitArray} rs signature bitArray.
     * @param {boolean}  fakeLegacyVersion use old legacy version
     */
    verify: function(hash, rs, fakeLegacyVersion) {
        return this.verify;
    },

    getType: function() {
        return "ecdsa";
    }
};

/** ecdsa secretKey
 * @constructor
 * @augments sjcl.ecc.basicKey.publicKey
 */
sjcl.ecc.ecdsa.secretKey = function(curve, exponent) {};

/** specific functions for ecdsa secretKey. */
sjcl.ecc.ecdsa.secretKey.prototype = {
    /** Diffie-Hellmann function
     * @param {bitArray} hash hash to sign.
     * @param {int} paranoia paranoia for random number generation
     * @param {boolean} fakeLegacyVersion use old legacy version
     */
    sign: function(hash, paranoia, fakeLegacyVersion, fixedKForTesting) {
        return this._curve.G.mult;
    },

    getType: function() {
        return "ecdsa";
    }
};

/**
 * Compute the SRP verifier from the username, password, salt, and group.
 * @class SRP
 */
sjcl.keyexchange.srp = {
    /**
     * Calculates SRP v, the verifier.
     *   v = g^x mod N [RFC 5054]
     * @param {String} I The username.
     * @param {String} P The password.
     * @param {Object} s A bitArray of the salt.
     * @param {Object} group The SRP group. Use sjcl.keyexchange.srp.knownGroup
     to obtain this object.
     * @return {Object} A bitArray of SRP v.
     */
    makeVerifier: function(I, P, s, group) {},

    /**
     * Calculates SRP x.
     *   x = SHA1(<salt> | SHA(<username> | ":" | <raw password>)) [RFC 2945]
     * @param {String} I The username.
     * @param {String} P The password.
     * @param {Object} s A bitArray of the salt.
     * @return {Object} A bitArray of SRP x.
     */
    makeX: function(I, P, s) {},

    /**
     * Returns the known SRP group with the given size (in bits).
     * @param {String} i The size of the known SRP group.
     * @return {Object} An object with "N" and "g" properties.
     */
    knownGroup: function(i) {}
};

/** @namespace CTR mode with CBC MAC. */

sjcl.arrayBuffer = sjcl.arrayBuffer || {};


sjcl.arrayBuffer.ccm = {
    mode: "ccm",

    defaults: {
        tlen: 128 //this is M in the NIST paper
    },

    /** Encrypt in CCM mode. Meant to return the same exact thing as the bitArray ccm to work as a drop in replacement
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} plaintext The plaintext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=64] the desired tag length, in bits.
     * @return {bitArray} The encrypted data, an array of bytes.
     */
    compat_encrypt: function(prf, plaintext, iv, adata, tlen) {},

    /** Decrypt in CCM mode. Meant to imitate the bitArray ccm
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {bitArray} ciphertext The ciphertext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} [adata=[]] The authenticated data.
     * @param {Number} [tlen=64] The desired tag length, in bits.
     * @return {bitArray} The decrypted data.
     */
    compat_decrypt: function(prf, ciphertext, iv, adata, tlen) {},

    /** Really fast ccm encryption, uses arraybufer and mutates the plaintext buffer
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {ArrayBuffer} plaintext_buffer The plaintext data.
     * @param {bitArray} iv The initialization value.
     * @param {ArrayBuffer} adata The authenticated data.
     * @param {Number} tlen the desired tag length, in bits.
     * @param {*} ol
     * @return {ArrayBuffer} The encrypted data, in the same array buffer as the given plaintext, but given back anyways
     */
    encrypt: function(prf, plaintext_buffer, iv, adata, tlen, ol) {
        return {
            'ciphertext_buffer': {},
            'tag': {}
        };
    },

    /** Really fast ccm decryption, uses arraybufer and mutates the given buffer
     * @static
     * @param {Object} prf The pseudorandom function.  It must have a block size of 16 bytes.
     * @param {ArrayBuffer} ciphertext_buffer The Ciphertext data.
     * @param {bitArray} iv The initialization value.
     * @param {bitArray} tag The authentication tag for the ciphertext
     * @param {ArrayBuffer} adata adata The authenticated data.
     * @param {Number} tlen the desired tag length, in bits.
     * @param {*} ol
     * @return {ArrayBuffer} The decrypted data, in the same array buffer as the given buffer, but given back anyways
     */
    decrypt: function(prf, ciphertext_buffer, iv, tag, adata, tlen, ol) {}
};

/** @namespace ArrayBuffer */
sjcl.codec.arrayBuffer = {
    /** Convert from a bitArray to an ArrayBuffer.
     * Will default to 8byte padding if padding is undefined*/
    fromBits: function(arr, padding, padding_count) {},
    toBits: function(buffer) {},
    hexDumpBuffer: function(buffer) {}
};

/**
 * Context for a RIPEMD-160 operation in progress.
 * @constructor
 * @class RIPEMD, 160 bits.
 */
sjcl.hash.ripemd160 = function(hash) {};

/**
 * Hash a string or an array of words.
 * @static
 * @param {bitArray|String} data the data to hash.
 * @return {bitArray} The hash value, an array of 5 big-endian words.
 */
sjcl.hash.ripemd160.hash = function(data) {};

sjcl.hash.ripemd160.prototype = {
    /**
     * Reset the hash state.
     * @return this
     */
    reset: function() {},

    /**
     * Reset the hash state.
     * @param {bitArray|String} data the data to hash.
     * @return this
     */
    update: function(data) {},

    /**
     * Complete hashing and output the hash value.
     * @return {bitArray} The hash value, an array of 5 big-endian words.
     */
    finalize: function() {}
};


/** @namespace SHA3. */
var sha3 = {
   /** @constructor */
    Keccak: function(){},
    /** @constructor */
    SHA3:  function(){},
    /** @constructor */
    SHA3Hash: function(){}
    };

