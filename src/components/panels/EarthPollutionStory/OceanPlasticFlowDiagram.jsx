import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Waves, Disc3, Anchor, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import { soundEngine } from '../../../utils/soundEngine';

const iconMap = {
  Factory: Factory,
  Waves: Waves,
  Disc3: Disc3,
  Anchor: Anchor
};

export default function OceanPlasticFlowDiagram() {
  const { flowJourney } = EARTH_POLLUTION_DATA;
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStep = flowJourney[activeStepIdx];
  const IconComponent = iconMap[activeStep.icon] || Factory;

  const handleStepClick = (idx) => {
    soundEngine.playUiClick();
    setActiveStepIdx(idx);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            The Journey of Plastic Waste
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            How synthetic consumer polymers travel from land into the deepest oceanic abysses.
          </p>
        </div>
      </div>

      {/* Interactive Step Track Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {flowJourney.map((step, idx) => {
          const StepIcon = iconMap[step.icon] || Factory;
          const isActive = idx === activeStepIdx;
          const isPast = idx < activeStepIdx;

          return (
            <button
              key={step.step}
              onClick={() => handleStepClick(idx)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  Phase {step.step}
                </span>
                <StepIcon className={`w-4 h-4 ${isActive ? 'text-cyan-300' : 'text-slate-500 group-hover:text-slate-300'}`} />
              </div>
              <div className={`text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {step.title}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                {step.stage}
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeFlowIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-sky-300"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Animated Visual Stage Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Step {activeStep.step} • {activeStep.stage}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {activeStep.title}
                  </h4>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Key Fact: </strong>
                  {activeStep.fact}
                </span>
              </div>
            </div>

            {/* Stage Progress Tracker Navigation */}
            <div className="flex md:flex-col items-center justify-between w-full md:w-auto gap-2 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-5">
              <button
                disabled={activeStepIdx === 0}
                onClick={() => handleStepClick(activeStepIdx - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                Previous Stage
              </button>
              <button
                disabled={activeStepIdx === flowJourney.length - 1}
                onClick={() => handleStepClick(activeStepIdx + 1)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5"
              >
                Next Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
