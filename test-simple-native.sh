#!/bin/bash

# Simplified GraalVM native image test
set -e

echo "🔧 Simple GraalVM native image test for fluree.crypto..."

# Test that the library works in regular JVM first
echo "🧪 Testing library functionality..."
clojure -M -m test-native

if [ $? -eq 0 ]; then
    echo "✅ Library works correctly in JVM"
else
    echo "❌ Library test failed in JVM"
    exit 1
fi

# Try a minimal native image compilation
echo "🔧 Attempting minimal native image compilation..."
mkdir -p classes
clojure -M -e "(binding [*compile-path* \"classes\"] (compile 'test-native))"

CLASSPATH=$(clojure -Spath):classes

# Simplified native image build - let GraalVM auto-detect what it needs
native-image \
    --no-fallback \
    --report-unsupported-elements-at-runtime \
    -cp "$CLASSPATH" \
    test_native \
    -o fluree-crypto-test-simple

if [ $? -eq 0 ]; then
    echo "✅ Native image compilation successful!"
    
    echo "🧪 Running native executable..."
    ./fluree-crypto-test-simple
    
    if [ $? -eq 0 ]; then
        echo "🎉 SUCCESS! fluree.crypto works with GraalVM native image!"
        # Clean up
        rm -f fluree-crypto-test-simple
        exit 0
    else
        echo "❌ Native executable failed to run"
        exit 1
    fi
else
    echo "❌ Native image compilation failed"
    exit 1
fi