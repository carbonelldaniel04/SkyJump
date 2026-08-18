import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '5491158920044';
  const text = encodeURIComponent('¡Hola SkyJump Experience! Quiero consultar por disponibilidad para un salto en paracaídas.');
  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 font-title font-bold text-xs transition-all duration-300">
        ¿Consultas por WhatsApp?
      </span>
    </a>
  );
};
