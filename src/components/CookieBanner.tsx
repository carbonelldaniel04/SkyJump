import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isAccepted = localStorage.getItem('skyjump_cookies_accepted');
    if (!isAccepted) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('skyjump_cookies_accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-40 glass-card p-5 rounded-2xl shadow-2xl border border-white/80 flex items-center gap-4 text-xs text-slate-700 animate-in slide-in-from-bottom duration-300">
      <Cookie className="w-8 h-8 text-[#FF9800] shrink-0" />
      <div>
        <strong className="block font-title font-bold text-slate-900 mb-0.5">Uso de Cookies</strong>
        <span>Utilizamos cookies para brindarte la mejor experiencia de reserva y seguridad online.</span>
      </div>
      <button
        onClick={handleAccept}
        className="px-4 py-2 rounded-xl bg-[#1E88E5] text-white font-title font-bold text-xs shrink-0 hover:bg-[#1565C0]"
      >
        Aceptar
      </button>
    </div>
  );
};
