import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, ShieldAlert, Biohazard, FlaskConical, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import AnimatedButton from '../../ui/AnimatedButton';

const iconMap = {
  Fish: Fish,
  ShieldAlert: ShieldAlert,
  Biohazard: Biohazard,
  FlaskConical: FlaskConical
};

export default function AquaticImpactMatrix() {
  const { aquaticImpacts } = EARTH_POLLUTION_DATA;
  const [expandedCard, setExpandedCard] = useState(aquaticImpacts[0].id);

  const toggleExpand = (id) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Fish className="w-5 h-5 text-rose-400" />
          Devastating Impacts on Marine Life
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          From micro-cellular toxicity to physical entanglement of apex marine megafauna.
        </p>
      </div>

      <div className="space-y-3">
        {aquaticImpacts.map((impact) => {
          const IconComp = iconMap[impact.icon] || Fish;
          const isExpanded = expandedCard === impact.id;

          return (
            <div
              key={impact.id}
              className={`glass-card rounded-2xl overflow-hidden border transition-all ${
                isExpanded
                  ? 'border-rose-500/50 bg-rose-950/20 shadow-lg shadow-rose-950/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <AnimatedButton
                onClick={() => toggleExpand(impact.id)}
                variant="glass"
                magnetic={false}
                enableRipple={true}
                className="w-full !justify-between p-4 text-left !bg-transparent !border-none !shadow-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl border ${
                    isExpanded
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-400'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-rose-400 font-semibold uppercase tracking-wider">
                        {impact.tag}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {impact.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
                    {isExpanded ? 'Collapse' : 'Details'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-rose-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </AnimatedButton>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-4 pt-1 space-y-3 border-t border-rose-500/20"
                  >
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {impact.description}
                    </p>

                    {/* Documented Field Metric */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-slate-800 text-xs text-rose-200">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{impact.stats}</span>
                    </div>

                    {/* Case Study */}
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-slate-300">
                      <span className="font-bold text-rose-300 uppercase font-mono text-[10px] block mb-1">
                        Documented Case Study
                      </span>
                      {impact.caseStudy}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
