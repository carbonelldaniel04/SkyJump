import React from 'react';
import { JumpEvent } from '../types';
import { Calendar, MapPin, Users, Ticket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface EventsSectionProps {
  events: JumpEvent[];
  onOpenBooking: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, onOpenBooking }) => {
  const publishedEvents = events.filter((e) => e.isPublished);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="eventos" className="py-20 relative z-10 bg-white/40 backdrop-blur-md border-y border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#FF9800]/15 text-[#E65100] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#FF9800]/30">
            Jornadas Especiales
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Próximos Eventos & Festivales de Salto
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-3">
            Participá de nuestras jornadas temáticas con música en vivo, aviación de gran porte y experiencias exclusivas.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/80 flex flex-col justify-between group"
            >
              <div>
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-[#1E88E5] text-white font-title text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-xs font-bold text-amber-300 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>¡Últimos {evt.spotsLeft} cupos disponibles!</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="font-title font-bold text-xl text-[#1B1B1B] mb-2 group-hover:text-[#1E88E5] transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#FF9800]" />
                    <span>{evt.location} ({evt.time})</span>
                  </div>

                  <p className="font-body text-slate-600 text-sm leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Evento</span>
                  <span className="font-title font-extrabold text-xl text-[#1E88E5]">
                    {formatMoney(evt.price)}
                  </span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl bg-[#FF9800] hover:bg-[#F57C00] text-slate-900 font-title font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Asegurar Cupo</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
