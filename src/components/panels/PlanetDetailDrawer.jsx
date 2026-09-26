import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Globe, Compass } from 'lucide-react';
import EarthPollutionView from './EarthPollutionStory/EarthPollutionView';
import PlanetCrisisView from './OtherPlanets/PlanetCrisisView';
import { SOLAR_SYSTEM_DATA } from '../../data/solarSystemData';
import { soundEngine } from '../../utils/soundEngine';
import AnimatedButton from '../ui/AnimatedButton';
import { ANIMATION_CONFIG } from '../../config/animationConfig';

export default function PlanetDetailDrawer({
  selectedPlanetId,
  onClose,
  isOpen
}) {
  const [isClosing, setIsClosing] = useState(false);

  if (!selectedPlanetId && !isOpen) return null;

  let currentBody = null;
  if (selectedPlanetId === 'sun') {
    currentBody = SOLAR_SYSTEM_DATA.sun;
  } else {
    currentBody = SOLAR_SYSTEM_DATA.planets.find(p => p.id === selectedPlanetId);
  }

  const isEarth = selectedPlanetId === 'earth';

  const handleClose = () => {
    soundEngine.playUiClick();
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, (ANIMATION_CONFIG.closeButton.duration || 0.35) * 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 lg:hidden"
          />

          {/* Slide-in Drawer Container */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[580px] lg:w-[680px] z-40 bg-slate-950/92 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <AnimatedButton
                  onClick={handleClose}
                  variant="glass"
                  magnetic={true}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white"
                  title="Return to Solar System Overview"
                >
                  <motion.span
                    animate={isClosing ? { rotate: -180, opacity: 0 } : { rotate: 0, opacity: 1 }}
                    transition={{ duration: ANIMATION_CONFIG.closeButton.duration }}
                    className="inline-flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.span>
                  <span>Orbit View</span>
                </AnimatedButton>

                <div className="h-4 w-px bg-slate-700 hidden sm:block" />

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white leading-tight">
                      {currentBody?.name || 'Celestial Body'}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {currentBody?.diameter || currentBody?.type || 'Planet'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate max-w-[240px]">
                    {currentBody?.subtitle}
                  </p>
                </div>
              </div>

              {/* Close Button with Rotate + Fade Out Animation */}
              <AnimatedButton
                onClick={handleClose}
                variant="danger"
                magnetic={true}
                enableParticles={true}
                className="p-2 rounded-xl"
                aria-label="Close drawer"
                title="Close drawer (Esc)"
              >
                <motion.span
                  animate={isClosing ? { rotate: ANIMATION_CONFIG.closeButton.rotateAngle, opacity: 0 } : { rotate: 0, opacity: 1 }}
                  transition={{ duration: ANIMATION_CONFIG.closeButton.duration, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </motion.span>
              </AnimatedButton>
            </div>

            {/* Scrollable Storytelling Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {isEarth ? (
                <EarthPollutionView />
              ) : (
                <PlanetCrisisView
                  planetId={selectedPlanetId}
                  planetData={currentBody}
                  onClose={handleClose}
                />
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
