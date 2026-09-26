import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  Waves,
  Layers,
  Fish,
  Activity,
  Sparkles,
  Calculator,
  ShieldCheck,
  Compass,
  AlertTriangle
} from 'lucide-react';
import EarthCrisisCards from './EarthCrisisCards';
import StatTickerHero from './StatTickerHero';
import OceanPlasticFlowDiagram from './OceanPlasticFlowDiagram';
import PlasticTypesBreakdown from './PlasticTypesBreakdown';
import AquaticImpactMatrix from './AquaticImpactMatrix';
import FoodChainBioaccumulation from './FoodChainBioaccumulation';
import MitigationHub from './MitigationHub';
import PlasticFootprintTool from './PlasticFootprintTool';
import ActionPledgeCard from './ActionPledgeCard';
import AnimatedButton from '../../ui/AnimatedButton';

const tabs = [
  { id: 'crises', label: '5 Core Crises', icon: AlertTriangle },
  { id: 'overview', label: 'Plastic Crisis Overview', icon: TrendingUp },
  { id: 'journey', label: 'Plastic Journey', icon: Waves },
  { id: 'typology', label: 'Plastic Types', icon: Layers },
  { id: 'impacts', label: 'Marine Impacts', icon: Fish },
  { id: 'foodchain', label: 'Food Web Bioaccumulation', icon: Activity },
  { id: 'solutions', label: 'Mitigation Matrix', icon: Sparkles },
  { id: 'calculator', label: 'Footprint Calculator', icon: Calculator },
  { id: 'pledge', label: 'Action Pledge', icon: ShieldCheck }
];

export default function EarthPollutionView() {
  const [activeTab, setActiveTab] = useState('crises');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Navigation Bar for Earth's Deep-Dive */}
      <div className="sticky top-0 z-20 -mx-6 -mt-4 px-6 py-3 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <AnimatedButton
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              variant={isActive ? 'primary' : 'glass'}
              isActive={isActive}
              magnetic={true}
              enableRipple={true}
              enableParticles={true}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                isActive ? 'shadow-md shadow-cyan-500/20' : ''
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </AnimatedButton>
          );
        })}
      </div>

      {/* Dynamic Tab Content or All-in-one view */}
      <div className="space-y-10 pb-8">
        {activeTab === 'crises' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <EarthCrisisCards />
            <StatTickerHero />
            <ActionPledgeCard />
          </motion.div>
        )}

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <EarthCrisisCards />
            <StatTickerHero />
            <OceanPlasticFlowDiagram />
            <FoodChainBioaccumulation />
            <MitigationHub />
            <ActionPledgeCard />
          </motion.div>
        )}

        {activeTab === 'journey' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <OceanPlasticFlowDiagram />
          </motion.div>
        )}

        {activeTab === 'typology' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <PlasticTypesBreakdown />
          </motion.div>
        )}

        {activeTab === 'impacts' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <AquaticImpactMatrix />
          </motion.div>
        )}

        {activeTab === 'foodchain' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <FoodChainBioaccumulation />
          </motion.div>
        )}

        {activeTab === 'solutions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <MitigationHub />
          </motion.div>
        )}

        {activeTab === 'calculator' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <PlasticFootprintTool />
          </motion.div>
        )}

        {activeTab === 'pledge' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <ActionPledgeCard />
          </motion.div>
        )}
      </div>
    </div>
  );
}
