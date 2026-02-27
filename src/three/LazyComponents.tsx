/**
 * Lazy-loaded components to reduce initial bundle size
 * These components are loaded on demand
 */

import { lazy, Suspense } from 'react';

// Lazy load easter eggs (they're big and not critical for initial render)
const AdvancedEasterEggsLazy = lazy(() =>
  import('./AdvancedEasterEggs').then((module) => ({
    default: module.AdvancedEasterEggs,
  }))
);

const EasterEggsLazy = lazy(() =>
  import('./EasterEggs').then((module) => ({
    default: module.EasterEggs,
  }))
);

// Lazy load post-processing (heavy, only needed on high quality)
const PostProcessingLazy = lazy(() =>
  import('./PostProcessing').then((module) => ({
    default: module.PostProcessing,
  }))
);

/**
 * Wrapper for AdvancedEasterEggs with loading fallback
 */
export function LazyAdvancedEasterEggs() {
  return (
    <Suspense fallback={null}>
      <AdvancedEasterEggsLazy />
    </Suspense>
  );
}

/**
 * Wrapper for EasterEggs with loading fallback
 */
export function LazyEasterEggs() {
  return (
    <Suspense fallback={null}>
      <EasterEggsLazy />
    </Suspense>
  );
}

/**
 * Wrapper for PostProcessing with loading fallback
 */
export function LazyPostProcessing() {
  return (
    <Suspense fallback={null}>
      <PostProcessingLazy />
    </Suspense>
  );
}
