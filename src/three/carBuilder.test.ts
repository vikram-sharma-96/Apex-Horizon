import { describe, it, expect, beforeEach, mock } from 'bun:test';
import * as THREE from 'three';
import { updateCarDamageAndHitFlash, CompositeCarRig } from './carBuilder';
import { CarModelId } from '../types/racing';

// Mock Canvas DOM API for Three.js
const mockCanvasContext = {
  fillRect: mock(),
  clearRect: mock(),
  getImageData: mock(),
  putImageData: mock(),
  createImageData: mock(),
  setTransform: mock(),
  drawImage: mock(),
  save: mock(),
  fillText: mock(),
  restore: mock(),
  beginPath: mock(),
  moveTo: mock(),
  lineTo: mock(),
  closePath: mock(),
  stroke: mock(),
  translate: mock(),
  scale: mock(),
  rotate: mock(),
  arc: mock(),
  fill: mock(),
  measureText: mock(() => ({ width: 0 })),
  transform: mock(),
  rect: mock(),
  clip: mock(),
};

(globalThis as any).document = {
  createElement: (tag: string) => {
    if (tag === 'canvas') {
      return {
        getContext: (type: string) => {
          if (type === '2d') return mockCanvasContext;
          return null;
        },
        width: 0,
        height: 0,
      };
    }
    return {};
  },
};

(globalThis as any).window = {
  devicePixelRatio: 1,
};

describe('updateCarDamageAndHitFlash', () => {
  let mockRig: CompositeCarRig;

  beforeEach(() => {
    // Basic mock of the rig
    const paintMat = new THREE.MeshPhysicalMaterial();
    const accentMat = new THREE.MeshStandardMaterial();
    const trimMat = new THREE.MeshStandardMaterial();
    const damageCrackMat = new THREE.MeshBasicMaterial();

    // We add needsUpdate initially to false so we can verify if it gets set to true.
    // Three.js materials typically have needsUpdate which acts like a setter, but in this mock environment,
    // it seems it may not be present or initialized the same way. We explicitly define it for the mock.
    Object.defineProperty(damageCrackMat, 'needsUpdate', {
        value: false,
        writable: true
    });

    mockRig = {
      carModelId: 'stallion' as CarModelId,
      root: new THREE.Group(),
      bodyTiltGroup: new THREE.Group(),
      paintMaterials: [paintMat],
      accentMaterials: [accentMat],
      rimMaterials: [],
      bodyTrimMaterial: trimMat,
      basePaintColor: new THREE.Color('#ffffff'),
      baseAccentColor: new THREE.Color('#ff0000'),
      baseTrimColor: new THREE.Color('#000000'),
      damageCrackGroup: new THREE.Group(),
      damageCrackMaterial: damageCrackMat,
      currentDamageStage: -1, // start invalid so we force an update
      brakeLightMaterial: new THREE.MeshStandardMaterial(),
      exhaustGlowMaterial: new THREE.MeshStandardMaterial(),
      frontWheelPivots: [],
      wheelSpinMeshes: [],
      nitroFlames: [],
      headlightCones: [],
      variantGroups: {
        coupe: new THREE.Group(),
        widebody: new THREE.Group(),
        race: new THREE.Group(),
      },
      stripeGroups: {
        twin: new THREE.Group(),
        rally: new THREE.Group(),
      },
    };
  });

  it('sets stage 0 for hp > 0.75', () => {
    updateCarDamageAndHitFlash(mockRig, 0, 1.0);
    expect(mockRig.currentDamageStage).toBe(0);
    expect(mockRig.damageCrackGroup.visible).toBe(false);
    expect(mockRig.damageCrackMaterial.opacity).toBe(0);
  });

  it('sets stage 1 for hp <= 0.75 and > 0.5', () => {
    updateCarDamageAndHitFlash(mockRig, 0, 0.75);
    expect(mockRig.currentDamageStage).toBe(1);
    expect(mockRig.damageCrackGroup.visible).toBe(true);
    expect(mockRig.damageCrackMaterial.opacity).toBeCloseTo(0.62);
  });

  it('sets stage 2 for hp <= 0.5 and > 0.25', () => {
    updateCarDamageAndHitFlash(mockRig, 0, 0.5);
    expect(mockRig.currentDamageStage).toBe(2);
    expect(mockRig.damageCrackGroup.visible).toBe(true);
    expect(mockRig.damageCrackMaterial.opacity).toBeCloseTo(0.78);
  });

  it('sets stage 3 for hp <= 0.25', () => {
    updateCarDamageAndHitFlash(mockRig, 0, 0.25);
    expect(mockRig.currentDamageStage).toBe(3);
    expect(mockRig.damageCrackGroup.visible).toBe(true);
    expect(mockRig.damageCrackMaterial.opacity).toBeCloseTo(0.94);
  });

  it('updates paint materials correctly based on hit flash and damage darken', () => {
    // Stage 1 (0.89 darken) and hit flash at max
    updateCarDamageAndHitFlash(mockRig, 0.25, 0.75); // hitFlashTimer = 0.25
    expect(mockRig.paintMaterials[0].emissive.getHex()).toBe(0xdc2626);
    expect(mockRig.paintMaterials[0].emissiveIntensity).toBe(0.52);

    // Test with no hit flash
    updateCarDamageAndHitFlash(mockRig, 0, 0.75); // hitFlashTimer = 0
    expect(mockRig.paintMaterials[0].emissive.getHex()).toBe(0x000000);
    expect(mockRig.paintMaterials[0].emissiveIntensity).toBe(0.0);
  });

  it('updates damageCrackMaterial needsUpdate flag', () => {
    updateCarDamageAndHitFlash(mockRig, 0, 0.5);
    expect(mockRig.damageCrackMaterial.needsUpdate).toBe(true);
  });

  it('updates accent materials based on hit flash and damage darken', () => {
    // Test with hit flash
    updateCarDamageAndHitFlash(mockRig, 0.25, 1.0); // hitFlashTimer = 0.25
    expect(mockRig.accentMaterials[0].emissive.getHex()).toBe(0xdc2626);
    expect(mockRig.accentMaterials[0].emissiveIntensity).toBe(0.52);

    // Test with no hit flash
    updateCarDamageAndHitFlash(mockRig, 0, 1.0); // hitFlashTimer = 0
    expect(mockRig.accentMaterials[0].emissive.getHex()).toBe(0x000000);
    expect(mockRig.accentMaterials[0].emissiveIntensity).toBe(0.0);
  });
});
