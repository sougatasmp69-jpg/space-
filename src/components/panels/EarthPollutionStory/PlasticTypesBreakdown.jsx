import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hourglass, AlertOctagon, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import { soundEngine } from '../../../utils/soundEngine';

export default function PlasticTypesBreakdown() {
  const { plasticTypes } = EARTH_POLLUTION_DATA;
  const [selectedType, setSelectedType] = useState(plasticTypes[0].id);

  const handleSelect = (id) => {
    soundEngine.playUiClick();
    setSelectedType(id);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          Typology & Degradation Timelines
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Synthetic polymers resist biological decay, remaining active hazards for centuries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {plasticTypes.map((item, idx) => {
          const isSelected = selectedType === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleSelect(item.id)}
              className={`glass-card rounded-2xl p-4 cursor-pointer transition-all border ${
                isSelected
                  ? 'border-amber-400/80 bg-amber-950/20 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {item.name}
                  </h4>
                </div>
                <div
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 border"
                  style={{
                    backgroundColor: `${item.dangerColor}20`,
                    borderColor: `${item.dangerColor}50`,
                    color: item.dangerColor
                  }}
                >
                  {item.hazardLevel} Risk
                </div>
              </div>

              {/* Degradation lifespan ticker */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-slate-800/80 mb-2.5 text-xs text-slate-300 font-mono">
                <Hourglass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Lifespan: <strong className="text-amber-300">{item.lifespan}</strong></span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="text-slate-300 font-medium">Primary Sources: </span>
                {item.sources}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
