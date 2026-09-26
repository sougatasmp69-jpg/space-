import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, RotateCcw, Award, Lightbulb } from 'lucide-react';
import { EARTH_POLLUTION_DATA } from '../../../data/earthPollutionData';
import AnimatedButton from '../../ui/AnimatedButton';

export default function PlasticFootprintTool() {
  const { footprintQuiz } = EARTH_POLLUTION_DATA;
  const [answers, setAnswers] = useState({
    bottles: 0,
    takeout: 0,
    groceries: 0,
    clothing: 0
  });

  const handleSelectOption = (questionId, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  let totalAnnualKg = 0;
  let totalScore = 0;

  footprintQuiz.forEach(q => {
    const selectedIdx = answers[q.id] ?? 0;
    const option = q.options[selectedIdx];
    if (option) {
      totalAnnualKg += option.kg;
      totalScore += option.score;
    }
  });

  let rating = {
    title: 'Low Plastic Impact (Eco Hero)',
    color: 'text-emerald-400',
    bg: 'bg-emerald-950/40 border-emerald-500/30',
    tip: 'Outstanding work! Keep setting an example and inspire friends to adopt reusable habits.'
  };

  if (totalScore >= 18) {
    rating = {
      title: 'High Plastic Footprint',
      color: 'text-rose-400',
      bg: 'bg-rose-950/40 border-rose-500/30',
      tip: 'Carrying a reusable tumbler and refusing takeout single-use plastic cutlery can cut your footprint by over 60% immediately!'
    };
  } else if (totalScore >= 8) {
    rating = {
      title: 'Moderate Plastic Footprint',
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-500/30',
      tip: 'Switching to bulk grocery refills and natural fiber textiles will elevate you to low-impact status.'
    };
  }

  const resetQuiz = () => {
    setAnswers({ bottles: 0, takeout: 0, groceries: 0, clothing: 0 });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-sky-400" />
          Personal Plastic Footprint Estimator
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Estimate your annual synthetic polymer consumption and discover high-impact reduction points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Questions Column */}
        <div className="lg:col-span-2 space-y-3.5">
          {footprintQuiz.map((q) => (
            <div key={q.id} className="glass-card rounded-xl p-3.5 space-y-2 border border-slate-800">
              <div className="text-xs font-bold text-white">
                {q.question}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = (answers[q.id] ?? 0) === optIdx;
                  return (
                    <AnimatedButton
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      variant={isSelected ? 'primary' : 'glass'}
                      isActive={isSelected}
                      magnetic={false}
                      enableRipple={true}
                      className={`!justify-between p-2 rounded-lg text-xs text-left ${
                        isSelected
                          ? '!border-sky-400 !bg-sky-950/60 !text-white ring-1 ring-sky-400'
                          : '!border-slate-800 !bg-slate-900/40 !text-slate-300 hover:!border-slate-700'
                      }`}
                    >
                      <span className="truncate pr-1">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                    </AnimatedButton>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Results Column */}
        <div className="space-y-3">
          <div className={`p-4 rounded-2xl border ${rating.bg} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Annual Estimate
              </span>
              <Award className={`w-4 h-4 ${rating.color}`} />
            </div>

            <div>
              <div className="font-mono text-3xl font-extrabold text-white">
                ~{totalAnnualKg.toFixed(1)} <span className="text-xs text-slate-400 font-sans font-normal">kg / year</span>
              </div>
              <div className={`text-xs font-bold mt-1 ${rating.color}`}>
                {rating.title}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> High-Impact Advice
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {rating.tip}
              </p>
            </div>

            <AnimatedButton
              onClick={resetQuiz}
              variant="glass"
              magnetic={true}
              enableRipple={true}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Calculator</span>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
