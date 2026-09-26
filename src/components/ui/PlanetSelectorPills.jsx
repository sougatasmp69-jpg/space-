import React from 'react';
import { SOLAR_SYSTEM_DATA } from '../../data/solarSystemData';
import AnimatedButton from './AnimatedButton';

export default function PlanetSelectorPills({
  selectedPlanetId,
  onSelectPlanet,
  isGalaxyView,
  onToggleGalaxyView,
  isGalaxyZooming = false
}) {
  const allBodies = [
    SOLAR_SYSTEM_DATA.sun,
    ...SOLAR_SYSTEM_DATA.planets
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 pointer-events-none px-3">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="glass-panel-deep p-1.5 sm:p-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pointer-events-auto no-scrollbar">
          {/* Galaxy Scale Pill */}
          <AnimatedButton
            onClick={() => {
              if (onToggleGalaxyView) onToggleGalaxyView();
            }}
            variant="galaxy"
            isActive={isGalaxyView}
            radialBurst={true}
            enableParticles={true}
            spinIcon={isGalaxyZooming}
            magnetic={true}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            <span className="text-xs">🌌</span>
            <span className="whitespace-nowrap">Milky Way</span>
          </AnimatedButton>

          <div className="w-px h-4 bg-slate-800 shrink-0 mx-0.5" />

          {/* Planet Navigation Buttons */}
          {allBodies.map((body) => {
            const isSelected = selectedPlanetId === body.id;
            const isEarth = body.id === 'earth';

            return (
              <AnimatedButton
                key={body.id}
                onClick={() => {
                  onSelectPlanet(isSelected ? null : body.id);
                }}
                variant={isSelected ? 'primary' : isEarth ? 'secondary' : 'pill'}
                isActive={isSelected}
                magnetic={true}
                enableRipple={true}
                enableParticles={true}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  isEarth && !isSelected
                    ? '!bg-cyan-950/40 !border-cyan-500/40 !text-cyan-300'
                    : ''
                }`}
                style={
                  isSelected && body.accentColor
                    ? {
                        boxShadow: `0 0 20px ${body.accentColor}50`,
                        borderColor: body.accentColor
                      }
                    : {}
                }
              >
                {/* Planet Color Dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: body.accentColor || body.color || '#fbbf24',
                    boxShadow: isSelected ? `0 0 8px ${body.accentColor || body.color}` : 'none'
                  }}
                />

                <span className="whitespace-nowrap">{body.name}</span>

                {isEarth && !isSelected && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </AnimatedButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
