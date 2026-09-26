// Centralized Global Animation Configuration
// Allows tuning all UI and 3D motion timings and easing curves from a single source

export const ANIMATION_CONFIG = {
  // General Button Hover & Tap Physics
  button: {
    hoverScale: 1.05,
    tapScale: 0.95,
    hoverTransition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 0.8
    },
    tapTransition: {
      type: 'spring',
      stiffness: 500,
      damping: 15
    },
    magneticStrength: 0.28, // Max pixel translation multiplier for magnetic hover
    magneticRadius: 40,     // Max distance in px
    glowDuration: 0.25
  },

  // Coordinate-Aware Ripple Animation
  ripple: {
    duration: 0.65,
    color: 'rgba(56, 189, 248, 0.35)',
    easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
  },

  // Click Confirmation Particle Burst
  particles: {
    count: 10,
    minDistance: 16,
    maxDistance: 38,
    minSize: 3,
    maxSize: 6,
    duration: 0.6,
    colors: ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24']
  },

  // Severity Pulse & Shake Animations
  severity: {
    low: {
      color: '#10b981',
      shakeX: [0, -1, 1, 0],
      duration: 0.35,
      glow: '0 0 16px rgba(16, 185, 129, 0.6)'
    },
    medium: {
      color: '#38bdf8',
      shakeX: [0, -2, 2, -1, 1, 0],
      duration: 0.4,
      glow: '0 0 20px rgba(56, 189, 248, 0.7)'
    },
    high: {
      color: '#f59e0b',
      shakeX: [0, -3, 3, -2, 2, 0],
      duration: 0.45,
      glow: '0 0 24px rgba(245, 158, 11, 0.8)'
    },
    critical: {
      color: '#ef4444',
      shakeX: [0, -5, 5, -3, 3, -1, 1, 0],
      duration: 0.55,
      glow: '0 0 30px rgba(239, 68, 68, 0.95)'
    },
    extreme: {
      color: '#dc2626',
      shakeX: [0, -6, 6, -4, 4, -2, 2, 0],
      duration: 0.6,
      glow: '0 0 35px rgba(220, 38, 38, 1.0)'
    }
  },

  // 3D Planet Interaction Animations
  planet3D: {
    clickBounceScale: 1.25,
    bounceUpDuration: 0.18,
    bounceDownDuration: 0.4,
    shockwaveDuration: 0.85,
    shockwaveMaxRadiusMultiplier: 3.5,
    orbitHighlightDuration: 1.4,
    orbitActiveOpacity: 0.95,
    orbitDefaultOpacity: 0.25
  },

  // Galaxy View Zoom Transition
  galaxyView: {
    zoomDuration: 2.5,
    iconSpinDuration: 0.9, // Seconds per 360 rotation while zooming
    radialBurstDuration: 1.2
  },

  // Card Slide Transitions (Next / Previous Issue)
  cardSlide: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier
    slideOffset: 80
  },

  // Close Button Animation
  closeButton: {
    rotateAngle: 180,
    duration: 0.35,
    ease: 'easeInOut'
  }
};
