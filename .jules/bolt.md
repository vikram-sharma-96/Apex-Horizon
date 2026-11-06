## 2025-02-27 - React Re-render Bottleneck with SVG
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there are 6 health bars, each with 10 `PixelHeartIcon` components. Each icon renders ~40 SVG `<rect>` elements. Without memoization, React reconciles ~2400 SVG nodes 20 times per second, causing unnecessary CPU load.
**Action:** Use `React.memo()` on purely presentational components with primitive props that are rendered frequently (especially those rendering many nested DOM/SVG nodes) to prevent wasteful reconciliations on every state update.

## 2025-03-04 - RacingCanvas Re-renders on 20Hz Telemetry
**Learning:** The massive Three.js `RacingCanvas` component receives a `onTelemetryUpdate` prop which drives the HUD state in `App.tsx`. Because `App.tsx` re-renders at 20Hz, it forces React to diff the entire component tree of `RacingCanvas` (which is highly expensive) even though its props remain structurally the same.
**Action:** Always verify if complex 3D WebGL components or canvas wrappers are memoized when their parents contain frequently updating state (like telemetry or animations) to avoid expensive main-thread reconciliations.
