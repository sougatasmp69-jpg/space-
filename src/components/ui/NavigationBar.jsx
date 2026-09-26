import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  FastForward,
  Sparkles,
  Compass,
  Orbit
} from 'lucide-react';
import { SOLAR_SYSTEM_DATA } from '../../data/solarSystemData';
import AnimatedButton from './AnimatedButton';

export default function NavigationBar({
  selectedPlanetId,
  onSelectPlanet,
  orbitSpeedFactor,
  onChangeOrbitSpeed,
  showOrbits,
  onToggleOrbits,
  isAudioMuted,
  onToggleAudio,
  isTouring,
  onToggleTour,
  isGalaxyView,
  onToggleGalaxyView,
  isGalaxyZooming = false
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Mission Badge */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <AnimatedButton
            onClick={() => {
              if (isGalaxyView && onToggleGalaxyView) onToggleGalaxyView();
              onSelectPlanet(null);
            }}
            variant="deep"
            magnetic={true}
            enableRipple={true}
            enableParticles={true}
            className="px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-cyan-500/20 hover:border-cyan-400 group text-left"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-sm shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
              🪐
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                CosmoSphere <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">3D</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Planetary Environmental Observatory
              </div>
            </div>
          </AnimatedButton>

          {/* Quick Earth Focus Button */}
          <AnimatedButton
            onClick={() => {
              if (isGalaxyView && onToggleGalaxyView) onToggleGalaxyView();
              onSelectPlanet('earth');
            }}
            variant={selectedPlanetId === 'earth' && !isGalaxyView ? 'primary' : 'secondary'}
            isActive={selectedPlanetId === 'earth' && !isGalaxyView}
            magnetic={true}
            enableRipple={true}
            enableParticles={true}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Earth Crisis Feature</span>
          </AnimatedButton>

          {/* Scale Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{isGalaxyView ? 'SCALE: 100,000 LY • MILKY WAY GALAXY' : 'SCALE: 60 AU • SOLAR SYSTEM'}</span>
          </div>
        </div>

        {/* Global Controls HUD */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Zoom Out to Galaxy View Button with Radial Burst and Continuous Icon Spin during Zoom */}
          <AnimatedButton
            onClick={onToggleGalaxyView}
            variant="galaxy"
            isActive={isGalaxyView}
            radialBurst={true}
            enableParticles={true}
            spinIcon={isGalaxyZooming}
            magnetic={true}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            title={isGalaxyView ? 'Return to Solar System View' : 'Zoom Out to Full Galaxy View'}
          >
            <span className="text-sm">🌌</span>
            <span>{isGalaxyView ? 'Solar View' : 'Galaxy View'}</span>
          </AnimatedButton>

          {/* Cinematic Tour Toggle */}
          <AnimatedButton
            onClick={onToggleTour}
            variant={isTouring ? 'primary' : 'glass'}
            isActive={isTouring}
            enableParticles={true}
            magnetic={true}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
              isTouring ? '!bg-amber-500 !text-slate-950 !border-amber-400 shadow-amber-500/30' : ''
            }`}
            title="Automatically tour all planets sequentially"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isTouring ? 'Stop Tour' : 'Cinematic Tour'}</span>
          </AnimatedButton>

          {/* Orbit Lines Toggle */}
          <AnimatedButton
            onClick={onToggleOrbits}
            variant="icon"
            magnetic={true}
            className="p-2.5 rounded-xl"
            title={showOrbits ? 'Hide Orbit Paths' : 'Show Orbit Paths'}
          >
            {showOrbits ? <Eye className="w-4 h-4 text-cyan-400" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
          </AnimatedButton>

          {/* Speed Multiplier Pill */}
          <div className="glass-panel px-2 py-1 rounded-xl border border-slate-700 hidden sm:flex items-center gap-1 text-xs">
            <FastForward className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {[0, 1, 3, 5].map((spd) => (
              <AnimatedButton
                key={spd}
                onClick={() => onChangeOrbitSpeed(spd)}
                variant="pill"
                isActive={orbitSpeedFactor === spd}
                magnetic={false}
                className="px-2 py-1 rounded-lg font-mono font-bold text-[11px]"
              >
                {spd === 0 ? 'Pause' : `${spd}x`}
              </AnimatedButton>
            ))}
          </div>

          {/* Audio Drone & SFX Toggle */}
          <AnimatedButton
            onClick={onToggleAudio}
            variant={!isAudioMuted ? 'secondary' : 'icon'}
            magnetic={true}
            className="p-2.5 rounded-xl flex items-center gap-1.5"
            title={isAudioMuted ? 'Unmute Cosmic Ambient Audio' : 'Mute Audio'}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <div className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-3.5 bg-cyan-400 animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
}
