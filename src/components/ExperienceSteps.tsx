import React from 'react';
import { motion } from 'motion/react';
import { FileText, GraduationCap, Plane, Award, CheckCircle2 } from 'lucide-react';

export const ExperienceSteps: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: '📝',
      iconLucide: FileText,
      title: 'Registro & Check-in',
      text: 'Al llegar al aeródromo, te recibimos en nuestro lounge. Completás tus datos en nuestras tablets y firmás el consentimiento digital.',
      detail: 'Revisión de equipamiento y pesaje previo de seguridad.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      number: '02',
      icon: '🎓',
      iconLucide: GraduationCap,
      title: 'Capacitación Personal',
      text: 'Tu instructor tándem te brindará una amena charla técnica de 15 minutos. Aprenderás las posturas de salto y aterrizaje.',
      detail: 'Colocación del arnés técnico de aviación certificado.',
      color: 'from-sky-500 to-cyan-600',
    },
    {
      number: '03',
      icon: '🪂',
      iconLucide: Plane,
      title: 'Ascenso & Salto',
      text: 'Subís al avión para un vuelo panorámico de 15 minutos hasta los 3.000m. ¡Se abre la puerta y vivís 40 segundos de caída libre pura!',
      detail: 'Vuelo en paracaídas abierto navegando el paisaje durante 6 minutos.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      number: '04',
      icon: '🏆',
      iconLucide: Award,
      title: 'Aterrizaje & Recuerdo',
      text: 'Aterrizaje suave en el césped donde te esperan tus acompañantes. Recibís tu certificado oficial de primer salto y tu video HD.',
      detail: 'Fotos y video editados entregados directamente a tu celular.',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section id="experiencia" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/20">
            Paso a Paso
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            ¿Cómo es la experiencia SkyJump?
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Desde que pisás nuestro aeródromo hasta el abrazo final de celebración. Un proceso 100% diseñado para tu máximo confort y seguridad.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-7 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-white/80 group relative overflow-hidden"
              >
                {/* Number Watermark */}
                <span className="absolute top-3 right-4 font-title font-black text-6xl text-slate-200/60 pointer-events-none group-hover:scale-110 transition-transform">
                  {step.number}
                </span>

                <div>
                  {/* Icon Header */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E88E5] to-[#42A5F5] text-white flex items-center justify-center text-2xl shadow-md mb-6 group-hover:rotate-6 transition-transform">
                    {step.icon}
                  </div>

                  <h3 className="font-title font-bold text-xl text-[#1B1B1B] mb-3">
                    {step.title}
                  </h3>

                  <p className="font-body text-slate-600 text-sm leading-relaxed mb-4">
                    {step.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 text-xs font-medium text-slate-500 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{step.detail}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
