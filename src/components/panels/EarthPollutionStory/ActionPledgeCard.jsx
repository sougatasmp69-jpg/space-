import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles, Check, Share2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import { soundEngine } from '../../../utils/soundEngine';
import AnimatedButton from '../../ui/AnimatedButton';

export default function ActionPledgeCard() {
  const { pledgeItems } = EARTH_POLLUTION_DATA;
  const [selectedPledges, setSelectedPledges] = useState(['p1', 'p2', 'p3']);
  const [name, setName] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  const togglePledge = (id) => {
    setSelectedPledges(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSignPledge = (e) => {
    e.preventDefault();
    soundEngine.playPlanetSelectTone(660);
    setIsSigned(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#34d399', '#f59e0b', '#a855f7']
    });
  };

  return (
    <div className="glass-panel-deep rounded-3xl p-5 sm:p-6 border border-cyan-500/30 relative overflow-hidden space-y-5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5 text-emerald-400" />
          Take Action For Earth
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          The Planetary Ocean Conservation Pledge
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Make a direct commitment to protect aquatic biodiversity and reduce global polymer pollution.
        </p>
      </div>

      {!isSigned ? (
        <form onSubmit={handleSignPledge} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 block uppercase font-mono">
              Select Your Commitments:
            </label>
            <div className="space-y-1.5">
              {pledgeItems.map((item) => {
                const isChecked = selectedPledges.includes(item.id);
                return (
                  <AnimatedButton
                    key={item.id}
                    onClick={() => togglePledge(item.id)}
                    variant={isChecked ? 'primary' : 'glass'}
                    isActive={isChecked}
                    magnetic={false}
                    enableRipple={true}
                    className={`w-full !justify-between p-2.5 rounded-xl border text-xs text-left ${
                      isChecked
                        ? '!bg-cyan-950/60 !border-cyan-400 !text-white'
                        : '!bg-slate-900/40 !border-slate-800 !text-slate-400 hover:!border-slate-700'
                    }`}
                  >
                    <span>{item.text}</span>
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ml-2 ${
                      isChecked ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </div>
                  </AnimatedButton>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <input
              type="text"
              required
              placeholder="Enter your name / callsign..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <AnimatedButton
              type="submit"
              disabled={selectedPledges.length === 0}
              variant="primary"
              magnetic={true}
              enableParticles={true}
              className="px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign Planetary Pledge</span>
            </AnimatedButton>
          </div>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-emerald-950/50 border border-emerald-400/40 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                  Verified Earth Defender
                </span>
                <h4 className="text-base font-bold text-white">
                  {name || 'Planetary Citizen'}
                </h4>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-cyan-300 block mb-1">
              Confirmed Active Commitments ({selectedPledges.length}):
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
              {selectedPledges.map(id => {
                const item = pledgeItems.find(p => p.id === id);
                return <li key={id}>{item?.text}</li>;
              })}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Thank you for protecting Earth's oceans!
            </span>
            <AnimatedButton
              onClick={() => setIsSigned(false)}
              variant="glass"
              magnetic={true}
              className="px-2.5 py-1 rounded-lg text-xs text-slate-300 hover:text-white"
            >
              Modify Pledge
            </AnimatedButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
