#!/bin/bash

# Quick test script for GraalVM native image compilation
# This script tests if fluree.crypto can compile to native image

set -e

echo "🔧 Testing GraalVM native image compilation for fluree.crypto..."

# Check if GraalVM is available
if ! command -v native-image &> /dev/null; then
    echo "❌ native-image command not found"
    echo "Please install GraalVM and ensure native-image is in your PATH"
    echo "See: https://www.graalvm.org/downloads/"
    exit 1
fi

echo "✅ GraalVM native-image found: $(native-image --version | head -1)"

# Check Java version (need 17+ for modern Ed25519 features)
JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java $JAVA_VERSION detected. This version requires Java 17+"
    exit 1
fi

echo "✅ Java version: $(java -version 2>&1 | head -1)"

# Create output directory
mkdir -p target/native-test

# Create classes directory
mkdir -p classes

# Compile the test class
echo "🔧 Compiling test class..."
clojure -M -e "(binding [*compile-path* \"classes\"] (compile 'test-native))"

# Get the classpath
CLASSPATH=$(clojure -Spath):classes

echo "🔧 Building native image..."
native-image \
    --no-server \
    --no-fallback \
    -H:ConfigurationFileDirectories=graalvm-config \
    --initialize-at-run-time=java.security.SecureRandom \
    --initialize-at-run-time=sun.security.provider.NativePRNG \
    --enable-url-protocols=https,http \
    -cp "$CLASSPATH" \
    -H:Name=target/native-test/fluree-crypto-test \
    test_native

if [ $? -eq 0 ]; then
    echo "✅ Native image compilation successful!"
    
    echo "🧪 Running native image test..."
    ./target/native-test/fluree-crypto-test
    
    if [ $? -eq 0 ]; then
        echo "🎉 Native image test passed!"
        echo "fluree.crypto is fully GraalVM native image compatible!"
    else
        echo "❌ Native image test failed"
        exit 1
    fi
else
    echo "❌ Native image compilation failed"
    exit 1
fi