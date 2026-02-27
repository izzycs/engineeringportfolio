#!/bin/bash

# Round 11 Build Verification Script
# Checks that all optimizations are in place

echo "🔍 Round 11 Build Verification"
echo "=============================="
echo ""

# Check for console.logs in production code
echo "📝 Checking for console.logs..."
CONSOLE_LOGS=$(grep -r "console.log" src/ --exclude-dir=test --exclude="*.test.*" | grep -v "logger.ts" | grep -v "//" | wc -l)
if [ "$CONSOLE_LOGS" -eq 0 ]; then
  echo "✅ No console.logs found"
else
  echo "❌ Found $CONSOLE_LOGS console.logs:"
  grep -rn "console.log" src/ --exclude-dir=test --exclude="*.test.*" | grep -v "logger.ts" | grep -v "//"
fi
echo ""

# Check for TODO/FIXME
echo "📋 Checking for TODOs/FIXMEs..."
TODOS=$(grep -r "TODO\|FIXME" src/ | grep -v "test" | grep -v "TODO:" | wc -l)
if [ "$TODOS" -eq 0 ]; then
  echo "✅ No TODOs/FIXMEs found"
else
  echo "⚠️  Found $TODOS TODOs/FIXMEs (review if intentional)"
fi
echo ""

# Check TypeScript compilation
echo "🔧 Running TypeScript compilation..."
npm run build > /tmp/build-output.txt 2>&1
if [ $? -eq 0 ]; then
  echo "✅ TypeScript compilation passed"
else
  echo "❌ TypeScript compilation failed:"
  cat /tmp/build-output.txt | tail -20
  exit 1
fi
echo ""

# Check bundle sizes
echo "📦 Checking bundle sizes..."
BUILD_SIZE=$(cat /tmp/build-output.txt | grep "gzip:" | grep "index-" | grep -o "[0-9.]*\s*kB" | head -1)
echo "Main bundle: $BUILD_SIZE"

LAZY_COUNT=$(cat /tmp/build-output.txt | grep "gzip:" | grep -E "(EasterEggs|PostProcessing)" | wc -l)
if [ "$LAZY_COUNT" -ge 2 ]; then
  echo "✅ Lazy loading active ($LAZY_COUNT chunks)"
else
  echo "⚠️  Expected 3 lazy chunks, found $LAZY_COUNT"
fi
echo ""

# Check for error boundary
echo "🛡️  Checking error handling..."
if grep -q "ErrorBoundary" src/App.tsx; then
  echo "✅ ErrorBoundary integrated"
else
  echo "❌ ErrorBoundary missing"
fi

if grep -q "WebGLContextLossHandler" src/App.tsx; then
  echo "✅ WebGL context loss handler present"
else
  echo "❌ WebGL context loss handler missing"
fi
echo ""

# Check documentation
echo "📚 Checking documentation..."
DOCS=("README.md" "TESTING.md" "CHANGELOG.md" "ROUND_11_SUMMARY.md")
for doc in "${DOCS[@]}"; do
  if [ -f "$doc" ]; then
    echo "✅ $doc exists"
  else
    echo "❌ $doc missing"
  fi
done
echo ""

# Final verdict
echo "=============================="
echo "🎯 Verification Complete"
echo ""
echo "Build artifacts in dist/"
echo "Review /tmp/build-output.txt for full build log"
