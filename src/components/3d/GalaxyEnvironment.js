import * as THREE from 'three';

/**
 * Creates the Deep Space Galaxy Environment with:
 * 1. 25,000+ Particle Procedural Spiral Galaxy (Milky Way)
 * 2. Multi-spectral Volumetric Nebula Gas Clouds (Purple, Cyan, Orange)
 * 3. Distant Neighboring Star Systems with beacon coronas
 * 4. Dynamic Shooting Stars / Comets streak generator
 * 5. Solar System Cosmic Beacon Marker
 */
export function createGalaxyEnvironment(scene) {
  const galaxyGroup = new THREE.Group();
  galaxyGroup.name = 'galaxy_environment';
  scene.add(galaxyGroup);

  // ----------------------------------------------------
  // 1. Procedural Spiral Galaxy (Milky Way Disk & Core)
  // ----------------------------------------------------
  const galaxyParams = {
    count: 32000,
    size: 1.8,
    radius: 750,
    branches: 4,
    spin: 1.25,
    randomness: 0.45,
    randomnessPower: 3.5,
    insideColor: new THREE.Color('#fff7ed'),   // Radiant golden-white core
    midColor: new THREE.Color('#38bdf8'),      // Cyan inner arms
    outsideColor: new THREE.Color('#c084fc'),  // Violet/Magenta outer arms
    rimColor: new THREE.Color('#f43f5e')       // Rose/Pink faint halo
  };

  const galaxyGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(galaxyParams.count * 3);
  const colors = new Float32Array(galaxyParams.count * 3);
  const scales = new Float32Array(galaxyParams.count);

  for (let i = 0; i < galaxyParams.count; i++) {
    // Distance from galaxy center
    const r = Math.pow(Math.random(), 1.6) * galaxyParams.radius;
    const branchAngle = ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2;
    const spinAngle = r * (galaxyParams.spin / galaxyParams.radius);

    // Random dispersion in 3D
    const randomX = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * r;
    const randomY = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (galaxyParams.randomness * 0.45) * r;
    const randomZ = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * r;

    // Spiral Arm Position
    positions[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX;
    positions[i * 3 + 1] = randomY - 40; // Slight tilt offset
    positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

    // Smooth Radial Color Gradient
    const mixedColor = galaxyParams.insideColor.clone();
    const ratio = r / galaxyParams.radius;

    if (ratio < 0.25) {
      mixedColor.lerp(galaxyParams.midColor, ratio / 0.25);
    } else if (ratio < 0.7) {
      mixedColor.lerp(galaxyParams.outsideColor, (ratio - 0.25) / 0.45);
    } else {
      mixedColor.lerp(galaxyParams.rimColor, (ratio - 0.7) / 0.3);
    }

    // Add subtle color noise
    mixedColor.r += (Math.random() - 0.5) * 0.08;
    mixedColor.g += (Math.random() - 0.5) * 0.08;
    mixedColor.b += (Math.random() - 0.5) * 0.08;

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;

    // Variable star particle sizes
    scales[i] = Math.random() * 2.4 + 0.6;
  }

  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  galaxyGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  // Circular star texture
  const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.2, 'rgba(240,249,255,0.85)');
    grad.addColorStop(0.6, 'rgba(186,230,253,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  };

  const starTexture = createCircleTexture();

  const galaxyMat = new THREE.PointsMaterial({
    size: galaxyParams.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    map: starTexture,
    transparent: true,
    opacity: 0.92
  });

  const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
  galaxyPoints.rotation.x = Math.PI * 0.12; // tilted galactic plane
  galaxyGroup.add(galaxyPoints);

  // ----------------------------------------------------
  // 2. Volumetric Nebula Gas Clouds (Purple, Cyan, Gold)
  // ----------------------------------------------------
  const createNebulaTexture = (colorHex) => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, colorHex);
    grad.addColorStop(0.4, colorHex.replace('1)', '0.35)'));
    grad.addColorStop(0.8, colorHex.replace('1)', '0.08)'));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  };

  const nebulaColors = [
    'rgba(168, 85, 247, 1)',  // Orion Violet
    'rgba(6, 182, 212, 1)',   // Carina Cyan
    'rgba(249, 115, 22, 1)',  // Eagle Orange
    'rgba(236, 72, 153, 1)'   // Rosette Pink
  ];

  const nebulaClouds = [];

  nebulaColors.forEach((col, idx) => {
    const cloudCount = 180;
    const cloudGeo = new THREE.BufferGeometry();
    const cPos = new Float32Array(cloudCount * 3);
    const cSizes = new Float32Array(cloudCount);

    const centerDist = 280 + idx * 95;
    const baseAngle = (idx * Math.PI) / 2;

    for (let i = 0; i < cloudCount; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * 1.8;
      const radius = centerDist + (Math.random() - 0.5) * 160;
      const yOffset = (Math.random() - 0.5) * 110;

      cPos[i * 3] = Math.cos(angle) * radius;
      cPos[i * 3 + 1] = yOffset;
      cPos[i * 3 + 2] = Math.sin(angle) * radius;

      cSizes[i] = 40 + Math.random() * 95;
    }

    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
    cloudGeo.setAttribute('size', new THREE.BufferAttribute(cSizes, 1));

    const cloudMat = new THREE.PointsMaterial({
      size: 65,
      map: createNebulaTexture(col),
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const cloudMesh = new THREE.Points(cloudGeo, cloudMat);
    galaxyGroup.add(cloudMesh);
    nebulaClouds.push(cloudMesh);
  });

  // ----------------------------------------------------
  // 3. Distant Neighboring Star Systems (Exoplanet Anchors)
  // ----------------------------------------------------
  const starSystems = [
    { name: 'Alpha Centauri', dist: '4.37 ly', pos: [140, 25, -190], color: '#fde047', size: 2.2 },
    { name: 'Sirius (Alpha Canis Majoris)', dist: '8.6 ly', pos: [-220, 40, 160], color: '#93c5fd', size: 2.5 },
    { name: 'Vega', dist: '25 ly', pos: [260, 60, 220], color: '#bae6fd', size: 2.0 },
    { name: 'TRAPPIST-1 System', dist: '40 ly', pos: [-180, -35, -280], color: '#f87171', size: 1.8 },
    { name: 'Kepler-186 Habitable Zone', dist: '582 ly', pos: [380, -50, -160], color: '#34d399', size: 1.8 },
    { name: 'Betelgeuse Supergiant', dist: '642 ly', pos: [-340, 90, 310], color: '#ef4444', size: 3.2 }
  ];

  const starSystemGroup = new THREE.Group();
  starSystemGroup.name = 'star_systems';

  starSystems.forEach(sys => {
    // Star Core
    const sGeo = new THREE.SphereGeometry(sys.size, 16, 16);
    const sMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(sys.color)
    });
    const sMesh = new THREE.Mesh(sGeo, sMat);
    sMesh.position.set(...sys.pos);
    sMesh.userData = { isStarSystem: true, ...sys };

    // Star Corona Glow Halo
    const haloGeo = new THREE.SphereGeometry(sys.size * 2.5, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(sys.color),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    sMesh.add(haloMesh);

    starSystemGroup.add(sMesh);
  });

  galaxyGroup.add(starSystemGroup);

  // ----------------------------------------------------
  // 4. Solar System Beacon (Locates Sun in Galaxy View)
  // ----------------------------------------------------
  const beaconGroup = new THREE.Group();
  beaconGroup.name = 'solar_beacon';

  // Pulsing beacon ring
  const ringGeo = new THREE.RingGeometry(18, 20, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const beaconRing = new THREE.Mesh(ringGeo, ringMat);
  beaconRing.rotation.x = Math.PI / 2;
  beaconGroup.add(beaconRing);

  galaxyGroup.add(beaconGroup);

  // ----------------------------------------------------
  // 5. Dynamic Shooting Stars / Comets Streak System
  // ----------------------------------------------------
  const shootingStars = [];
  const maxShootingStars = 4;

  const createShootingStar = () => {
    const length = 45 + Math.random() * 40;
    const curvePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-length, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 15)
    ];
    const sGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const sMat = new THREE.LineBasicMaterial({
      color: Math.random() > 0.4 ? 0x38bdf8 : 0xfde047,
      transparent: true,
      opacity: 0,
      linewidth: 2,
      blending: THREE.AdditiveBlending
    });
    const starLine = new THREE.Line(sGeo, sMat);

    // Initial random placement in deep space
    const startRadius = 320 + Math.random() * 250;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 220;

    starLine.position.set(
      Math.cos(theta) * startRadius,
      y,
      Math.sin(theta) * startRadius
    );

    starLine.userData = {
      active: false,
      speed: 3.5 + Math.random() * 3.0,
      opacity: 0,
      direction: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2
      ).normalize(),
      cooldown: Math.random() * 180 + 60
    };

    galaxyGroup.add(starLine);
    return starLine;
  };

  for (let i = 0; i < maxShootingStars; i++) {
    shootingStars.push(createShootingStar());
  }

  // ----------------------------------------------------
  // 6. Animation Loop Tick & Control Methods
  // ----------------------------------------------------
  let isVisible = true;

  const update = (time, delta, isGalaxyZoom = false) => {
    if (!isVisible) return;

    // Slow rotation of entire spiral galaxy
    galaxyPoints.rotation.y += 0.00015;

    // Subtle breathing pulse for nebulae
    nebulaClouds.forEach((cloud, i) => {
      cloud.rotation.y += 0.00008 * (i % 2 === 0 ? 1 : -1);
      const pulse = 1.0 + Math.sin(time * 0.001 + i) * 0.04;
      cloud.scale.set(pulse, pulse, pulse);
    });

    // Solar system beacon pulse
    if (beaconRing) {
      const bPulse = 1.0 + Math.sin(time * 0.004) * 0.15;
      beaconRing.scale.set(bPulse, bPulse, bPulse);
      beaconRing.material.opacity = isGalaxyZoom ? (0.5 + Math.sin(time * 0.005) * 0.35) : 0.25;
    }

    // Distant Star System Twinkle
    starSystemGroup.children.forEach((sMesh, i) => {
      const sPulse = 1.0 + Math.sin(time * 0.003 + i * 1.5) * 0.18;
      sMesh.scale.set(sPulse, sPulse, sPulse);
    });

    // Shooting Stars / Comets Update
    shootingStars.forEach(sLine => {
      const uData = sLine.userData;

      if (!uData.active) {
        uData.cooldown--;
        if (uData.cooldown <= 0) {
          // Trigger new shooting star
          uData.active = true;
          uData.opacity = 1;
          uData.cooldown = 180 + Math.random() * 320;

          const spawnRadius = 300 + Math.random() * 280;
          const theta = Math.random() * Math.PI * 2;
          sLine.position.set(
            Math.cos(theta) * spawnRadius,
            (Math.random() - 0.5) * 200,
            Math.sin(theta) * spawnRadius
          );
        }
      } else {
        // Move along direction
        sLine.position.addScaledVector(uData.direction, uData.speed);
        uData.opacity -= 0.015;
        sLine.material.opacity = Math.max(0, uData.opacity);

        if (uData.opacity <= 0) {
          uData.active = false;
        }
      }
    });
  };

  const setVisible = (val) => {
    isVisible = val;
    galaxyGroup.visible = val;
  };

  const dispose = () => {
    galaxyGeo.dispose();
    galaxyMat.dispose();
    starTexture.dispose();
    scene.remove(galaxyGroup);
  };

  return {
    group: galaxyGroup,
    starSystems,
    update,
    setVisible,
    dispose
  };
}
