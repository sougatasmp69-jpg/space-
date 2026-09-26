import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Fish,
  Waves,
  Trees,
  Wind,
  Snowflake,
  AlertTriangle,
  Flame,
  Activity,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import { soundEngine } from '../../../utils/soundEngine';
import AnimatedButton from '../../ui/AnimatedButton';
import { ANIMATION_CONFIG } from '../../../config/animationConfig';

const iconMap = {
  Fish: Fish,
  Waves: Waves,
  Trees: Trees,
  Wind: Wind,
  Snowflake: Snowflake
};

export default function EarthCrisisCards() {
  const { coreCrises } = EARTH_POLLUTION_DATA;
  const [selectedCrisisId, setSelectedCrisisId] = useState(null); // null = show all or filter
  const [activeSeverityFilter, setActiveSeverityFilter] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(coreCrises[0]?.id || 'plastic-pollution');
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'list'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  // Compute filtered list based on topic or severity
  const filteredCrises = coreCrises.filter((c) => {
    if (selectedCrisisId && c.id !== selectedCrisisId) return false;
    if (activeSeverityFilter && c.severity.toLowerCase() !== activeSeverityFilter.toLowerCase()) return false;
    return true;
  });

  const activeCrisesList = filteredCrises.length > 0 ? filteredCrises : coreCrises;
  const safeIndex = Math.min(currentIndex, activeCrisesList.length - 1);
  const currentCrisis = activeCrisesList[safeIndex] || coreCrises[0];

  const handleNextIssue = () => {
    soundEngine.playUiClick();
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeCrisesList.length);
  };

  const handlePrevIssue = () => {
    soundEngine.playUiClick();
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeCrisesList.length) % activeCrisesList.length);
  };

  const toggleExpand = (id) => {
    soundEngine.playUiClick();
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  const handleFilterClick = (id) => {
    soundEngine.playUiClick();
    setSelectedCrisisId((prev) => (prev === id ? null : id));
    setCurrentIndex(0);
  };

  const handleSeverityFilter = (sev) => {
    soundEngine.playUiClick();
    setActiveSeverityFilter((prev) => (prev === sev ? null : sev));
    setCurrentIndex(0);
  };

  // Directional Slide Variants
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
    <div className="space-y-6">
      {/* Section Header with View Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Biosphere Alert
            </span>
            <span className="text-xs text-slate-400 font-mono">5 Core Planetary Boundaries</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Earth's 5 Critical Environmental Crises
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">
            Anthropogenic pressures are destabilizing Earth's vital planetary boundaries. Cycle through each crisis card below.
          </p>
        </div>

        {/* View Switcher (Carousel / All List) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0 self-start sm:self-auto">
          <AnimatedButton
            onClick={() => {
              soundEngine.playUiClick();
              setViewMode('carousel');
            }}
            variant="pill"
            isActive={viewMode === 'carousel'}
            magnetic={false}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Stepper</span>
          </AnimatedButton>

          <AnimatedButton
            onClick={() => {
              soundEngine.playUiClick();
              setViewMode('list');
            }}
            variant="pill"
            isActive={viewMode === 'list'}
            magnetic={false}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Cards</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Severity Filter Tag Buttons with Shake and Color Pulse */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
          Severity Filters:
        </span>
        <AnimatedButton
          onClick={() => handleSeverityFilter(null)}
          variant={activeSeverityFilter === null ? 'primary' : 'glass'}
          isActive={activeSeverityFilter === null}
          magnetic={true}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold"
        >
          All Severities
        </AnimatedButton>

        {['Critical', 'High', 'Moderate'].map((sev) => {
          const isSelected = activeSeverityFilter === sev;
          const sevKey = sev.toLowerCase() === 'moderate' ? 'medium' : sev.toLowerCase();

          return (
            <AnimatedButton
              key={sev}
              onClick={() => handleSeverityFilter(sev)}
              variant="severity"
              severity={sevKey}
              isActive={isSelected}
              magnetic={true}
              enableParticles={true}
              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                isSelected ? 'ring-2 ring-white/50' : ''
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse mr-1" />
              {sev} Severity
            </AnimatedButton>
          );
        })}
      </div>

      {/* Quick Filter Buttons for the 5 Crises */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <AnimatedButton
          onClick={() => handleFilterClick(null)}
          variant={selectedCrisisId === null ? 'primary' : 'glass'}
          isActive={selectedCrisisId === null}
          magnetic={true}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap"
        >
          All 5 Crises
        </AnimatedButton>

        {coreCrises.map((crisis, cIdx) => {
          const IconComp = iconMap[crisis.icon] || AlertTriangle;
          const isSelected = selectedCrisisId === crisis.id || (viewMode === 'carousel' && safeIndex === cIdx && selectedCrisisId === null);

          return (
            <AnimatedButton
              key={crisis.id}
              onClick={() => {
                if (viewMode === 'carousel') {
                  setSlideDirection(cIdx > safeIndex ? 1 : -1);
                  setCurrentIndex(cIdx);
                  setSelectedCrisisId(null);
                } else {
                  handleFilterClick(crisis.id);
                }
              }}
              variant={isSelected ? 'primary' : 'glass'}
              isActive={isSelected}
              magnetic={true}
              enableRipple={true}
              enableParticles={true}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0`}
              style={{
                borderColor: isSelected ? crisis.severityColor : undefined,
                boxShadow: isSelected ? `0 0 15px ${crisis.severityColor}40` : undefined
              }}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{crisis.tag}</span>
            </AnimatedButton>
          );
        })}
      </div>

      {/* Carousel / Stepper Mode with Next / Previous Slide Transitions */}
      {viewMode === 'carousel' && currentCrisis && (
        <div className="space-y-4">
          {/* Stepper Navigation Controls Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <AnimatedButton
              onClick={handlePrevIssue}
              variant="glass"
              magnetic={true}
              enableRipple={true}
              enableParticles={true}
              className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Issue</span>
            </AnimatedButton>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Issue <strong className="text-white font-bold">{safeIndex + 1}</strong> of {activeCrisesList.length}
              </span>
              <div className="flex gap-1">
                {activeCrisesList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => {
                      soundEngine.playUiClick();
                      setSlideDirection(dotIdx > safeIndex ? 1 : -1);
                      setCurrentIndex(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      dotIdx === safeIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Jump to issue ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            <AnimatedButton
              onClick={handleNextIssue}
              variant="primary"
              magnetic={true}
              enableRipple={true}
              enableParticles={true}
              className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <span>Next Issue</span>
              <ChevronRight className="w-4 h-4" />
            </AnimatedButton>
          </div>

          {/* Direction-Aware Animated Card */}
          <div className="relative overflow-hidden min-h-[480px]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentCrisis.id}
                custom={slideDirection}
                variants={cardSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-card rounded-2xl border border-cyan-500/40 bg-slate-900/90 shadow-2xl p-5 sm:p-6 space-y-4"
              >
                {/* Card Header & Severity Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {(() => {
                      const IconComp = iconMap[currentCrisis.icon] || AlertTriangle;
                      return (
                        <div
                          className="p-3.5 rounded-2xl border shrink-0 flex items-center justify-center shadow-inner"
                          style={{
                            backgroundColor: currentCrisis.badgeBg,
                            borderColor: currentCrisis.badgeBorder,
                            color: currentCrisis.severityColor
                          }}
                        >
                          <IconComp className="w-7 h-7" />
                        </div>
                      );
                    })()}

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          {currentCrisis.category}
                        </span>

                        {/* Interactive Clickable Severity Tag with Shake & Pulse */}
                        <AnimatedButton
                          variant="severity"
                          severity={currentCrisis.severity.toLowerCase() === 'moderate' ? 'medium' : currentCrisis.severity.toLowerCase()}
                          magnetic={true}
                          enableParticles={true}
                          className="px-2.5 py-0.5 rounded-full text-[10px]"
                          title="Click to test severity tactile feedback"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse mr-1"
                            style={{ backgroundColor: currentCrisis.severityColor }}
                          />
                          {currentCrisis.severity} Severity
                        </AnimatedButton>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                        {currentCrisis.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 2-3 Sentence Scientific Summary */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentCrisis.shortDescription}
                </p>

                {/* Severity Meter Bar */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                    <span className="text-slate-400 font-medium">Ecological Impact Index:</span>
                    <span className="font-bold" style={{ color: currentCrisis.severityColor }}>
                      {currentCrisis.severityPercent}% Impact Level
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentCrisis.severityPercent}%` }}
                      transition={{ duration: 1.0, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${currentCrisis.severityColor}80, ${currentCrisis.severityColor})`
                      }}
                    />
                  </div>
                </div>

                {/* Animated Interactive Visual Module */}
                <div className="rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950/90 p-3.5">
                  <div className="text-[10px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                      <Activity className="w-3 h-3" /> Live Ecosystem Simulation
                    </span>
                    <span>Interactive SVG Canvas</span>
                  </div>
                  <CrisisAnimationCanvas type={currentCrisis.animationType} />
                </div>

                {/* Key Field Stats Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <div className="text-xs text-slate-200 font-medium leading-tight">
                      {currentCrisis.keyStat}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="text-xs text-slate-200 font-medium leading-tight">
                      {currentCrisis.secondaryStat}
                    </div>
                  </div>
                </div>

                {/* Underlying Mechanisms */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    Underlying Degradation Mechanisms
                  </h5>
                  <div className="space-y-1.5">
                    {currentCrisis.mechanisms.map((mech, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{mech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actionable Solution Mandate */}
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    Actionable Solution & Policy Mandate
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed pl-6">
                    {currentCrisis.mitigationAction}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* List Mode View (All Cards Expanded / Accordion) */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredCrises.map((crisis, index) => {
            const IconComp = iconMap[crisis.icon] || AlertTriangle;
            const isExpanded = expandedCardId === crisis.id;

            return (
              <motion.div
                key={crisis.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-cyan-500/40 bg-slate-900/80 shadow-xl shadow-cyan-950/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className="p-3 rounded-2xl border shrink-0 flex items-center justify-center shadow-inner"
                        style={{
                          backgroundColor: crisis.badgeBg,
                          borderColor: crisis.badgeBorder,
                          color: crisis.severityColor
                        }}
                      >
                        <IconComp className="w-6 h-6" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                            {crisis.category}
                          </span>
                          <AnimatedButton
                            variant="severity"
                            severity={crisis.severity.toLowerCase() === 'moderate' ? 'medium' : crisis.severity.toLowerCase()}
                            magnetic={true}
                            enableParticles={true}
                            className="px-2 py-0.5 rounded-full text-[10px]"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse mr-1"
                              style={{ backgroundColor: crisis.severityColor }}
                            />
                            {crisis.severity} Severity
                          </AnimatedButton>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                          {crisis.title}
                        </h4>
                      </div>
                    </div>

                    <AnimatedButton
                      onClick={() => toggleExpand(crisis.id)}
                      variant="glass"
                      magnetic={true}
                      className="p-2 rounded-xl shrink-0"
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                    </AnimatedButton>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 pl-1">
                    {crisis.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-slate-400 font-medium">Ecological Impact Index:</span>
                      <span className="font-bold" style={{ color: crisis.severityColor }}>
                        {crisis.severityPercent}% Impact Level
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${crisis.severityPercent}%` }}
                        transition={{ duration: 1.0, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${crisis.severityColor}80, ${crisis.severityColor})`
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-800/90 bg-slate-950/90 p-3">
                    <CrisisAnimationCanvas type={crisis.animationType} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/40 space-y-4"
                    >
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-amber-400" />
                          Underlying Degradation Mechanisms
                        </h5>
                        <div className="space-y-1.5">
                          {crisis.mechanisms.map((mech, mIdx) => (
                            <div
                              key={mIdx}
                              className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-800/60 text-xs text-slate-300"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span>{mech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider">
                          <ShieldCheck className="w-4 h-4" />
                          Actionable Solution & Policy Mandate
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed pl-6">
                          {crisis.mitigationAction}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Interactive SVG Animated Visuals for each of the 5 Earth Crises
 */
function CrisisAnimationCanvas({ type }) {
  if (type === 'plastic-ocean') {
    return (
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gradient-to-b from-sky-950/60 via-blue-950 to-slate-950 border border-cyan-500/20 flex items-center justify-center">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent pointer-events-none" />

        <svg className="w-full h-full" viewBox="0 0 400 140">
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          <path
            d="M0,25 Q100,10 200,25 T400,25 L400,140 L0,140 Z"
            fill="url(#oceanGrad)"
          />

          <g className="animate-bounce" style={{ animationDuration: '3.5s' }}>
            <rect x="70" y="35" width="22" height="10" rx="2" fill="#38bdf8" opacity="0.8" transform="rotate(15 80 40)" />
            <rect x="92" y="38" width="5" height="4" rx="1" fill="#0284c7" transform="rotate(15 80 40)" />
            <text x="73" y="43" fontSize="6" fill="#0c4a6e" fontWeight="bold" transform="rotate(15 80 40)">PET</text>
          </g>

          <g className="animate-pulse" style={{ animationDuration: '4s' }}>
            <path d="M280,45 Q295,40 310,48 Q320,60 305,65 Q290,70 280,55 Z" fill="#e0f2fe" opacity="0.5" />
            <circle cx="295" cy="52" r="3" fill="#bae6fd" opacity="0.6" />
          </g>

          <g transform="translate(180, 50)">
            <polygon points="0,0 16,0 12,20 4,20" fill="#f87171" opacity="0.75" />
            <line x1="8" y1="-6" x2="8" y2="8" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          </g>

          {[
            { cx: 50, cy: 75, r: 2, c: '#f87171' },
            { cx: 120, cy: 95, r: 1.5, c: '#fbbf24' },
            { cx: 160, cy: 80, r: 2.5, c: '#38bdf8' },
            { cx: 230, cy: 105, r: 1.8, c: '#a855f7' },
            { cx: 260, cy: 70, r: 2, c: '#f43f5e' },
            { cx: 340, cy: 85, r: 1.5, c: '#34d399' }
          ].map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.c}
              className="animate-ping"
              style={{ animationDuration: `${2.5 + i * 0.4}s` }}
            />
          ))}

          <g transform="translate(110, 85)">
            <ellipse cx="25" cy="15" rx="14" ry="10" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
            <path d="M16,15 L34,15 M25,6 L25,24" stroke="#22c55e" strokeWidth="1" />
            <circle cx="42" cy="15" r="5" fill="#16a34a" />
            <circle cx="44" cy="13" r="1" fill="#052e16" />
            <path d="M30,8 Q38,-2 46,2" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M30,22 Q38,32 46,28" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M14,10 Q8,4 4,7" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M14,20 Q8,26 4,23" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          <g transform="translate(320, 95)">
            <ellipse cx="12" cy="8" rx="10" ry="6" fill="#f97316" />
            <polygon points="2,8 -6,2 -6,14" fill="#ea580c" />
            <rect x="9" y="3" width="3" height="10" rx="1" fill="#ffffff" />
            <circle cx="17" cy="7" r="1" fill="#000000" />
          </g>

          <circle cx="40" cy="110" r="3" fill="#e0f2fe" opacity="0.4" />
          <circle cx="42" cy="80" r="2" fill="#e0f2fe" opacity="0.5" />
          <circle cx="360" cy="120" r="4" fill="#e0f2fe" opacity="0.3" />
          <circle cx="358" cy="75" r="2.5" fill="#e0f2fe" opacity="0.4" />
        </svg>

        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          5.25 Trillion Plastic Pieces In Oceans
        </div>
      </div>
    );
  }

  if (type === 'coral-acid') {
    return (
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gradient-to-b from-amber-950/30 via-slate-950 to-slate-950 border border-orange-500/20 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 140">
          <rect x="0" y="0" width="400" height="140" fill="#0c1a2c" opacity="0.8" />

          <g transform="translate(50, 60)">
            <path d="M30,70 Q25,35 15,20 Q20,10 30,25 Q40,5 50,20 Q60,10 65,30 Q75,45 60,70 Z" fill="#ec4899" />
            <circle cx="18" cy="18" r="4" fill="#f43f5e" />
            <circle cx="32" cy="22" r="5" fill="#fb7185" />
            <circle cx="50" cy="18" r="4" fill="#f43f5e" />
            <text x="15" y="76" fontSize="8" fill="#fda4af" fontWeight="bold" fontFamily="monospace">Living Coral (pH 8.2)</text>
          </g>

          <g transform="translate(230, 60)">
            <path d="M30,70 Q25,35 15,20 Q20,10 30,25 Q40,5 50,20 Q60,10 65,30 Q75,45 60,70 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="18" cy="18" r="4" fill="#f8fafc" />
            <circle cx="32" cy="22" r="5" fill="#ffffff" />
            <circle cx="50" cy="18" r="4" fill="#f8fafc" />
            <text x="0" y="76" fontSize="8" fill="#f87171" fontWeight="bold" fontFamily="monospace">Bleached Coral (pH 8.1 → 7.8)</text>
          </g>

          {[
            { x: 180, y: 110, text: 'H⁺' },
            { x: 195, y: 75, text: 'CO₂' },
            { x: 175, y: 45, text: 'H₂CO₃' },
            { x: 210, y: 30, text: 'Acid' }
          ].map((bubble, i) => (
            <g key={i} className="animate-bounce" style={{ animationDuration: `${2.8 + i * 0.5}s` }}>
              <circle cx={bubble.x} cy={bubble.y} r="10" fill="#f97316" opacity="0.3" stroke="#f97316" strokeWidth="1" />
              <text x={bubble.x} y={bubble.y + 3} fontSize="7" fill="#fed7aa" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                {bubble.text}
              </text>
            </g>
          ))}

          <path d="M160,70 L220,70" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
          <polygon points="222,70 216,66 216,74" fill="#ef4444" />
        </svg>

        <div className="absolute top-2 right-3 text-[10px] font-mono text-orange-400 bg-slate-950/80 px-2 py-0.5 rounded border border-orange-500/30">
          Ocean Acidity: +30% Surge
        </div>
      </div>
    );
  }

  if (type === 'forest-deforestation') {
    return (
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gradient-to-b from-amber-950/40 via-stone-950 to-slate-950 border border-yellow-500/20 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 140">
          <rect x="0" y="105" width="400" height="35" fill="#292524" />
          <path d="M0,105 Q120,95 240,108 T400,105" stroke="#78716c" strokeWidth="2" fill="none" />

          <g transform="translate(30, 30)">
            <rect x="18" y="40" width="8" height="38" fill="#78350f" rx="2" />
            <circle cx="22" cy="35" r="22" fill="#15803d" />
            <circle cx="12" cy="25" r="16" fill="#16a34a" />
            <circle cx="32" cy="22" r="18" fill="#22c55e" />
          </g>

          <g transform="translate(85, 45)">
            <rect x="14" y="32" width="6" height="30" fill="#78350f" rx="1" />
            <circle cx="17" cy="26" r="16" fill="#166534" />
            <circle cx="24" cy="18" r="14" fill="#15803d" />
          </g>

          <g transform="translate(190, 85)">
            <rect x="0" y="12" width="16" height="10" fill="#451a03" rx="1" />
            <ellipse cx="8" cy="12" rx="8" ry="3" fill="#78350f" stroke="#b45309" strokeWidth="1" />
            <line x1="8" y1="12" x2="8" y2="15" stroke="#d97706" strokeWidth="1" />
          </g>

          <g transform="translate(240, 92) rotate(65 20 20)">
            <rect x="0" y="0" width="10" height="42" fill="#78350f" rx="2" />
            <circle cx="5" cy="40" r="15" fill="#854d0e" opacity="0.7" />
          </g>

          <g transform="translate(310, 40)" className="animate-pulse" style={{ animationDuration: '3s' }}>
            <circle cx="20" cy="40" r="12" fill="#78716c" opacity="0.6" />
            <circle cx="32" cy="30" r="18" fill="#57534e" opacity="0.7" />
            <circle cx="48" cy="36" r="14" fill="#44403c" opacity="0.8" />
            <circle cx="25" cy="55" r="3" fill="#f97316" />
            <circle cx="38" cy="58" r="2.5" fill="#ef4444" />
            <circle cx="50" cy="54" r="3.5" fill="#eab308" />
          </g>

          <text x="35" y="128" fontSize="8" fill="#86efac" fontFamily="monospace">Intact Carbon Sink</text>
          <text x="210" y="128" fontSize="8" fill="#fca5a5" fontFamily="monospace">10M Hectares Lost / Year</text>
        </svg>

        <div className="absolute top-2 right-3 text-[10px] font-mono text-yellow-400 bg-slate-950/80 px-2 py-0.5 rounded border border-yellow-500/30">
          Species Loss: 1,000× Baseline
        </div>
      </div>
    );
  }

  if (type === 'air-smog') {
    return (
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gradient-to-b from-purple-950/40 via-slate-950 to-slate-950 border border-pink-500/20 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 140">
          <rect x="0" y="0" width="400" height="140" fill="#1e102a" opacity="0.7" />

          <g transform="translate(40, 55)">
            <polygon points="10,65 14,10 26,10 30,65" fill="#475569" stroke="#334155" strokeWidth="1" />
            <rect x="12" y="7" width="16" height="4" fill="#e2e8f0" />
            <g className="animate-pulse" style={{ animationDuration: '2.5s' }}>
              <ellipse cx="20" cy="-6" rx="14" ry="9" fill="#64748b" opacity="0.6" />
              <ellipse cx="38" cy="-18" rx="22" ry="14" fill="#475569" opacity="0.7" />
              <ellipse cx="68" cy="-26" rx="30" ry="18" fill="#334155" opacity="0.8" />
            </g>
          </g>

          <g transform="translate(85, 70)">
            <polygon points="8,50 11,8 21,8 24,50" fill="#334155" />
            <rect x="9" y="5" width="14" height="4" fill="#cbd5e1" />
          </g>

          {[
            { x: 190, y: 45, label: 'CO₂ 424ppm', col: '#ec4899' },
            { x: 280, y: 35, label: 'PM2.5 Hazard', col: '#ef4444' },
            { x: 230, y: 85, label: 'CH₄ Methane', col: '#f59e0b' },
            { x: 330, y: 75, label: 'Tropospheric Heat', col: '#a855f7' }
          ].map((mol, idx) => (
            <g key={idx} className="animate-bounce" style={{ animationDuration: `${3.2 + idx * 0.4}s` }}>
              <rect x={mol.x - 30} y={mol.y - 10} width="60" height="20" rx="6" fill="#0f172a" stroke={mol.col} strokeWidth="1.5" />
              <text x={mol.x} y={mol.y + 3} fontSize="7" fill={mol.col} textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                {mol.label}
              </text>
            </g>
          ))}

          <path d="M160,115 Q180,105 200,115 T240,115 T280,115 T320,115" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
          <path d="M170,125 Q190,115 210,125 T250,125 T290,125 T330,125" stroke="#fb7185" strokeWidth="1" strokeDasharray="3,3" fill="none" />
        </svg>

        <div className="absolute top-2 right-3 text-[10px] font-mono text-pink-400 bg-slate-950/80 px-2 py-0.5 rounded border border-pink-500/30">
          8.7M Deaths / Yr Worldwide
        </div>
      </div>
    );
  }

  if (type === 'polar-ice') {
    return (
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gradient-to-b from-cyan-950/40 via-sky-950 to-slate-950 border border-cyan-500/20 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 140">
          <rect x="0" y="0" width="400" height="140" fill="#082f49" opacity="0.6" />
          <rect x="0" y="85" width="400" height="55" fill="#0369a1" opacity="0.75" />

          <g transform="translate(10, 20)">
            <polygon points="0,95 20,40 50,30 90,38 120,45 125,95" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
            <polygon points="50,30 90,38 100,95 60,95" fill="#e0f2fe" />
            <path d="M85,40 L92,85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
            <text x="15" y="70" fontSize="8" fill="#0284c7" fontWeight="bold" fontFamily="monospace">Greenland Ice Sheet</text>
          </g>

          <g transform="translate(138, 70)" className="animate-bounce" style={{ animationDuration: '2s' }}>
            <polygon points="0,0 14,4 10,18 2,14" fill="#ffffff" stroke="#7dd3fc" strokeWidth="1" />
            <circle cx="20" cy="12" r="1.5" fill="#38bdf8" />
            <circle cx="-5" cy="10" r="1.5" fill="#38bdf8" />
          </g>

          <g transform="translate(240, 65)">
            <polygon points="20,20 45,0 70,20" fill="#f8fafc" stroke="#e0f2fe" strokeWidth="1" />
            <polygon points="12,20 78,20 70,55 20,50" fill="#38bdf8" opacity="0.6" />
            <line x1="0" y1="20" x2="95" y2="20" stroke="#bae6fd" strokeWidth="2" />
          </g>

          <path d="M0,85 Q50,78 100,85 T200,85 T300,85 T400,85" stroke="#38bdf8" strokeWidth="2" fill="none" />

          <g transform="translate(360, 45)">
            <line x1="15" y1="0" x2="15" y2="55" stroke="#ef4444" strokeWidth="2" />
            <line x1="8" y1="10" x2="15" y2="10" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="8" y1="25" x2="15" y2="25" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="8" y1="40" x2="15" y2="40" stroke="#ef4444" strokeWidth="1.5" />
            <text x="20" y="28" fontSize="7" fill="#f87171" fontFamily="monospace" fontWeight="bold">+4.5mm/yr</text>
          </g>
        </svg>

        <div className="absolute top-2 right-3 text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
          Ice Melt: 427B Tons / Yr
        </div>
      </div>
    );
  }

  return null;
}
