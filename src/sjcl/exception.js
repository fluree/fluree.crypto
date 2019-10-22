
/** fileOverview Javascript cryptography implementation.
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
 * @noinline
 * @export
 */
sjcl.exception.corrupt = function(message) {
      this.toString = function() { return "CORRUPT: "+this.message; };
      this.message = message;
}

/**
 * Invalid parameter.
 * @noinline
 * @export
 */
sjcl.exception.invalid = function(message) {
      this.toString = function() { return "INVALID: "+this.message; };
      this.message = message;
}

/**
 * Bug or missing feature in SJCL.
 * @noinline
 * @export
 */
sjcl.exception.bug = function(message) {
      this.toString = function() { return "BUG: "+this.message; };
      this.message = message;
}

/**
 * Something isn't ready.
 * @noinline
 * @export
 */
sjcl.exception.notReady = function(message) {
      this.toString = function() { return "NOT READY: "+this.message; };
      this.message = message;
}
