import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, Check, ArrowLeft, RotateCw } from 'lucide-react';
import {
  buildLiveryFromGarageSelection,
  CAR_CATALOG,
  CAR_MODEL_ORDER,
  CarModelId,
  GARAGE_PAINT_COLORS,
  GARAGE_STRIPE_STYLES,
  GarageSelectionState,
  StripeStyleId,
} from '../types/racing';
import {
  applyLiveryToCarRig,
  buildCompositeHypercar,
  CompositeCarRig,
  createStudioEnvironmentTexture,
  disposeCarRig,
} from '../three/carBuilder';
import { createContactShadowTexture } from '../three/proceduralTextures';

interface GarageModalProps {
  selection: GarageSelectionState;
  onChangeSelection: (next: GarageSelectionState) => void;
  onConfirmSelect: (confirmed: GarageSelectionState) => void;
  onBack: () => void;
}

export const GarageModal: React.FC<GarageModalProps> = ({
  selection,
  onChangeSelection,
  onConfirmSelect,
  onBack,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<GarageSelectionState>(selection);
  selectionRef.current = selection;

  const currentCarSpec =
    CAR_CATALOG[selection.carModelId] || CAR_CATALOG.stallion;
  const currentPaint =
    GARAGE_PAINT_COLORS.find((p) => p.id === selection.paintId) ||
    GARAGE_PAINT_COLORS[0];

  const handleStepCar = useCallback(
    (delta: number) => {
      const idx = CAR_MODEL_ORDER.indexOf(selectionRef.current.carModelId);
      const nextIdx =
        (idx + delta + CAR_MODEL_ORDER.length) % CAR_MODEL_ORDER.length;
      onChangeSelection({
        ...selectionRef.current,
        carModelId: CAR_MODEL_ORDER[nextIdx],
      });
    },
    [onChangeSelection]
  );

  const handleSelectModel = useCallback(
    (carModelId: CarModelId) => {
      onChangeSelection({
        ...selectionRef.current,
        carModelId,
      });
    },
    [onChangeSelection]
  );

  const handleSelectPaint = useCallback(
    (paintId: string) => {
      onChangeSelection({
        ...selectionRef.current,
        paintId,
      });
    },
    [onChangeSelection]
  );

  const handleSelectStripe = useCallback(
    (stripeStyle: StripeStyleId) => {
      onChangeSelection({
        ...selectionRef.current,
        stripeStyle,
      });
    },
    [onChangeSelection]
  );

  // Keyboard navigation inside Garage: Left/Right arrows switch cars, Enter selects, Escape goes back
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepCar(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepCar(1);
      } else if (e.code === 'Enter') {
        e.preventDefault();
        onConfirmSelect(selectionRef.current);
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleStepCar, onConfirmSelect, onBack]);

  // Ref for imperative 3D turntable updates when model or paint/stripe changes
  const studioApiRef = useRef<{
    syncCarSelection: (sel: GarageSelectionState) => void;
  } | null>(null);

  useEffect(() => {
    studioApiRef.current?.syncCarSelection(selection);
  }, [selection]);

  // Dedicated 3D Showroom Turntable Scene — cleanly disposed when Garage closes
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070A12');
    scene.fog = new THREE.FogExp2('#070A12', 0.042);

    const camera = new THREE.PerspectiveCamera(
      40,
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight),
      0.2,
      80
    );
    camera.position.set(4.1, 2.05, 5.4);
    camera.lookAt(0, 0.58, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    renderer.setPixelRatio(
      isHeadless ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const envTex = createStudioEnvironmentTexture();
    scene.environment = envTex;
    scene.environmentIntensity = 0.55;

    // Studio Lighting: Overhead Spotlight + Warm Key + Cool Fill + Back Rim
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x090d16, 0.58);
    scene.add(hemiLight);

    const spotLight = new THREE.SpotLight(
      0xfff7ed,
      4.5,
      28,
      Math.PI * 0.28,
      0.55,
      1.2
    );
    spotLight.position.set(1.8, 7.6, 2.4);
    spotLight.target.position.set(0, 0.4, 0);
    spotLight.castShadow = !isHeadless;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.0005;
    scene.add(spotLight);
    scene.add(spotLight.target);

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.85);
    fillLight.position.set(-6, 3.2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfdba74, 0.95);
    rimLight.position.set(-2.5, 3.5, -6.5);
    scene.add(rimLight);

    // Studio Reflective Floor & Rotating Turntable Plinth
    const floorGeo = new THREE.CircleGeometry(14, 48);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0b0f1a,
      metalness: 0.72,
      roughness: 0.24,
      envMapIntensity: 0.65,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.08;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const turntableGroup = new THREE.Group();
    scene.add(turntableGroup);

    // Semi-transparent dark polished turntable top surface so the mirror-reflected car below is subtly visible
    const plinthGeo = new THREE.CylinderGeometry(2.85, 2.98, 0.08, 64);
    const plinthMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1624,
      metalness: 0.45,
      roughness: 0.14,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.84,
    });
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.position.y = -0.04;
    plinthMesh.receiveShadow = true;
    turntableGroup.add(plinthMesh);

    const ringGeo = new THREE.RingGeometry(2.76, 2.84, 64);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.004;
    turntableGroup.add(ringMesh);

    // Overhead studio softbox halo ring
    const lightHaloGeo = new THREE.RingGeometry(2.1, 2.32, 48);
    lightHaloGeo.rotateX(Math.PI / 2);
    const lightHaloMat = new THREE.MeshBasicMaterial({
      color: 0xfef3c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const lightHaloMesh = new THREE.Mesh(lightHaloGeo, lightHaloMat);
    lightHaloMesh.position.y = 4.65;
    scene.add(lightHaloMesh);

    const shadowTex = createContactShadowTexture();
    let activeModelId: CarModelId = selectionRef.current.carModelId;
    const initialLivery = buildLiveryFromGarageSelection(selectionRef.current);

    let mainCarRig: CompositeCarRig = buildCompositeHypercar(
      initialLivery,
      shadowTex,
      true,
      initialLivery.primaryHex,
      initialLivery.variant,
      activeModelId
    );
    mainCarRig.headlightCones.forEach((c) => {
      c.visible = false;
    });
    turntableGroup.add(mainCarRig.root);

    // Mirror-Reflected Under-Floor Car for authentic showroom floor reflection at zero extra render-target cost
    let reflectionRig: CompositeCarRig = buildCompositeHypercar(
      initialLivery,
      shadowTex,
      false,
      initialLivery.primaryHex,
      initialLivery.variant,
      activeModelId
    );
    reflectionRig.headlightCones.forEach((c) => {
      c.visible = false;
    });
    reflectionRig.root.scale.set(1, -1, 1);
    reflectionRig.root.position.y = -0.02;
    turntableGroup.add(reflectionRig.root);

    let targetCamDist = 6.5;
    let currentCamDist = 6.5;

    const updateCameraTargetForModel = (modelId: CarModelId) => {
      const spec = CAR_CATALOG[modelId] || CAR_CATALOG.stallion;
      targetCamDist =
        modelId === 'titan-x' ? 7.15 : modelId === 'viper-rs' ? 6.25 : 6.55;
      ringMat.color.set(
        GARAGE_PAINT_COLORS.find((p) => p.id === selectionRef.current.paintId)
          ?.accentHex || '#F59E0B'
      );
      void spec;
    };
    updateCameraTargetForModel(activeModelId);

    studioApiRef.current = {
      syncCarSelection: (sel: GarageSelectionState) => {
        const nextLivery = buildLiveryFromGarageSelection(sel);
        if (sel.carModelId !== activeModelId) {
          activeModelId = sel.carModelId;
          turntableGroup.remove(mainCarRig.root);
          turntableGroup.remove(reflectionRig.root);
          disposeCarRig(mainCarRig);
          disposeCarRig(reflectionRig);

          mainCarRig = buildCompositeHypercar(
            nextLivery,
            shadowTex,
            true,
            nextLivery.primaryHex,
            nextLivery.variant,
            activeModelId
          );
          mainCarRig.headlightCones.forEach((c) => {
            c.visible = false;
          });
          turntableGroup.add(mainCarRig.root);

          reflectionRig = buildCompositeHypercar(
            nextLivery,
            shadowTex,
            false,
            nextLivery.primaryHex,
            nextLivery.variant,
            activeModelId
          );
          reflectionRig.headlightCones.forEach((c) => {
            c.visible = false;
          });
          reflectionRig.root.scale.set(1, -1, 1);
          reflectionRig.root.position.y = -0.02;
          turntableGroup.add(reflectionRig.root);
        } else {
          applyLiveryToCarRig(mainCarRig, nextLivery);
          applyLiveryToCarRig(reflectionRig, nextLivery);
        }
        updateCameraTargetForModel(sel.carModelId);
      },
    };

    // Mouse & Touch Drag Turntable Rotation
    let isDragging = false;
    let lastPointerX = 0;
    let targetYaw = 0.58;
    let currentYaw = 0.58;
    let dragIdleTimer = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastPointerX = e.clientX;
      dragIdleTimer = 2.5;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      lastPointerX = e.clientX;
      targetYaw += dx * 0.011;
      dragIdleTimer = 2.5;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);

      if (!isDragging) {
        if (dragIdleTimer > 0) {
          dragIdleTimer = Math.max(0, dragIdleTimer - dt);
        } else {
          targetYaw += dt * 0.38;
        }
      }

      currentYaw = THREE.MathUtils.damp(currentYaw, targetYaw, 10.0, dt);
      turntableGroup.rotation.y = currentYaw;

      currentCamDist = THREE.MathUtils.damp(
        currentCamDist,
        targetCamDist,
        7.5,
        dt
      );
      camera.position.set(
        currentCamDist * 0.62,
        1.95,
        currentCamDist * 0.82
      );
      camera.lookAt(0, 0.56, 0);

      // Spin wheels gently on the turntable
      mainCarRig.wheelSpinMeshes.forEach((w) => {
        w.rotation.x -= dt * 1.1;
      });
      reflectionRig.wheelSpinMeshes.forEach((w) => {
        w.rotation.x -= dt * 1.1;
      });

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      studioApiRef.current = null;

      disposeCarRig(mainCarRig);
      disposeCarRig(reflectionRig);
      shadowTex.dispose();
      envTex.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      plinthGeo.dispose();
      plinthMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      lightHaloGeo.dispose();
      lightHaloMat.dispose();
      renderer.dispose();
    };
  }, []);

  const statRows = [
    {
      label: 'Speed',
      rating: currentCarSpec.speedRating,
      detail: `${Math.round(279 * currentCarSpec.topSpeedMult)} KM/H`,
      barClass: 'bg-amber-400',
    },
    {
      label: 'Acceleration',
      rating: currentCarSpec.accelRating,
      detail: `${(currentCarSpec.accelMult * 100).toFixed(0)}% Thrust`,
      barClass: 'bg-emerald-400',
    },
    {
      label: 'Handling',
      rating: currentCarSpec.handlingRating,
      detail: `${(currentCarSpec.handlingMult * 100).toFixed(0)}% Grip`,
      barClass: 'bg-cyan-400',
    },
    {
      label: 'Armor',
      rating: currentCarSpec.armorRating,
      detail: `${currentCarSpec.maxHp} HP`,
      barClass: 'bg-rose-400',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col bg-[#070A12] text-[#F8FAFC] select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Apex Horizon Car Selection Garage"
    >
      {/* Top Studio Header Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#080B14] shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <div>
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Showroom Garage
            </h2>
            <p className="text-xs text-slate-400">
              Use Left / Right Arrows to switch models · Drag turntable to inspect
            </p>
          </div>
        </div>

        {/* Model Selector Tabs */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10">
          {CAR_MODEL_ORDER.map((mId) => {
            const spec = CAR_CATALOG[mId];
            const isSelected = mId === selection.carModelId;
            return (
              <button
                key={mId}
                type="button"
                onClick={() => handleSelectModel(mId)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {spec.name}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onConfirmSelect(selection)}
          className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-lg"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Select</span>
        </button>
      </div>

      {/* Main 2-Column Showroom Layout: Left 3D Turntable Stage + Right Spec & Paint Customizer */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left/Center 3D Rotating Turntable Stage */}
        <div className="relative lg:col-span-7 xl:col-span-8 h-full min-h-[280px] flex flex-col justify-between overflow-hidden">
          <div
            ref={mountRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D Car Turntable"
          />

          {/* Top-Left Car Model Title & Category Kicker */}
          <div className="relative z-10 p-6 pointer-events-none flex items-start justify-between">
            <div className="space-y-1 max-w-md">
              <div className="text-xs font-medium text-amber-400">
                {currentCarSpec.category}
                {currentCarSpec.unlockable ? ' · Bonus Voxel Edition' : ''}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {currentCarSpec.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentCarSpec.tagline}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0F19]/85 border border-white/10 text-xs text-slate-300">
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Drag to Rotate 360°</span>
            </div>
          </div>

          {/* Left / Right On-Screen Car Switcher Arrows + Chassis Dimensions */}
          <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={() => handleStepCar(-1)}
              className="pointer-events-auto px-4 py-2.5 rounded-xl bg-[#0B0F19]/90 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
              aria-label="Previous car model"
            >
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>Prev Car</span>
            </button>

            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0B0F19]/90 border border-white/10 text-xs text-slate-300 font-mono-tabular">
              <span>Wheelbase {currentCarSpec.wheelbase.toFixed(2)}m</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>Width {currentCarSpec.bodyWidth.toFixed(2)}m</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span>Height {currentCarSpec.bodyHeight.toFixed(2)}m</span>
            </div>

            <button
              type="button"
              onClick={() => handleStepCar(1)}
              className="pointer-events-auto px-4 py-2.5 rounded-xl bg-[#0B0F19]/90 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center gap-2 transition-colors cursor-pointer"
              aria-label="Next car model"
            >
              <span>Next Car</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Right Column: Performance Stat Bars, 8 Paint Colours, 3 Livery Stripe Styles & Actions */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#0B0F19] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-6">
            {/* Performance Stat Bars */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display text-sm font-bold text-white">
                  Performance Specifications
                </span>
                <span className="text-xs text-slate-400 font-mono-tabular">
                  Heat Cap. {(currentCarSpec.weaponHeatCapacityMult * 100).toFixed(0)}%
                </span>
              </div>

              <div className="space-y-3">
                {statRows.map((st) => (
                  <div key={st.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="text-slate-300 font-sans font-medium">
                        {st.label}
                      </span>
                      <span className="text-white font-semibold">
                        {st.detail} · {st.rating}/100
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-150 ${st.barClass}`}
                        style={{ width: `${st.rating}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Paint Colour Picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display text-sm font-bold text-white">
                  Factory Paint Finish (8 Colours)
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  {currentPaint.name}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {GARAGE_PAINT_COLORS.map((paint) => {
                  const isSelected = paint.id === selection.paintId;
                  return (
                    <button
                      key={paint.id}
                      type="button"
                      onClick={() => handleSelectPaint(paint.id)}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-white/12 border-amber-400 text-white'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-md border border-white/25 shrink-0"
                        style={{ backgroundColor: paint.primaryHex }}
                      />
                      <span className="text-[11px] font-medium truncate">
                        {paint.name.split(' ')[1] || paint.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3 Livery Stripe Styles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-display text-sm font-bold text-white">
                  Livery Stripe Package
                </span>
                <span className="text-xs text-slate-400">
                  3 Styles
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {GARAGE_STRIPE_STYLES.map((style) => {
                  const isSelected = style.id === selection.stripeStyle;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => handleSelectStripe(style.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer text-center whitespace-nowrap ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 border-amber-400'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {style.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Confirm & Back Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="py-2.5 px-4 rounded-lg bg-white/8 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => onConfirmSelect(selection)}
              className="flex-1 py-2.5 px-5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Select {currentCarSpec.name} & Launch Race</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
