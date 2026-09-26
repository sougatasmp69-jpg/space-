import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartHandshake,
  Users,
  Landmark,
  Cpu,
  Building2,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import AnimatedButton from '../../ui/AnimatedButton';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Users: Users,
  Landmark: Landmark,
  Cpu: Cpu,
  Building2: Building2
};

export default function MitigationHub() {
  const { mitigationPillars } = EARTH_POLLUTION_DATA;
  const [selectedPillarId, setSelectedPillarId] = useState(mitigationPillars[0].id);

  const activePillar = mitigationPillars.find(p => p.id === selectedPillarId) || mitigationPillars[0];
  const IconComponent = iconMap[activePillar.icon] || HeartHandshake;

  const handlePillarChange = (id) => {
    setSelectedPillarId(id);
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          5-Pillar Mitigation & Control Matrix
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Holistic solutions spanning grassroots citizen action, breakthrough technology, and global policy.
        </p>
      </div>

      {/* Pillar Selection Pills */}
      <div className="flex flex-wrap gap-2">
        {mitigationPillars.map((pillar) => {
          const Icon = iconMap[pillar.icon] || HeartHandshake;
          const isSelected = pillar.id === selectedPillarId;

          return (
            <AnimatedButton
              key={pillar.id}
              onClick={() => handlePillarChange(pillar.id)}
              variant={isSelected ? 'primary' : 'glass'}
              isActive={isSelected}
              magnetic={true}
              enableRipple={true}
              enableParticles={true}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                isSelected
                  ? '!border-cyan-400 !bg-cyan-950/70 !text-white shadow-md shadow-cyan-950/50 ring-1 ring-cyan-400'
                  : '!border-slate-800 !bg-slate-900/50 !text-slate-400 hover:!text-slate-200 hover:!border-slate-700'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`} />
              <span>{pillar.title}</span>
            </AnimatedButton>
          );
        })}
      </div>

      {/* Active Pillar Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="glass-panel-deep rounded-2xl p-5 border border-cyan-500/20 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className="p-2.5 rounded-xl border"
                style={{
                  backgroundColor: `${activePillar.color}20`,
                  borderColor: `${activePillar.color}50`,
                  color: activePillar.color
                }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {activePillar.badge}
                </span>
                <h4 className="text-base font-bold text-white">
                  {activePillar.title}
                </h4>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            {activePillar.intro}
          </p>

          {/* Action Items List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {activePillar.actions.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 space-y-1.5 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <h5 className="text-xs font-bold text-white leading-snug">
                    {act.title}
                  </h5>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                  {act.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
