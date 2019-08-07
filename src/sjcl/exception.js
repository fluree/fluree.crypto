
/** @fileOverview Javascript cryptography implementation.
 *
 * Crush to remove comments, shorten variable names and
 * generally reduce transmission size.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

goog.provide('sjcl.exception');


/**
 * Ciphertext is corrupt.
 * @constructor
 */
sjcl.exception.corrupt = function(message) {
      this.toString = function() { return "CORRUPT: "+this.message; };
      this.message = message;
}

/**
 * Invalid parameter.
 * @constructor
 */
sjcl.exception.invalid = function(message) {
      this.toString = function() { return "INVALID: "+this.message; };
      this.message = message;
}

/**
 * Bug or missing feature in SJCL.
 * @constructor
 */
sjcl.exception.bug = function(message) {
      this.toString = function() { return "BUG: "+this.message; };
      this.message = message;
}

/**
 * Something isn't ready.
 * @constructor
 */
sjcl.exception.notReady = function(message) {
      this.toString = function() { return "NOT READY: "+this.message; };
      this.message = message;
}
