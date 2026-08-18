import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, PhoneCall, ChevronRight, UserCheck } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenAdmin, isAdminLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Experiencia', href: '#experiencia' },
    { name: 'Planes', href: '#planes' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Opiniones', href: '#opiniones' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header py-3 shadow-md shadow-sky-900/5'
          : 'bg-gradient-to-b from-slate-900/80 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#1E88E5] to-[#FF9800] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
              🪂
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-title font-extrabold text-lg sm:text-xl tracking-tight leading-none ${
                isScrolled ? 'text-[#1B1B1B]' : 'text-white'
              }`}
            >
              SKY<span className="text-[#FF9800]">JUMP</span>
            </span>
            <span
              className={`text-[10px] font-semibold tracking-widest uppercase ${
                isScrolled ? 'text-[#1E88E5]' : 'text-sky-200'
              }`}
            >
              Experience
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#1E88E5] ${
                isScrolled ? 'text-slate-700' : 'text-slate-100 hover:text-[#FF9800]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Panel Link */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isAdminLoggedIn
                ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'
                : isScrolled
                ? 'text-slate-600 hover:bg-slate-200/60'
                : 'text-sky-100 hover:bg-white/10'
            }`}
            title="Panel de Administración"
          >
            <Shield className="w-4 h-4 text-[#FF9800]" />
            <span>{isAdminLoggedIn ? 'Panel Admin Active' : 'Admin'}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5] text-white font-title font-bold text-sm shadow-md hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Reservar Ahora</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-xl ${
            isScrolled ? 'text-slate-800' : 'text-white'
          }`}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card mt-2 mx-4 rounded-2xl p-5 shadow-2xl border border-white/50 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 font-medium py-2 px-3 rounded-lg hover:bg-sky-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm"
              >
                <Shield className="w-4 h-4 text-[#FF9800]" />
                Panel de Administración
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#FF9800] text-white font-bold text-sm shadow-lg"
              >
                <span>Reservar Salto Ahora</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
