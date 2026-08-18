import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 relative z-10 bg-white/40 backdrop-blur-md border-y border-white/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/20">
            Resuelve tus Dudas
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="font-body text-slate-600 text-base mt-3">
            Todo lo que necesitas saber antes de dar el gran salto con nosotros.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por palabra clave (ej. peso, lluvia, pago, edad)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass-card border border-white/80 shadow-md text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
          />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="glass-card rounded-2xl border border-white/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left font-title font-bold text-base sm:text-lg text-[#1B1B1B] flex justify-between items-center gap-4 hover:bg-white/50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#1E88E5] shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-[#1E88E5]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
