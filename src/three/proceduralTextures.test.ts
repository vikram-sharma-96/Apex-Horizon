import { test, expect, mock, beforeEach } from 'bun:test';
import * as THREE from 'three';

import {
  createAsphaltTexture,
  createSandstoneBandedTexture,
  createDesertSandGroundTexture,
  createGroundRoughnessSheenMap,
  createGravelPatchDecalTexture,
  createTireSkidPatchTexture,
  createSponsorBannerTexture,
  createStartFinishTexture,
  createContactShadowTexture,
  createSoftCloudSpriteTexture,
  createSoftParticleSpriteTexture
} from './proceduralTextures';

// Mock Canvas API
const mockContext = {
  fillRect: mock(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 0,
  createLinearGradient: mock(() => ({
    addColorStop: mock()
  })),
  createRadialGradient: mock(() => ({
    addColorStop: mock()
  })),
  beginPath: mock(),
  arc: mock(),
  fill: mock(),
  moveTo: mock(),
  lineTo: mock(),
  stroke: mock(),
  clearRect: mock(),
  save: mock(),
  translate: mock(),
  scale: mock(),
  restore: mock(),
  font: '',
  textAlign: '',
  textBaseline: '',
  fillText: mock(),
};

const originalCreateElement = globalThis.document?.createElement;

beforeEach(() => {
  mockContext.fillRect.mockClear();
  mockContext.createLinearGradient.mockClear();
  mockContext.createRadialGradient.mockClear();
  mockContext.beginPath.mockClear();
  mockContext.arc.mockClear();
  mockContext.fill.mockClear();
  mockContext.moveTo.mockClear();
  mockContext.lineTo.mockClear();
  mockContext.stroke.mockClear();
  mockContext.clearRect.mockClear();
  mockContext.save.mockClear();
  mockContext.translate.mockClear();
  mockContext.scale.mockClear();
  mockContext.restore.mockClear();
  mockContext.fillText.mockClear();

  globalThis.document = {
    createElement: (tag: string) => {
      if (tag === 'canvas') {
        return {
          width: 0,
          height: 0,
          getContext: () => mockContext,
        };
      }
      if (originalCreateElement) {
        return originalCreateElement(tag);
      }
      return {};
    }
  } as any;
});

test('createAsphaltTexture', () => {
  const tex = createAsphaltTexture(4, '#ff0000', '#00ff00', false);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.fillRect).toHaveBeenCalled();
});

test('createAsphaltTexture with midnight and other curbs', () => {
  const tex = createAsphaltTexture(2, '#ef4444', '#f8fafc', true);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(2);
  expect(mockContext.fillRect).toHaveBeenCalled();
});

test('createSandstoneBandedTexture', () => {
  const tex = createSandstoneBandedTexture(4);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.createLinearGradient).toHaveBeenCalled();
});

test('createDesertSandGroundTexture not canyon', () => {
  const tex = createDesertSandGroundTexture(4, '#123456', false);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.createRadialGradient).toHaveBeenCalled();
});

test('createDesertSandGroundTexture in canyon', () => {
  const tex = createDesertSandGroundTexture(2, '#654321', true);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(2);
  expect(mockContext.createRadialGradient).toHaveBeenCalled();
});

test('createGroundRoughnessSheenMap', () => {
  const tex = createGroundRoughnessSheenMap(4);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.createRadialGradient).toHaveBeenCalled();
});

test('createGravelPatchDecalTexture', () => {
  const tex = createGravelPatchDecalTexture(4);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.clearRect).toHaveBeenCalled();
});

test('createTireSkidPatchTexture', () => {
  const tex = createTireSkidPatchTexture(4);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.clearRect).toHaveBeenCalled();
});

test('createSponsorBannerTexture', () => {
  const label = "SPONSOR";
  const tex = createSponsorBannerTexture(4, label, "#000", "#fff");
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.fillText).toHaveBeenCalledWith(label, 256, 66);
});

test('createStartFinishTexture', () => {
  const tex = createStartFinishTexture(4);
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(tex.anisotropy).toBe(4);
  expect(mockContext.fillRect).toHaveBeenCalled();
});

test('createContactShadowTexture', () => {
  const tex = createContactShadowTexture();
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(mockContext.arc).toHaveBeenCalled();
});

test('createSoftCloudSpriteTexture', () => {
  const tex = createSoftCloudSpriteTexture();
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(mockContext.arc).toHaveBeenCalled();
});

test('createSoftParticleSpriteTexture', () => {
  const tex = createSoftParticleSpriteTexture();
  expect(tex).toBeInstanceOf(THREE.CanvasTexture);
  expect(mockContext.arc).toHaveBeenCalled();
});
