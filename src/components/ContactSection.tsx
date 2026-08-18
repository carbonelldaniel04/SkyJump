import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Youtube } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2500);
  };

  return (
    <section id="contacto" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/20">
            Atención Personalizada
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Contactanos & Visitanos en la Pista
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-3">
            Estamos disponibles todos los días para responder tus dudas sobre reservas o visitas en grupo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Card */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 shadow-xl border border-white/80 space-y-6">
            <h3 className="font-title font-bold text-2xl text-[#1B1B1B]">
              Sede Central Dropzone
            </h3>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#1E88E5]/15 text-[#1E88E5] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#1B1B1B] font-title">Aeródromo Dropping Zone Alpha</strong>
                  <span>Ruta Provincial 6 Km 142, Pista 03/21, Buenos Aires, Argentina</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#1E88E5]/15 text-[#1E88E5] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#1B1B1B] font-title">Teléfono / WhatsApp Directo</strong>
                  <span>+54 9 11 5892-0044</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#1E88E5]/15 text-[#1E88E5] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#1B1B1B] font-title">Email de Consultas</strong>
                  <span>info@skyjumpexperience.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#1E88E5]/15 text-[#1E88E5] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-[#1B1B1B] font-title">Horarios de Vuelo</strong>
                  <span>Viernes, Sábados, Domingos y Feriados: 08:30 hs a 19:00 hs</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Síguenos en Redes
              </span>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white shadow-md hover:scale-105 transition-transform"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#1877F2] text-white shadow-md hover:scale-105 transition-transform"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#FF0000] text-white shadow-md hover:scale-105 transition-transform"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 shadow-xl border border-white/80">
            <h3 className="font-title font-bold text-2xl text-[#1B1B1B] mb-2">
              Envianos un Mensaje
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Te responderemos en menos de 1 hora durante horarios de atención.
            </p>

            {sent ? (
              <div className="py-12 text-center text-emerald-600 font-title font-bold text-lg flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <span>¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sofia Rossi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+54 9 11 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje o Consulta *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Quisiera consultar para un grupo de 5 personas en septiembre..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:brightness-110 text-white font-title font-bold text-base shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Consulta</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
