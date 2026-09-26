import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Fish, Zap, UserCheck, ArrowUp, Activity } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import { soundEngine } from '../../../utils/soundEngine';

const iconMap = {
  Sparkles: Sparkles,
  Fish: Fish,
  Zap: Zap,
  UserCheck: UserCheck
};

export default function FoodChainBioaccumulation() {
  const { foodChainTrophicLevels } = EARTH_POLLUTION_DATA;
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);

  const activeLevel = foodChainTrophicLevels[activeLevelIdx];

  const handleSelectLevel = (idx) => {
    soundEngine.playUiClick();
    setActiveLevelIdx(idx);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Marine Food Chain Bioaccumulation
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Trophic biomagnification: how plastic particles and adsorbed toxins multiply as they climb the food pyramid.
        </p>
      </div>

      {/* SVG Animated Food Web Pyramid Diagram */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-emerald-500/20 bg-slate-950/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 mb-4">
          {foodChainTrophicLevels.map((lvl, idx) => {
            const Icon = iconMap[lvl.icon] || Fish;
            const isSelected = idx === activeLevelIdx;

            return (
              <button
                key={lvl.level}
                onClick={() => handleSelectLevel(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Trophic {lvl.level}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`} />
                </div>
                <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {lvl.name}
                </div>

                {/* Animated microplastic particle indicator */}
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="text-[10px] text-slate-400 font-mono">Toxin Load:</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: lvl.level }).map((_, i) => (
                      <span key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" style={{ animationDuration: `${1.5 - i * 0.2}s` }} />
                    ))}
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="trophicIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Active Trophic Level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel.level}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-cyan-950/30 border border-emerald-500/20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Trophic Level {activeLevel.level} Analysis
                </span>
                <h4 className="text-base font-bold text-white">
                  {activeLevel.name}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                {activeLevel.toxicityLevel}
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div>
                <strong className="text-white">Representative Organisms: </strong>
                <span className="text-emerald-200">{activeLevel.creatures}</span>
              </div>
              <div>
                <strong className="text-white">Mechanism of Infiltration: </strong>
                <span className="text-slate-300">{activeLevel.contaminationMechanism}</span>
              </div>
            </div>

            {/* Microplastic particle count simulation bar */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                <span>Microplastic Bio-Concentration Index:</span>
                <span className="text-emerald-400 font-bold">{activeLevel.plasticCount} PPM equiv.</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeLevel.level / 4) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
