## 2025-02-27 - React Re-render Bottleneck with SVG
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there are 6 health bars, each with 10 `PixelHeartIcon` components. Each icon renders ~40 SVG `<rect>` elements. Without memoization, React reconciles ~2400 SVG nodes 20 times per second, causing unnecessary CPU load.
**Action:** Use `React.memo()` on purely presentational components with primitive props that are rendered frequently (especially those rendering many nested DOM/SVG nodes) to prevent wasteful reconciliations on every state update.

## 2026-11-03 - React Re-render Bottleneck with Heavy Three.js Child Component
**Learning:** `App.tsx` holds a `telemetry` state object which is updated at ~20Hz by `RacingCanvas` during the animation loop. Because `RacingCanvas` is a child of `App.tsx` and is not memoized, this causes `RacingCanvas` (a component that manages a heavy Three.js context) to re-render 20 times a second even though its props (`trackTheme`, `livery`, etc.) remain stable.
**Action:** When a parent component manages high-frequency state updates (like telemetry or animations), ensure that heavy child components (like WebGL canvases or complex SVGs) that rely on stable props are wrapped in `React.memo()` to prevent continuous and unnecessary React reconciliation overhead.
