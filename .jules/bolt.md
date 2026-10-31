## 2025-02-27 - React Re-render Bottleneck with SVG
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there are 6 health bars, each with 10 `PixelHeartIcon` components. Each icon renders ~40 SVG `<rect>` elements. Without memoization, React reconciles ~2400 SVG nodes 20 times per second, causing unnecessary CPU load.
**Action:** Use `React.memo()` on purely presentational components with primitive props that are rendered frequently (especially those rendering many nested DOM/SVG nodes) to prevent wasteful reconciliations on every state update.

## 2024-05-14 - Precomputed SVG Paths for React Render Performance
**Learning:** Using inline `.map` over multidimensional arrays inside a React SVG component (like `PixelHeartIcon`) during high-frequency render scenarios creates excessive DOM nodes (`<rect>`) and triggers unnecessary JS computation.
**Action:** When a pixel-art SVG has a small, finite number of states, precalculate the output into static `<path>` elements. This drastically reduces React render tree depth, reconciler overhead, and JS execution time during animation frames.
