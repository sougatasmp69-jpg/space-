import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, Orbit } from 'lucide-react';

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Generating Solar Corona & Photosphere Shaders...');

  useEffect(() => {
    const steps = [
      { p: 35, text: 'Synthesizing Terrestrial & Gas Giant Texture Maps...' },
      { p: 65, text: 'Instantiating Asteroid Belt & 3,500 Starfield Nodes...' },
      { p: 85, text: 'Calculating Gravitational Orbit Splines & Physics...' },
      { p: 100, text: 'Calibrating Planetary Environmental Observatories...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (onLoaded) onLoaded();
        }, 400);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Planetary Orbit Animated Rings */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-sky-500 border-l-transparent animate-spin" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-6 rounded-full border border-t-amber-400 border-r-transparent border-b-transparent border-l-orange-400 animate-spin" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 shadow-xl shadow-amber-500/40 animate-pulse flex items-center justify-center text-xs">
          ☀️
        </div>
      </div>

      <div className="space-y-3 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          CosmoSphere <span className="text-cyan-400">3D</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono">
          {statusText}
        </p>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 h-2 bg-slate-900 rounded-full mx-auto overflow-hidden border border-slate-800">
          <motion.div
            initial={{ width: '10%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 rounded-full"
          />
        </div>

        <div className="text-[11px] text-slate-500 font-mono pt-2">
          {progress}% LOADED • 3D WEBGL GRAPHICS ACCELERATED
        </div>
      </div>
    </motion.div>
  );
}
