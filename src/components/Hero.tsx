import React, { useState } from 'react';
import { HERO_IMAGE, STATS } from '../data/mockData';
import { Play, CalendarCheck, ShieldCheck, Award, Flame, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="inicio" className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Hero Background Image with Parallax Style */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Paracaidista en caída libre"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90"
        />
        {/* Dynamic Multi-stop Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a4a] via-[#0d2a4a]/60 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-[#FF9800] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#FF9800]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-sky-100">
                Dropping Zone Oficial • Certificación USPA International
              </span>
            </div>

            {/* Title */}
            <h1 className="font-title text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-6 text-shadow-xl">
              Viví la experiencia <br />
              <span className="bg-gradient-to-r from-[#FF9800] via-[#FFB74D] to-white bg-clip-text text-transparent">
                más emocionante
              </span>{' '}
              de tu vida
            </h1>

            {/* Subtitle */}
            <p className="font-body text-lg sm:text-xl text-sky-100 max-w-2xl font-normal leading-relaxed mb-8 text-shadow">
              Saltos tándem en paracaídas con instructores profesionales. Reservá tu turno online en segundos y asegurá tu lugar congelando con la seña del 30%.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF9800] via-[#F57C00] to-[#E65100] hover:from-[#F57C00] hover:to-[#EF6C00] text-white font-title font-bold text-base shadow-2xl shadow-amber-500/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <CalendarCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Reservar Salto Ahora</span>
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-title font-semibold text-base shadow-lg transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-full bg-white text-[#1E88E5] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Ver Video Salto HD</span>
              </button>
            </div>

            {/* Guarantee Tag */}
            <div className="mt-8 flex items-center gap-6 text-xs sm:text-sm text-sky-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF9800]" /> 100% Reprogramable por clima
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" /> Confirmación inmediata
              </span>
            </div>
          </motion.div>

          {/* Side Floating Experience Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="glass-card-dark p-6 rounded-3xl text-white shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#FF9800]/20 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#1E88E5]/30 rounded-2xl text-2xl">
                  🪂
                </div>
                <div>
                  <h3 className="font-title font-bold text-lg text-white">Próximos Cupos</h3>
                  <p className="text-xs text-sky-300">Reserva online asegurada</p>
                </div>
              </div>

              <div className="space-y-3 my-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center text-sm">
                  <div>
                    <div className="font-semibold text-sky-100">Sábado Próximo</div>
                    <div className="text-xs text-slate-300">Turnos 10:30hs y 14:00hs</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    Cupos Libres
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center text-sm">
                  <div>
                    <div className="font-semibold text-sky-100">Domingo Próximo</div>
                    <div className="text-xs text-slate-300">Turnos 09:00hs y 15:30hs</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                    Últimos 2
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:brightness-110 font-title font-bold text-sm text-center shadow-md transition-all"
              >
                Elegir Fecha en Calendario
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Statistics Counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="glass-card-dark p-5 rounded-2xl border border-white/10 backdrop-blur-xl text-center hover:border-white/30 transition-all group"
            >
              <div className="font-title text-2xl sm:text-4xl font-black text-[#FF9800] group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="font-title font-bold text-sm sm:text-base text-white mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-sky-200/80 mt-0.5">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-4 bg-slate-800 text-white font-title font-bold text-lg flex items-center gap-2">
              <span>🪂 SkyJump Teaser Experience HD</span>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              >
                Tu navegador no soporta reproducción de video.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
