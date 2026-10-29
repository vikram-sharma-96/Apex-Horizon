export type TrackTheme = 'canyon' | 'midnight' | 'alpine';

export type CameraMode = 'chase' | 'hood' | 'aerial';

export type RaceStatus = 'ready' | 'countdown' | 'racing' | 'paused' | 'finished';

export type CombatDifficulty = 'easy' | 'normal' | 'hard';

export type CarBodyVariant = 'coupe' | 'widebody' | 'race';

export type CarModelId =
  | 'stallion'
  | 'viper-rs'
  | 'falcon-gt'
  | 'titan-x'
  | 'pixel-cube';

export type StripeStyleId = 'clean' | 'twin' | 'rally';

export interface CarStatsConfig {
  id: CarModelId;
  name: string;
  tagline: string;
  category: string;
  unlockable?: boolean;
  // Display ratings (0 - 100) for Garage stat bars
  speedRating: number;
  accelRating: number;
  handlingRating: number;
  armorRating: number;
  heatCapacityRating: number;
  // Physics & combat multipliers applied to base simulation values
  topSpeedMult: number;
  accelMult: number;
  handlingMult: number;
  maxHp: number;
  weaponHeatCapacityMult: number;
  gravelPenaltyMult: number;
  // Physical dimensions & camera adaptation
  wheelbase: number;
  bodyWidth: number;
  bodyHeight: number;
  wheelRadius: number;
  chaseCamDist: number;
  chaseCamHeight: number;
  hoodCamHeight: number;
  hoodCamForward: number;
}

/**
 * Single centralized car configuration catalog (CAR_CATALOG) for easy tuning.
 * All stats apply to existing physics and combat logic via multipliers.
 */
export const CAR_CATALOG: Record<CarModelId, CarStatsConfig> = {
  stallion: {
    id: 'stallion',
    name: 'Stallion',
    tagline: 'Long-hood V8 muscle coupe with wide rear haunches and ducktail lip spoiler',
    category: 'Muscle Coupe',
    speedRating: 84,
    accelRating: 90,
    handlingRating: 78,
    armorRating: 80,
    heatCapacityRating: 82,
    topSpeedMult: 1.0,
    accelMult: 1.08,
    handlingMult: 0.96,
    maxHp: 100,
    weaponHeatCapacityMult: 1.0,
    gravelPenaltyMult: 1.0,
    wheelbase: 2.7,
    bodyWidth: 1.92,
    bodyHeight: 1.25,
    wheelRadius: 0.36,
    chaseCamDist: 7.2,
    chaseCamHeight: 2.55,
    hoodCamHeight: 1.18,
    hoodCamForward: 0.35,
  },
  'viper-rs': {
    id: 'viper-rs',
    name: 'Viper RS',
    tagline: 'Low-slung mid-engine wedge supercar with side intakes and GT swan-neck wing',
    category: 'Mid-Engine Supercar',
    speedRating: 98,
    accelRating: 92,
    handlingRating: 88,
    armorRating: 64,
    heatCapacityRating: 76,
    topSpeedMult: 1.09,
    accelMult: 1.06,
    handlingMult: 1.06,
    maxHp: 80,
    weaponHeatCapacityMult: 0.9,
    gravelPenaltyMult: 1.15,
    wheelbase: 2.66,
    bodyWidth: 2.06,
    bodyHeight: 1.08,
    wheelRadius: 0.35,
    chaseCamDist: 6.85,
    chaseCamHeight: 2.32,
    hoodCamHeight: 1.02,
    hoodCamForward: 0.48,
  },
  'falcon-gt': {
    id: 'falcon-gt',
    name: 'Falcon GT',
    tagline: 'Sleek grand tourer with sculpted fastback roofline and precision aero balance',
    category: 'Grand Tourer',
    speedRating: 88,
    accelRating: 85,
    handlingRating: 96,
    armorRating: 80,
    heatCapacityRating: 88,
    topSpeedMult: 1.03,
    accelMult: 1.02,
    handlingMult: 1.16,
    maxHp: 100,
    weaponHeatCapacityMult: 1.1,
    gravelPenaltyMult: 0.92,
    wheelbase: 2.82,
    bodyWidth: 1.88,
    bodyHeight: 1.2,
    wheelRadius: 0.36,
    chaseCamDist: 7.35,
    chaseCamHeight: 2.48,
    hoodCamHeight: 1.14,
    hoodCamForward: 0.38,
  },
  'titan-x': {
    id: 'titan-x',
    name: 'Titan X',
    tagline: 'Heavy armored rally raid SUV with bull bar, roof rack and all-terrain tyres',
    category: 'Rally Raid SUV',
    speedRating: 74,
    accelRating: 78,
    handlingRating: 74,
    armorRating: 100,
    heatCapacityRating: 96,
    topSpeedMult: 0.92,
    accelMult: 0.94,
    handlingMult: 0.91,
    maxHp: 140,
    weaponHeatCapacityMult: 1.3,
    gravelPenaltyMult: 0.35, // Minimal gravel speed penalty
    wheelbase: 2.9,
    bodyWidth: 2.1,
    bodyHeight: 1.66,
    wheelRadius: 0.45,
    chaseCamDist: 8.2,
    chaseCamHeight: 3.05,
    hoodCamHeight: 1.56,
    hoodCamForward: 0.42,
  },
  'pixel-cube': {
    id: 'pixel-cube',
    name: 'Pixel Cube',
    tagline: 'Retro blocky voxel cruiser with exposed square wheels and reinforced hull',
    category: 'Special Unlockable',
    unlockable: true,
    speedRating: 70,
    accelRating: 75,
    handlingRating: 72,
    armorRating: 94,
    heatCapacityRating: 92,
    topSpeedMult: 0.89,
    accelMult: 0.92,
    handlingMult: 0.9,
    maxHp: 130,
    weaponHeatCapacityMult: 1.22,
    gravelPenaltyMult: 0.65,
    wheelbase: 2.4,
    bodyWidth: 1.86,
    bodyHeight: 1.44,
    wheelRadius: 0.38,
    chaseCamDist: 7.5,
    chaseCamHeight: 2.75,
    hoodCamHeight: 1.38,
    hoodCamForward: 0.25,
  },
};

export const CAR_MODEL_ORDER: CarModelId[] = [
  'stallion',
  'viper-rs',
  'falcon-gt',
  'titan-x',
  'pixel-cube',
];

export interface PaintColorOption {
  id: string;
  name: string;
  code: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  rimHex: string;
  metalness: number;
  roughness: number;
}

export const GARAGE_PAINT_COLORS: PaintColorOption[] = [
  {
    id: 'pearl-white',
    name: 'Pearl White',
    code: 'PWT',
    primaryHex: '#E8E8EC',
    secondaryHex: '#0F141D',
    accentHex: '#DC2626',
    rimHex: '#E2E8F0',
    metalness: 0.18,
    roughness: 0.2,
  },
  {
    id: 'crimson-red',
    name: 'Crimson Red',
    code: 'CRM',
    primaryHex: '#E11D48',
    secondaryHex: '#0F141D',
    accentHex: '#F8FAFC',
    rimHex: '#E2E8F0',
    metalness: 0.48,
    roughness: 0.18,
  },
  {
    id: 'cobalt-blue',
    name: 'Cobalt Blue',
    code: 'CBL',
    primaryHex: '#2563EB',
    secondaryHex: '#0F141D',
    accentHex: '#38BDF8',
    rimHex: '#F1F5F9',
    metalness: 0.54,
    roughness: 0.18,
  },
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    code: 'OBS',
    primaryHex: '#181D28',
    secondaryHex: '#090D14',
    accentHex: '#EF4444',
    rimHex: '#CBD5E1',
    metalness: 0.62,
    roughness: 0.19,
  },
  {
    id: 'solar-orange',
    name: 'Solar Orange',
    code: 'SLR',
    primaryHex: '#F97316',
    secondaryHex: '#090D16',
    accentHex: '#111827',
    rimHex: '#E2E8F0',
    metalness: 0.44,
    roughness: 0.19,
  },
  {
    id: 'liquid-silver',
    name: 'Liquid Silver',
    code: 'SLV',
    primaryHex: '#CBD5E1',
    secondaryHex: '#0A0F1A',
    accentHex: '#DC2626',
    rimHex: '#F8FAFC',
    metalness: 0.72,
    roughness: 0.17,
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    code: 'EMR',
    primaryHex: '#10B981',
    secondaryHex: '#091512',
    accentHex: '#FDE047',
    rimHex: '#E2E8F0',
    metalness: 0.5,
    roughness: 0.19,
  },
  {
    id: 'sunburst-yellow',
    name: 'Racing Yellow',
    code: 'YLW',
    primaryHex: '#EAB308',
    secondaryHex: '#111318',
    accentHex: '#111827',
    rimHex: '#F1F5F9',
    metalness: 0.38,
    roughness: 0.2,
  },
];

export const GARAGE_STRIPE_STYLES: {
  id: StripeStyleId;
  name: string;
  description: string;
}[] = [
  {
    id: 'clean',
    name: 'Factory Clean',
    description: 'Pure sculpted bodywork without livery stripes',
  },
  {
    id: 'twin',
    name: 'Twin GT Stripes',
    description: 'Dual centerline racing stripes across hood, roof and tail',
  },
  {
    id: 'rally',
    name: 'Offset Apex Spec',
    description: 'Asymmetric driver-side racing band and lower rocker accent',
  },
];

export interface CarLivery {
  id: string;
  name: string;
  code: string;
  primaryHex: string;
  secondaryHex: string;
  accentHex: string;
  rimHex: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  variant?: CarBodyVariant;
  carModelId?: CarModelId;
  stripeStyle?: StripeStyleId;
}

export interface GarageSelectionState {
  carModelId: CarModelId;
  paintId: string;
  stripeStyle: StripeStyleId;
}

const GARAGE_STORAGE_KEY = 'apex_horizon_garage_v1';
let _sessionGarageMemory: GarageSelectionState | null = null;

export function loadGarageSelection(): GarageSelectionState {
  if (_sessionGarageMemory) {
    return _sessionGarageMemory;
  }
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(GARAGE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<GarageSelectionState>;
        const validModel =
          parsed.carModelId && parsed.carModelId in CAR_CATALOG
            ? parsed.carModelId
            : 'stallion';
        const validPaint = GARAGE_PAINT_COLORS.some(
          (p) => p.id === parsed.paintId
        )
          ? parsed.paintId!
          : 'pearl-white';
        const validStripe = GARAGE_STRIPE_STYLES.some(
          (s) => s.id === parsed.stripeStyle
        )
          ? parsed.stripeStyle!
          : 'twin';
        _sessionGarageMemory = {
          carModelId: validModel,
          paintId: validPaint,
          stripeStyle: validStripe,
        };
        return _sessionGarageMemory;
      }
    }
  } catch {
    // Ignore storage access errors in restricted iframe contexts
  }
  _sessionGarageMemory = {
    carModelId: 'stallion',
    paintId: 'pearl-white',
    stripeStyle: 'twin',
  };
  return _sessionGarageMemory;
}

export function saveGarageSelection(selection: GarageSelectionState): void {
  _sessionGarageMemory = { ...selection };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(
        GARAGE_STORAGE_KEY,
        JSON.stringify(selection)
      );
    }
  } catch {
    // Ignore storage quota / security errors
  }
}

export function buildLiveryFromGarageSelection(
  selection: GarageSelectionState
): CarLivery {
  const carSpec = CAR_CATALOG[selection.carModelId] || CAR_CATALOG.stallion;
  const paint =
    GARAGE_PAINT_COLORS.find((p) => p.id === selection.paintId) ||
    GARAGE_PAINT_COLORS[0];
  return {
    id: `${carSpec.id}-${paint.id}-${selection.stripeStyle}`,
    name: `${paint.name} ${carSpec.name}`,
    code: paint.code,
    primaryHex: paint.primaryHex,
    secondaryHex: paint.secondaryHex,
    accentHex: paint.accentHex,
    rimHex: paint.rimHex,
    metalness: paint.metalness,
    roughness: paint.roughness,
    clearcoat: 1.0,
    variant:
      carSpec.id === 'viper-rs'
        ? 'race'
        : carSpec.id === 'falcon-gt'
          ? 'widebody'
          : 'coupe',
    carModelId: carSpec.id,
    stripeStyle: selection.stripeStyle,
  };
}

export interface TrackConfig {
  id: TrackTheme;
  name: string;
  location: string;
  lengthKm: string;
  skyHex: string;
  fogHex: string;
  fogDensity: number;
  groundHex: string;
  sunColorHex: string;
  sunIntensity: number;
  hemiSkyHex: string;
  hemiGroundHex: string;
  hemiIntensity: number;
  curbPrimaryHex: string;
  curbSecondaryHex: string;
  headlightsActive: boolean;
}

export interface RivalCarState {
  id: string;
  driverName: string;
  teamCode: string;
  carModelId: CarModelId;
  carName: string;
  livery: CarLivery;
  trackDistance: number; // total distance traveled along spline
  lateralOffset: number; // -roadHalfWidth to +roadHalfWidth
  targetLateral: number;
  speed: number; // m/s
  baseMaxSpeed: number;
  accelMult: number;
  handlingMult: number;
  lap: number;
  gapSeconds: number;
  hp: number;
  maxHp: number;
  prevHeartHp: number;
  heartFlashTimer: number;
  damageStage: number; // 0 (100-76%), 1 (<=75%), 2 (<=50%), 3 (<=25%)
  hitWobbleTimer: number;
  hitWobbleIntensity: number;
  knockbackX: number;
  knockbackZ: number;
  isEliminated: boolean;
  respawnTimer: number;
  hitSlowTimer: number;
  hitFlashTimer: number;
  aiFireCooldown: number;
  aiBurstRemaining: number;
  aiReloadTimer: number;
}

export interface KillFeedItem {
  id: string;
  message: string;
  timestamp: number;
  isPlayerKill: boolean;
}

export interface RivalScreenOverlay {
  id: string;
  driverName: string;
  carName?: string;
  hp: number;
  maxHp: number;
  prevHeartHp?: number;
  isHeartFlashing?: boolean;
  screenX: number; // 0..100vw percentage
  screenY: number; // 0..100vh percentage
  visible: boolean;
  isLockedTarget: boolean;
  distanceMeters: number;
}

export interface RaceTelemetry {
  status: RaceStatus;
  countdownValue: number;
  speedKmh: number;
  rpm: number; // 1000 to 9000
  gear: string; // 'R', 'N', '1'..'6'
  nitro: number; // 0 to 100
  isBoosting: boolean;
  isDrifting: boolean;
  isTyreScrubbing: boolean;
  isSliding: boolean;
  isSlipstreaming: boolean;
  isOffTrack: boolean;
  scoreEventLabel: string | null;
  lap: number;
  totalLaps: number;
  position: number;
  totalCars: number;
  currentLapTimeMs: number;
  bestLapTimeMs: number | null;
  lastLapTimeMs: number | null;
  sectorIndex: number; // 0, 1, 2
  driftScore: number;
  currentDriftPoints: number;
  lapProgress: number; // 0 to 1
  // Combat Telemetry
  combatMode: boolean;
  combatDifficulty: CombatDifficulty;
  permanentElimination: boolean;
  activeRivalsCount: number;
  playerHp: number;
  playerMaxHp: number;
  playerPrevHeartHp?: number;
  playerHeartFlashing?: boolean;
  playerHitVignetteAlpha?: number;
  playerDamageStage?: number;
  isPlayerDestroyed: boolean;
  playerRespawnTimer: number;
  isPlayerInvulnerable: boolean;
  mgHeat: number; // 0 to 100
  mgOverheated: boolean;
  missileAmmo: number;
  missileMaxAmmo: number;
  missileCooldown: number;
  kills: number;
  killFeed: KillFeedItem[];
  crosshairScreen: { x: number; y: number; visible: boolean; hasLock: boolean };
  rivalOverlays: RivalScreenOverlay[];
  standings: {
    id: string;
    driverName: string;
    carName: string;
    teamCode: string;
    isPlayer: boolean;
    position: number;
    gapSeconds: number;
    colorHex: string;
    trackDistance: number;
    lateralOffset: number;
  }[];
}

export const CAR_LIVERIES: CarLivery[] = GARAGE_PAINT_COLORS.map((p, idx) => ({
  id: p.id,
  name: p.name,
  code: p.code,
  primaryHex: p.primaryHex,
  secondaryHex: p.secondaryHex,
  accentHex: p.accentHex,
  rimHex: p.rimHex,
  metalness: p.metalness,
  roughness: p.roughness,
  clearcoat: 1.0,
  variant: idx % 3 === 0 ? 'coupe' : idx % 3 === 1 ? 'widebody' : 'race',
  carModelId: CAR_MODEL_ORDER[idx % CAR_MODEL_ORDER.length],
  stripeStyle: idx % 3 === 0 ? 'clean' : idx % 3 === 1 ? 'twin' : 'rally',
}));

export const TRACK_CONFIGS: Record<TrackTheme, TrackConfig> = {
  canyon: {
    id: 'canyon',
    name: 'Red Rock Canyon GP',
    location: 'Nevada Sector · 2.4 km',
    lengthKm: '2.40 km',
    skyHex: '#D96B43',
    fogHex: '#C85A48',
    fogDensity: 0.0014,
    groundHex: '#8C4F2B',
    sunColorHex: '#FF9E6D',
    sunIntensity: 1.65,
    hemiSkyHex: '#C084FC',
    hemiGroundHex: '#33243B',
    hemiIntensity: 0.65,
    curbPrimaryHex: '#B91C1C',
    curbSecondaryHex: '#D6D3CD',
    headlightsActive: false,
  },
  midnight: {
    id: 'midnight',
    name: 'Wangan Midnight Loop',
    location: 'Tokyo Bay · 2.4 km',
    lengthKm: '2.40 km',
    skyHex: '#060913',
    fogHex: '#080D1A',
    fogDensity: 0.0032,
    groundHex: '#0B101B',
    sunColorHex: '#60A5FA',
    sunIntensity: 1.15,
    hemiSkyHex: '#1E3A8A',
    hemiGroundHex: '#090D16',
    hemiIntensity: 0.6,
    curbPrimaryHex: '#0284C7',
    curbSecondaryHex: '#CBD5E1',
    headlightsActive: true,
  },
  alpine: {
    id: 'alpine',
    name: 'Bernese Oberland Ring',
    location: 'Swiss Alps · 2.4 km',
    lengthKm: '2.40 km',
    skyHex: '#1B2A3A',
    fogHex: '#213345',
    fogDensity: 0.0025,
    groundHex: '#1A2B23',
    sunColorHex: '#FFFBEB',
    sunIntensity: 1.85,
    hemiSkyHex: '#93C5FD',
    hemiGroundHex: '#1E293B',
    hemiIntensity: 0.72,
    curbPrimaryHex: '#B91C1C',
    curbSecondaryHex: '#D4D8DF',
    headlightsActive: false,
  },
};
