# CosmoSphere 3D: Interactive Solar System & Planetary Environmental Crisis Hub

CosmoSphere 3D is a single-page WebGL interactive experience built with **React**, **Three.js**, **GSAP**, **Framer Motion**, and **Tailwind CSS**. It combines an astronomically accurate 3D simulation of our solar system with comparative planetology environmental deep-dives, headlined by a feature showcase on **Earth's Plastic Pollution & Aquatic Life Crisis**.

---

## 🌟 Key Features

### 1. 3D Solar System Simulation
- **Dynamic Photosphere & Corona**: Procedural plasma shader with pulsating outer corona and realistic point lighting illuminating planets.
- **8 Major Planets + Moon + Asteroid Belt**:
  - Procedurally synthesized 2K texture maps for Sun, Mercury, Venus, Earth (with active cloud layer and Moon), Mars, Jupiter (with Great Red Spot), Saturn (with translucent ring system and Cassini division), Uranus, and Neptune.
  - 1,200+ particle instanced Asteroid Belt and multi-layer 3,500-star deep space particle field.
  - Semi-transparent elliptical orbit splines with visibility toggles.
- **Interactive OrbitControls & Raycasting**:
  - Smooth pan, zoom, and orbit rotation with damping.
  - Mouse hover highlights planets with real-time 3D-to-2D projected HUD tooltips showing diameter, temperature, and environmental focus.
- **Cinematic GSAP Camera Fly-To Physics**:
  - Clicking any planet initiates a smooth cubic ease camera transition right into orbit in front of that planet.
  - Return button / ESC key triggers a reverse camera animation back to the full solar system isometric view.
- **Cinematic Tour Mode**: Automatically cycles through all planets sequentially.
- **Simulation Speed Controls**: Real-time orbital speed multiplier (Pause 0x, 1x, 3x, 5x).

### 2. Earth Feature Deep-Dive: "Plastic Pollution & Aquatic Life"
- **Live Inflow Estimator & Stat Tickers**:
  - Real-time ticker calculating kilograms of plastic entering oceans since page visit.
  - Stat cards: **12.7M Tons/yr**, **5.25 Trillion pieces afloat**, **100k+ marine mammals harmed**, **90% seabirds with ingested plastic**.
- **Interactive Waste Journey Diagram**:
  - 4-stage interactive journey: *Urban Consumption $\to$ Hydrological Transport $\to$ Marine Gyres $\to$ Deep Ocean & Benthos*.
- **Typology & Degradation Half-Lives**:
  - Microplastics (<5mm), Single-Use Packaging (PET/HDPE), Ghost Fishing Gear (600+ yr lifespan), and Synthetic Microfibers.
- **Devastating Marine Impacts**:
  - Ingestion & internal starvation, Ghost net strangulation, Coral reef smothering, and Toxic chemical leaching (BPA, phthalates, PFAS).
- **Interactive Food Web Biomagnification Simulator**:
  - Interactive trophic pyramid: *Zooplankton $\to$ Secondary Consumers $\to$ Apex Predators $\to$ Human Seafood Intake*.
- **5-Pillar Mitigation & Control Matrix**:
  - Individual Habits, Community/NGO Coastal Defense, Government Regulations & EPR, Technological Interceptors & Enzyme Recycling, Corporate Circular Packaging.
- **Personal Plastic Footprint Estimator**:
  - Interactive 4-step calculator estimating annual plastic consumption and high-impact reduction recommendations.
- **Planetary Action Pledge**:
  - Commitment card generator with verified defender badge and celebratory confetti animations.

### 3. Planetary Crisis Hub (Other Planets)
- **Venus**: The Runaway Greenhouse Catastrophe (96% CO₂, 465°C surface) as an extreme planetary climate tipping point warning for Earth.
- **Mars**: Atmospheric Depletion, Water Loss, Solar Wind Stripping, and Soil Perchlorates.
- **Mercury**: Extreme Thermal Volatility (-180°C to 430°C) and Lack of Protective Atmosphere.
- **Jupiter**: Supercharged Atmospheric Turbulence and Storm Dynamics.
- **Saturn**: Ring System Degradation & Space Debris (Kessler Syndrome Analogy).
- **Uranus & Neptune**: Methane Ice Giants, 42-year polar stagnation, and supersonic 2,100 km/h jet streams.

### 4. Synthesized Procedural Audio Engine
- Built using the **Web Audio API** with zero external audio dependencies.
- Generates an ambient cosmic drone (layered sub-bass + resonant low-pass filter with slow LFO breath modulation).
- Includes synthesized UI clicks and planetary fly-to frequency sweep whooshes.

---

## 🚀 Quickstart & Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository and navigate to the project directory
cd "project 5"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your web browser.

### Production Build
```bash
npm run build
```

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 6 |
| **3D Rendering** | Three.js (WebGL, OrbitControls, Raycasting, Shaders) |
| **Texture Synthesis** | HTML5 Canvas 2D Procedural Noise Generators |
| **Camera & Timeline** | GSAP (GreenSock) |
| **UI Motion & Cards** | Framer Motion |
| **Styling & Theme** | Tailwind CSS v4 + Glassmorphism System |
| **Icons** | Lucide React |
| **Audio Engine** | Web Audio API (Synthesized Cosmic Drone & SFX) |
| **Effects** | Canvas Confetti |

---

## 📄 License
MIT License. Created for planetary science & ocean conservation education.
