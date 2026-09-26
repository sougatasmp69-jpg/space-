import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Globe,
  Sparkles,
  Compass,
  ShieldCheck,
  Thermometer,
  Activity,
  Zap,
  Wind,
  Orbit,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { OTHER_PLANETS_CRISIS_DATA } from '../../../data/otherPlanetsCrisisData';
import { soundEngine } from '../../../utils/soundEngine';
import AnimatedButton from '../../ui/AnimatedButton';
import { ANIMATION_CONFIG } from '../../../config/animationConfig';

const planetOrder = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'sun'];

export default function PlanetCrisisView({ planetId, planetData, onSelectOtherPlanet }) {
  const [activePlanetId, setActivePlanetId] = useState(planetId || 'venus');
  const [slideDirection, setSlideDirection] = useState(1);

  // Synchronize if prop changes
  const effectivePlanetId = planetId || activePlanetId;
  const currentIndex = planetOrder.indexOf(effectivePlanetId);
  const currentIdxSafe = currentIndex >= 0 ? currentIndex : 0;

  const crisisData = OTHER_PLANETS_CRISIS_DATA[effectivePlanetId] || {
    title: `${planetData?.name || 'Planet'} Environmental Profile`,
    badge: 'Atmospheric Dynamics',
    planetName: planetData?.name || 'Planet',
    accentColor: planetData?.accentColor || '#38bdf8',
    severity: 'Extreme',
    severityPercent: 85,
    severityColor: planetData?.accentColor || '#38bdf8',
    animationType: 'generic',
    shortDescription: planetData?.summary || 'Planetary atmospheric and environmental physical dynamics.',
    keyStats: [
      { label: 'Surface Temperature', value: planetData?.temperature || 'N/A', desc: 'Mean equilibrium temperature' },
      { label: 'Atmosphere Composition', value: planetData?.atmosphere || 'N/A', desc: 'Gas density & stratification' }
    ],
    overview: planetData?.summary || 'Planetary physical dynamics.',
    earthAnalogy: 'Studying planetary extremes provides essential insights into Earth’s climate balance.',
    solutionsAndLessons: []
  };

  const handleNextPlanet = () => {
    soundEngine.playUiClick();
    setSlideDirection(1);
    const nextIdx = (currentIdxSafe + 1) % planetOrder.length;
    const nextId = planetOrder[nextIdx];
    if (onSelectOtherPlanet) {
      onSelectOtherPlanet(nextId);
    } else {
      setActivePlanetId(nextId);
    }
  };

  const handlePrevPlanet = () => {
    soundEngine.playUiClick();
    setSlideDirection(-1);
    const prevIdx = (currentIdxSafe - 1 + planetOrder.length) % planetOrder.length;
    const prevId = planetOrder[prevIdx];
    if (onSelectOtherPlanet) {
      onSelectOtherPlanet(prevId);
    } else {
      setActivePlanetId(prevId);
    }
  };

  const cardSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? ANIMATION_CONFIG.cardSlide.slideOffset : -ANIMATION_CONFIG.cardSlide.slideOffset,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_CONFIG.cardSlide.duration,
        ease: ANIMATION_CONFIG.cardSlide.ease
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -ANIMATION_CONFIG.cardSlide.slideOffset : ANIMATION_CONFIG.cardSlide.slideOffset,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: ANIMATION_CONFIG.cardSlide.duration,
        ease: ANIMATION_CONFIG.cardSlide.ease
      }
    })
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Top Planetary Crisis Stepper Navigation */}
      <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <AnimatedButton
          onClick={handlePrevPlanet}
          variant="glass"
          magnetic={true}
          enableRipple={true}
          enableParticles={true}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Planet</span>
        </AnimatedButton>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Planet <strong className="text-white font-bold">{currentIdxSafe + 1}</strong> of {planetOrder.length}
          </span>
        </div>

        <AnimatedButton
          onClick={handleNextPlanet}
          variant="primary"
          magnetic={true}
          enableRipple={true}
          enableParticles={true}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
        >
          <span className="hidden sm:inline">Next Planet</span>
          <ChevronRight className="w-4 h-4" />
        </AnimatedButton>
      </div>

      <AnimatePresence mode="wait" custom={slideDirection}>
        <motion.div
          key={effectivePlanetId}
          custom={slideDirection}
          variants={cardSlideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="space-y-6"
        >
          {/* Top Hero Banner with Interactive Severity Tag */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
                style={{
                  backgroundColor: `${crisisData.accentColor}18`,
                  borderColor: `${crisisData.accentColor}40`,
                  color: crisisData.accentColor
                }}
              >
                <Compass className="w-3.5 h-3.5" />
                {crisisData.badge}
              </div>

              {/* Interactive Severity Tag Button with Shake & Color Pulse */}
              <AnimatedButton
                variant="severity"
                severity={crisisData.severity.toLowerCase() === 'moderate' ? 'medium' : crisisData.severity.toLowerCase()}
                magnetic={true}
                enableParticles={true}
                className="px-3 py-1 rounded-full text-xs"
                title="Click to test severity tactile feedback"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse mr-1"
                  style={{ backgroundColor: crisisData.severityColor }}
                />
                {crisisData.severity} Extremity Level
              </AnimatedButton>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {crisisData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Comparative Planetology & Earth Climate Analogies • {crisisData.planetName}
            </p>
          </div>

          {/* 2-3 Sentence Scientific Summary */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {crisisData.shortDescription}
            </p>

            {/* Severity Progress Meter */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1 font-mono">
                <span className="text-slate-400">Atmospheric Severity Index:</span>
                <span className="font-bold" style={{ color: crisisData.severityColor }}>
                  {crisisData.severityPercent}% Extremity
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${crisisData.severityPercent}%` }}
                  transition={{ duration: 1.0, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${crisisData.severityColor}70, ${crisisData.severityColor})`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dedicated Interactive SVG Atmospheric Simulation */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold" style={{ color: crisisData.accentColor }}>
                <Activity className="w-3.5 h-3.5" />
                Live Planetary Atmospheric Simulation
              </span>
              <span>{crisisData.planetName} Dynamics</span>
            </div>

            <PlanetarySimulationCanvas type={crisisData.animationType} accentColor={crisisData.accentColor} />
          </div>

          {/* 4 Key Planetary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {crisisData.keyStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card rounded-xl p-3 border border-slate-800 flex flex-col justify-between"
              >
                <div className="text-xs font-semibold text-slate-400">
                  {stat.label}
                </div>
                <div
                  className="text-lg sm:text-xl font-bold font-mono my-1"
                  style={{ color: crisisData.accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Planetary Science Deep-Dive */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Planetary Overview & Atmospheric Physics
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {crisisData.overview}
            </p>
          </div>

          {/* Direct Earth Climate Warning / Analogy */}
          <div className="glass-panel-deep rounded-2xl p-5 border border-amber-500/30 space-y-2 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-950">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              <AlertTriangle className="w-4 h-4" />
              The Earth Analogy & Climate Tipping Points
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {crisisData.earthAnalogy}
            </p>
          </div>

          {/* Solutions & Lessons */}
          {crisisData.solutionsAndLessons && crisisData.solutionsAndLessons.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Terrestrial Solutions & Technological Insights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crisisData.solutionsAndLessons.map((sol, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <h5 className="text-xs font-bold text-white">
                        {sol.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Animated SVG Canvas Simulations for Each Planet
 */
function PlanetarySimulationCanvas({ type, accentColor }) {
  if (type === 'mercury-thermal') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-950 to-blue-950/40 border border-slate-800 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <g transform="translate(40, 20)">
            <circle cx="20" cy="40" r="18" fill="#fbbf24" className="animate-pulse" />
            {[0, 30, 60, 90, 120, 150].map((deg, i) => (
              <line
                key={i}
                x1="20"
                y1="40"
                x2={20 + Math.cos((deg * Math.PI) / 180) * 35}
                y2={40 + Math.sin((deg * Math.PI) / 180) * 35}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,2"
              />
            ))}
            <text x="5" y="75" fontSize="8" fill="#fbbf24" fontWeight="bold" fontFamily="monospace">+430°C Day</text>
          </g>

          <g transform="translate(160, 20)">
            <circle cx="40" cy="40" r="30" fill="#64748b" />
            <path d="M40,10 A30,30 0 0,0 40,70 Z" fill="#94a3b8" />
            <circle cx="30" cy="35" r="4" fill="#475569" />
            <circle cx="50" cy="45" r="6" fill="#334155" />
            <circle cx="45" cy="25" r="3" fill="#334155" />
            <text x="12" y="90" fontSize="8" fill="#94a3b8" fontFamily="monospace">No Atmosphere</text>
          </g>

          <g transform="translate(280, 20)">
            <circle cx="40" cy="40" r="16" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="40" y="44" fontSize="12" fill="#bae6fd" textAnchor="middle">❄️</text>
            <text x="18" y="75" fontSize="8" fill="#38bdf8" fontWeight="bold" fontFamily="monospace">-180°C Night</text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'venus-greenhouse') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-orange-950/60 via-amber-950 to-stone-950 border border-orange-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <ellipse cx="200" cy="60" rx="140" ry="45" fill="#ca8a04" opacity="0.25" />
            <ellipse cx="180" cy="55" rx="100" ry="30" fill="#ea580c" opacity="0.35" />
            <ellipse cx="220" cy="65" rx="80" ry="25" fill="#b45309" opacity="0.4" />
          </g>

          {[
            { x: 80, y: 55, text: '96.5% CO₂' },
            { x: 200, y: 45, text: '465°C Surface' },
            { x: 310, y: 55, text: '92 Bar Pressure' }
          ].map((item, idx) => (
            <g key={idx} className="animate-bounce" style={{ animationDuration: `${2.8 + idx * 0.4}s` }}>
              <rect x={item.x - 38} y={item.y - 12} width="76" height="24" rx="8" fill="#1c1917" stroke="#f97316" strokeWidth="1.5" />
              <text x={item.x} y={item.y + 4} fontSize="8" fill="#fed7aa" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                {item.text}
              </text>
            </g>
          ))}

          {[50, 130, 260, 340].map((xPos, i) => (
            <line
              key={i}
              x1={xPos}
              y1="85"
              x2={xPos - 5}
              y2="105"
              stroke="#eab308"
              strokeWidth="2"
              strokeDasharray="3,3"
            />
          ))}
          <text x="200" y="108" fontSize="8" fill="#f97316" textAnchor="middle" fontFamily="monospace">Sulfuric Acid Evaporates Before Ground (Virga)</text>
        </svg>
      </div>
    );
  }

  if (type === 'mars-duststorm') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-red-950/50 via-stone-950 to-orange-950/50 border border-red-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <path d="M0,90 Q100,75 200,90 T400,85 L400,120 L0,120 Z" fill="#7f1d1d" opacity="0.8" />
          <path d="M0,100 Q150,85 300,105 T400,98 L400,120 L0,120 Z" fill="#991b1b" />

          {[
            { cx: 70, cy: 45, r: 3 },
            { cx: 140, cy: 35, r: 2.5 },
            { cx: 210, cy: 55, r: 4 },
            { cx: 280, cy: 30, r: 2 },
            { cx: 330, cy: 50, r: 3.5 }
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="#f87171"
              className="animate-ping"
              style={{ animationDuration: `${2 + i * 0.5}s` }}
            />
          ))}

          <g transform="translate(120, 20)">
            <path d="M0,10 Q60,-5 120,10 T240,10" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="5,3" fill="none" />
            <path d="M10,25 Q70,10 130,25 T250,25" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" fill="none" />
          </g>

          <text x="200" y="112" fontSize="8" fill="#fca5a5" textAnchor="middle" fontFamily="monospace">Solar Wind Stripping 99% of Atmosphere</text>
        </svg>
      </div>
    );
  }

  if (type === 'jupiter-vortex') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-amber-950/50 via-slate-950 to-orange-950/50 border border-amber-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <rect x="0" y="20" width="400" height="15" fill="#d97706" opacity="0.4" />
          <rect x="0" y="38" width="400" height="20" fill="#78350f" opacity="0.6" />
          <rect x="0" y="60" width="400" height="18" fill="#b45309" opacity="0.5" />
          <rect x="0" y="80" width="400" height="16" fill="#d97706" opacity="0.4" />

          <g transform="translate(210, 58)" className="animate-spin" style={{ animationDuration: '12s' }}>
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="#dc2626" opacity="0.85" stroke="#ea580c" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="26" ry="14" fill="#991b1b" />
            <circle cx="0" cy="0" r="8" fill="#f87171" />
          </g>

          <g transform="translate(70, 45)">
            <polygon points="5,0 0,12 8,12 3,24 14,10 7,10" fill="#fef08a" className="animate-pulse" />
            <text x="18" y="16" fontSize="7" fill="#fef08a" fontFamily="monospace">1,000× Lightning</text>
          </g>

          <text x="310" y="65" fontSize="8" fill="#fed7aa" fontWeight="bold" fontFamily="monospace">Great Red Spot</text>
          <text x="200" y="112" fontSize="8" fill="#f59e0b" textAnchor="middle" fontFamily="monospace">650+ km/h Jet Streams & Anticyclonic Storms</text>
        </svg>
      </div>
    );
  }

  if (type === 'saturn-rings') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-yellow-950/40 via-slate-950 to-stone-950 border border-yellow-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <ellipse cx="200" cy="55" rx="160" ry="32" fill="none" stroke="#facc15" strokeWidth="8" opacity="0.3" />
          <ellipse cx="200" cy="55" rx="140" ry="26" fill="none" stroke="#eab308" strokeWidth="6" opacity="0.5" />
          <ellipse cx="200" cy="55" rx="115" ry="20" fill="none" stroke="#ca8a04" strokeWidth="4" opacity="0.6" />

          <circle cx="200" cy="55" r="28" fill="#eab308" />
          <path d="M172,55 A28,28 0 0,0 228,55 Z" fill="#ca8a04" />

          <g transform="translate(200, 25)">
            {[0, 20, -20].map((dx, i) => (
              <line key={i} x1={dx} y1="-5" x2={dx * 0.4} y2="20" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,2" />
            ))}
          </g>

          <text x="200" y="110" fontSize="8" fill="#fde047" textAnchor="middle" fontFamily="monospace">10,000 kg/sec Water-Ice "Ring Rain" Loss</text>
        </svg>
      </div>
    );
  }

  if (type === 'uranus-freeze') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-950/50 via-slate-950 to-sky-950/50 border border-cyan-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <g transform="translate(200, 55)">
            <line x1="-50" y1="0" x2="50" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
            <circle cx="0" cy="0" r="26" fill="#06b6d4" />
            <ellipse cx="0" cy="0" rx="14" ry="26" fill="#22d3ee" opacity="0.5" />
          </g>

          <g transform="translate(60, 45)">
            <text x="0" y="10" fontSize="9" fill="#38bdf8" fontWeight="bold" fontFamily="monospace">42 Years Dark</text>
            <text x="0" y="24" fontSize="8" fill="#94a3b8" fontFamily="monospace">Cryogenic Freeze</text>
          </g>

          <g transform="translate(290, 45)">
            <text x="0" y="10" fontSize="9" fill="#22d3ee" fontWeight="bold" fontFamily="monospace">42 Years Light</text>
            <text x="0" y="24" fontSize="8" fill="#94a3b8" fontFamily="monospace">Seasonal Flare-ups</text>
          </g>

          <text x="200" y="110" fontSize="8" fill="#67e8f9" textAnchor="middle" fontFamily="monospace">Coldest Atmosphere in Solar System (-224°C)</text>
        </svg>
      </div>
    );
  }

  if (type === 'neptune-wind') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-blue-950/60 via-slate-950 to-indigo-950/60 border border-blue-500/30 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          {[
            { y: 30, len: 140, x: 40 },
            { y: 50, len: 200, x: 20 },
            { y: 70, len: 160, x: 60 },
            { y: 88, len: 220, x: 30 }
          ].map((w, idx) => (
            <line
              key={idx}
              x1={w.x}
              y1={w.y}
              x2={w.x + w.len}
              y2={w.y}
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="12,6"
              className="animate-pulse"
              style={{ animationDuration: '1.5s' }}
            />
          ))}

          <g transform="translate(240, 50)">
            <ellipse cx="0" cy="0" rx="22" ry="12" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#60a5fa" />
            <text x="26" y="4" fontSize="7" fill="#93c5fd" fontFamily="monospace">Dark Spot</text>
          </g>

          <text x="200" y="110" fontSize="8" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">Supersonic 2,100 km/h Sustained Winds</text>
        </svg>
      </div>
    );
  }

  if (type === 'sun-corona') {
    return (
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-r from-amber-950/70 via-orange-950/80 to-yellow-950/70 border border-amber-500/40 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120">
          <circle cx="200" cy="60" r="32" fill="#fbbf24" className="animate-pulse" />
          <circle cx="200" cy="60" r="22" fill="#f59e0b" />

          <path d="M170,45 Q150,20 180,25" stroke="#f97316" strokeWidth="2.5" fill="none" />
          <path d="M230,45 Q260,15 220,20" stroke="#ef4444" strokeWidth="2.5" fill="none" />
          <path d="M165,75 Q135,95 175,90" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <path d="M235,75 Q265,95 225,90" stroke="#f97316" strokeWidth="2.5" fill="none" />

          <text x="200" y="112" fontSize="8" fill="#fde047" textAnchor="middle" fontFamily="monospace">600 Million Tons Hydrogen Fused / Second</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-24 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-xs text-slate-400">
      Planetary telemetry active
    </div>
  );
}
