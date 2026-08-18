import React from 'react';
import { PLANS } from '../data/mockData';
import { Plan } from '../types';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PlansSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({ onSelectPlan }) => {
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="planes" className="py-20 relative z-10 bg-white/40 backdrop-blur-md border-y border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FF9800]/15 text-[#E65100] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#FF9800]/30">
            Tarifas Transparentes
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Elegí la experiencia perfecta para vos
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Todos los planes incluyen equipamiento de alta tecnología, instrucción personalizada y seguro de aviación. Congelá la tarifa reservando con la seña del 30%.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, idx) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#1E88E5] via-[#1565C0] to-[#0D47A1] text-white shadow-2xl scale-105 border-2 border-[#FF9800]'
                    : 'glass-card text-slate-800 shadow-xl hover:shadow-2xl border border-white/80'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.badge && (
                  <div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full font-title text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                      plan.isPopular
                        ? 'bg-[#FF9800] text-slate-900'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <h3
                    className={`font-title font-extrabold text-2xl mb-2 ${
                      plan.isPopular ? 'text-white' : 'text-[#1B1B1B]'
                    }`}
                  >
                    {plan.title}
                  </h3>

                  <p
                    className={`font-body text-sm leading-relaxed mb-6 ${
                      plan.isPopular ? 'text-sky-100' : 'text-slate-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-current/15">
                    <div className="flex items-baseline gap-2">
                      <span className="font-title font-black text-3xl sm:text-4xl tracking-tight">
                        {formatMoney(plan.price)}
                      </span>
                      <span className="text-xs font-semibold opacity-75">
                        / USD ${plan.priceUsd}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs font-medium opacity-90">
                      <span className="flex items-center gap-1">
                        🏔️ {plan.altitude}
                      </span>
                      <span className="flex items-center gap-1">
                        ⚡ {plan.freefall}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.isPopular
                              ? 'bg-amber-400 text-slate-900'
                              : 'bg-[#1E88E5]/20 text-[#1E88E5]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className={plan.isPopular ? 'text-sky-50' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-4 rounded-2xl font-title font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 group ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#FF9800] to-[#F57C00] hover:brightness-110 text-slate-900 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] text-white hover:brightness-105'
                  }`}
                >
                  <span>Reservar este Plan</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
