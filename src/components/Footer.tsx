import React from 'react';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1E88E5] to-[#FF9800] p-0.5 shadow-lg flex items-center justify-center text-xl bg-slate-900">
                🪂
              </div>
              <span className="font-title font-extrabold text-xl text-white">
                SKY<span className="text-[#FF9800]">JUMP</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centro de Paracaidismo Tándem de Alto Nivel. Récord absoluto de seguridad y las mejores vistas panorámicas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-title font-bold text-white text-sm mb-4">Secciones</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#experiencia" className="hover:text-[#1E88E5] transition-colors">La Experiencia</a></li>
              <li><a href="#planes" className="hover:text-[#1E88E5] transition-colors">Planes y Tarifas</a></li>
              <li><a href="#reservas" className="hover:text-[#1E88E5] transition-colors">Reservas Online</a></li>
              <li><a href="#galeria" className="hover:text-[#1E88E5] transition-colors">Galería de Fotos</a></li>
              <li><a href="#eventos" className="hover:text-[#1E88E5] transition-colors">Eventos Especiales</a></li>
            </ul>
          </div>

          {/* Safety */}
          <div>
            <h4 className="font-title font-bold text-white text-sm mb-4">Garantía & Seguridad</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sky-200">
                <ShieldCheck className="w-4 h-4 text-[#FF9800]" /> Certificados USPA International
              </div>
              <div className="flex items-center gap-2 text-sky-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Seguro de Aviación ANAC
              </div>
              <p className="text-slate-500 pt-2">
                Equipamiento con reserva y dispositivo de apertura automática AAD.
              </p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-title font-bold text-white text-sm mb-4">Ubicación Pista</h4>
            <p className="text-xs text-slate-400">
              Aeródromo Dropping Zone Alpha<br />
              Ruta Provincial 6 Km 142<br />
              Buenos Aires, Argentina
            </p>
            <div className="mt-4">
              <button
                onClick={scrollToTop}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sky-300 hover:text-white flex items-center gap-2 text-xs font-bold transition-all"
              >
                <ArrowUp className="w-4 h-4" /> Volver Arriba
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © 2026 SkyJump Experience SRL. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1">
            <span>Diseñado con adrenalina y pasión por volar</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
