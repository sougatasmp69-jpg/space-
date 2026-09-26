import * as THREE from 'three';

// Procedural 2D Canvas Texture Generators for Planets & Celestial Bodies

/**
 * Creates a noise canvas for terrain & cloud generation
 */
function createNoiseHelper(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

// Simple deterministic pseudo-random noise
function pseudoNoise(x, y, seed = 1) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x, y, scale = 0.05, seed = 1) {
  const nx = x * scale;
  const ny = y * scale;
  const x0 = Math.floor(nx);
  const x1 = x0 + 1;
  const y0 = Math.floor(ny);
  const y1 = y0 + 1;

  const sx = nx - x0;
  const sy = ny - y0;

  const n00 = pseudoNoise(x0, y0, seed);
  const n10 = pseudoNoise(x1, y0, seed);
  const n01 = pseudoNoise(x0, y1, seed);
  const n11 = pseudoNoise(x1, y1, seed);

  const nx0 = n00 * (1 - sx) + n10 * sx;
  const nx1 = n01 * (1 - sx) + n11 * sx;

  return nx0 * (1 - sy) + nx1 * sy;
}

function fbm(x, y, octaves = 4, scale = 0.02, seed = 1) {
  let val = 0;
  let freq = scale;
  let amp = 0.5;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    val += smoothNoise(x, y, freq, seed + i * 10) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.0;
  }
  return val / max;
}

/**
 * Procedural Sun Texture
 */
export function generateSunTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n1 = fbm(x, y, 5, 0.015, 12);
      const n2 = fbm(x + 50, y + 50, 4, 0.03, 99);
      const val = (n1 * 0.7 + n2 * 0.3);

      const i = (y * width + x) * 4;
      // Vibrant yellow/orange/gold plasma
      data[i] = Math.floor(245 + val * 10);     // Red
      data[i + 1] = Math.floor(140 + val * 105); // Green
      data[i + 2] = Math.floor(10 + val * 45);   // Blue
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Mercury Texture
 */
export function generateMercuryTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 5, 0.02, 45);
      const crater = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 0.15;
      const shade = Math.floor(120 + (n + crater) * 80);

      const i = (y * width + x) * 4;
      data[i] = shade;
      data[i + 1] = shade;
      data[i + 2] = shade + 4;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Venus Texture
 */
export function generateVenusTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const latDistort = Math.sin(y * 0.06 + Math.cos(y * 0.02) * 2) * 15;
    for (let x = 0; x < width; x++) {
      const n = fbm(x + latDistort, y * 0.5, 4, 0.012, 73);
      const i = (y * width + x) * 4;

      data[i] = Math.floor(210 + n * 40);       // Ochre Orange
      data[i + 1] = Math.floor(130 + n * 60);   // Amber
      data[i + 2] = Math.floor(60 + n * 40);    // Warm Gold
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Earth Surface Texture
 */
export function generateEarthTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const latNorm = Math.abs((y / height) - 0.5) * 2; // 0 at equator, 1 at poles
    for (let x = 0; x < width; x++) {
      const continentNoise = fbm(x, y, 6, 0.008, 105);
      const detailNoise = fbm(x, y, 4, 0.03, 44);
      const combined = continentNoise * 0.8 + detailNoise * 0.2;

      const i = (y * width + x) * 4;

      if (latNorm > 0.88) {
        // Polar Ice Caps
        const ice = 230 + Math.floor(detailNoise * 25);
        data[i] = ice;
        data[i + 1] = ice;
        data[i + 2] = ice + 10;
      } else if (combined > 0.52) {
        // Landmass
        if (combined > 0.65) {
          // Mountains / highlands / arid
          data[i] = Math.floor(130 + detailNoise * 50); // Brown/Gold
          data[i + 1] = Math.floor(110 + detailNoise * 40);
          data[i + 2] = Math.floor(70 + detailNoise * 20);
        } else {
          // Forests / Vegetated Plains
          data[i] = Math.floor(34 + detailNoise * 40);   // Green
          data[i + 1] = Math.floor(115 + detailNoise * 65);
          data[i + 2] = Math.floor(45 + detailNoise * 35);
        }
      } else if (combined > 0.49) {
        // Coastal Shallow Waters / Reefs
        data[i] = 14;
        data[i + 1] = 135;
        data[i + 2] = 180;
      } else {
        // Deep Oceans
        const depth = (0.5 - combined) * 1.5;
        data[i] = Math.max(5, Math.floor(10 - depth * 8));
        data[i + 1] = Math.max(25, Math.floor(45 - depth * 25));
        data[i + 2] = Math.max(80, Math.floor(125 - depth * 40));
      }
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Earth Clouds Texture
 */
export function generateEarthCloudsTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const latSwirl = Math.sin(y * 0.04) * 20;
    for (let x = 0; x < width; x++) {
      const n = fbm(x + latSwirl, y, 5, 0.012, 330);
      const i = (y * width + x) * 4;

      if (n > 0.52) {
        const opacity = Math.floor((n - 0.52) * 4.5 * 255);
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = Math.min(220, opacity);
      } else {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Moon Texture
 */
export function generateMoonTexture() {
  const width = 512;
  const height = 256;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 4, 0.025, 88);
      const maria = fbm(x, y, 2, 0.008, 12) > 0.6 ? -30 : 0;
      const shade = Math.floor(Math.max(60, Math.min(210, 140 + n * 70 + maria)));

      const i = (y * width + x) * 4;
      data[i] = shade;
      data[i + 1] = shade;
      data[i + 2] = shade;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Mars Texture
 */
export function generateMarsTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const latNorm = Math.abs((y / height) - 0.5) * 2;
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 5, 0.015, 66);
      const darkBasalt = fbm(x, y, 3, 0.006, 120);

      const i = (y * width + x) * 4;

      if (latNorm > 0.9) {
        // Polar Ice
        data[i] = 240;
        data[i + 1] = 240;
        data[i + 2] = 250;
      } else {
        const isDark = darkBasalt > 0.58;
        if (isDark) {
          data[i] = Math.floor(120 + n * 40);     // Dark volcanic rust
          data[i + 1] = Math.floor(60 + n * 30);
          data[i + 2] = Math.floor(40 + n * 20);
        } else {
          data[i] = Math.floor(190 + n * 55);     // Red iron oxide sand
          data[i + 1] = Math.floor(95 + n * 35);
          data[i + 2] = Math.floor(60 + n * 25);
        }
      }
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Jupiter Texture with Banding & Great Red Spot
 */
export function generateJupiterTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const grsX = width * 0.65;
  const grsY = height * 0.68;
  const grsRadiusX = 55;
  const grsRadiusY = 32;

  for (let y = 0; y < height; y++) {
    const bandSine = Math.sin(y * 0.12) * 0.5 + 0.5;
    const microBands = Math.sin(y * 0.4) * 0.2;
    const wave = Math.sin(y * 0.05) * 20;

    for (let x = 0; x < width; x++) {
      const n = fbm(x + wave, y, 4, 0.015, 202);
      const combined = (bandSine + microBands * 0.5 + n * 0.5) / 1.5;

      // Great Red Spot calculation
      const dx = (x - grsX) / grsRadiusX;
      const dy = (y - grsY) / grsRadiusY;
      const distGRS = dx * dx + dy * dy;

      const i = (y * width + x) * 4;

      if (distGRS < 1.0) {
        // Inside Great Red Spot
        const swirl = Math.sin(distGRS * 12 + n * 5);
        data[i] = Math.floor(205 + swirl * 35);
        data[i + 1] = Math.floor(65 + swirl * 25);
        data[i + 2] = Math.floor(45 + swirl * 15);
      } else {
        // Atmospheric Bands
        data[i] = Math.floor(190 + combined * 55);       // Brownish orange
        data[i + 1] = Math.floor(130 + combined * 70);   // Ochre
        data[i + 2] = Math.floor(80 + combined * 60);     // Pale cream
      }
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Saturn Texture & Rings
 */
export function generateSaturnTexture() {
  const width = 1024;
  const height = 512;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const band = Math.sin(y * 0.08) * 0.3 + Math.sin(y * 0.25) * 0.15;
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 3, 0.01, 77);
      const val = 0.5 + band + n * 0.2;

      const i = (y * width + x) * 4;
      data[i] = Math.floor(215 + val * 35);       // Pale gold
      data[i + 1] = Math.floor(185 + val * 40);   // Amber beige
      data[i + 2] = Math.floor(125 + val * 40);   // Butterscotch
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * Procedural Saturn Ring Texture with Cassini Division
 */
export function generateSaturnRingsTexture() {
  const width = 1024;
  const height = 64;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let x = 0; x < width; x++) {
    const pos = x / width; // 0 (inner ring) to 1 (outer ring)
    let alpha = 0;
    let r = 210, g = 190, b = 150;

    if (pos > 0.1 && pos < 0.95) {
      // Ring structure
      if (pos > 0.58 && pos < 0.66) {
        // Cassini Division (gap)
        alpha = 15;
      } else if (pos > 0.88 && pos < 0.90) {
        // Encke Gap
        alpha = 25;
      } else {
        const ringBands = Math.sin(pos * 180) * 0.3 + Math.sin(pos * 60) * 0.4 + 0.5;
        alpha = Math.floor(Math.max(40, Math.min(230, ringBands * 255)));
        r = Math.floor(190 + ringBands * 40);
        g = Math.floor(170 + ringBands * 35);
        b = Math.floor(130 + ringBands * 30);
      }
    }

    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = alpha;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Uranus Texture
 */
export function generateUranusTexture() {
  const width = 512;
  const height = 256;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = Math.sin(y * 0.05) * 0.1;
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 3, 0.01, 51);
      const i = (y * width + x) * 4;
      data[i] = Math.floor(140 + (lat + n) * 35);   // Aquamarine
      data[i + 1] = Math.floor(215 + (lat + n) * 30); // Pale Cyan
      data[i + 2] = Math.floor(225 + (lat + n) * 25);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Neptune Texture
 */
export function generateNeptuneTexture() {
  const width = 512;
  const height = 256;
  const { canvas, ctx } = createNoiseHelper(width, height);
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const lat = Math.sin(y * 0.08) * 0.2;
    for (let x = 0; x < width; x++) {
      const n = fbm(x, y, 4, 0.015, 91);
      const storm = (Math.abs(x - 300) < 40 && Math.abs(y - 160) < 25) ? -40 : 0; // Great Dark Spot
      const i = (y * width + x) * 4;

      data[i] = Math.floor(40 + (lat + n) * 30 + storm);    // Deep Azure
      data[i + 1] = Math.floor(100 + (lat + n) * 40 + storm);
      data[i + 2] = Math.floor(225 + (lat + n) * 30);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
