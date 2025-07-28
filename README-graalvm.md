# GraalVM Native Image Compatibility

This library has been designed to be compatible with GraalVM native image compilation.

## Key Compatibility Features

- **Java 17+ native Ed25519 support**: Uses EdECPrivateKeySpec/EdECPublicKeySpec for key management
- **Provided GraalVM configuration**:
  - `graalvm-config/native-image.properties` - Runtime initialization settings
  - `graalvm-config/reflect-config.json` - Reflection configuration for Ed25519 APIs
  - `graalvm-config/resource-config.json` - Resource inclusion patterns

## Usage with GraalVM Native Image

### Option 1: Use provided configuration
```bash
native-image --no-server \
  -H:ConfigurationFileDirectories=graalvm-config \
  -cp your-classpath \
  your.main.Class
```

### Option 2: Manual configuration
```bash
native-image --no-server \
  --initialize-at-run-time=java.security.SecureRandom \
  --initialize-at-run-time=sun.security.provider.NativePRNG \
  --enable-url-protocols=https,http \
  -cp your-classpath \
  your.main.Class
```

## Requirements

- **Java 17+**: Required for native Ed25519 support via EdECPrivateKeySpec/EdECPublicKeySpec
- **GraalVM 21.0+**: Recommended for best compatibility

## Supported Algorithms

- ✅ **Ed25519**: Full support (signing, verification, key generation)
- ✅ **SHA-256/SHA-512**: Native Java implementation
- ✅ **AES-CBC**: Native Java implementation
- ✅ **JWS**: JSON Web Signatures with Ed25519
- ✅ **DID**: Decentralized identifiers (did:key method)

## Platform Notes

- **Clojure**: Uses Java's native cryptographic implementations
- **ClojureScript**: Uses @noble/ed25519 (not affected by GraalVM)

## Testing Native Image

### Quick Test Script

A test script is provided at `test-native-image.sh` that will verify the library works with GraalVM:

```bash
./test-native-image.sh
```

This script will:
1. Check for GraalVM and Java 17+
2. Compile the test class
3. Build a native image
4. Run tests to verify functionality

### Manual Testing

You can also create your own test:

```clojure
(ns test-native
  (:require [fluree.crypto :as crypto])
  (:gen-class))

(defn -main [& args]
  (println "Testing fluree.crypto with GraalVM native image...\n")
  
  ;; Test key generation
  (let [kp (crypto/generate-key-pair)]
    (println "✅ Key pair generated")
    (println "  Private key:" (subs (:private kp) 0 16) "...")
    (println "  Public key:" (subs (:public kp) 0 16) "..."))
  
  ;; Test signing and verification
  (let [kp (crypto/generate-key-pair)
        message "Hello GraalVM!"
        signature (crypto/sign-message message (:private kp))
        verified (crypto/verify-signature (:public kp) message signature)]
    (println "\n✅ Message signed and verified:" verified))
  
  ;; Test JWS
  (let [kp (crypto/generate-key-pair)
        payload "test payload"
        jws (crypto/create-jws payload kp)
        result (crypto/verify-jws jws (:public kp))]
    (println "\n✅ JWS created and verified")
    (println "  Payload recovered:" (:payload result)))
  
  ;; Test hashing
  (let [hash (crypto/sha2-256 "test")]
    (println "\n✅ SHA-256 hash:" hash))
  
  ;; Test account ID generation
  (let [kp (crypto/generate-key-pair)
        account-id (crypto/account-id-from-public (:public kp))]
    (println "\n✅ Account ID generated:" account-id))
  
  (println "\n🎉 All tests passed! fluree.crypto works with GraalVM native image!"))
```

Then compile and run:
```bash
# Compile
clojure -M -e "(binding [*compile-path* \"classes\"] (compile 'test-native))"

# Create native image
native-image -H:ConfigurationFileDirectories=graalvm-config \
  -cp $(clojure -Spath):classes \
  test_native

# Run
./test_native
```

## Known Limitations

- No dynamic algorithm loading - all algorithms are statically compiled
- Reflection is limited to configured classes in `reflect-config.json`
- Some JDK crypto providers may not work in native image

## Troubleshooting

If you encounter issues:

1. **Reflection errors**: Add missing classes to `graalvm-config/reflect-config.json`
2. **Initialization errors**: Add problematic classes to runtime initialization
3. **Missing resources**: Add patterns to `graalvm-config/resource-config.json`

## Example Project

See `test_native.clj` for a complete example that demonstrates all major functionality working in a native image.