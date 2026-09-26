import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Waves, TrendingUp, Sparkles } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';

export default function StatTickerHero() {
  const { hero } = EARTH_POLLUTION_DATA;
  const [liveKgDumped, setLiveKgDumped] = useState(0);

  // Live accumulating counter since user viewed the page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      setLiveKgDumped(Math.floor(elapsedSeconds * hero.liveStatPerSecondKg));
    }, 100);

    return () => clearInterval(interval);
  }, [hero.liveStatPerSecondKg]);

  return (
    <div className="space-y-6">
      {/* Live Marine Inflow Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-blue-950/40 border border-red-500/30 p-4 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Live Inflow Estimator
              </div>
              <div className="text-sm text-slate-300">
                Marine plastic accumulating while you explore this site:
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-2 bg-black/50 px-4 py-2 rounded-xl border border-red-500/20">
            <span className="font-mono text-2xl font-bold text-red-400">
              +{liveKgDumped.toLocaleString()}
            </span>
            <span className="text-xs font-semibold uppercase text-slate-400">kg of waste</span>
          </div>
        </div>
      </motion.div>

      {/* Main Headline & Context */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Waves className="w-3.5 h-3.5 text-cyan-400" />
          Planet Earth Special Report
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {hero.headline}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {hero.subheadline}
        </p>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {hero.stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card rounded-xl p-3.5 flex flex-col justify-between border-l-2 border-l-cyan-400/80"
          >
            <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white font-mono">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <div className="mt-1 text-xs font-semibold text-slate-200 line-clamp-2">
              {stat.label}
            </div>
            <div className="mt-2 text-[11px] text-slate-400 leading-tight">
              {stat.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
