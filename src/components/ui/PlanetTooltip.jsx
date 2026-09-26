import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Thermometer, ArrowUpRight } from 'lucide-react';

export default function PlanetTooltip({ tooltipState, isDrawerOpen }) {
  if (!tooltipState || !tooltipState.isVisible || !tooltipState.data || isDrawerOpen) {
    return null;
  }

  const { data, x, y } = tooltipState;
  const isStarSystem = !!data.isStarSystem;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -100%)'
        }}
        className="fixed z-20 pointer-events-none mb-3"
      >
        <div className="glass-panel-deep px-3.5 py-2.5 rounded-2xl border border-cyan-400/40 shadow-2xl max-w-xs space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: data.accentColor || data.color || '#fbbf24' }}
              />
              <span className="text-sm font-bold text-white leading-tight">
                {data.name}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">
              {isStarSystem ? data.dist : (data.diameter || 'Body')}
            </span>
          </div>

          <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
            {isStarSystem
              ? 'Distant Exoplanetary Star System'
              : (data.environmentalTopic || data.environmentalFocus || data.subtitle)}
          </div>

          {data.temperature && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono pt-0.5">
              <Thermometer className="w-3 h-3 text-amber-400" />
              <span>{data.temperature}</span>
            </div>
          )}

          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-cyan-400 font-semibold flex items-center justify-between">
            <span>{isStarSystem ? 'Galaxy Deep Space Landmark' : 'Click to Fly-In & Explore'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
