import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { SOLAR_SYSTEM_DATA } from '../../data/solarSystemData';
import { ANIMATION_CONFIG } from '../../config/animationConfig';
import {
  generateSunTexture,
  generateMercuryTexture,
  generateVenusTexture,
  generateEarthTexture,
  generateEarthCloudsTexture,
  generateMoonTexture,
  generateMarsTexture,
  generateJupiterTexture,
  generateSaturnTexture,
  generateSaturnRingsTexture,
  generateUranusTexture,
  generateNeptuneTexture
} from './textureGenerators';
import { createGalaxyEnvironment } from './GalaxyEnvironment';
import { soundEngine } from '../../utils/soundEngine';

export default function SolarSystemCanvas({
  selectedPlanetId,
  onSelectPlanet,
  onHoverPlanet,
  orbitSpeedFactor = 1,
  showOrbits = true,
  isDrawerOpen = false,
  isGalaxyView = false
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  const planetsMapRef = useRef({});
  const orbitLinesRef = useRef([]);
  const cloudsRef = useRef(null);
  const moonRef = useRef(null);
  const sunMeshRef = useRef(null);
  const sunGlowRef = useRef(null);
  const asteroidBeltRef = useRef(null);
  const galaxyEnvRef = useRef(null);
  const hoveredMeshRef = useRef(null);

  const animFrameIdRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // Trigger tactile 3D scale bounce on a mesh
  const triggerMeshBounce = useCallback((mesh) => {
    if (!mesh) return;
    gsap.killTweensOf(mesh.scale);
    gsap.timeline()
      .to(mesh.scale, {
        x: ANIMATION_CONFIG.planet3D.clickBounceScale,
        y: ANIMATION_CONFIG.planet3D.clickBounceScale,
        z: ANIMATION_CONFIG.planet3D.clickBounceScale,
        duration: ANIMATION_CONFIG.planet3D.bounceUpDuration,
        ease: 'back.out(2.5)'
      })
      .to(mesh.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: ANIMATION_CONFIG.planet3D.bounceDownDuration,
        ease: 'elastic.out(1, 0.4)'
      });
  }, []);

  // Trigger expanding glowing shockwave ripple ring in 3D
  const triggerShockwaveRipple = useCallback((worldPos, radius, accentColorHex) => {
    const scene = sceneRef.current;
    if (!scene) return;

    const ringInner = Math.max(0.4, radius * 0.95);
    const ringOuter = Math.max(0.6, radius * 1.25);
    const shockGeo = new THREE.RingGeometry(ringInner, ringOuter, 64);
    const color = new THREE.Color(accentColorHex || '#38bdf8');
    const shockMat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const shockMesh = new THREE.Mesh(shockGeo, shockMat);
    shockMesh.position.copy(worldPos);
    shockMesh.rotation.x = Math.PI / 2; // Flat on orbital plane
    scene.add(shockMesh);

    gsap.timeline({
      onComplete: () => {
        scene.remove(shockMesh);
        shockGeo.dispose();
        shockMat.dispose();
      }
    })
    .to(shockMesh.scale, {
      x: ANIMATION_CONFIG.planet3D.shockwaveMaxRadiusMultiplier,
      y: ANIMATION_CONFIG.planet3D.shockwaveMaxRadiusMultiplier,
      z: ANIMATION_CONFIG.planet3D.shockwaveMaxRadiusMultiplier,
      duration: ANIMATION_CONFIG.planet3D.shockwaveDuration,
      ease: 'power2.out'
    }, 0)
    .to(shockMat, {
      opacity: 0,
      duration: ANIMATION_CONFIG.planet3D.shockwaveDuration,
      ease: 'power2.inOut'
    }, 0);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030712');
    scene.fog = new THREE.FogExp2('#030712', 0.0012);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3500);
    camera.position.set(0, 45, 75);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 1400; // Allow full galaxy zooming
    controls.maxPolarAngle = Math.PI / 2 + 0.18;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.18);
    scene.add(ambientLight);

    // Primary Sun PointLight (radiates sunlight onto planets)
    const sunLight = new THREE.PointLight(0xfff3d6, 3.2, 300, 0.6);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Subtle soft fill lights from top/bottom for rim visibility
    const topFill = new THREE.DirectionalLight(0x38bdf8, 0.08);
    topFill.position.set(0, 80, 0);
    scene.add(topFill);

    // 6. Starfield
    const createStarfield = () => {
      const starCount = 3500;
      const starGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      const colorPalette = [
        new THREE.Color('#ffffff'),
        new THREE.Color('#93c5fd'),
        new THREE.Color('#fde047'),
        new THREE.Color('#fca5a5')
      ];

      for (let i = 0; i < starCount; i++) {
        const radius = 250 + Math.random() * 450;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;

        sizes[i] = Math.random() * 2.2 + 0.6;
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const starMat = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true
      });

      const starPoints = new THREE.Points(starGeo, starMat);
      scene.add(starPoints);
    };
    createStarfield();

    // 7. The Sun
    const sunData = SOLAR_SYSTEM_DATA.sun;
    const sunGeo = new THREE.SphereGeometry(sunData.radius, 64, 64);
    const sunTexture = generateSunTexture();
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.name = 'sun';
    sunMesh.userData = { id: 'sun', ...sunData };
    scene.add(sunMesh);
    sunMeshRef.current = sunMesh;

    // Outer Glow / Corona for Sun
    const glowGeo = new THREE.SphereGeometry(sunData.radius * 1.22, 32, 32);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.65, 0.15, 1.0) * intensity * 1.8;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const sunGlow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(sunGlow);
    sunGlowRef.current = sunGlow;

    // 8. Planets Generation
    const textureLoaders = {
      mercury: generateMercuryTexture,
      venus: generateVenusTexture,
      earth: generateEarthTexture,
      mars: generateMarsTexture,
      jupiter: generateJupiterTexture,
      saturn: generateSaturnTexture,
      uranus: generateUranusTexture,
      neptune: generateNeptuneTexture
    };

    const planetsMap = {};
    const orbitLines = [];

    SOLAR_SYSTEM_DATA.planets.forEach((pData, idx) => {
      // Planet Orbit Pivot Object (rotates around origin)
      const orbitPivot = new THREE.Group();
      orbitPivot.name = `${pData.id}_orbit`;
      scene.add(orbitPivot);

      // Planet Mesh
      const pGeo = new THREE.SphereGeometry(pData.radius, 48, 48);
      const pTex = textureLoaders[pData.id] ? textureLoaders[pData.id]() : null;

      const pMat = new THREE.MeshStandardMaterial({
        map: pTex,
        roughness: pData.id === 'earth' ? 0.4 : 0.8,
        metalness: 0.1,
      });

      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.name = pData.id;
      pMesh.castShadow = true;
      pMesh.receiveShadow = true;

      // Axial tilt
      pMesh.rotation.z = THREE.MathUtils.degToRad(pData.tilt || 0);

      // Initial orbital angle spread around the sun
      const angle = (idx / SOLAR_SYSTEM_DATA.planets.length) * Math.PI * 2 + idx * 0.4;
      pMesh.position.set(Math.cos(angle) * pData.distance, 0, Math.sin(angle) * pData.distance);

      pMesh.userData = {
        id: pData.id,
        currentAngle: angle,
        distance: pData.distance,
        orbitSpeed: pData.orbitSpeed,
        rotationSpeed: pData.rotationSpeed,
        data: pData
      };

      orbitPivot.add(pMesh);

      // Earth-specific extras (Atmosphere & Moon)
      if (pData.id === 'earth') {
        const cloudsGeo = new THREE.SphereGeometry(pData.radius * 1.025, 48, 48);
        const cloudsTex = generateEarthCloudsTexture();
        const cloudsMat = new THREE.MeshStandardMaterial({
          map: cloudsTex,
          transparent: true,
          opacity: 0.85,
          blending: THREE.NormalBlending,
          depthWrite: false
        });
        const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
        pMesh.add(cloudsMesh);
        cloudsRef.current = cloudsMesh;

        // Moon
        const moonGeo = new THREE.SphereGeometry(0.32, 24, 24);
        const moonTex = generateMoonTexture();
        const moonMat = new THREE.MeshStandardMaterial({
          map: moonTex,
          roughness: 0.9,
        });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(2.4, 0.4, 0);
        moonMesh.userData = { angle: 0 };
        pMesh.add(moonMesh);
        moonRef.current = moonMesh;
      }

      // Saturn-specific Rings
      if (pData.hasRings) {
        const ringInner = pData.radius * 1.35;
        const ringOuter = pData.radius * 2.45;
        const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 64);

        const pos = ringGeo.attributes.position;
        const v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
          v3.fromBufferAttribute(pos, i);
          ringGeo.attributes.uv.setXY(i, (v3.length() - ringInner) / (ringOuter - ringInner), 0);
        }

        const ringTex = generateSaturnRingsTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.92,
          roughness: 0.8
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        pMesh.add(ringMesh);
      }

      // Orbit Path Line Spline
      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        pData.distance, pData.distance,
        0, 2 * Math.PI,
        false,
        0
      );
      const points = orbitCurve.getPoints(128);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map(pt => new THREE.Vector3(pt.x, 0, pt.y))
      );
      const defaultOrbitColor = pData.isPrimary ? 0x38bdf8 : 0x334155;
      const defaultOrbitOpacity = pData.isPrimary ? 0.45 : 0.25;

      const orbitMat = new THREE.LineBasicMaterial({
        color: defaultOrbitColor,
        transparent: true,
        opacity: defaultOrbitOpacity,
        linewidth: 1
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.userData = {
        planetId: pData.id,
        accentColor: pData.accentColor || '#38bdf8',
        defaultColor: defaultOrbitColor,
        defaultOpacity: defaultOrbitOpacity
      };
      scene.add(orbitLine);
      orbitLines.push(orbitLine);

      planetsMap[pData.id] = {
        mesh: pMesh,
        pivot: orbitPivot,
        data: pData,
        orbitLine: orbitLine
      };
    });

    planetsMapRef.current = planetsMap;
    orbitLinesRef.current = orbitLines;

    // 9. Asteroid Belt (between Mars and Jupiter: radii 31 to 35)
    const createAsteroidBelt = () => {
      const asteroidCount = 1200;
      const rockGeo = new THREE.DodecahedronGeometry(0.08, 1);
      const rockMat = new THREE.MeshStandardMaterial({
        color: 0x78716c,
        roughness: 0.9,
      });
      const instancedMesh = new THREE.InstancedMesh(rockGeo, rockMat, asteroidCount);
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const rotation = new THREE.Euler();
      const scale = new THREE.Vector3();

      for (let i = 0; i < asteroidCount; i++) {
        const radius = 32 + Math.random() * 4.5;
        const angle = Math.random() * Math.PI * 2;
        const yOffset = (Math.random() - 0.5) * 1.6;

        position.set(
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        );

        rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        const s = 0.4 + Math.random() * 1.2;
        scale.set(s, s, s);

        matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
        instancedMesh.setMatrixAt(i, matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      scene.add(instancedMesh);
      asteroidBeltRef.current = instancedMesh;
    };
    createAsteroidBelt();

    // 9.5 Galaxy & Deep Space Environment (Spiral arms, nebulae, shooting stars, star systems)
    const galaxyEnv = createGalaxyEnvironment(scene);
    galaxyEnvRef.current = galaxyEnv;

    // 10. Raycasting & Mouse Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const starSystemMeshes = galaxyEnv.group.getObjectByName('star_systems')?.children || [];
      const interactiveMeshes = [
        sunMesh,
        ...Object.values(planetsMapRef.current).map(p => p.mesh),
        ...starSystemMeshes
      ];

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        container.style.cursor = 'pointer';

        if (hoveredMeshRef.current !== hitMesh) {
          hoveredMeshRef.current = hitMesh;
          const planetId = hitMesh.userData.id;
          const hitData = hitMesh.userData.data || hitMesh.userData;

          const worldPos = new THREE.Vector3();
          hitMesh.getWorldPosition(worldPos);
          worldPos.y += (hitData.radius || hitData.size || 1) + 0.6;
          worldPos.project(camera);

          const screenX = (worldPos.x * 0.5 + 0.5) * rect.width;
          const screenY = (-(worldPos.y * 0.5) + 0.5) * rect.height;

          if (onHoverPlanet) {
            onHoverPlanet({
              id: planetId,
              data: hitData,
              x: screenX,
              y: screenY,
              isVisible: true
            });
          }
        }
      } else {
        container.style.cursor = 'default';
        if (hoveredMeshRef.current) {
          hoveredMeshRef.current = null;
          if (onHoverPlanet) {
            onHoverPlanet({ isVisible: false });
          }
        }
      }
    };

    const handlePointerDown = (e) => {
      if (e.button !== 0) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const interactiveMeshes = [
        sunMesh,
        ...Object.values(planetsMapRef.current).map(p => p.mesh)
      ];

      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const planetId = hit.userData.id;
        const hitData = hit.userData.data || hit.userData;

        // Trigger immediate tactile bounce & 3D shockwave ripple
        triggerMeshBounce(hit);
        const worldPos = new THREE.Vector3();
        hit.getWorldPosition(worldPos);
        triggerShockwaveRipple(worldPos, hitData.radius || 1.5, hitData.accentColor || '#38bdf8');

        if (onSelectPlanet) {
          soundEngine.playUiClick();
          onSelectPlanet(planetId);
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);

    // 11. Responsive Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 12. Main Animation Loop
    let lastTime = performance.now();

    const animate = (time) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Update Galaxy Environment
      if (galaxyEnvRef.current) {
        galaxyEnvRef.current.update(time, delta, isGalaxyView);
      }

      // Sun self-rotation & corona pulse
      if (sunMesh) {
        sunMesh.rotation.y += 0.0015;
      }
      if (sunGlowRef.current) {
        const scalePulse = 1.0 + Math.sin(time * 0.002) * 0.03;
        sunGlowRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      }

      // Asteroid belt slow rotation
      if (asteroidBeltRef.current) {
        asteroidBeltRef.current.rotation.y += 0.0003 * orbitSpeedFactor;
      }

      // Orbit and rotate planets
      Object.values(planetsMapRef.current).forEach(({ mesh }) => {
        const pData = mesh.userData;

        mesh.rotation.y += (pData.rotationSpeed || 0.01);

        if (orbitSpeedFactor > 0 && !isTransitioningRef.current) {
          pData.currentAngle += (pData.orbitSpeed || 0.01) * 0.4 * orbitSpeedFactor;
          mesh.position.x = Math.cos(pData.currentAngle) * pData.distance;
          mesh.position.z = Math.sin(pData.currentAngle) * pData.distance;
        }
      });

      // Earth clouds & Moon animation
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0025;
      }
      if (moonRef.current) {
        moonRef.current.userData.angle += 0.03 * orbitSpeedFactor;
        const mAngle = moonRef.current.userData.angle;
        moonRef.current.position.x = Math.cos(mAngle) * 2.3;
        moonRef.current.position.z = Math.sin(mAngle) * 2.3;
        moonRef.current.rotation.y += 0.02;
      }

      // Update Controls
      controls.update();

      // Render
      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      if (galaxyEnvRef.current) {
        galaxyEnvRef.current.dispose();
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [triggerMeshBounce, triggerShockwaveRipple]);

  // Handle Orbit Lines Visibility
  useEffect(() => {
    orbitLinesRef.current.forEach(line => {
      line.visible = showOrbits;
    });
  }, [showOrbits]);

  // Handle Planet Selection, Orbit Ring Flare, Shockwave & Camera Fly-To
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Highlight active orbit ring and reset others
    orbitLinesRef.current.forEach(line => {
      const isSelected = line.userData.planetId === selectedPlanetId;
      gsap.killTweensOf(line.material);

      if (isSelected) {
        // Flare orbit in accent color with high opacity
        line.material.color.set(line.userData.accentColor || '#38bdf8');
        gsap.to(line.material, {
          opacity: ANIMATION_CONFIG.planet3D.orbitActiveOpacity,
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        // Return to standard orbital path appearance
        line.material.color.set(line.userData.defaultColor);
        gsap.to(line.material, {
          opacity: line.userData.defaultOpacity,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }
    });

    if (isGalaxyView) {
      isTransitioningRef.current = true;
      soundEngine.playFlyToSound();

      gsap.to(camera.position, {
        x: 0,
        y: 380,
        z: 750,
        duration: ANIMATION_CONFIG.galaxyView.zoomDuration,
        ease: 'power3.inOut',
        onUpdate: () => {
          controls.update();
        }
      });

      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: ANIMATION_CONFIG.galaxyView.zoomDuration,
        ease: 'power3.inOut',
        onComplete: () => {
          isTransitioningRef.current = false;
        }
      });
    } else if (selectedPlanetId) {
      let targetMesh = null;
      let targetRadius = 1;
      let accentColor = '#38bdf8';

      if (selectedPlanetId === 'sun') {
        targetMesh = sunMeshRef.current;
        targetRadius = SOLAR_SYSTEM_DATA.sun.radius;
        accentColor = SOLAR_SYSTEM_DATA.sun.accentColor || '#fbbf24';
      } else if (planetsMapRef.current[selectedPlanetId]) {
        targetMesh = planetsMapRef.current[selectedPlanetId].mesh;
        targetRadius = planetsMapRef.current[selectedPlanetId].data.radius;
        accentColor = planetsMapRef.current[selectedPlanetId].data.accentColor || '#38bdf8';
      }

      if (targetMesh) {
        // Trigger 3D scale bounce and pulse ripple
        triggerMeshBounce(targetMesh);
        const worldPos = new THREE.Vector3();
        targetMesh.getWorldPosition(worldPos);
        triggerShockwaveRipple(worldPos, targetRadius, accentColor);

        isTransitioningRef.current = true;
        soundEngine.playFlyToSound();
        soundEngine.playPlanetSelectTone(selectedPlanetId === 'earth' ? 528 : 440);

        const zoomDist = targetRadius * 3.4 + 2.2;
        const offsetX = isDrawerOpen ? -zoomDist * 0.4 : 0;
        const targetCamPos = new THREE.Vector3(
          worldPos.x + zoomDist * 0.8 + offsetX,
          worldPos.y + zoomDist * 0.45,
          worldPos.z + zoomDist * 0.9
        );

        gsap.to(camera.position, {
          x: targetCamPos.x,
          y: targetCamPos.y,
          z: targetCamPos.z,
          duration: 1.8,
          ease: 'power3.inOut',
          onUpdate: () => {
            controls.update();
          }
        });

        gsap.to(controls.target, {
          x: worldPos.x,
          y: worldPos.y,
          z: worldPos.z,
          duration: 1.8,
          ease: 'power3.inOut',
          onComplete: () => {
            isTransitioningRef.current = false;
          }
        });
      }
    } else {
      isTransitioningRef.current = true;
      soundEngine.playFlyToSound();

      gsap.to(camera.position, {
        x: 0,
        y: 45,
        z: 75,
        duration: 2.0,
        ease: 'power3.inOut',
        onUpdate: () => {
          controls.update();
        }
      });

      gsap.to(controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.0,
        ease: 'power3.inOut',
        onComplete: () => {
          isTransitioningRef.current = false;
        }
      });
    }
  }, [selectedPlanetId, isDrawerOpen, isGalaxyView, triggerMeshBounce, triggerShockwaveRipple]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#030712] cursor-grab active:cursor-grabbing"
    />
  );
}
