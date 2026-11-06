## 2025-02-27 - React Re-render Bottleneck with SVG
**Learning:** Found a performance bottleneck where a React component (`App`) re-renders every 50ms due to telemetry updates. Inside `App`, there are 6 health bars, each with 10 `PixelHeartIcon` components. Each icon renders ~40 SVG `<rect>` elements. Without memoization, React reconciles ~2400 SVG nodes 20 times per second, causing unnecessary CPU load.
**Action:** Use `React.memo()` on purely presentational components with primitive props that are rendered frequently (especially those rendering many nested DOM/SVG nodes) to prevent wasteful reconciliations on every state update.

## 2025-03-04 - RacingCanvas Re-renders on 20Hz Telemetry
**Learning:** The massive Three.js `RacingCanvas` component receives a `onTelemetryUpdate` prop which drives the HUD state in `App.tsx`. Because `App.tsx` re-renders at 20Hz, it forces React to diff the entire component tree of `RacingCanvas` (which is highly expensive) even though its props remain structurally the same.
**Action:** Always verify if complex 3D WebGL components or canvas wrappers are memoized when their parents contain frequently updating state (like telemetry or animations) to avoid expensive main-thread reconciliations.

## 2025-03-05 - Static SVG Paths for Procedural Pixel Art
**Learning:** The `PixelHeartIcon` component dynamically mapped over a string array to create ~34 `<rect>` elements per instance. With up to 60 instances rendered across rival overlays and the player HUD, this meant React was managing over 2,040 `<rect>` DOM nodes just for health bars. Replacing dynamic arrays of primitives with precomputed `d` attributes in static `<path>` elements vastly reduces the DOM footprint and bypasses the array map/filter overhead on render.
**Action:** Always precompute complex, unchanging vector graphics into a single static SVG `<path>` rather than mapping arrays to individual primitive elements (like `<rect>` or `<circle>`) when an element will be instantiated frequently.
