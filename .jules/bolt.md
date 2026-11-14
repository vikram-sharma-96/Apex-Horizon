## 2025-02-27 - React Re-render Bottleneck with SVG
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there are 6 health bars, each with 10 `PixelHeartIcon` components. Each icon renders ~40 SVG `<rect>` elements. Without memoization, React reconciles ~2400 SVG nodes 20 times per second, causing unnecessary CPU load.
**Action:** Use `React.memo()` on purely presentational components with primitive props that are rendered frequently (especially those rendering many nested DOM/SVG nodes) to prevent wasteful reconciliations on every state update.

## 2025-03-04 - RacingCanvas Re-renders on 20Hz Telemetry
**Learning:** The massive Three.js `RacingCanvas` component receives a `onTelemetryUpdate` prop which drives the HUD state in `App.tsx`. Because `App.tsx` re-renders at 20Hz, it forces React to diff the entire component tree of `RacingCanvas` (which is highly expensive) even though its props remain structurally the same.
**Action:** Always verify if complex 3D WebGL components or canvas wrappers are memoized when their parents contain frequently updating state (like telemetry or animations) to avoid expensive main-thread reconciliations.
## 2025-03-05 - React Re-render Bottleneck in GarageModal
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there is a `GarageModal` component which is a very heavy 3D showroom utilizing Three.js and complex customizer UI elements. Without memoization, React reconciles this huge component tree at 20Hz, causing severe unnecessary CPU load when the modal is open in the background (or even when just mounted).
**Action:** Use `React.memo()` on purely presentational or layout-heavy components (like `GarageModal`) when they are rendered inside a parent (`App.tsx`) that has highly frequent state updates (like telemetry). This prevents wasteful reconciliations.
## 2026-11-11 - Object Allocation in requestAnimationFrame
**Learning:** Found a performance bottleneck where a new config object (`aiDifficultyConfig`) was being allocated inside the `animate` loop (running at 60 FPS) in `RacingCanvas.tsx`. This creates unnecessary objects on every frame, leading to garbage collection (GC) thrashing and potential frame drops.
**Action:** Always extract static configuration objects or arrays outside of high-frequency loops like `requestAnimationFrame` (using module-scope constants or `useMemo`) to conform to the zero-GC optimization pattern.
