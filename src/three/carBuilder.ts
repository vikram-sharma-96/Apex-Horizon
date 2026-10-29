import * as THREE from 'three';
import {
  CAR_CATALOG,
  CarBodyVariant,
  CarLivery,
  CarModelId,
  StripeStyleId,
} from '../types/racing';

export { CAR_CATALOG };

/**
 * Default player car paint colour: Pearl White (slightly grey #E8E8EC so highlights
 * and body contours never blow out under directional sunlight).
 */
export const DEFAULT_CAR_PAINT_HEX = '#E8E8EC';
export const BLOOM_LAYER = 1;

export interface CompositeCarRig {
  carModelId: CarModelId;
  root: THREE.Group;
  bodyTiltGroup: THREE.Group;
  paintMaterials: THREE.MeshPhysicalMaterial[];
  accentMaterials: THREE.MeshStandardMaterial[];
  rimMaterials: THREE.MeshStandardMaterial[];
  bodyTrimMaterial: THREE.MeshStandardMaterial;
  basePaintColor: THREE.Color;
  baseAccentColor: THREE.Color;
  baseTrimColor: THREE.Color;
  damageCrackGroup: THREE.Group;
  damageCrackMaterial: THREE.MeshBasicMaterial;
  currentDamageStage: number;
  brakeLightMaterial: THREE.MeshStandardMaterial;
  exhaustGlowMaterial: THREE.MeshStandardMaterial;
  frontWheelPivots: THREE.Group[];
  wheelSpinMeshes: THREE.Object3D[];
  nitroFlames: THREE.Mesh[];
  headlightCones: THREE.Mesh[];
  variantGroups: {
    coupe: THREE.Group;
    widebody: THREE.Group;
    race: THREE.Group;
  };
  stripeGroups: {
    twin: THREE.Group;
    rally: THREE.Group;
  };
}

interface SharedMuscleCoupeAssets {
  shadowGeo: THREE.PlaneGeometry;
  lowerChassisGeo: THREE.BufferGeometry;
  cabinGreenhouseGeo: THREE.BufferGeometry;
  hoodBulgeGeo: THREE.BufferGeometry;
  hoodVentGeo: THREE.BufferGeometry;
  frontFenderGeo: THREE.BufferGeometry;
  rearHaunchGeo: THREE.BufferGeometry;
  rearFenderBlisterGeo: THREE.BufferGeometry;
  widebodyFrontFlareGeo: THREE.BufferGeometry;
  widebodyRearFlareGeo: THREE.BufferGeometry;
  widebodyCanardGeo: THREE.BufferGeometry;
  widebodyRockerBladeGeo: THREE.BufferGeometry;
  wheelArchTrimFrontGeo: THREE.BufferGeometry;
  wheelArchTrimRearGeo: THREE.BufferGeometry;
  wheelWellLinerGeo: THREE.CylinderGeometry;
  sideSkirtGeo: THREE.BufferGeometry;
  frontBumperBeamGeo: THREE.BufferGeometry;
  frontSplitterGeo: THREE.BufferGeometry;
  raceSplitterGeo: THREE.BufferGeometry;
  upperGrilleGeo: THREE.BufferGeometry;
  lowerGrilleGeo: THREE.BufferGeometry;
  fogPocketGeo: THREE.BufferGeometry;
  fogSlatGeo: THREE.BufferGeometry;
  headlightHousingGeo: THREE.BufferGeometry;
  projectorLensGeo: THREE.CylinderGeometry;
  drlBarGeo: THREE.BufferGeometry;
  sideMarkerGeo: THREE.BufferGeometry;
  windshieldGeo: THREE.BufferGeometry;
  rearWindowGeo: THREE.BufferGeometry;
  sideWindowGeo: THREE.BufferGeometry;
  interiorCabinGeo: THREE.BufferGeometry;
  mirrorStalkGeo: THREE.CylinderGeometry;
  mirrorCapGeo: THREE.BufferGeometry;
  mirrorGlassGeo: THREE.PlaneGeometry;
  doorHandleGeo: THREE.BufferGeometry;
  doorSeamGeo: THREE.BufferGeometry;
  coupeLipSpoilerGeo: THREE.BufferGeometry;
  coupeLipEdgeGeo: THREE.BufferGeometry;
  raceWingDeckGeo: THREE.BufferGeometry;
  raceWingStrutGeo: THREE.BufferGeometry;
  raceWingEndplateGeo: THREE.BufferGeometry;
  rearPanelGeo: THREE.BufferGeometry;
  tailStripGeo: THREE.BufferGeometry;
  tailBarGeo: THREE.BufferGeometry;
  diffuserBaseGeo: THREE.BufferGeometry;
  diffuserFinGeo: THREE.BufferGeometry;
  exhaustOuterGeo: THREE.CylinderGeometry;
  exhaustInnerGeo: THREE.CylinderGeometry;
  flameGeo: THREE.ConeGeometry;
  headlightConeGeo: THREE.ConeGeometry;
  tireGeo: THREE.LatheGeometry;
  rimBarrelGeo: THREE.CylinderGeometry;
  rimLipGeo: THREE.TorusGeometry;
  rimHubGeo: THREE.CylinderGeometry;
  spokeGeo: THREE.BufferGeometry;
  brakeDiscGeo: THREE.CylinderGeometry;
  caliperGeo: THREE.BufferGeometry;
  // Shared static materials & procedural textures
  grilleTexture: THREE.CanvasTexture;
  darkTrimMat: THREE.MeshStandardMaterial;
  grilleMat: THREE.MeshStandardMaterial;
  tintedGlassMat: THREE.MeshPhysicalMaterial;
  headlightGlassMat: THREE.MeshPhysicalMaterial;
  drlEmissiveMat: THREE.MeshStandardMaterial;
  sideMarkerMat: THREE.MeshStandardMaterial;
  headlightConeMat: THREE.MeshBasicMaterial;
  mirrorReflectMat: THREE.MeshStandardMaterial;
  tireRubberMat: THREE.MeshStandardMaterial;
  brakeDiscMat: THREE.MeshStandardMaterial;
  redCaliperMat: THREE.MeshPhysicalMaterial;
  chromeExhaustMat: THREE.MeshPhysicalMaterial;
  flameMat: THREE.MeshBasicMaterial;
  doorSeamMat: THREE.LineBasicMaterial;
  damageCrackTextures: [
    THREE.CanvasTexture,
    THREE.CanvasTexture,
    THREE.CanvasTexture,
  ];
  hoodCrackGeo: THREE.PlaneGeometry;
  roofCrackGeo: THREE.PlaneGeometry;
  sideCrackGeo: THREE.PlaneGeometry;
  rearCrackGeo: THREE.PlaneGeometry;
}

interface SharedAdditionalCarGeometries {
  // Viper RS (Mid-Engine Wedge Supercar)
  viperHullGeo: THREE.BufferGeometry;
  viperCanopyGeo: THREE.BufferGeometry;
  viperWindshieldGeo: THREE.BufferGeometry;
  viperSidePodGeo: THREE.BufferGeometry;
  viperIntakeScoopGeo: THREE.BufferGeometry;
  viperSplitterGeo: THREE.BufferGeometry;
  viperWingDeckGeo: THREE.BufferGeometry;
  viperWingStrutGeo: THREE.BufferGeometry;
  viperWingEndplateGeo: THREE.BufferGeometry;
  viperLouverGeo: THREE.BufferGeometry;
  // Falcon GT (Sleek Fastback Grand Tourer)
  falconChassisGeo: THREE.BufferGeometry;
  falconFastbackGeo: THREE.BufferGeometry;
  falconWindshieldGeo: THREE.BufferGeometry;
  falconRearGlassGeo: THREE.BufferGeometry;
  falconFenderGeo: THREE.BufferGeometry;
  falconGrilleGeo: THREE.BufferGeometry;
  falconBladeHeadlightGeo: THREE.BufferGeometry;
  falconSpoilerGeo: THREE.BufferGeometry;
  // Titan X (Heavy Rally / Offroad Raid SUV)
  titanBodyGeo: THREE.BufferGeometry;
  titanCabinGeo: THREE.BufferGeometry;
  titanWindshieldGeo: THREE.BufferGeometry;
  titanSideGlassGeo: THREE.BufferGeometry;
  titanFenderFlareGeo: THREE.BufferGeometry;
  titanBullBarTubeGeo: THREE.CylinderGeometry;
  titanBullBarCrossGeo: THREE.CylinderGeometry;
  titanSkidPlateGeo: THREE.BufferGeometry;
  titanRoofRackRailGeo: THREE.CylinderGeometry;
  titanRoofRackCrossGeo: THREE.CylinderGeometry;
  titanRoofLightPodGeo: THREE.BufferGeometry;
  titanTireGeo: THREE.LatheGeometry;
  // Pixel Cube (Retro Blocky Minecraft Voxel Car)
  pixelLowerHullGeo: THREE.BoxGeometry;
  pixelCabinGeo: THREE.BoxGeometry;
  pixelHoodStepGeo: THREE.BoxGeometry;
  pixelBumperGeo: THREE.BoxGeometry;
  pixelWindshieldGeo: THREE.BoxGeometry;
  pixelSideWindowGeo: THREE.BoxGeometry;
  pixelHeadlightGeo: THREE.BoxGeometry;
  pixelTaillightBarGeo: THREE.BoxGeometry;
  pixelSquareTireGeo: THREE.BoxGeometry;
  pixelSquareRimGeo: THREE.BoxGeometry;
  pixelSquareHubGeo: THREE.BoxGeometry;
  // Shared Livery Stripe Geometries
  stripeStripLongGeo: THREE.BoxGeometry;
  stripeStripRoofGeo: THREE.BoxGeometry;
  stripeStripRearGeo: THREE.BoxGeometry;
  stripeSideRockerGeo: THREE.BoxGeometry;
}

let _sharedAssets: SharedMuscleCoupeAssets | null = null;
let _additionalCarGeos: SharedAdditionalCarGeometries | null = null;

/**
 * Generates a crisp Minecraft-style 32x32 pixel-art block crack & dent texture
 * for stage 1 (<=75% HP), stage 2 (<=50% HP), and stage 3 (<=25% HP).
 */
function createBlockyDamageCrackTexture(stage: 1 | 2 | 3): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 64, 64);

  const px = 4; // 16x16 blocky pixel grid scaled to 64x64
  const drawPixel = (gx: number, gy: number, color: string) => {
    if (gx < 0 || gx >= 16 || gy < 0 || gy >= 16) return;
    ctx.fillStyle = color;
    ctx.fillRect(gx * px, gy * px, px, px);
  };

  // Stage 1 (<= 75% HP): Initial blocky dark cracks & small dent patches
  const stage1Pixels: [number, number, string][] = [
    [7, 4, '#090D16'],
    [8, 5, '#090D16'],
    [8, 6, '#1E293B'],
    [7, 7, '#090D16'],
    [6, 8, '#090D16'],
    [9, 7, '#1E293B'],
    [10, 8, '#090D16'],
    [5, 5, '#1E293B'],
    [11, 5, '#090D16'],
    [4, 10, '#090D16'],
    [5, 11, '#1E293B'],
  ];

  // Stage 2 (<= 50% HP): Deeper branching pixel fissures & dark metal dent blocks
  const stage2Pixels: [number, number, string][] = [
    [6, 3, '#090D16'],
    [5, 4, '#090D16'],
    [4, 4, '#1E293B'],
    [9, 4, '#090D16'],
    [10, 4, '#1E293B'],
    [6, 9, '#090D16'],
    [5, 10, '#090D16'],
    [3, 11, '#090D16'],
    [8, 8, '#090D16'],
    [8, 9, '#1E293B'],
    [9, 10, '#090D16'],
    [11, 9, '#090D16'],
    [12, 10, '#1E293B'],
    [12, 11, '#090D16'],
    [3, 6, '#090D16'],
    [4, 7, '#1E293B'],
    [12, 6, '#090D16'],
  ];

  // Stage 3 (<= 25% HP): Heavy shattered Minecraft block cracks & dark char patches
  const stage3Pixels: [number, number, string][] = [
    [2, 2, '#090D16'],
    [3, 3, '#090D16'],
    [4, 3, '#1E293B'],
    [13, 2, '#090D16'],
    [12, 3, '#090D16'],
    [11, 4, '#1E293B'],
    [7, 8, '#05070B'],
    [8, 7, '#05070B'],
    [7, 6, '#05070B'],
    [6, 7, '#05070B'],
    [2, 8, '#090D16'],
    [3, 9, '#1E293B'],
    [2, 12, '#090D16'],
    [3, 13, '#090D16'],
    [7, 11, '#090D16'],
    [8, 12, '#090D16'],
    [8, 13, '#1E293B'],
    [10, 11, '#090D16'],
    [11, 12, '#090D16'],
    [13, 12, '#090D16'],
    [13, 8, '#090D16'],
    [14, 9, '#1E293B'],
  ];

  stage1Pixels.forEach(([x, y, c]) => drawPixel(x, y, c));
  if (stage >= 2) {
    stage2Pixels.forEach(([x, y, c]) => drawPixel(x, y, c));
  }
  if (stage >= 3) {
    stage3Pixels.forEach(([x, y, c]) => drawPixel(x, y, c));
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Helper: Creates a smooth beveled ExtrudeGeometry from a 2D side-profile Shape where:
 * - shape X coordinate = car Z coordinate (-Z is front nose, +Z is rear tail)
 * - shape Y coordinate = car Y coordinate (height above ground)
 * - extrusion depth = car X width (centered around X = 0)
 * Optionally applies a 3D sculpting function `deform(x, y, z)` for trapezoidal cabin taper
 * or curved fender flaring before recomputing smooth vertex normals.
 */
function createSideProfileExtrude(
  shape: THREE.Shape,
  width: number,
  bevelSize: number,
  bevelThickness: number,
  bevelSegments: number = 4,
  curveSegments: number = 16,
  deform?: (x: number, y: number, z: number) => [number, number, number]
): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    steps: 4,
    curveSegments,
    bevelEnabled: bevelSize > 0,
    bevelSize,
    bevelThickness,
    bevelSegments,
  });
  geo.translate(0, 0, -width * 0.5);
  geo.rotateY(-Math.PI / 2);

  if (deform) {
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const [nx, ny, nz] = deform(pos.getX(i), pos.getY(i), pos.getZ(i));
      pos.setXYZ(i, nx, ny, nz);
    }
    pos.needsUpdate = true;
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Helper: Creates a smooth beveled ExtrudeGeometry from a 2D front/rear X-Y profile Shape
 * extruded along the car's Z axis (centered at Z = 0).
 */
function createFrontProfileExtrude(
  shape: THREE.Shape,
  depth: number,
  bevelSize: number,
  bevelThickness: number,
  bevelSegments: number = 3,
  curveSegments: number = 12
): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments,
    bevelEnabled: bevelSize > 0,
    bevelSize,
    bevelThickness,
    bevelSegments,
  });
  geo.translate(0, 0, -depth * 0.5);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Helper: Creates a rounded rectangle 2D shape so no plain sharp boxes are needed.
 */
function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const hw = w * 0.5;
  const hh = h * 0.5;
  const rad = Math.min(r, hw * 0.9, hh * 0.9);
  shape.moveTo(-hw + rad, -hh);
  shape.lineTo(hw - rad, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + rad);
  shape.lineTo(hw, hh - rad);
  shape.quadraticCurveTo(hw, hh, hw - rad, hh);
  shape.lineTo(-hw + rad, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - rad);
  shape.lineTo(-hw, -hh + rad);
  shape.quadraticCurveTo(-hw, -hh, -hw + rad, -hh);
  shape.closePath();
  return shape;
}

/**
 * Trapezoidal Cabin / Greenhouse 3D Deformation:
 * Makes the cabin significantly narrower than the lower body and flares inward toward the roof
 * (a true trapezoid cross-section seen from behind), while also tapering smoothly toward the fastback tail.
 */
function deformTrapezoidCabin(
  x: number,
  y: number,
  z: number
): [number, number, number] {
  const tY = THREE.MathUtils.clamp((y - 0.84) / 0.41, 0, 1);
  const heightTaper = 1.0 - 0.3 * Math.pow(tY, 0.88);
  const rearT = THREE.MathUtils.clamp((z - 0.45) / 1.35, 0, 1);
  const rearTaper = 1.0 - 0.11 * rearT;
  const centerArch = (1.0 - Math.min(1.0, (x * x) / 0.42)) * 0.026 * tY;
  return [x * heightTaper * rearTaper, y + centerArch, z];
}

/**
 * Generates a crisp procedural hexagonal honeycomb grille texture.
 */
function createHoneycombGrilleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#05070B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1E2430';
    ctx.lineWidth = 2.2;
    const r = 8;
    const dx = r * 1.5;
    const dy = r * Math.sqrt(3);

    for (let row = -1; row < canvas.height / dy + 2; row++) {
      for (let col = -1; col < canvas.width / dx + 2; col++) {
        const cx = col * dx;
        const cy = row * dy + (col % 2 === 0 ? 0 : dy * 0.5);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const vx = cx + r * 0.88 * Math.cos(angle);
          const vy = cy + r * 0.88 * Math.sin(angle);
          if (i === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1.5);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates a soft, low-dynamic-range sunset equirectangular reflection environment map
 * so glossy clearcoat paint and tinted glass reflect warm tones without HDR white glare.
 */
export function createStudioEnvironmentTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0.0, '#1A0B2E'); // deep purple zenith
    grad.addColorStop(0.28, '#581C4F'); // twilight violet-rose
    grad.addColorStop(0.46, '#B84A5A'); // sunset pink-coral
    grad.addColorStop(0.52, '#E07A48'); // warm sunset horizon band
    grad.addColorStop(0.56, '#2A1D24'); // dark canyon shadow transition
    grad.addColorStop(1.0, '#120E14'); // dark asphalt underbody reflection
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Builds and caches all shared geometries and common materials for Stallion and common parts.
 */
function getSharedMuscleCoupeAssets(): SharedMuscleCoupeAssets {
  if (_sharedAssets) return _sharedAssets;

  const shadowGeo = new THREE.PlaneGeometry(2.75, 5.25);
  shadowGeo.rotateX(-Math.PI / 2);

  // 1. LOWER BODY CHASSIS (Stallion Muscle Coupe)
  const lowerShape = new THREE.Shape();
  lowerShape.moveTo(-2.14, 0.22);
  lowerShape.lineTo(-2.22, 0.52);
  lowerShape.lineTo(-2.17, 0.7);
  lowerShape.quadraticCurveTo(-1.52, 0.83, -0.56, 0.88);
  lowerShape.lineTo(0.65, 0.86);
  lowerShape.lineTo(1.68, 0.88);
  lowerShape.lineTo(2.1, 0.87);
  lowerShape.lineTo(2.14, 0.68);
  lowerShape.lineTo(2.11, 0.34);
  lowerShape.lineTo(1.75, 0.34);
  lowerShape.absarc(1.34, 0.37, 0.42, 0.05, Math.PI - 0.05, false);
  lowerShape.lineTo(-0.94, 0.23);
  lowerShape.absarc(-1.36, 0.36, 0.42, 0.05, Math.PI - 0.05, false);
  lowerShape.lineTo(-2.14, 0.22);
  lowerShape.closePath();

  const lowerChassisGeo = createSideProfileExtrude(
    lowerShape,
    1.62,
    0.075,
    0.075,
    4,
    16,
    (x, y, z) => {
      let ny = y;
      if (z > 1.62 && Math.abs(x) > 0.64 && y < 0.48) {
        const rearT = THREE.MathUtils.clamp((z - 1.62) / 0.48, 0, 1);
        ny = Math.max(y, 0.36 + 0.11 * rearT);
      }
      return [x, ny, z];
    }
  );

  // 2. NARROWER TRAPEZOIDAL CABIN
  const cabinShape = new THREE.Shape();
  cabinShape.moveTo(-0.62, 0.85);
  cabinShape.lineTo(0.02, 1.225);
  cabinShape.quadraticCurveTo(0.36, 1.25, 0.68, 1.195);
  cabinShape.quadraticCurveTo(1.18, 1.07, 1.72, 0.875);
  cabinShape.lineTo(1.74, 0.84);
  cabinShape.lineTo(-0.62, 0.84);
  cabinShape.closePath();

  const cabinGreenhouseGeo = createSideProfileExtrude(
    cabinShape,
    1.38,
    0.055,
    0.055,
    4,
    18,
    deformTrapezoidCabin
  );

  // 3. LONG HOOD POWER-DOME BULGE & VENTS
  const bulgeShape = new THREE.Shape();
  bulgeShape.moveTo(-2.02, 0.7);
  bulgeShape.quadraticCurveTo(-1.36, 0.885, -0.6, 0.915);
  bulgeShape.lineTo(-0.6, 0.83);
  bulgeShape.quadraticCurveTo(-1.36, 0.8, -2.02, 0.66);
  bulgeShape.closePath();
  const hoodBulgeGeo = createSideProfileExtrude(
    bulgeShape,
    0.66,
    0.055,
    0.055,
    4,
    14,
    (x, y, z) => {
      const frontT = THREE.MathUtils.clamp((-z - 0.6) / 1.45, 0, 1);
      return [x * (1.0 - 0.18 * frontT), y, z];
    }
  );

  const ventRect = createRoundedRectShape(0.16, 0.32, 0.035);
  const hoodVentGeo = new THREE.ExtrudeGeometry(ventRect, {
    depth: 0.018,
    bevelEnabled: true,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    bevelSegments: 2,
  });
  hoodVentGeo.rotateX(Math.PI / 2);
  hoodVentGeo.computeVertexNormals();

  // 4. FRONT FENDERS & WIDE REAR HAUNCHES
  const frontFenderShape = new THREE.Shape();
  frontFenderShape.moveTo(-2.12, 0.24);
  frontFenderShape.lineTo(-2.18, 0.52);
  frontFenderShape.lineTo(-2.13, 0.69);
  frontFenderShape.quadraticCurveTo(-1.5, 0.83, -0.5, 0.87);
  frontFenderShape.lineTo(0.38, 0.85);
  frontFenderShape.lineTo(0.38, 0.23);
  frontFenderShape.lineTo(-0.93, 0.23);
  frontFenderShape.absarc(-1.36, 0.36, 0.425, 0.04, Math.PI - 0.04, false);
  frontFenderShape.lineTo(-2.12, 0.24);
  frontFenderShape.closePath();

  const frontFenderGeo = createSideProfileExtrude(
    frontFenderShape,
    1.76,
    0.08,
    0.08,
    4,
    16,
    (x, y, z) => {
      const sign = Math.sign(x) || 1;
      const absX = Math.abs(x);
      const archCurve = Math.exp(-Math.pow((z + 1.36) / 0.58, 2));
      const doorPinch = THREE.MathUtils.smoothstep(z, -0.55, 0.35);
      const midY = 0.56;
      const vertCurve = Math.max(0, 1.0 - Math.pow((y - midY) / 0.38, 2));
      const flare =
        (0.045 * archCurve - 0.045 * doorPinch) * (absX > 0.65 ? 1 : 0);
      const sideRound = 0.032 * vertCurve * (absX > 0.7 ? 1 : 0);
      return [sign * (absX + flare + sideRound), y, z];
    }
  );

  const rearHaunchShape = new THREE.Shape();
  rearHaunchShape.moveTo(0.18, 0.23);
  rearHaunchShape.lineTo(0.28, 0.84);
  rearHaunchShape.quadraticCurveTo(0.96, 0.955, 1.54, 0.91);
  rearHaunchShape.lineTo(2.08, 0.86);
  rearHaunchShape.lineTo(2.12, 0.66);
  rearHaunchShape.lineTo(2.06, 0.45);
  rearHaunchShape.lineTo(1.75, 0.43);
  rearHaunchShape.absarc(1.34, 0.37, 0.43, 0.08, Math.PI - 0.04, false);
  rearHaunchShape.lineTo(0.18, 0.23);
  rearHaunchShape.closePath();

  const rearHaunchGeo = createSideProfileExtrude(
    rearHaunchShape,
    1.86,
    0.095,
    0.095,
    5,
    18,
    (x, y, z) => {
      const sign = Math.sign(x) || 1;
      const absX = Math.abs(x);
      if (absX < 0.62) return [x, y, z];
      const rearRise = THREE.MathUtils.smoothstep(z, 0.18, 1.15);
      const tailTuck = THREE.MathUtils.smoothstep(z, 1.68, 2.14);
      const longitudinalFlare = rearRise * (1.0 - 0.28 * tailTuck);
      const yNorm = (y - 0.64) / 0.34;
      const verticalCurve = Math.max(-0.35, 1.0 - yNorm * yNorm);
      const topShelfTaper = y > 0.8 ? (y - 0.8) * 0.42 : 0;
      const extraOutward =
        0.075 * longitudinalFlare + 0.045 * verticalCurve - topShelfTaper;
      return [sign * (absX + extraOutward), y, z];
    }
  );

  const blisterShape = new THREE.Shape();
  blisterShape.absarc(1.34, 0.37, 0.52, 0.12, Math.PI - 0.12, false);
  blisterShape.absarc(1.34, 0.37, 0.41, Math.PI - 0.12, 0.12, true);
  blisterShape.closePath();
  const rearFenderBlisterGeo = createSideProfileExtrude(
    blisterShape,
    1.98,
    0.045,
    0.045,
    4,
    18,
    (x, y, z) => {
      const sign = Math.sign(x) || 1;
      const absX = Math.abs(x);
      const archCrown = Math.sin(
        THREE.MathUtils.clamp((y - 0.37) / 0.52, 0, 1) * Math.PI
      );
      return [sign * (absX + 0.025 * archCrown), y, z];
    }
  );

  const wbFrontShape = new THREE.Shape();
  wbFrontShape.absarc(-1.36, 0.36, 0.5, 0.05, Math.PI - 0.05, false);
  wbFrontShape.absarc(-1.36, 0.36, 0.41, Math.PI - 0.05, 0.05, true);
  wbFrontShape.closePath();
  const widebodyFrontFlareGeo = createSideProfileExtrude(
    wbFrontShape,
    2.04,
    0.035,
    0.035,
    3,
    16
  );

  const wbRearShape = new THREE.Shape();
  wbRearShape.absarc(1.34, 0.37, 0.53, 0.06, Math.PI - 0.06, false);
  wbRearShape.absarc(1.34, 0.37, 0.41, Math.PI - 0.06, 0.06, true);
  wbRearShape.closePath();
  const widebodyRearFlareGeo = createSideProfileExtrude(
    wbRearShape,
    2.12,
    0.04,
    0.04,
    3,
    16
  );

  const canardProfile = createRoundedRectShape(2.06, 0.22, 0.04);
  const widebodyCanardGeo = new THREE.ExtrudeGeometry(canardProfile, {
    depth: 0.022,
    bevelEnabled: true,
    bevelSize: 0.006,
    bevelThickness: 0.006,
    bevelSegments: 2,
  });
  widebodyCanardGeo.rotateX(Math.PI / 2);
  widebodyCanardGeo.computeVertexNormals();

  const rockerBladeProfile = createRoundedRectShape(2.08, 1.72, 0.04);
  const widebodyRockerBladeGeo = new THREE.ExtrudeGeometry(rockerBladeProfile, {
    depth: 0.025,
    bevelEnabled: true,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    bevelSegments: 2,
  });
  widebodyRockerBladeGeo.rotateX(Math.PI / 2);
  widebodyRockerBladeGeo.computeVertexNormals();

  const archFrontShape = new THREE.Shape();
  archFrontShape.absarc(-1.36, 0.36, 0.448, -0.02, Math.PI + 0.02, false);
  archFrontShape.absarc(-1.36, 0.36, 0.398, Math.PI + 0.02, -0.02, true);
  archFrontShape.closePath();
  const wheelArchTrimFrontGeo = createSideProfileExtrude(
    archFrontShape,
    1.94,
    0.016,
    0.016,
    2,
    16
  );

  const archRearShape = new THREE.Shape();
  archRearShape.absarc(1.34, 0.37, 0.455, 0.04, Math.PI - 0.02, false);
  archRearShape.absarc(1.34, 0.37, 0.402, Math.PI - 0.02, 0.04, true);
  archRearShape.closePath();
  const wheelArchTrimRearGeo = createSideProfileExtrude(
    archRearShape,
    2.04,
    0.016,
    0.016,
    2,
    16
  );

  const wheelWellLinerGeo = new THREE.CylinderGeometry(
    0.39,
    0.39,
    0.42,
    16,
    1,
    false,
    0,
    Math.PI
  );
  wheelWellLinerGeo.rotateZ(Math.PI / 2);

  const skirtShape = new THREE.Shape();
  skirtShape.moveTo(-0.94, 0.165);
  skirtShape.lineTo(0.91, 0.165);
  skirtShape.lineTo(0.91, 0.245);
  skirtShape.lineTo(-0.94, 0.245);
  skirtShape.closePath();
  const sideSkirtGeo = createSideProfileExtrude(
    skirtShape,
    1.92,
    0.018,
    0.018,
    2,
    6
  );

  const bumperBeamShape = new THREE.Shape();
  bumperBeamShape.moveTo(-2.23, 0.45);
  bumperBeamShape.lineTo(-2.14, 0.45);
  bumperBeamShape.lineTo(-2.14, 0.53);
  bumperBeamShape.lineTo(-2.22, 0.53);
  bumperBeamShape.closePath();
  const frontBumperBeamGeo = createSideProfileExtrude(
    bumperBeamShape,
    1.8,
    0.025,
    0.025,
    2,
    6
  );

  const splitterShape = new THREE.Shape();
  splitterShape.moveTo(-2.27, 0.155);
  splitterShape.lineTo(-1.82, 0.155);
  splitterShape.lineTo(-1.82, 0.205);
  splitterShape.lineTo(-2.25, 0.205);
  splitterShape.closePath();
  const frontSplitterGeo = createSideProfileExtrude(
    splitterShape,
    1.88,
    0.018,
    0.018,
    2,
    6
  );

  const raceSplitterShape = new THREE.Shape();
  raceSplitterShape.moveTo(-2.34, 0.145);
  raceSplitterShape.lineTo(-1.78, 0.145);
  raceSplitterShape.lineTo(-1.78, 0.205);
  raceSplitterShape.lineTo(-2.31, 0.205);
  raceSplitterShape.closePath();
  const raceSplitterGeo = createSideProfileExtrude(
    raceSplitterShape,
    2.02,
    0.018,
    0.018,
    2,
    6
  );

  const upperGrilleShape = new THREE.Shape();
  upperGrilleShape.moveTo(-0.46, 0.53);
  upperGrilleShape.lineTo(0.46, 0.53);
  upperGrilleShape.lineTo(0.38, 0.68);
  upperGrilleShape.lineTo(-0.38, 0.68);
  upperGrilleShape.closePath();
  const upperGrilleGeo = createFrontProfileExtrude(
    upperGrilleShape,
    0.08,
    0.012,
    0.012,
    2,
    8
  );

  const lowerGrilleShape = new THREE.Shape();
  lowerGrilleShape.moveTo(-0.44, 0.21);
  lowerGrilleShape.lineTo(0.44, 0.21);
  lowerGrilleShape.lineTo(0.46, 0.45);
  lowerGrilleShape.lineTo(-0.46, 0.45);
  lowerGrilleShape.closePath();
  const lowerGrilleGeo = createFrontProfileExtrude(
    lowerGrilleShape,
    0.08,
    0.01,
    0.01,
    2,
    8
  );

  const fogPocketShape = createRoundedRectShape(0.26, 0.1, 0.025);
  const fogPocketGeo = createFrontProfileExtrude(
    fogPocketShape,
    0.07,
    0.008,
    0.008,
    2,
    8
  );

  const fogSlatShape = createRoundedRectShape(0.24, 0.012, 0.004);
  const fogSlatGeo = createFrontProfileExtrude(
    fogSlatShape,
    0.08,
    0.003,
    0.003,
    1,
    4
  );

  const hlShape = new THREE.Shape();
  hlShape.moveTo(-0.16, -0.055);
  hlShape.lineTo(0.16, -0.045);
  hlShape.lineTo(0.14, 0.058);
  hlShape.lineTo(-0.17, 0.048);
  hlShape.closePath();
  const headlightHousingGeo = createFrontProfileExtrude(
    hlShape,
    0.12,
    0.012,
    0.012,
    2,
    8
  );

  const projectorLensGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.06, 14);
  projectorLensGeo.rotateX(Math.PI / 2);

  const drlShape = createRoundedRectShape(0.31, 0.02, 0.008);
  const drlBarGeo = createFrontProfileExtrude(
    drlShape,
    0.035,
    0.004,
    0.004,
    1,
    6
  );

  const markerShape = createRoundedRectShape(0.2, 0.016, 0.006);
  const sideMarkerGeo = createFrontProfileExtrude(
    markerShape,
    0.018,
    0.004,
    0.004,
    1,
    6
  );
  sideMarkerGeo.rotateY(Math.PI / 2);

  const wsShape = new THREE.Shape();
  wsShape.moveTo(-0.59, 0.885);
  wsShape.lineTo(0.01, 1.22);
  wsShape.lineTo(0.05, 1.2);
  wsShape.lineTo(-0.54, 0.865);
  wsShape.closePath();
  const windshieldGeo = createSideProfileExtrude(
    wsShape,
    1.24,
    0.012,
    0.012,
    2,
    8,
    deformTrapezoidCabin
  );

  const rwShape = new THREE.Shape();
  rwShape.moveTo(0.64, 1.195);
  rwShape.quadraticCurveTo(1.16, 1.075, 1.69, 0.885);
  rwShape.lineTo(1.65, 0.86);
  rwShape.quadraticCurveTo(1.13, 1.045, 0.61, 1.17);
  rwShape.closePath();
  const rearWindowGeo = createSideProfileExtrude(
    rwShape,
    1.18,
    0.012,
    0.012,
    2,
    12,
    deformTrapezoidCabin
  );

  const swShape = new THREE.Shape();
  swShape.moveTo(-0.48, 0.88);
  swShape.lineTo(0.02, 1.175);
  swShape.quadraticCurveTo(0.36, 1.195, 0.65, 1.14);
  swShape.lineTo(1.04, 0.91);
  swShape.lineTo(-0.48, 0.88);
  swShape.closePath();
  const sideWindowGeo = createSideProfileExtrude(
    swShape,
    1.41,
    0.01,
    0.01,
    2,
    12,
    deformTrapezoidCabin
  );

  const interiorCabinShape = new THREE.Shape();
  interiorCabinShape.moveTo(-0.45, 0.56);
  interiorCabinShape.lineTo(0.95, 0.56);
  interiorCabinShape.lineTo(0.85, 0.86);
  interiorCabinShape.lineTo(-0.42, 0.86);
  interiorCabinShape.closePath();
  const interiorCabinGeo = createSideProfileExtrude(
    interiorCabinShape,
    1.24,
    0.02,
    0.02,
    1,
    4
  );

  const mirrorStalkGeo = new THREE.CylinderGeometry(0.016, 0.022, 0.12, 8);
  mirrorStalkGeo.rotateZ(Math.PI / 2);

  const mirrorCapShape = new THREE.Shape();
  mirrorCapShape.moveTo(-0.06, -0.038);
  mirrorCapShape.lineTo(0.08, -0.032);
  mirrorCapShape.quadraticCurveTo(0.11, 0.0, 0.08, 0.042);
  mirrorCapShape.lineTo(-0.05, 0.038);
  mirrorCapShape.closePath();
  const mirrorCapGeo = createFrontProfileExtrude(
    mirrorCapShape,
    0.085,
    0.016,
    0.016,
    3,
    10
  );

  const mirrorGlassGeo = new THREE.PlaneGeometry(0.115, 0.062);

  const handleShape = createRoundedRectShape(0.16, 0.024, 0.01);
  const doorHandleGeo = createFrontProfileExtrude(
    handleShape,
    0.028,
    0.006,
    0.006,
    2,
    8
  );
  doorHandleGeo.rotateY(Math.PI / 2);

  const seamPts: THREE.Vector3[] = [];
  [-0.955, 0.955].forEach((xSide) => {
    seamPts.push(
      new THREE.Vector3(xSide, 0.25, -0.48),
      new THREE.Vector3(xSide, 0.86, -0.46)
    );
    seamPts.push(
      new THREE.Vector3(xSide, 0.25, -0.48),
      new THREE.Vector3(xSide, 0.25, 0.44)
    );
    seamPts.push(
      new THREE.Vector3(xSide, 0.25, 0.44),
      new THREE.Vector3(xSide, 0.86, 0.4)
    );
  });
  const doorSeamGeo = new THREE.BufferGeometry().setFromPoints(seamPts);

  const lipShape = new THREE.Shape();
  lipShape.moveTo(1.94, 0.865);
  lipShape.quadraticCurveTo(2.04, 0.91, 2.15, 0.965);
  lipShape.lineTo(2.17, 0.925);
  lipShape.lineTo(2.02, 0.855);
  lipShape.closePath();
  const coupeLipSpoilerGeo = createSideProfileExtrude(
    lipShape,
    1.72,
    0.022,
    0.022,
    3,
    12,
    (x, y, z) => {
      const centerCurve = (1.0 - Math.min(1.0, (x * x) / 0.85)) * 0.016;
      return [x, y + centerCurve, z];
    }
  );

  const lipEdgeShape = new THREE.Shape();
  lipEdgeShape.moveTo(2.11, 0.945);
  lipEdgeShape.lineTo(2.165, 0.97);
  lipEdgeShape.lineTo(2.178, 0.935);
  lipEdgeShape.lineTo(2.12, 0.92);
  lipEdgeShape.closePath();
  const coupeLipEdgeGeo = createSideProfileExtrude(
    lipEdgeShape,
    1.7,
    0.01,
    0.01,
    2,
    8
  );

  const wingAirfoilShape = new THREE.Shape();
  wingAirfoilShape.moveTo(1.78, 1.18);
  wingAirfoilShape.quadraticCurveTo(1.96, 1.15, 2.14, 1.23);
  wingAirfoilShape.lineTo(2.15, 1.255);
  wingAirfoilShape.quadraticCurveTo(1.96, 1.19, 1.78, 1.205);
  wingAirfoilShape.closePath();
  const raceWingDeckGeo = createSideProfileExtrude(
    wingAirfoilShape,
    1.96,
    0.012,
    0.012,
    2,
    10
  );

  const strutShape = new THREE.Shape();
  strutShape.moveTo(1.78, 0.87);
  strutShape.lineTo(1.94, 1.19);
  strutShape.lineTo(2.04, 1.19);
  strutShape.lineTo(1.92, 0.87);
  strutShape.closePath();
  const raceWingStrutGeo = createSideProfileExtrude(
    strutShape,
    0.035,
    0.006,
    0.006,
    2,
    6
  );

  const epShape = new THREE.Shape();
  epShape.moveTo(1.72, 1.09);
  epShape.lineTo(2.18, 1.13);
  epShape.lineTo(2.22, 1.29);
  epShape.lineTo(1.76, 1.25);
  epShape.closePath();
  const raceWingEndplateGeo = createSideProfileExtrude(
    epShape,
    0.025,
    0.006,
    0.006,
    2,
    6
  );

  const rearPanelShape = createRoundedRectShape(1.84, 0.18, 0.045);
  const rearPanelGeo = createFrontProfileExtrude(
    rearPanelShape,
    0.06,
    0.012,
    0.012,
    2,
    10
  );

  const tailStripShape = createRoundedRectShape(1.78, 0.048, 0.018);
  const tailStripGeo = createFrontProfileExtrude(
    tailStripShape,
    0.068,
    0.008,
    0.008,
    2,
    10
  );

  const tailBarShape = createRoundedRectShape(0.062, 0.135, 0.018);
  const tailBarGeo = createFrontProfileExtrude(
    tailBarShape,
    0.074,
    0.008,
    0.008,
    2,
    8
  );

  const diffuserShape = new THREE.Shape();
  diffuserShape.moveTo(1.8, 0.16);
  diffuserShape.lineTo(2.14, 0.18);
  diffuserShape.lineTo(2.17, 0.33);
  diffuserShape.lineTo(1.86, 0.3);
  diffuserShape.closePath();
  const diffuserBaseGeo = createSideProfileExtrude(
    diffuserShape,
    1.32,
    0.018,
    0.018,
    2,
    8
  );

  const finShape = new THREE.Shape();
  finShape.moveTo(1.84, 0.15);
  finShape.lineTo(2.17, 0.16);
  finShape.lineTo(2.19, 0.31);
  finShape.lineTo(1.88, 0.28);
  finShape.closePath();
  const diffuserFinGeo = createSideProfileExtrude(
    finShape,
    0.024,
    0.005,
    0.005,
    2,
    6
  );

  const exhaustOuterGeo = new THREE.CylinderGeometry(0.072, 0.078, 0.26, 16);
  exhaustOuterGeo.rotateX(Math.PI / 2);
  const exhaustInnerGeo = new THREE.CylinderGeometry(0.056, 0.056, 0.27, 14);
  exhaustInnerGeo.rotateX(Math.PI / 2);

  const flameGeo = new THREE.ConeGeometry(0.095, 0.9, 10);
  flameGeo.rotateX(Math.PI / 2);

  const headlightConeGeo = new THREE.ConeGeometry(1.6, 14, 14, 1, true);
  headlightConeGeo.rotateX(Math.PI / 2);

  const tireProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.245, -0.158),
    new THREE.Vector2(0.318, -0.175),
    new THREE.Vector2(0.362, -0.148),
    new THREE.Vector2(0.368, 0.0),
    new THREE.Vector2(0.362, 0.148),
    new THREE.Vector2(0.318, 0.175),
    new THREE.Vector2(0.245, 0.158),
    new THREE.Vector2(0.238, 0.0),
    new THREE.Vector2(0.245, -0.158),
  ];
  const tireGeo = new THREE.LatheGeometry(tireProfile, 24);
  tireGeo.rotateZ(Math.PI / 2);
  tireGeo.computeVertexNormals();

  const rimBarrelGeo = new THREE.CylinderGeometry(
    0.246,
    0.246,
    0.29,
    20,
    1,
    true
  );
  rimBarrelGeo.rotateZ(Math.PI / 2);

  const rimLipGeo = new THREE.TorusGeometry(0.244, 0.018, 10, 24);
  rimLipGeo.rotateY(Math.PI / 2);

  const rimHubGeo = new THREE.CylinderGeometry(0.064, 0.07, 0.3, 14);
  rimHubGeo.rotateZ(Math.PI / 2);

  const spokeShape = createRoundedRectShape(0.03, 0.195, 0.008);
  const spokeGeo = createFrontProfileExtrude(
    spokeShape,
    0.02,
    0.004,
    0.004,
    1,
    6
  );
  spokeGeo.rotateY(Math.PI / 2);
  spokeGeo.translate(0, 0.125, 0);

  const brakeDiscGeo = new THREE.CylinderGeometry(0.188, 0.188, 0.034, 18);
  brakeDiscGeo.rotateZ(Math.PI / 2);

  const caliperShape = createRoundedRectShape(0.088, 0.135, 0.022);
  const caliperGeo = createFrontProfileExtrude(
    caliperShape,
    0.068,
    0.008,
    0.008,
    2,
    8
  );
  caliperGeo.rotateY(Math.PI / 2);

  const grilleTexture = createHoneycombGrilleTexture();

  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#12161F'),
    metalness: 0.25,
    roughness: 0.62,
  });

  const grilleMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#181D28'),
    map: grilleTexture,
    bumpMap: grilleTexture,
    bumpScale: 0.015,
    metalness: 0.35,
    roughness: 0.52,
  });

  const tintedGlassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#090E17'),
    metalness: 0.15,
    roughness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.06,
    reflectivity: 0.75,
    envMapIntensity: 0.55,
  });

  const headlightGlassMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0F172A'),
    metalness: 0.2,
    roughness: 0.08,
    clearcoat: 0.85,
    envMapIntensity: 0.45,
  });

  const drlEmissiveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E0F2FE'),
    emissive: new THREE.Color('#BAE6FD'),
    emissiveIntensity: 1.45,
    roughness: 0.2,
    toneMapped: false,
  });

  const sideMarkerMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#CBD5E1'),
    emissive: new THREE.Color('#38BDF8'),
    emissiveIntensity: 0.45,
    roughness: 0.3,
  });

  const headlightConeMat = new THREE.MeshBasicMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });

  const mirrorReflectMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#CBD5E1'),
    metalness: 0.85,
    roughness: 0.12,
    envMapIntensity: 0.55,
  });

  const tireRubberMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#151922'),
    metalness: 0.08,
    roughness: 0.78,
  });

  const brakeDiscMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#94A3B8'),
    metalness: 0.82,
    roughness: 0.28,
    envMapIntensity: 0.5,
  });

  const redCaliperMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#DC2626'),
    metalness: 0.35,
    roughness: 0.25,
    clearcoat: 0.8,
    envMapIntensity: 0.45,
  });

  const chromeExhaustMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#E2E8F0'),
    metalness: 0.9,
    roughness: 0.14,
    clearcoat: 0.85,
    envMapIntensity: 0.6,
  });

  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });

  const doorSeamMat = new THREE.LineBasicMaterial({
    color: 0x1e293b,
    transparent: true,
    opacity: 0.55,
  });

  const damageCrackTextures: [
    THREE.CanvasTexture,
    THREE.CanvasTexture,
    THREE.CanvasTexture,
  ] = [
    createBlockyDamageCrackTexture(1),
    createBlockyDamageCrackTexture(2),
    createBlockyDamageCrackTexture(3),
  ];

  const hoodCrackGeo = new THREE.PlaneGeometry(1.18, 1.15);
  hoodCrackGeo.rotateX(-Math.PI / 2);

  const roofCrackGeo = new THREE.PlaneGeometry(0.92, 0.95);
  roofCrackGeo.rotateX(-Math.PI / 2);

  const sideCrackGeo = new THREE.PlaneGeometry(1.35, 0.44);

  const rearCrackGeo = new THREE.PlaneGeometry(1.12, 0.52);
  rearCrackGeo.rotateX(-Math.PI / 2);

  _sharedAssets = {
    shadowGeo,
    lowerChassisGeo,
    cabinGreenhouseGeo,
    hoodBulgeGeo,
    hoodVentGeo,
    frontFenderGeo,
    rearHaunchGeo,
    rearFenderBlisterGeo,
    widebodyFrontFlareGeo,
    widebodyRearFlareGeo,
    widebodyCanardGeo,
    widebodyRockerBladeGeo,
    wheelArchTrimFrontGeo,
    wheelArchTrimRearGeo,
    wheelWellLinerGeo,
    sideSkirtGeo,
    frontBumperBeamGeo,
    frontSplitterGeo,
    raceSplitterGeo,
    upperGrilleGeo,
    lowerGrilleGeo,
    fogPocketGeo,
    fogSlatGeo,
    headlightHousingGeo,
    projectorLensGeo,
    drlBarGeo,
    sideMarkerGeo,
    windshieldGeo,
    rearWindowGeo,
    sideWindowGeo,
    interiorCabinGeo,
    mirrorStalkGeo,
    mirrorCapGeo,
    mirrorGlassGeo,
    doorHandleGeo,
    doorSeamGeo,
    coupeLipSpoilerGeo,
    coupeLipEdgeGeo,
    raceWingDeckGeo,
    raceWingStrutGeo,
    raceWingEndplateGeo,
    rearPanelGeo,
    tailStripGeo,
    tailBarGeo,
    diffuserBaseGeo,
    diffuserFinGeo,
    exhaustOuterGeo,
    exhaustInnerGeo,
    flameGeo,
    headlightConeGeo,
    tireGeo,
    rimBarrelGeo,
    rimLipGeo,
    rimHubGeo,
    spokeGeo,
    brakeDiscGeo,
    caliperGeo,
    grilleTexture,
    darkTrimMat,
    grilleMat,
    tintedGlassMat,
    headlightGlassMat,
    drlEmissiveMat,
    sideMarkerMat,
    headlightConeMat,
    mirrorReflectMat,
    tireRubberMat,
    brakeDiscMat,
    redCaliperMat,
    chromeExhaustMat,
    flameMat,
    doorSeamMat,
    damageCrackTextures,
    hoodCrackGeo,
    roofCrackGeo,
    sideCrackGeo,
    rearCrackGeo,
  };

  return _sharedAssets;
}

/**
 * Builds and caches shared geometries for Viper RS, Falcon GT, Titan X, Pixel Cube, and Livery Stripes.
 * Each model is kept well under 8,000 triangles and shares vertex buffers across all instances.
 */
function getAdditionalCarGeometries(): SharedAdditionalCarGeometries {
  if (_additionalCarGeos) return _additionalCarGeos;

  // ============================================================================
  // VIPER RS: Low, Wide Mid-Engine Wedge Supercar
  // ============================================================================
  const viperHullShape = new THREE.Shape();
  viperHullShape.moveTo(-2.28, 0.16); // Razor-low wedge nose tip
  viperHullShape.lineTo(-2.32, 0.36); // Sharp wedge leading edge
  viperHullShape.quadraticCurveTo(-1.65, 0.62, -0.92, 0.72); // Low plunge hood
  viperHullShape.lineTo(0.45, 0.74); // Low cockpit beltline
  viperHullShape.quadraticCurveTo(1.22, 0.84, 1.95, 0.8); // Mid-engine deck hump
  viperHullShape.lineTo(2.18, 0.72); // High rear tail fascia
  viperHullShape.lineTo(2.14, 0.32); // High rear diffuser tunnel clearance
  viperHullShape.lineTo(1.75, 0.32);
  viperHullShape.absarc(1.33, 0.35, 0.41, 0.05, Math.PI - 0.05, false);
  viperHullShape.lineTo(-0.92, 0.19);
  viperHullShape.absarc(-1.33, 0.35, 0.41, 0.05, Math.PI - 0.05, false);
  viperHullShape.lineTo(-2.28, 0.16);
  viperHullShape.closePath();

  const viperHullGeo = createSideProfileExtrude(
    viperHullShape,
    1.76,
    0.065,
    0.065,
    4,
    14,
    (x, y, z) => {
      // Taper wedge nose narrower at the front tip and pinch slightly at the waist
      const noseTaper =
        z < -1.1 ? THREE.MathUtils.clamp((-z - 1.1) / 1.25, 0, 1) * 0.18 : 0;
      return [x * (1.0 - noseTaper), y, z];
    }
  );

  const viperCanopyShape = new THREE.Shape();
  viperCanopyShape.moveTo(-1.05, 0.69);
  viperCanopyShape.quadraticCurveTo(-0.45, 1.06, 0.12, 1.07); // Forward-shifted fighter-jet canopy peak (height 1.08m)
  viperCanopyShape.quadraticCurveTo(0.78, 1.04, 1.48, 0.81); // Long mid-engine engine cover slope
  viperCanopyShape.lineTo(1.48, 0.72);
  viperCanopyShape.lineTo(-1.05, 0.69);
  viperCanopyShape.closePath();

  const viperCanopyGeo = createSideProfileExtrude(
    viperCanopyShape,
    1.28,
    0.05,
    0.05,
    4,
    16,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 0.7) / 0.38, 0, 1);
      const taper = 1.0 - 0.34 * Math.pow(tY, 0.85);
      const rearPinch =
        z > 0.2 ? THREE.MathUtils.clamp((z - 0.2) / 1.3, 0, 1) * 0.22 : 0;
      return [x * taper * (1.0 - rearPinch), y, z];
    }
  );

  const viperWsShape = new THREE.Shape();
  viperWsShape.moveTo(-1.01, 0.71);
  viperWsShape.quadraticCurveTo(-0.44, 1.055, 0.1, 1.065);
  viperWsShape.lineTo(0.14, 1.03);
  viperWsShape.quadraticCurveTo(-0.42, 1.01, -0.96, 0.69);
  viperWsShape.closePath();
  const viperWindshieldGeo = createSideProfileExtrude(
    viperWsShape,
    1.16,
    0.01,
    0.01,
    2,
    12,
    (x, y) => {
      const tY = THREE.MathUtils.clamp((y - 0.7) / 0.38, 0, 1);
      return [x * (1.0 - 0.32 * tY), y, 0];
    }
  );
  // Restore Z from createSideProfileExtrude by not zeroing Z:
  const viperWsGeoFixed = createSideProfileExtrude(
    viperWsShape,
    1.16,
    0.01,
    0.01,
    2,
    12,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 0.7) / 0.38, 0, 1);
      return [x * (1.0 - 0.32 * tY), y, z];
    }
  );
  viperWindshieldGeo.dispose();

  // Wide sculpted side air intake pods & rear fenders (width 2.06m)
  const viperPodShape = new THREE.Shape();
  viperPodShape.moveTo(-1.95, 0.22);
  viperPodShape.lineTo(-1.85, 0.68);
  viperPodShape.lineTo(-0.35, 0.72);
  viperPodShape.lineTo(0.15, 0.78); // Sharp side intake shoulder
  viperPodShape.quadraticCurveTo(1.05, 0.88, 1.78, 0.82);
  viperPodShape.lineTo(2.12, 0.7);
  viperPodShape.lineTo(2.05, 0.42);
  viperPodShape.absarc(1.33, 0.35, 0.42, 0.06, Math.PI - 0.06, false);
  viperPodShape.lineTo(-0.9, 0.19);
  viperPodShape.absarc(-1.33, 0.35, 0.42, 0.06, Math.PI - 0.06, false);
  viperPodShape.lineTo(-1.95, 0.22);
  viperPodShape.closePath();

  const viperSidePodGeo = createSideProfileExtrude(
    viperPodShape,
    1.94,
    0.07,
    0.07,
    4,
    14,
    (x, y, z) => {
      const sign = Math.sign(x) || 1;
      const absX = Math.abs(x);
      if (absX < 0.65) return [x, y, z];
      // Deep side air intake scoop indentation just ahead of rear haunch (z = -0.25..0.35)
      const doorScoop =
        Math.exp(-Math.pow((z + 0.05) / 0.36, 2)) *
        THREE.MathUtils.clamp(1.0 - Math.abs(y - 0.54) / 0.24, 0, 1);
      const rearWide = THREE.MathUtils.smoothstep(z, 0.1, 1.25) * 0.065;
      return [sign * (absX - doorScoop * 0.09 + rearWide), y, z];
    }
  );

  // Dark side air intake scoop pocket
  const scoopShape = new THREE.Shape();
  scoopShape.moveTo(-0.12, 0.3);
  scoopShape.lineTo(0.28, 0.32);
  scoopShape.lineTo(0.36, 0.72);
  scoopShape.lineTo(-0.04, 0.68);
  scoopShape.closePath();
  const viperIntakeScoopGeo = createSideProfileExtrude(
    scoopShape,
    1.98,
    0.015,
    0.015,
    2,
    6
  );

  const viperSplitterShape = new THREE.Shape();
  viperSplitterShape.moveTo(-2.38, 0.12);
  viperSplitterShape.lineTo(-1.75, 0.12);
  viperSplitterShape.lineTo(-1.75, 0.175);
  viperSplitterShape.lineTo(-2.35, 0.175);
  viperSplitterShape.closePath();
  const viperSplitterGeo = createSideProfileExtrude(
    viperSplitterShape,
    2.04,
    0.015,
    0.015,
    2,
    6
  );

  // Large Swan-Neck Rear GT Wing for Viper RS
  const viperWingShape = new THREE.Shape();
  viperWingShape.moveTo(1.75, 1.12);
  viperWingShape.quadraticCurveTo(1.96, 1.08, 2.2, 1.18);
  viperWingShape.lineTo(2.22, 1.215);
  viperWingShape.quadraticCurveTo(1.96, 1.13, 1.75, 1.15);
  viperWingShape.closePath();
  const viperWingDeckGeo = createSideProfileExtrude(
    viperWingShape,
    2.04,
    0.012,
    0.012,
    2,
    10
  );

  const viperStrutShape = new THREE.Shape();
  viperStrutShape.moveTo(1.62, 0.8);
  viperStrutShape.quadraticCurveTo(1.72, 1.18, 1.88, 1.16);
  viperStrutShape.lineTo(1.95, 1.14);
  viperStrutShape.quadraticCurveTo(1.78, 1.08, 1.74, 0.78);
  viperStrutShape.closePath();
  const viperWingStrutGeo = createSideProfileExtrude(
    viperStrutShape,
    0.032,
    0.006,
    0.006,
    2,
    8
  );

  const viperEpShape = new THREE.Shape();
  viperEpShape.moveTo(1.68, 0.98);
  viperEpShape.lineTo(2.24, 1.04);
  viperEpShape.lineTo(2.28, 1.26);
  viperEpShape.lineTo(1.72, 1.22);
  viperEpShape.closePath();
  const viperWingEndplateGeo = createSideProfileExtrude(
    viperEpShape,
    0.024,
    0.006,
    0.006,
    2,
    6
  );

  const louverRect = createRoundedRectShape(0.68, 0.08, 0.02);
  const viperLouverGeo = createFrontProfileExtrude(
    louverRect,
    0.02,
    0.004,
    0.004,
    1,
    4
  );
  viperLouverGeo.rotateX(Math.PI / 2 - 0.18);

  // ============================================================================
  // FALCON GT: Sleek Grand Tourer (Long Smooth Body, Sweeping Fastback, Slim LEDs)
  // ============================================================================
  const falconChassisShape = new THREE.Shape();
  falconChassisShape.moveTo(-2.28, 0.21);
  falconChassisShape.quadraticCurveTo(-2.34, 0.44, -2.22, 0.64); // Smooth sculpted GT nose
  falconChassisShape.quadraticCurveTo(-1.45, 0.82, -0.52, 0.86); // Long flowing GT hood
  falconChassisShape.lineTo(0.75, 0.85);
  falconChassisShape.quadraticCurveTo(1.65, 0.87, 2.2, 0.82); // Extended Kamm-tail rear deck
  falconChassisShape.lineTo(2.22, 0.62);
  falconChassisShape.lineTo(2.16, 0.33);
  falconChassisShape.lineTo(1.8, 0.33);
  falconChassisShape.absarc(1.41, 0.36, 0.42, 0.05, Math.PI - 0.05, false); // Longer 2.82m wheelbase
  falconChassisShape.lineTo(-0.98, 0.22);
  falconChassisShape.absarc(-1.41, 0.36, 0.42, 0.05, Math.PI - 0.05, false);
  falconChassisShape.lineTo(-2.28, 0.21);
  falconChassisShape.closePath();

  const falconChassisGeo = createSideProfileExtrude(
    falconChassisShape,
    1.6,
    0.085,
    0.085,
    5,
    18,
    (x, y, z) => {
      // Smooth aerodynamic plan-view boat-tail taper at front and rear
      const frontCurve =
        z < -1.3 ? Math.pow((-z - 1.3) / 1.05, 1.4) * 0.12 : 0;
      const rearCurve = z > 1.3 ? Math.pow((z - 1.3) / 0.95, 1.4) * 0.1 : 0;
      return [x * (1.0 - frontCurve - rearCurve), y, z];
    }
  );

  const falconFastbackShape = new THREE.Shape();
  falconFastbackShape.moveTo(-0.68, 0.83);
  falconFastbackShape.quadraticCurveTo(-0.08, 1.19, 0.38, 1.2); // Smooth sweeping GT roof arc
  falconFastbackShape.quadraticCurveTo(1.22, 1.15, 2.04, 0.84); // Uninterrupted fastback tear-drop taper to tail
  falconFastbackShape.lineTo(2.04, 0.81);
  falconFastbackShape.lineTo(-0.68, 0.81);
  falconFastbackShape.closePath();

  const falconFastbackGeo = createSideProfileExtrude(
    falconFastbackShape,
    1.34,
    0.06,
    0.06,
    4,
    18,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 0.82) / 0.38, 0, 1);
      const heightTaper = 1.0 - 0.28 * Math.pow(tY, 0.85);
      const rearTaper =
        z > 0.35 ? THREE.MathUtils.clamp((z - 0.35) / 1.7, 0, 1) * 0.18 : 0;
      return [x * heightTaper * (1.0 - rearTaper), y, z];
    }
  );

  const falconWsShape = new THREE.Shape();
  falconWsShape.moveTo(-0.64, 0.85);
  falconWsShape.quadraticCurveTo(-0.08, 1.185, 0.22, 1.195);
  falconWsShape.lineTo(0.25, 1.165);
  falconWsShape.quadraticCurveTo(-0.06, 1.145, -0.59, 0.83);
  falconWsShape.closePath();
  const falconWindshieldGeo = createSideProfileExtrude(
    falconWsShape,
    1.2,
    0.01,
    0.01,
    2,
    12,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 0.82) / 0.38, 0, 1);
      return [x * (1.0 - 0.28 * tY), y, z];
    }
  );

  const falconRgShape = new THREE.Shape();
  falconRgShape.moveTo(0.58, 1.18);
  falconRgShape.quadraticCurveTo(1.25, 1.12, 1.96, 0.855);
  falconRgShape.lineTo(1.92, 0.83);
  falconRgShape.quadraticCurveTo(1.22, 1.08, 0.55, 1.15);
  falconRgShape.closePath();
  const falconRearGlassGeo = createSideProfileExtrude(
    falconRgShape,
    1.12,
    0.01,
    0.01,
    2,
    12,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 0.82) / 0.38, 0, 1);
      const rearTaper = THREE.MathUtils.clamp((z - 0.35) / 1.7, 0, 1) * 0.18;
      return [x * (1.0 - 0.28 * tY) * (1.0 - rearTaper), y, z];
    }
  );

  // Flowing full-length GT fenders (1.88m width)
  const falconFenderShape = new THREE.Shape();
  falconFenderShape.moveTo(-2.18, 0.23);
  falconFenderShape.quadraticCurveTo(-2.26, 0.45, -2.14, 0.65);
  falconFenderShape.quadraticCurveTo(-1.42, 0.84, -0.45, 0.84);
  falconFenderShape.quadraticCurveTo(0.25, 0.79, 0.85, 0.88);
  falconFenderShape.quadraticCurveTo(1.52, 0.92, 2.15, 0.81);
  falconFenderShape.lineTo(2.16, 0.42);
  falconFenderShape.absarc(1.41, 0.36, 0.425, 0.06, Math.PI - 0.06, false);
  falconFenderShape.lineTo(-0.98, 0.22);
  falconFenderShape.absarc(-1.41, 0.36, 0.425, 0.06, Math.PI - 0.06, false);
  falconFenderShape.lineTo(-2.18, 0.23);
  falconFenderShape.closePath();

  const falconFenderGeo = createSideProfileExtrude(
    falconFenderShape,
    1.74,
    0.08,
    0.08,
    4,
    18,
    (x, y, z) => {
      const sign = Math.sign(x) || 1;
      const absX = Math.abs(x);
      if (absX < 0.62) return [x, y, z];
      const frontSwell = Math.exp(-Math.pow((z + 1.41) / 0.58, 2)) * 0.045;
      const rearSwell = Math.exp(-Math.pow((z - 1.41) / 0.64, 2)) * 0.06;
      const waistPinch = Math.exp(-Math.pow(z / 0.55, 2)) * 0.045;
      return [sign * (absX + frontSwell + rearSwell - waistPinch), y, z];
    }
  );

  // Sculpted Oval GT Front Grille
  const falconGrilleShape = createRoundedRectShape(0.98, 0.24, 0.09);
  const falconGrilleGeo = createFrontProfileExtrude(
    falconGrilleShape,
    0.08,
    0.014,
    0.014,
    2,
    10
  );

  // Slim LED Blade Headlight
  const falconBladeShape = createRoundedRectShape(0.38, 0.026, 0.01);
  const falconBladeHeadlightGeo = createFrontProfileExtrude(
    falconBladeShape,
    0.06,
    0.005,
    0.005,
    2,
    8
  );

  // Active Aero Rear Blade Spoiler
  const falconSpoilShape = new THREE.Shape();
  falconSpoilShape.moveTo(2.02, 0.86);
  falconSpoilShape.quadraticCurveTo(2.14, 0.91, 2.25, 0.94);
  falconSpoilShape.lineTo(2.26, 0.91);
  falconSpoilShape.lineTo(2.06, 0.84);
  falconSpoilShape.closePath();
  const falconSpoilerGeo = createSideProfileExtrude(
    falconSpoilShape,
    1.64,
    0.016,
    0.016,
    2,
    10
  );

  // ============================================================================
  // TITAN X: Heavy Rally / Offroad Raid SUV (Tall Body, Roof Rack, Big Tyres, Bull Bar)
  // ============================================================================
  const titanBodyShape = new THREE.Shape();
  titanBodyShape.moveTo(-2.16, 0.34); // High approach-angle offroad front bumper
  titanBodyShape.lineTo(-2.24, 0.62);
  titanBodyShape.lineTo(-2.18, 1.02); // Tall muscular SUV hood nose
  titanBodyShape.lineTo(-0.82, 1.08); // High command-view hood line
  titanBodyShape.lineTo(1.98, 1.08); // Tall beltline through SUV body
  titanBodyShape.lineTo(2.18, 1.02);
  titanBodyShape.lineTo(2.22, 0.64);
  titanBodyShape.lineTo(2.06, 0.38); // High departure-angle rear bumper
  titanBodyShape.lineTo(1.92, 0.38);
  titanBodyShape.absarc(1.42, 0.45, 0.52, 0.04, Math.PI - 0.04, false); // Huge wheel arch for r=0.45 tyres
  titanBodyShape.lineTo(-0.9, 0.34);
  titanBodyShape.absarc(-1.42, 0.45, 0.52, 0.04, Math.PI - 0.04, false);
  titanBodyShape.lineTo(-2.16, 0.34);
  titanBodyShape.closePath();

  const titanBodyGeo = createSideProfileExtrude(
    titanBodyShape,
    1.86,
    0.075,
    0.075,
    4,
    14
  );

  // Tall Armored SUV Cabin Greenhouse (up to y = 1.54m)
  const titanCabinShape = new THREE.Shape();
  titanCabinShape.moveTo(-0.82, 1.06);
  titanCabinShape.lineTo(-0.28, 1.52); // Upright rally raid windscreen
  titanCabinShape.lineTo(1.62, 1.52); // Long flat SUV roof for roof rack
  titanCabinShape.lineTo(2.02, 1.06); // Angled rally raid D-pillar tailgate
  titanCabinShape.lineTo(-0.82, 1.06);
  titanCabinShape.closePath();

  const titanCabinGeo = createSideProfileExtrude(
    titanCabinShape,
    1.62,
    0.055,
    0.055,
    4,
    12,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 1.06) / 0.46, 0, 1);
      return [x * (1.0 - 0.16 * tY), y, z];
    }
  );

  const titanWsShape = new THREE.Shape();
  titanWsShape.moveTo(-0.79, 1.09);
  titanWsShape.lineTo(-0.29, 1.49);
  titanWsShape.lineTo(-0.24, 1.47);
  titanWsShape.lineTo(-0.74, 1.07);
  titanWsShape.closePath();
  const titanWindshieldGeo = createSideProfileExtrude(
    titanWsShape,
    1.46,
    0.01,
    0.01,
    2,
    6,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 1.06) / 0.46, 0, 1);
      return [x * (1.0 - 0.16 * tY), y, z];
    }
  );

  const titanSgShape = new THREE.Shape();
  titanSgShape.moveTo(-0.64, 1.11);
  titanSgShape.lineTo(-0.24, 1.45);
  titanSgShape.lineTo(1.52, 1.45);
  titanSgShape.lineTo(1.84, 1.11);
  titanSgShape.closePath();
  const titanSideGlassGeo = createSideProfileExtrude(
    titanSgShape,
    1.65,
    0.01,
    0.01,
    2,
    8,
    (x, y, z) => {
      const tY = THREE.MathUtils.clamp((y - 1.06) / 0.46, 0, 1);
      return [x * (1.0 - 0.16 * tY), y, z];
    }
  );

  // Wide Rugged Bolt-On Offroad Fender Arch Flares
  const titanFlareShape = new THREE.Shape();
  titanFlareShape.absarc(0, 0.45, 0.58, 0.04, Math.PI - 0.04, false);
  titanFlareShape.absarc(0, 0.45, 0.48, Math.PI - 0.04, 0.04, true);
  titanFlareShape.closePath();
  const titanFenderFlareGeo = createSideProfileExtrude(
    titanFlareShape,
    2.1,
    0.035,
    0.035,
    3,
    14
  );

  // Heavy Tubular Steel Bull Bar & Skid Plate
  const titanBullBarTubeGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.56, 12);
  const titanBullBarCrossGeo = new THREE.CylinderGeometry(
    0.036,
    0.036,
    1.42,
    12
  );
  titanBullBarCrossGeo.rotateZ(Math.PI / 2);

  const skidShape = createRoundedRectShape(1.24, 0.36, 0.04);
  const titanSkidPlateGeo = createFrontProfileExtrude(
    skidShape,
    0.04,
    0.008,
    0.008,
    2,
    6
  );
  titanSkidPlateGeo.rotateX(-0.55);

  // Expedition Roof Rack & 4 Rally Lightbar Pods
  const titanRoofRackRailGeo = new THREE.CylinderGeometry(
    0.024,
    0.024,
    1.76,
    10
  );
  titanRoofRackRailGeo.rotateX(Math.PI / 2);

  const titanRoofRackCrossGeo = new THREE.CylinderGeometry(
    0.022,
    0.022,
    1.32,
    10
  );
  titanRoofRackCrossGeo.rotateZ(Math.PI / 2);

  const podRect = createRoundedRectShape(0.22, 0.11, 0.025);
  const titanRoofLightPodGeo = createFrontProfileExtrude(
    podRect,
    0.09,
    0.008,
    0.008,
    2,
    6
  );

  // Big Chunky All-Terrain Tyres (radius = 0.45m)
  const titanTireProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.25, -0.195),
    new THREE.Vector2(0.38, -0.215),
    new THREE.Vector2(0.445, -0.18),
    new THREE.Vector2(0.452, 0.0),
    new THREE.Vector2(0.445, 0.18),
    new THREE.Vector2(0.38, 0.215),
    new THREE.Vector2(0.25, 0.195),
    new THREE.Vector2(0.24, 0.0),
    new THREE.Vector2(0.25, -0.195),
  ];
  const titanTireGeo = new THREE.LatheGeometry(titanTireProfile, 24);
  titanTireGeo.rotateZ(Math.PI / 2);
  titanTireGeo.computeVertexNormals();

  // ============================================================================
  // PIXEL CUBE: Retro Blocky Minecraft-Style Voxel Car with Visible Square Wheels
  // ============================================================================
  const pixelLowerHullGeo = new THREE.BoxGeometry(1.78, 0.56, 4.12);
  const pixelCabinGeo = new THREE.BoxGeometry(1.52, 0.52, 2.04);
  const pixelHoodStepGeo = new THREE.BoxGeometry(1.68, 0.16, 1.32);
  const pixelBumperGeo = new THREE.BoxGeometry(1.88, 0.22, 0.26);
  const pixelWindshieldGeo = new THREE.BoxGeometry(1.4, 0.42, 0.08);
  const pixelSideWindowGeo = new THREE.BoxGeometry(1.56, 0.38, 0.82);
  const pixelHeadlightGeo = new THREE.BoxGeometry(0.32, 0.18, 0.08);
  const pixelTaillightBarGeo = new THREE.BoxGeometry(1.68, 0.14, 0.08);
  const pixelSquareTireGeo = new THREE.BoxGeometry(0.36, 0.74, 0.74);
  const pixelSquareRimGeo = new THREE.BoxGeometry(0.38, 0.46, 0.46);
  const pixelSquareHubGeo = new THREE.BoxGeometry(0.41, 0.18, 0.18);

  // ============================================================================
  // LIVERY STRIPE GEOMETRIES (Twin Stripes & Offset Rally Stripes)
  // ============================================================================
  const stripeStripLongGeo = new THREE.BoxGeometry(0.18, 0.018, 1.52);
  const stripeStripRoofGeo = new THREE.BoxGeometry(0.16, 0.018, 1.08);
  const stripeStripRearGeo = new THREE.BoxGeometry(0.18, 0.018, 0.62);
  const stripeSideRockerGeo = new THREE.BoxGeometry(0.025, 0.095, 1.82);

  _additionalCarGeos = {
    viperHullGeo,
    viperCanopyGeo,
    viperWindshieldGeo: viperWsGeoFixed,
    viperSidePodGeo,
    viperIntakeScoopGeo,
    viperSplitterGeo,
    viperWingDeckGeo,
    viperWingStrutGeo,
    viperWingEndplateGeo,
    viperLouverGeo,
    falconChassisGeo,
    falconFastbackGeo,
    falconWindshieldGeo,
    falconRearGlassGeo,
    falconFenderGeo,
    falconGrilleGeo,
    falconBladeHeadlightGeo,
    falconSpoilerGeo,
    titanBodyGeo,
    titanCabinGeo,
    titanWindshieldGeo,
    titanSideGlassGeo,
    titanFenderFlareGeo,
    titanBullBarTubeGeo,
    titanBullBarCrossGeo,
    titanSkidPlateGeo,
    titanRoofRackRailGeo,
    titanRoofRackCrossGeo,
    titanRoofLightPodGeo,
    titanTireGeo,
    pixelLowerHullGeo,
    pixelCabinGeo,
    pixelHoodStepGeo,
    pixelBumperGeo,
    pixelWindshieldGeo,
    pixelSideWindowGeo,
    pixelHeadlightGeo,
    pixelTaillightBarGeo,
    pixelSquareTireGeo,
    pixelSquareRimGeo,
    pixelSquareHubGeo,
    stripeStripLongGeo,
    stripeStripRoofGeo,
    stripeStripRearGeo,
    stripeSideRockerGeo,
  };

  return _additionalCarGeos;
}

/**
 * Toggles the 3 muscle coupe body variants ('coupe' | 'widebody' | 'race') on a car rig.
 */
export function setCarRigVariant(
  rig: CompositeCarRig,
  variant: CarBodyVariant = 'coupe'
): void {
  rig.variantGroups.coupe.visible =
    variant === 'coupe' || variant === 'widebody';
  rig.variantGroups.widebody.visible = variant === 'widebody';
  rig.variantGroups.race.visible = variant === 'race';
}

/**
 * Toggles the livery stripe style ('clean' | 'twin' | 'rally') on any car rig.
 */
export function setCarRigStripeStyle(
  rig: CompositeCarRig,
  stripeStyle: StripeStyleId = 'twin'
): void {
  rig.stripeGroups.twin.visible = stripeStyle === 'twin';
  rig.stripeGroups.rally.visible = stripeStyle === 'rally';
}

/**
 * Helper to add Twin GT Stripes & Offset Rally Stripes to any car model's bodyTiltGroup
 * at the specified hood/roof/rear heights and body half-width.
 */
function attachStripeGroups(
  bodyTiltGroup: THREE.Group,
  accentMat: THREE.MeshStandardMaterial,
  spec: {
    hoodY: number;
    hoodZ: number;
    hoodPitch: number;
    roofY: number;
    roofZ: number;
    rearY: number;
    rearZ: number;
    rearPitch: number;
    sideX: number;
    sideY: number;
  }
): { twin: THREE.Group; rally: THREE.Group } {
  const extraGeos = getAdditionalCarGeometries();
  const twin = new THREE.Group();
  const rally = new THREE.Group();

  // Twin GT Stripes: Left & Right centerline stripes
  [-0.14, 0.14].forEach((xOff) => {
    const hMesh = new THREE.Mesh(extraGeos.stripeStripLongGeo, accentMat);
    hMesh.position.set(xOff, spec.hoodY, spec.hoodZ);
    hMesh.rotation.x = spec.hoodPitch;
    twin.add(hMesh);

    const rMesh = new THREE.Mesh(extraGeos.stripeStripRoofGeo, accentMat);
    rMesh.position.set(xOff * 0.88, spec.roofY, spec.roofZ);
    twin.add(rMesh);

    const tMesh = new THREE.Mesh(extraGeos.stripeStripRearGeo, accentMat);
    tMesh.position.set(xOff, spec.rearY, spec.rearZ);
    tMesh.rotation.x = spec.rearPitch;
    twin.add(tMesh);
  });

  // Offset Apex Rally Spec: Asymmetric driver-side band + lower rocker side flashes
  const offX = -0.28;
  const rhMesh = new THREE.Mesh(extraGeos.stripeStripLongGeo, accentMat);
  rhMesh.scale.x = 1.35;
  rhMesh.position.set(offX, spec.hoodY, spec.hoodZ);
  rhMesh.rotation.x = spec.hoodPitch;
  rally.add(rhMesh);

  const rrMesh = new THREE.Mesh(extraGeos.stripeStripRoofGeo, accentMat);
  rrMesh.scale.x = 1.25;
  rrMesh.position.set(offX * 0.85, spec.roofY, spec.roofZ);
  rally.add(rrMesh);

  const rtMesh = new THREE.Mesh(extraGeos.stripeStripRearGeo, accentMat);
  rtMesh.scale.x = 1.35;
  rtMesh.position.set(offX, spec.rearY, spec.rearZ);
  rtMesh.rotation.x = spec.rearPitch;
  rally.add(rtMesh);

  [-1, 1].forEach((side) => {
    const sideFlash = new THREE.Mesh(extraGeos.stripeSideRockerGeo, accentMat);
    sideFlash.position.set(side * spec.sideX, spec.sideY, 0.0);
    rally.add(sideFlash);
  });

  bodyTiltGroup.add(twin, rally);
  return { twin, rally };
}

/**
 * Helper to build the standard round 4-wheel assembly (or scaled offroad wheels for Titan X)
 * and push pivots/spin groups into frontWheelPivots and wheelSpinMeshes.
 */
function attachRoundWheelSet(
  root: THREE.Group,
  assets: SharedMuscleCoupeAssets,
  rimMat: THREE.MeshStandardMaterial,
  wheelPositions: {
    x: number;
    y: number;
    z: number;
    isFront: boolean;
    scaleX?: number;
    scaleYZ?: number;
  }[],
  frontWheelPivots: THREE.Group[],
  wheelSpinMeshes: THREE.Object3D[],
  customTireGeo?: THREE.BufferGeometry
): void {
  const tireGeometry = customTireGeo || assets.tireGeo;
  wheelPositions.forEach((wp) => {
    const isLeft = wp.x < 0;
    const outSign = isLeft ? -1 : 1;

    const steerPivot = new THREE.Group();
    steerPivot.position.set(wp.x, wp.y, wp.z);
    const sx = wp.scaleX ?? (wp.isFront ? 1.0 : 1.24);
    const syz = wp.scaleYZ ?? (wp.isFront ? 1.0 : 1.04);
    steerPivot.scale.set(sx, syz, syz);
    root.add(steerPivot);

    if (wp.isFront) {
      frontWheelPivots.push(steerPivot);
    }

    const caliper = new THREE.Mesh(assets.caliperGeo, assets.redCaliperMat);
    caliper.position.set(
      outSign * 0.055,
      0.06,
      wp.isFront ? 0.115 : -0.115
    );
    caliper.rotation.x = wp.isFront ? -0.45 : 0.45;
    steerPivot.add(caliper);

    const spinGroup = new THREE.Group();
    steerPivot.add(spinGroup);
    wheelSpinMeshes.push(spinGroup);

    const tireMesh = new THREE.Mesh(tireGeometry, assets.tireRubberMat);
    const barrelMesh = new THREE.Mesh(assets.rimBarrelGeo, rimMat);
    const outerLipMesh = new THREE.Mesh(assets.rimLipGeo, rimMat);
    outerLipMesh.position.x = outSign * 0.148;
    const hubMesh = new THREE.Mesh(assets.rimHubGeo, rimMat);
    const discMesh = new THREE.Mesh(assets.brakeDiscGeo, assets.brakeDiscMat);
    discMesh.position.x = outSign * 0.025;

    spinGroup.add(tireMesh, barrelMesh, outerLipMesh, hubMesh, discMesh);

    const numSpokes = 10;
    for (let s = 0; s < numSpokes; s++) {
      const spoke = new THREE.Mesh(assets.spokeGeo, rimMat);
      const pairIdx = Math.floor(s / 2);
      const pairOffset = s % 2 === 0 ? -0.19 : 0.19;
      const angle = (pairIdx * (Math.PI * 2)) / 5 + pairOffset;
      spoke.position.x = outSign * 0.128;
      spoke.rotation.x = angle;
      spoke.rotation.z = outSign * -0.08;
      spinGroup.add(spoke);
    }
  });
}

/**
 * Helper to attach the 3-stage Minecraft block crack overlay planes to a car's bodyTiltGroup.
 */
function attachDamageCracks(
  bodyTiltGroup: THREE.Group,
  assets: SharedMuscleCoupeAssets,
  hoodY: number,
  roofY: number,
  sideX: number,
  rearY: number
): {
  damageCrackGroup: THREE.Group;
  damageCrackMaterial: THREE.MeshBasicMaterial;
} {
  const damageCrackMaterial = new THREE.MeshBasicMaterial({
    map: assets.damageCrackTextures[0],
    transparent: true,
    opacity: 0.0,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: THREE.DoubleSide,
  });

  const damageCrackGroup = new THREE.Group();
  damageCrackGroup.visible = false;

  const hoodCrackMesh = new THREE.Mesh(assets.hoodCrackGeo, damageCrackMaterial);
  hoodCrackMesh.position.set(0, hoodY, -1.22);
  hoodCrackMesh.rotation.x = 0.085;
  damageCrackGroup.add(hoodCrackMesh);

  const roofCrackMesh = new THREE.Mesh(assets.roofCrackGeo, damageCrackMaterial);
  roofCrackMesh.position.set(0, roofY, 0.22);
  damageCrackGroup.add(roofCrackMesh);

  const leftSideCrackMesh = new THREE.Mesh(
    assets.sideCrackGeo,
    damageCrackMaterial
  );
  leftSideCrackMesh.position.set(-sideX, 0.62, 0.15);
  leftSideCrackMesh.rotation.y = -Math.PI / 2;
  damageCrackGroup.add(leftSideCrackMesh);

  const rightSideCrackMesh = new THREE.Mesh(
    assets.sideCrackGeo,
    damageCrackMaterial
  );
  rightSideCrackMesh.position.set(sideX, 0.62, 0.15);
  rightSideCrackMesh.rotation.y = Math.PI / 2;
  damageCrackGroup.add(rightSideCrackMesh);

  const rearDeckCrackMesh = new THREE.Mesh(
    assets.rearCrackGeo,
    damageCrackMaterial
  );
  rearDeckCrackMesh.position.set(0, rearY, 1.72);
  rearDeckCrackMesh.rotation.x = -0.08;
  damageCrackGroup.add(rearDeckCrackMesh);

  bodyTiltGroup.add(damageCrackGroup);
  return { damageCrackGroup, damageCrackMaterial };
}

/**
 * Builds any of the 5 distinct car models ('stallion' | 'viper-rs' | 'falcon-gt' | 'titan-x' | 'pixel-cube')
 * while keeping the exact CompositeCarRig hierarchy (root, bodyTiltGroup, frontWheelPivots, wheelSpinMeshes,
 * brakeLightMaterial, exhaustGlowMaterial, nitroFlames, headlightCones, damageCrackGroup) so physics,
 * steering, body roll, combat, and damage effects work identically across all models.
 */
export function buildCompositeHypercar(
  livery: CarLivery,
  shadowTexture: THREE.CanvasTexture,
  isPlayer: boolean,
  paintColorHex: string = livery.primaryHex || DEFAULT_CAR_PAINT_HEX,
  variant: CarBodyVariant = livery.variant || (isPlayer ? 'coupe' : 'widebody'),
  explicitModelId?: CarModelId
): CompositeCarRig {
  const assets = getSharedMuscleCoupeAssets();
  const extraGeos = getAdditionalCarGeometries();
  const carModelId: CarModelId =
    explicitModelId || livery.carModelId || 'stallion';
  const stripeStyle: StripeStyleId = livery.stripeStyle || 'twin';

  const root = new THREE.Group();
  const bodyTiltGroup = new THREE.Group();
  root.add(bodyTiltGroup);

  const paintMaterials: THREE.MeshPhysicalMaterial[] = [];
  const accentMaterials: THREE.MeshStandardMaterial[] = [];
  const rimMaterials: THREE.MeshStandardMaterial[] = [];
  const frontWheelPivots: THREE.Group[] = [];
  const wheelSpinMeshes: THREE.Object3D[] = [];
  const nitroFlames: THREE.Mesh[] = [];
  const headlightCones: THREE.Mesh[] = [];

  // 1. Soft Radial Contact Shadow Plane under the car
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
    opacity: 0.66,
  });
  const shadowMesh = new THREE.Mesh(assets.shadowGeo, shadowMat);
  shadowMesh.position.set(0, 0.02, 0);
  root.add(shadowMesh);

  // 2. Glossy Clearcoat Paint Material
  const resolvedPaintHex =
    isPlayer && paintColorHex.toUpperCase() === '#F8FAFC'
      ? DEFAULT_CAR_PAINT_HEX
      : paintColorHex;

  const basePaintColor = new THREE.Color(resolvedPaintHex);
  const primaryPaintMat = new THREE.MeshPhysicalMaterial({
    color: basePaintColor.clone(),
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0.0,
    metalness: Math.min(0.22, livery.metalness),
    roughness:
      carModelId === 'pixel-cube' ? 0.42 : Math.max(0.22, livery.roughness),
    clearcoat: carModelId === 'pixel-cube' ? 0.35 : 0.85,
    clearcoatRoughness: 0.09,
    reflectivity: 0.72,
    envMapIntensity: 0.42,
  });
  paintMaterials.push(primaryPaintMat);

  const baseAccentColor = new THREE.Color(livery.accentHex || '#DC2626');
  const accentMat = new THREE.MeshStandardMaterial({
    color: baseAccentColor.clone(),
    metalness: 0.45,
    roughness: 0.3,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0.0,
    envMapIntensity: 0.4,
  });
  accentMaterials.push(accentMat);

  // Per-car cloned body trim material so red hit flashes never mutate shared assets.darkTrimMat
  const bodyTrimMat = assets.darkTrimMat.clone();
  const baseTrimColor = bodyTrimMat.color.clone();

  // Metallic Chrome / Alloy Rim Material
  const rimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(livery.rimHex || '#CBD5E1'),
    metalness: 0.88,
    roughness: 0.16,
    envMapIntensity: 0.65,
  });
  rimMaterials.push(rimMat);

  const brakeLightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DC2626'),
    emissive: new THREE.Color('#EF4444'),
    emissiveIntensity: 0.85,
    roughness: 0.22,
    toneMapped: false,
  });

  const exhaustGlowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1E1B18'),
    emissive: new THREE.Color('#EA580C'),
    emissiveIntensity: 0.05,
    roughness: 0.42,
  });

  const coupeGroup = new THREE.Group();
  const widebodyGroup = new THREE.Group();
  const raceGroup = new THREE.Group();
  bodyTiltGroup.add(coupeGroup, widebodyGroup, raceGroup);

  let stripeGroups: { twin: THREE.Group; rally: THREE.Group };
  let crackInfo: {
    damageCrackGroup: THREE.Group;
    damageCrackMaterial: THREE.MeshBasicMaterial;
  };

  // ============================================================================
  // MODEL 1: "STALLION" — Muscle Coupe (Long Hood, Short Rear Deck, Wide Rear Fenders, Lip Spoiler)
  // ============================================================================
  if (carModelId === 'stallion') {
    const lowerChassisMesh = new THREE.Mesh(
      assets.lowerChassisGeo,
      primaryPaintMat
    );
    lowerChassisMesh.castShadow = isPlayer;
    lowerChassisMesh.receiveShadow = true;
    bodyTiltGroup.add(lowerChassisMesh);

    const cabinGreenhouseMesh = new THREE.Mesh(
      assets.cabinGreenhouseGeo,
      primaryPaintMat
    );
    cabinGreenhouseMesh.castShadow = isPlayer;
    cabinGreenhouseMesh.receiveShadow = true;
    bodyTiltGroup.add(cabinGreenhouseMesh);

    const hoodBulgeMesh = new THREE.Mesh(assets.hoodBulgeGeo, primaryPaintMat);
    hoodBulgeMesh.castShadow = isPlayer;
    hoodBulgeMesh.receiveShadow = true;
    bodyTiltGroup.add(hoodBulgeMesh);

    [-0.27, 0.27].forEach((xSide) => {
      const vent = new THREE.Mesh(assets.hoodVentGeo, bodyTrimMat);
      vent.position.set(xSide, 0.855, -1.36);
      vent.rotation.x = 0.09;
      vent.rotation.z = xSide < 0 ? 0.06 : -0.06;
      bodyTiltGroup.add(vent);
    });

    const frontFendersMesh = new THREE.Mesh(
      assets.frontFenderGeo,
      primaryPaintMat
    );
    frontFendersMesh.castShadow = isPlayer;
    frontFendersMesh.receiveShadow = true;
    bodyTiltGroup.add(frontFendersMesh);

    const rearHaunchesMesh = new THREE.Mesh(
      assets.rearHaunchGeo,
      primaryPaintMat
    );
    rearHaunchesMesh.castShadow = isPlayer;
    rearHaunchesMesh.receiveShadow = true;
    bodyTiltGroup.add(rearHaunchesMesh);

    const rearBlistersMesh = new THREE.Mesh(
      assets.rearFenderBlisterGeo,
      primaryPaintMat
    );
    rearBlistersMesh.castShadow = isPlayer;
    rearBlistersMesh.receiveShadow = true;
    bodyTiltGroup.add(rearBlistersMesh);

    const frontArchTrimMesh = new THREE.Mesh(
      assets.wheelArchTrimFrontGeo,
      bodyTrimMat
    );
    const rearArchTrimMesh = new THREE.Mesh(
      assets.wheelArchTrimRearGeo,
      bodyTrimMat
    );
    const sideSkirtMesh = new THREE.Mesh(assets.sideSkirtGeo, bodyTrimMat);
    bodyTiltGroup.add(frontArchTrimMesh, rearArchTrimMesh, sideSkirtMesh);

    [
      { x: -0.74, z: -1.36 },
      { x: 0.74, z: -1.36 },
      { x: -0.74, z: 1.34 },
      { x: 0.74, z: 1.34 },
    ].forEach((well) => {
      const liner = new THREE.Mesh(assets.wheelWellLinerGeo, assets.darkTrimMat);
      liner.position.set(well.x, 0.37, well.z);
      bodyTiltGroup.add(liner);
    });

    const bumperBeamMesh = new THREE.Mesh(
      assets.frontBumperBeamGeo,
      primaryPaintMat
    );
    const frontSplitterMesh = new THREE.Mesh(
      assets.frontSplitterGeo,
      assets.darkTrimMat
    );
    bodyTiltGroup.add(bumperBeamMesh, frontSplitterMesh);

    const upperGrilleMesh = new THREE.Mesh(
      assets.upperGrilleGeo,
      assets.grilleMat
    );
    upperGrilleMesh.position.set(0, 0, -2.19);
    upperGrilleMesh.rotation.x = 0.14;
    bodyTiltGroup.add(upperGrilleMesh);

    const lowerGrilleMesh = new THREE.Mesh(
      assets.lowerGrilleGeo,
      assets.grilleMat
    );
    lowerGrilleMesh.position.set(0, 0, -2.18);
    bodyTiltGroup.add(lowerGrilleMesh);

    [-1, 1].forEach((side) => {
      const fogPocket = new THREE.Mesh(assets.fogPocketGeo, assets.darkTrimMat);
      fogPocket.position.set(side * 0.66, 0.28, -2.14);
      fogPocket.rotation.y = side * -0.18;
      bodyTiltGroup.add(fogPocket);

      const sideMarker = new THREE.Mesh(
        assets.sideMarkerGeo,
        assets.sideMarkerMat
      );
      sideMarker.position.set(side * 0.96, 0.37, -1.86);
      bodyTiltGroup.add(sideMarker);

      const hlGroup = new THREE.Group();
      hlGroup.position.set(side * 0.67, 0.595, -2.12);
      hlGroup.rotation.y = side * -0.22;

      const housing = new THREE.Mesh(
        assets.headlightHousingGeo,
        assets.headlightGlassMat
      );
      hlGroup.add(housing);

      const mainProjector = new THREE.Mesh(
        assets.projectorLensGeo,
        assets.drlEmissiveMat
      );
      mainProjector.position.set(side * -0.04, -0.005, -0.055);
      mainProjector.layers.enable(BLOOM_LAYER);
      hlGroup.add(mainProjector);

      const drlTop = new THREE.Mesh(assets.drlBarGeo, assets.drlEmissiveMat);
      drlTop.position.set(0, 0.052, -0.06);
      drlTop.rotation.z = side * 0.06;
      drlTop.layers.enable(BLOOM_LAYER);
      hlGroup.add(drlTop);

      bodyTiltGroup.add(hlGroup);

      const cone = new THREE.Mesh(
        assets.headlightConeGeo,
        assets.headlightConeMat
      );
      cone.position.set(side * 0.68, 0.24, -9.2);
      bodyTiltGroup.add(cone);
      headlightCones.push(cone);
    });

    const windshieldMesh = new THREE.Mesh(
      assets.windshieldGeo,
      assets.tintedGlassMat
    );
    const rearWindowMesh = new THREE.Mesh(
      assets.rearWindowGeo,
      assets.tintedGlassMat
    );
    const sideWindowsMesh = new THREE.Mesh(
      assets.sideWindowGeo,
      assets.tintedGlassMat
    );
    const interiorCabinMesh = new THREE.Mesh(
      assets.interiorCabinGeo,
      assets.darkTrimMat
    );
    bodyTiltGroup.add(
      windshieldMesh,
      rearWindowMesh,
      sideWindowsMesh,
      interiorCabinMesh
    );

    const doorSeams = new THREE.LineSegments(
      assets.doorSeamGeo,
      assets.doorSeamMat
    );
    bodyTiltGroup.add(doorSeams);

    [-1, 1].forEach((side) => {
      const mirrorGroup = new THREE.Group();
      mirrorGroup.position.set(side * 0.84, 0.9, -0.36);
      const stalk = new THREE.Mesh(assets.mirrorStalkGeo, assets.darkTrimMat);
      stalk.position.set(side * 0.05, -0.02, 0);
      stalk.rotation.z = side * 0.25;
      mirrorGroup.add(stalk);
      const cap = new THREE.Mesh(assets.mirrorCapGeo, primaryPaintMat);
      cap.position.set(side * 0.12, 0.01, 0.02);
      cap.scale.x = side;
      mirrorGroup.add(cap);
      bodyTiltGroup.add(mirrorGroup);

      const handle = new THREE.Mesh(assets.doorHandleGeo, primaryPaintMat);
      handle.position.set(side * 0.955, 0.78, 0.26);
      bodyTiltGroup.add(handle);
    });

    const rearPanelMesh = new THREE.Mesh(
      assets.rearPanelGeo,
      assets.darkTrimMat
    );
    rearPanelMesh.position.set(0, 0.76, 2.13);
    bodyTiltGroup.add(rearPanelMesh);

    const tailStripMesh = new THREE.Mesh(
      assets.tailStripGeo,
      brakeLightMaterial
    );
    tailStripMesh.position.set(0, 0.775, 2.145);
    tailStripMesh.layers.enable(BLOOM_LAYER);
    bodyTiltGroup.add(tailStripMesh);

    const diffuserBase = new THREE.Mesh(
      assets.diffuserBaseGeo,
      assets.darkTrimMat
    );
    bodyTiltGroup.add(diffuserBase);
    [-0.34, -0.11, 0.11, 0.34].forEach((xFin) => {
      const fin = new THREE.Mesh(assets.diffuserFinGeo, assets.darkTrimMat);
      fin.position.set(xFin, 0, 0);
      bodyTiltGroup.add(fin);
    });

    [-0.55, 0.55].forEach((xOffset) => {
      const outerPipe = new THREE.Mesh(
        assets.exhaustOuterGeo,
        assets.chromeExhaustMat
      );
      outerPipe.position.set(xOffset, 0.25, 2.16);
      bodyTiltGroup.add(outerPipe);

      const innerCore = new THREE.Mesh(
        assets.exhaustInnerGeo,
        exhaustGlowMaterial
      );
      innerCore.position.set(xOffset, 0.25, 2.165);
      bodyTiltGroup.add(innerCore);

      const flame = new THREE.Mesh(assets.flameGeo, assets.flameMat);
      flame.position.set(xOffset, 0.25, 2.68);
      flame.scale.set(0.001, 0.001, 0.001);
      flame.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(flame);
      nitroFlames.push(flame);
    });

    // Lip Spoiler (Signature Stallion Muscle Coupe feature)
    const lipSpoilerMesh = new THREE.Mesh(
      assets.coupeLipSpoilerGeo,
      primaryPaintMat
    );
    const lipEdgeMesh = new THREE.Mesh(
      assets.coupeLipEdgeGeo,
      assets.darkTrimMat
    );
    coupeGroup.add(lipSpoilerMesh, lipEdgeMesh);
    bodyTiltGroup.add( lipSpoilerMesh.clone(), lipEdgeMesh.clone() );

    attachRoundWheelSet(
      root,
      assets,
      rimMat,
      [
        { x: -0.94, y: 0.36, z: -1.36, isFront: true },
        { x: 0.94, y: 0.36, z: -1.36, isFront: true },
        { x: -0.98, y: 0.38, z: 1.34, isFront: false },
        { x: 0.98, y: 0.38, z: 1.34, isFront: false },
      ],
      frontWheelPivots,
      wheelSpinMeshes
    );

    stripeGroups = attachStripeGroups(bodyTiltGroup, accentMat, {
      hoodY: 0.91,
      hoodZ: -1.32,
      hoodPitch: 0.085,
      roofY: 1.245,
      roofZ: 0.32,
      rearY: 0.91,
      rearZ: 1.88,
      rearPitch: -0.04,
      sideX: 0.97,
      sideY: 0.32,
    });

    crackInfo = attachDamageCracks(
      bodyTiltGroup,
      assets,
      0.915,
      1.255,
      1.02,
      0.96
    );
  }
  // ============================================================================
  // MODEL 2: "VIPER RS" — Low, Wide Mid-Engine Supercar (Sharp Wedge Nose, Side Intakes, Large Rear Wing)
  // ============================================================================
  else if (carModelId === 'viper-rs') {
    const hullMesh = new THREE.Mesh(extraGeos.viperHullGeo, primaryPaintMat);
    hullMesh.castShadow = isPlayer;
    hullMesh.receiveShadow = true;
    bodyTiltGroup.add(hullMesh);

    const sidePodsMesh = new THREE.Mesh(
      extraGeos.viperSidePodGeo,
      primaryPaintMat
    );
    sidePodsMesh.castShadow = isPlayer;
    sidePodsMesh.receiveShadow = true;
    bodyTiltGroup.add(sidePodsMesh);

    const canopyMesh = new THREE.Mesh(
      extraGeos.viperCanopyGeo,
      primaryPaintMat
    );
    canopyMesh.castShadow = isPlayer;
    canopyMesh.receiveShadow = true;
    bodyTiltGroup.add(canopyMesh);

    const wsMesh = new THREE.Mesh(
      extraGeos.viperWindshieldGeo,
      assets.tintedGlassMat
    );
    bodyTiltGroup.add(wsMesh);

    // Side air intake scoop pockets & carbon rocker blades
    const intakeScoopMesh = new THREE.Mesh(
      extraGeos.viperIntakeScoopGeo,
      bodyTrimMat
    );
    const splitterMesh = new THREE.Mesh(
      extraGeos.viperSplitterGeo,
      bodyTrimMat
    );
    const rockerBlade = new THREE.Mesh(
      assets.widebodyRockerBladeGeo,
      bodyTrimMat
    );
    rockerBlade.position.set(0, 0.14, 0.0);
    bodyTiltGroup.add(intakeScoopMesh, splitterMesh, rockerBlade);

    // Mid-engine rear decklid carbon louvers
    [0.72, 0.96, 1.2, 1.44].forEach((zPos) => {
      const louver = new THREE.Mesh(extraGeos.viperLouverGeo, bodyTrimMat);
      louver.position.set(0, 0.98 - (zPos - 0.72) * 0.19, zPos);
      bodyTiltGroup.add(louver);
    });

    // Large Swan-Neck Rear GT Wing
    const wingDeck = new THREE.Mesh(extraGeos.viperWingDeckGeo, bodyTrimMat);
    const leftStrut = new THREE.Mesh(extraGeos.viperWingStrutGeo, bodyTrimMat);
    leftStrut.position.set(-0.42, 0, 0);
    const rightStrut = new THREE.Mesh(extraGeos.viperWingStrutGeo, bodyTrimMat);
    rightStrut.position.set(0.42, 0, 0);
    const leftEp = new THREE.Mesh(
      extraGeos.viperWingEndplateGeo,
      primaryPaintMat
    );
    leftEp.position.set(-1.02, 0, 0);
    const rightEp = new THREE.Mesh(
      extraGeos.viperWingEndplateGeo,
      primaryPaintMat
    );
    rightEp.position.set(1.02, 0, 0);
    bodyTiltGroup.add(wingDeck, leftStrut, rightStrut, leftEp, rightEp);

    // Sharp Wedge LED Headlights & Cones
    [-1, 1].forEach((side) => {
      const hlBar = new THREE.Mesh(
        extraGeos.falconBladeHeadlightGeo,
        assets.drlEmissiveMat
      );
      hlBar.position.set(side * 0.68, 0.42, -2.18);
      hlBar.rotation.y = side * -0.32;
      hlBar.rotation.z = side * 0.14;
      hlBar.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(hlBar);

      const cone = new THREE.Mesh(
        assets.headlightConeGeo,
        assets.headlightConeMat
      );
      cone.position.set(side * 0.68, 0.22, -9.2);
      bodyTiltGroup.add(cone);
      headlightCones.push(cone);
    });

    // Full-Width Supercar Rear Taillight Strip & Diffuser
    const rearPanelMesh = new THREE.Mesh(
      assets.rearPanelGeo,
      assets.darkTrimMat
    );
    rearPanelMesh.scale.set(1.06, 0.85, 1.0);
    rearPanelMesh.position.set(0, 0.68, 2.15);
    bodyTiltGroup.add(rearPanelMesh);

    const tailStripMesh = new THREE.Mesh(
      assets.tailStripGeo,
      brakeLightMaterial
    );
    tailStripMesh.scale.set(1.08, 0.85, 1.0);
    tailStripMesh.position.set(0, 0.69, 2.165);
    tailStripMesh.layers.enable(BLOOM_LAYER);
    bodyTiltGroup.add(tailStripMesh);

    const diffuserBase = new THREE.Mesh(
      assets.diffuserBaseGeo,
      assets.darkTrimMat
    );
    diffuserBase.scale.set(1.08, 1.0, 1.0);
    bodyTiltGroup.add(diffuserBase);

    // High-mounted dual center exhausts + nitro flames
    [-0.24, 0.24].forEach((xOffset) => {
      const outerPipe = new THREE.Mesh(
        assets.exhaustOuterGeo,
        assets.chromeExhaustMat
      );
      outerPipe.position.set(xOffset, 0.46, 2.16);
      bodyTiltGroup.add(outerPipe);

      const innerCore = new THREE.Mesh(
        assets.exhaustInnerGeo,
        exhaustGlowMaterial
      );
      innerCore.position.set(xOffset, 0.46, 2.165);
      bodyTiltGroup.add(innerCore);

      const flame = new THREE.Mesh(assets.flameGeo, assets.flameMat);
      flame.position.set(xOffset, 0.46, 2.68);
      flame.scale.set(0.001, 0.001, 0.001);
      flame.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(flame);
      nitroFlames.push(flame);
    });

    attachRoundWheelSet(
      root,
      assets,
      rimMat,
      [
        {
          x: -0.98,
          y: 0.35,
          z: -1.33,
          isFront: true,
          scaleX: 1.08,
          scaleYZ: 0.97,
        },
        {
          x: 0.98,
          y: 0.35,
          z: -1.33,
          isFront: true,
          scaleX: 1.08,
          scaleYZ: 0.97,
        },
        {
          x: -1.03,
          y: 0.36,
          z: 1.33,
          isFront: false,
          scaleX: 1.32,
          scaleYZ: 1.02,
        },
        {
          x: 1.03,
          y: 0.36,
          z: 1.33,
          isFront: false,
          scaleX: 1.32,
          scaleYZ: 1.02,
        },
      ],
      frontWheelPivots,
      wheelSpinMeshes
    );

    stripeGroups = attachStripeGroups(bodyTiltGroup, accentMat, {
      hoodY: 0.66,
      hoodZ: -1.55,
      hoodPitch: 0.24,
      roofY: 1.075,
      roofZ: 0.08,
      rearY: 0.84,
      rearZ: 1.72,
      rearPitch: -0.1,
      sideX: 1.02,
      sideY: 0.28,
    });

    crackInfo = attachDamageCracks(
      bodyTiltGroup,
      assets,
      0.72,
      1.085,
      1.05,
      0.86
    );
  }
  // ============================================================================
  // MODEL 3: "FALCON GT" — Sleek Grand Tourer (Long Smooth Body, Fastback Roof, Slim LED Lights)
  // ============================================================================
  else if (carModelId === 'falcon-gt') {
    const chassisMesh = new THREE.Mesh(
      extraGeos.falconChassisGeo,
      primaryPaintMat
    );
    chassisMesh.castShadow = isPlayer;
    chassisMesh.receiveShadow = true;
    bodyTiltGroup.add(chassisMesh);

    const fastbackMesh = new THREE.Mesh(
      extraGeos.falconFastbackGeo,
      primaryPaintMat
    );
    fastbackMesh.castShadow = isPlayer;
    fastbackMesh.receiveShadow = true;
    bodyTiltGroup.add(fastbackMesh);

    const fendersMesh = new THREE.Mesh(
      extraGeos.falconFenderGeo,
      primaryPaintMat
    );
    fendersMesh.castShadow = isPlayer;
    fendersMesh.receiveShadow = true;
    bodyTiltGroup.add(fendersMesh);

    const wsMesh = new THREE.Mesh(
      extraGeos.falconWindshieldGeo,
      assets.tintedGlassMat
    );
    const rgMesh = new THREE.Mesh(
      extraGeos.falconRearGlassGeo,
      assets.tintedGlassMat
    );
    const swMesh = new THREE.Mesh(assets.sideWindowGeo, assets.tintedGlassMat);
    swMesh.scale.set(0.96, 0.96, 1.08);
    bodyTiltGroup.add(wsMesh, rgMesh, swMesh);

    // Sculpted Oval GT Grille & Front Splitter
    const grilleMesh = new THREE.Mesh(
      extraGeos.falconGrilleGeo,
      assets.grilleMat
    );
    grilleMesh.position.set(0, 0.39, -2.29);
    bodyTiltGroup.add(grilleMesh);

    const splitterMesh = new THREE.Mesh(assets.frontSplitterGeo, bodyTrimMat);
    splitterMesh.position.set(0, 0, -0.05);
    const sideSkirtMesh = new THREE.Mesh(assets.sideSkirtGeo, bodyTrimMat);
    sideSkirtMesh.scale.set(0.97, 1.0, 1.05);
    bodyTiltGroup.add(splitterMesh, sideSkirtMesh);

    // Slim Dual-Blade LED Headlights
    [-1, 1].forEach((side) => {
      const upperBlade = new THREE.Mesh(
        extraGeos.falconBladeHeadlightGeo,
        assets.drlEmissiveMat
      );
      upperBlade.position.set(side * 0.64, 0.59, -2.18);
      upperBlade.rotation.y = side * -0.28;
      upperBlade.rotation.z = side * 0.08;
      upperBlade.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(upperBlade);

      const lowerBlade = new THREE.Mesh(
        extraGeos.falconBladeHeadlightGeo,
        assets.drlEmissiveMat
      );
      lowerBlade.scale.set(0.82, 0.85, 1.0);
      lowerBlade.position.set(side * 0.66, 0.54, -2.19);
      lowerBlade.rotation.y = side * -0.28;
      lowerBlade.rotation.z = side * 0.08;
      lowerBlade.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(lowerBlade);

      const cone = new THREE.Mesh(
        assets.headlightConeGeo,
        assets.headlightConeMat
      );
      cone.position.set(side * 0.65, 0.24, -9.3);
      bodyTiltGroup.add(cone);
      headlightCones.push(cone);
    });

    // Sleek Active Aero Rear Blade Spoiler & Slim Wraparound Taillight
    const spoilerMesh = new THREE.Mesh(
      extraGeos.falconSpoilerGeo,
      primaryPaintMat
    );
    bodyTiltGroup.add(spoilerMesh);

    const tailStripMesh = new THREE.Mesh(
      assets.tailStripGeo,
      brakeLightMaterial
    );
    tailStripMesh.scale.set(0.96, 0.72, 1.0);
    tailStripMesh.position.set(0, 0.75, 2.21);
    tailStripMesh.layers.enable(BLOOM_LAYER);
    bodyTiltGroup.add(tailStripMesh);

    const diffuserBase = new THREE.Mesh(
      assets.diffuserBaseGeo,
      assets.darkTrimMat
    );
    diffuserBase.position.set(0, 0, 0.06);
    bodyTiltGroup.add(diffuserBase);

    [-0.58, 0.58].forEach((xOffset) => {
      const outerPipe = new THREE.Mesh(
        assets.exhaustOuterGeo,
        assets.chromeExhaustMat
      );
      outerPipe.position.set(xOffset, 0.25, 2.22);
      bodyTiltGroup.add(outerPipe);

      const innerCore = new THREE.Mesh(
        assets.exhaustInnerGeo,
        exhaustGlowMaterial
      );
      innerCore.position.set(xOffset, 0.25, 2.225);
      bodyTiltGroup.add(innerCore);

      const flame = new THREE.Mesh(assets.flameGeo, assets.flameMat);
      flame.position.set(xOffset, 0.25, 2.74);
      flame.scale.set(0.001, 0.001, 0.001);
      flame.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(flame);
      nitroFlames.push(flame);
    });

    attachRoundWheelSet(
      root,
      assets,
      rimMat,
      [
        { x: -0.91, y: 0.36, z: -1.41, isFront: true },
        { x: 0.91, y: 0.36, z: -1.41, isFront: true },
        { x: -0.94, y: 0.37, z: 1.41, isFront: false },
        { x: 0.94, y: 0.37, z: 1.41, isFront: false },
      ],
      frontWheelPivots,
      wheelSpinMeshes
    );

    stripeGroups = attachStripeGroups(bodyTiltGroup, accentMat, {
      hoodY: 0.855,
      hoodZ: -1.36,
      hoodPitch: 0.11,
      roofY: 1.205,
      roofZ: 0.28,
      rearY: 0.9,
      rearZ: 1.9,
      rearPitch: -0.16,
      sideX: 0.93,
      sideY: 0.31,
    });

    crackInfo = attachDamageCracks(
      bodyTiltGroup,
      assets,
      0.87,
      1.215,
      0.96,
      0.92
    );
  }
  // ============================================================================
  // MODEL 4: "TITAN X" — Heavy Rally/Offroad SUV (Tall Body, Roof Rack, Big Tyres, Bull Bar)
  // ============================================================================
  else if (carModelId === 'titan-x') {
    const bodyMesh = new THREE.Mesh(extraGeos.titanBodyGeo, primaryPaintMat);
    bodyMesh.castShadow = isPlayer;
    bodyMesh.receiveShadow = true;
    bodyTiltGroup.add(bodyMesh);

    const cabinMesh = new THREE.Mesh(extraGeos.titanCabinGeo, primaryPaintMat);
    cabinMesh.castShadow = isPlayer;
    cabinMesh.receiveShadow = true;
    bodyTiltGroup.add(cabinMesh);

    const wsMesh = new THREE.Mesh(
      extraGeos.titanWindshieldGeo,
      assets.tintedGlassMat
    );
    const sgMesh = new THREE.Mesh(
      extraGeos.titanSideGlassGeo,
      assets.tintedGlassMat
    );
    bodyTiltGroup.add(wsMesh, sgMesh);

    // Rugged Bolt-On Offroad Fender Arch Flares
    [-1.42, 1.42].forEach((zPos) => {
      const flare = new THREE.Mesh(extraGeos.titanFenderFlareGeo, bodyTrimMat);
      flare.position.set(0, 0, zPos);
      bodyTiltGroup.add(flare);
    });

    // Heavy Tubular Front Bull Bar + Alloy Skid Plate
    const bullBarGroup = new THREE.Group();
    [-0.46, 0.46].forEach((xPost) => {
      const post = new THREE.Mesh(extraGeos.titanBullBarTubeGeo, bodyTrimMat);
      post.position.set(xPost, 0.72, -2.32);
      post.rotation.x = 0.15;
      bullBarGroup.add(post);
    });
    const topCross = new THREE.Mesh(
      extraGeos.titanBullBarCrossGeo,
      bodyTrimMat
    );
    topCross.position.set(0, 0.94, -2.35);
    const midCross = new THREE.Mesh(
      extraGeos.titanBullBarCrossGeo,
      bodyTrimMat
    );
    midCross.position.set(0, 0.64, -2.32);
    const skidPlate = new THREE.Mesh(
      extraGeos.titanSkidPlateGeo,
      assets.chromeExhaustMat
    );
    skidPlate.position.set(0, 0.36, -2.26);
    bullBarGroup.add(topCross, midCross, skidPlate);
    bodyTiltGroup.add(bullBarGroup);

    const frontGrille = new THREE.Mesh(assets.upperGrilleGeo, assets.grilleMat);
    frontGrille.scale.set(1.35, 1.55, 1.0);
    frontGrille.position.set(0, 0.02, -2.23);
    bodyTiltGroup.add(frontGrille);

    // Expedition Roof Rack + 4 Overhead Rally LED Lightbar Pods
    const rackGroup = new THREE.Group();
    [-0.64, 0.64].forEach((xRail) => {
      const rail = new THREE.Mesh(
        extraGeos.titanRoofRackRailGeo,
        bodyTrimMat
      );
      rail.position.set(xRail, 1.57, 0.68);
      rackGroup.add(rail);
    });
    [-0.08, 0.42, 0.92, 1.42].forEach((zCross) => {
      const cross = new THREE.Mesh(
        extraGeos.titanRoofRackCrossGeo,
        bodyTrimMat
      );
      cross.position.set(0, 1.57, zCross);
      rackGroup.add(cross);
    });
    [-0.45, -0.15, 0.15, 0.45].forEach((xPod) => {
      const pod = new THREE.Mesh(
        extraGeos.titanRoofLightPodGeo,
        assets.drlEmissiveMat
      );
      pod.position.set(xPod, 1.62, -0.14);
      pod.layers.enable(BLOOM_LAYER);
      rackGroup.add(pod);
    });
    bodyTiltGroup.add(rackGroup);

    // Front Headlights & Cones
    [-1, 1].forEach((side) => {
      const hlGroup = new THREE.Group();
      hlGroup.position.set(side * 0.72, 0.84, -2.21);
      const housing = new THREE.Mesh(
        assets.headlightHousingGeo,
        assets.headlightGlassMat
      );
      housing.scale.set(1.15, 1.35, 1.0);
      hlGroup.add(housing);
      const lens = new THREE.Mesh(
        assets.projectorLensGeo,
        assets.drlEmissiveMat
      );
      lens.scale.set(1.25, 1.25, 1.0);
      lens.position.set(0, 0, -0.055);
      lens.layers.enable(BLOOM_LAYER);
      hlGroup.add(lens);
      bodyTiltGroup.add(hlGroup);

      const cone = new THREE.Mesh(
        assets.headlightConeGeo,
        assets.headlightConeMat
      );
      cone.position.set(side * 0.72, 0.42, -9.2);
      bodyTiltGroup.add(cone);
      headlightCones.push(cone);
    });

    // Rear SUV Tailgate Brake Light Strip & Dual Exhausts
    const tailStripMesh = new THREE.Mesh(
      assets.tailStripGeo,
      brakeLightMaterial
    );
    tailStripMesh.scale.set(1.04, 1.25, 1.0);
    tailStripMesh.position.set(0, 0.94, 2.2);
    tailStripMesh.layers.enable(BLOOM_LAYER);
    bodyTiltGroup.add(tailStripMesh);

    [-0.64, 0.64].forEach((xOffset) => {
      const outerPipe = new THREE.Mesh(
        assets.exhaustOuterGeo,
        assets.chromeExhaustMat
      );
      outerPipe.position.set(xOffset, 0.36, 2.18);
      bodyTiltGroup.add(outerPipe);

      const innerCore = new THREE.Mesh(
        assets.exhaustInnerGeo,
        exhaustGlowMaterial
      );
      innerCore.position.set(xOffset, 0.36, 2.185);
      bodyTiltGroup.add(innerCore);

      const flame = new THREE.Mesh(assets.flameGeo, assets.flameMat);
      flame.position.set(xOffset, 0.36, 2.7);
      flame.scale.set(0.001, 0.001, 0.001);
      flame.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(flame);
      nitroFlames.push(flame);
    });

    // Big Chunky Offroad Tyres (r = 0.45m)
    attachRoundWheelSet(
      root,
      assets,
      rimMat,
      [
        {
          x: -1.02,
          y: 0.45,
          z: -1.42,
          isFront: true,
          scaleX: 1.25,
          scaleYZ: 1.0,
        },
        {
          x: 1.02,
          y: 0.45,
          z: -1.42,
          isFront: true,
          scaleX: 1.25,
          scaleYZ: 1.0,
        },
        {
          x: -1.04,
          y: 0.45,
          z: 1.42,
          isFront: false,
          scaleX: 1.32,
          scaleYZ: 1.0,
        },
        {
          x: 1.04,
          y: 0.45,
          z: 1.42,
          isFront: false,
          scaleX: 1.32,
          scaleYZ: 1.0,
        },
      ],
      frontWheelPivots,
      wheelSpinMeshes,
      extraGeos.titanTireGeo
    );

    stripeGroups = attachStripeGroups(bodyTiltGroup, accentMat, {
      hoodY: 1.085,
      hoodZ: -1.48,
      hoodPitch: 0.04,
      roofY: 1.535,
      roofZ: 0.65,
      rearY: 1.08,
      rearZ: 1.98,
      rearPitch: -0.05,
      sideX: 1.01,
      sideY: 0.56,
    });

    crackInfo = attachDamageCracks(
      bodyTiltGroup,
      assets,
      1.095,
      1.545,
      1.04,
      1.09
    );
  }
  // ============================================================================
  // MODEL 5: "PIXEL CUBE" — Retro Blocky Minecraft-Style Voxel Car with Square Wheels
  // ============================================================================
  else {
    // Stepped blocky voxel lower hull, hood block, and blocky cabin
    const lowerHull = new THREE.Mesh(
      extraGeos.pixelLowerHullGeo,
      primaryPaintMat
    );
    lowerHull.position.set(0, 0.54, 0);
    lowerHull.castShadow = isPlayer;
    lowerHull.receiveShadow = true;
    bodyTiltGroup.add(lowerHull);

    const hoodStep = new THREE.Mesh(
      extraGeos.pixelHoodStepGeo,
      primaryPaintMat
    );
    hoodStep.position.set(0, 0.86, -1.26);
    hoodStep.castShadow = isPlayer;
    hoodStep.receiveShadow = true;
    bodyTiltGroup.add(hoodStep);

    const blockyCabin = new THREE.Mesh(
      extraGeos.pixelCabinGeo,
      primaryPaintMat
    );
    blockyCabin.position.set(0, 1.08, 0.24);
    blockyCabin.castShadow = isPlayer;
    blockyCabin.receiveShadow = true;
    bodyTiltGroup.add(blockyCabin);

    // Blocky front and rear bumpers
    const frontBumper = new THREE.Mesh(extraGeos.pixelBumperGeo, bodyTrimMat);
    frontBumper.position.set(0, 0.34, -2.08);
    const rearBumper = new THREE.Mesh(extraGeos.pixelBumperGeo, bodyTrimMat);
    rearBumper.position.set(0, 0.34, 2.08);
    bodyTiltGroup.add(frontBumper, rearBumper);

    // Blocky tinted windows
    const wsBlock = new THREE.Mesh(
      extraGeos.pixelWindshieldGeo,
      assets.tintedGlassMat
    );
    wsBlock.position.set(0, 1.08, -0.76);
    const rwBlock = new THREE.Mesh(
      extraGeos.pixelWindshieldGeo,
      assets.tintedGlassMat
    );
    rwBlock.position.set(0, 1.08, 1.24);
    const swBlock = new THREE.Mesh(
      extraGeos.pixelSideWindowGeo,
      assets.tintedGlassMat
    );
    swBlock.position.set(0, 1.08, 0.24);
    bodyTiltGroup.add(wsBlock, rwBlock, swBlock);

    // Blocky Front Headlight Cubes & Volumetric Cones
    [-1, 1].forEach((side) => {
      const hlCube = new THREE.Mesh(
        extraGeos.pixelHeadlightGeo,
        assets.drlEmissiveMat
      );
      hlCube.position.set(side * 0.58, 0.62, -2.06);
      hlCube.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(hlCube);

      const cone = new THREE.Mesh(
        assets.headlightConeGeo,
        assets.headlightConeMat
      );
      cone.position.set(side * 0.58, 0.32, -9.1);
      bodyTiltGroup.add(cone);
      headlightCones.push(cone);
    });

    // Blocky Glowing Red Rear Brake Light Bar & Exhaust Cubes
    const tailBar = new THREE.Mesh(
      extraGeos.pixelTaillightBarGeo,
      brakeLightMaterial
    );
    tailBar.position.set(0, 0.68, 2.06);
    tailBar.layers.enable(BLOOM_LAYER);
    bodyTiltGroup.add(tailBar);

    [-0.52, 0.52].forEach((xOffset) => {
      const outerPipe = new THREE.Mesh(
        assets.exhaustOuterGeo,
        assets.chromeExhaustMat
      );
      outerPipe.position.set(xOffset, 0.28, 2.12);
      bodyTiltGroup.add(outerPipe);

      const innerCore = new THREE.Mesh(
        assets.exhaustInnerGeo,
        exhaustGlowMaterial
      );
      innerCore.position.set(xOffset, 0.28, 2.125);
      bodyTiltGroup.add(innerCore);

      const flame = new THREE.Mesh(assets.flameGeo, assets.flameMat);
      flame.position.set(xOffset, 0.28, 2.64);
      flame.scale.set(0.001, 0.001, 0.001);
      flame.layers.enable(BLOOM_LAYER);
      bodyTiltGroup.add(flame);
      nitroFlames.push(flame);
    });

    // 4 Visible Square Voxel Wheels that steer & spin!
    const sqWheelCoords = [
      { x: -0.96, y: 0.38, z: -1.22, isFront: true },
      { x: 0.96, y: 0.38, z: -1.22, isFront: true },
      { x: -0.98, y: 0.38, z: 1.22, isFront: false },
      { x: 0.98, y: 0.38, z: 1.22, isFront: false },
    ];
    sqWheelCoords.forEach((wp) => {
      const steerPivot = new THREE.Group();
      steerPivot.position.set(wp.x, wp.y, wp.z);
      root.add(steerPivot);
      if (wp.isFront) {
        frontWheelPivots.push(steerPivot);
      }

      const spinGroup = new THREE.Group();
      steerPivot.add(spinGroup);
      wheelSpinMeshes.push(spinGroup);

      const sqTire = new THREE.Mesh(
        extraGeos.pixelSquareTireGeo,
        assets.tireRubberMat
      );
      const sqRim = new THREE.Mesh(extraGeos.pixelSquareRimGeo, rimMat);
      const sqHub = new THREE.Mesh(extraGeos.pixelSquareHubGeo, accentMat);
      spinGroup.add(sqTire, sqRim, sqHub);
    });

    stripeGroups = attachStripeGroups(bodyTiltGroup, accentMat, {
      hoodY: 0.945,
      hoodZ: -1.26,
      hoodPitch: 0.0,
      roofY: 1.345,
      roofZ: 0.24,
      rearY: 0.825,
      rearZ: 1.65,
      rearPitch: 0.0,
      sideX: 0.9,
      sideY: 0.48,
    });

    crackInfo = attachDamageCracks(
      bodyTiltGroup,
      assets,
      0.955,
      1.355,
      0.92,
      0.84
    );
  }

  const rig: CompositeCarRig = {
    carModelId,
    root,
    bodyTiltGroup,
    paintMaterials,
    accentMaterials,
    rimMaterials,
    bodyTrimMaterial: bodyTrimMat,
    basePaintColor,
    baseAccentColor,
    baseTrimColor,
    damageCrackGroup: crackInfo.damageCrackGroup,
    damageCrackMaterial: crackInfo.damageCrackMaterial,
    currentDamageStage: 0,
    brakeLightMaterial,
    exhaustGlowMaterial,
    frontWheelPivots,
    wheelSpinMeshes,
    nitroFlames,
    headlightCones,
    variantGroups: {
      coupe: coupeGroup,
      widebody: widebodyGroup,
      race: raceGroup,
    },
    stripeGroups,
  };

  setCarRigVariant(rig, variant);
  setCarRigStripeStyle(rig, stripeStyle);
  return rig;
}

/**
 * Disposes only the per-car materials allocated for a CompositeCarRig
 * (shared cached geometries and shared textures are preserved for 60 FPS reuse).
 */
export function disposeCarRig(rig: CompositeCarRig): void {
  rig.paintMaterials.forEach((m) => m.dispose());
  rig.accentMaterials.forEach((m) => m.dispose());
  rig.rimMaterials.forEach((m) => m.dispose());
  rig.bodyTrimMaterial.dispose();
  rig.brakeLightMaterial.dispose();
  rig.exhaustGlowMaterial.dispose();
  rig.damageCrackMaterial.dispose();
}

const _hitFlashRedColor = new THREE.Color('#FF2424');
const _tempBodyColor = new THREE.Color();

/**
 * Updates both the 0.25s Minecraft-style Red Hit Flash and the 3-stage Progressive Block Crack
 * & Paint Darkening (at <=75%, <=50%, and <=25% HP) without mutating shared materials or allocating memory.
 */
export function updateCarDamageAndHitFlash(
  rig: CompositeCarRig,
  hitFlashTimer: number,
  hpRatio: number
): void {
  const assets = getSharedMuscleCoupeAssets();
  const clampedHp = THREE.MathUtils.clamp(hpRatio, 0, 1);

  // Determine progressive damage stage: 0 (>75%), 1 (<=75%), 2 (<=50%), 3 (<=25%)
  const stage =
    clampedHp <= 0.25 ? 3 : clampedHp <= 0.5 ? 2 : clampedHp <= 0.75 ? 1 : 0;

  if (stage !== rig.currentDamageStage) {
    rig.currentDamageStage = stage;
    if (stage === 0) {
      rig.damageCrackGroup.visible = false;
      rig.damageCrackMaterial.opacity = 0;
    } else {
      rig.damageCrackGroup.visible = true;
      rig.damageCrackMaterial.map = assets.damageCrackTextures[stage - 1];
      rig.damageCrackMaterial.opacity =
        stage === 1 ? 0.62 : stage === 2 ? 0.78 : 0.94;
      rig.damageCrackMaterial.needsUpdate = true;
    }
  }

  // Darken paint progressively at each damage stage (1.0 -> 0.89 -> 0.77 -> 0.63)
  const stageDarken =
    stage === 0 ? 1.0 : stage === 1 ? 0.89 : stage === 2 ? 0.77 : 0.63;

  // 0.25s red hit flash fade factor (1.0 on impact -> fades smoothly back to 0.0 over 0.25s)
  const flashAlpha = THREE.MathUtils.clamp(hitFlashTimer / 0.25, 0, 1);

  // Restore / interpolate paint materials
  _tempBodyColor.copy(rig.basePaintColor).multiplyScalar(stageDarken);
  if (flashAlpha > 0) {
    _tempBodyColor.lerp(_hitFlashRedColor, flashAlpha * 0.78);
  }
  for (let i = 0; i < rig.paintMaterials.length; i++) {
    const mat = rig.paintMaterials[i];
    mat.color.copy(_tempBodyColor);
    if (flashAlpha > 0) {
      mat.emissive.setHex(0xdc2626);
      mat.emissiveIntensity = flashAlpha * 0.52;
    } else {
      mat.emissive.setHex(0x000000);
      mat.emissiveIntensity = 0.0;
    }
  }

  // Restore / interpolate accent materials
  _tempBodyColor.copy(rig.baseAccentColor).multiplyScalar(stageDarken);
  if (flashAlpha > 0) {
    _tempBodyColor.lerp(_hitFlashRedColor, flashAlpha * 0.78);
  }
  for (let i = 0; i < rig.accentMaterials.length; i++) {
    const mat = rig.accentMaterials[i];
    mat.color.copy(_tempBodyColor);
    if (flashAlpha > 0) {
      mat.emissive.setHex(0xdc2626);
      mat.emissiveIntensity = flashAlpha * 0.52;
    } else {
      mat.emissive.setHex(0x000000);
      mat.emissiveIntensity = 0.0;
    }
  }

  // Restore / interpolate per-car body trim material
  _tempBodyColor.copy(rig.baseTrimColor);
  if (flashAlpha > 0) {
    _tempBodyColor.lerp(_hitFlashRedColor, flashAlpha * 0.68);
    rig.bodyTrimMaterial.emissive.setHex(0xb91c1c);
    rig.bodyTrimMaterial.emissiveIntensity = flashAlpha * 0.45;
  } else {
    rig.bodyTrimMaterial.emissive.setHex(0x000000);
    rig.bodyTrimMaterial.emissiveIntensity = 0.0;
  }
  rig.bodyTrimMaterial.color.copy(_tempBodyColor);
}

export function applyLiveryToCarRig(
  rig: CompositeCarRig,
  livery: CarLivery
): void {
  const resolvedHex =
    livery.primaryHex && livery.primaryHex.toUpperCase() === '#F8FAFC'
      ? DEFAULT_CAR_PAINT_HEX
      : livery.primaryHex || DEFAULT_CAR_PAINT_HEX;

  rig.basePaintColor.set(resolvedHex);
  rig.baseAccentColor.set(livery.accentHex || '#DC2626');

  rig.paintMaterials.forEach((mat) => {
    mat.color.set(resolvedHex);
    mat.emissive.setHex(0x000000);
    mat.emissiveIntensity = 0.0;
    mat.metalness = Math.min(0.22, livery.metalness);
    mat.roughness =
      rig.carModelId === 'pixel-cube'
        ? 0.42
        : Math.max(0.22, livery.roughness);
    mat.clearcoat = rig.carModelId === 'pixel-cube' ? 0.35 : 0.85;
  });
  rig.accentMaterials.forEach((mat) => {
    mat.color.set(livery.accentHex || '#DC2626');
    mat.emissive.setHex(0x000000);
    mat.emissiveIntensity = 0.0;
  });
  rig.rimMaterials.forEach((mat) => {
    mat.color.set(livery.rimHex || '#E2E8F0');
  });
  if (livery.variant) {
    setCarRigVariant(rig, livery.variant);
  }
  if (livery.stripeStyle) {
    setCarRigStripeStyle(rig, livery.stripeStyle);
  }
}
