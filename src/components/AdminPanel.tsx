import React, { useState } from 'react';
import { Booking, TimeSlot, GalleryItem, JumpEvent, Review, AdminTab } from '../types';
import {
  Shield,
  Lock,
  Calendar,
  Clock,
  CreditCard,
  Image as ImageIcon,
  Sparkles,
  MessageSquare,
  Search,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['bookingStatus']) => void;
  slots: TimeSlot[];
  onAddSlot: (slot: TimeSlot) => void;
  gallery: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  events: JumpEvent[];
  onAddEvent: (evt: JumpEvent) => void;
  onDeleteEvent: (id: string) => void;
  reviews: Review[];
  onToggleReviewApproved: (id: string) => void;
  onDeleteReview: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateBookingStatus,
  slots,
  onAddSlot,
  gallery,
  onAddGalleryItem,
  onDeleteGalleryItem,
  events,
  onAddEvent,
  onDeleteEvent,
  reviews,
  onToggleReviewApproved,
  onDeleteReview,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('reservas');

  // Reservas Search & Filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('Todas');

  // New Slot Form State
  const [newSlotDate, setNewSlotDate] = useState('2026-08-15');
  const [newSlotTime, setNewSlotTime] = useState('11:00');
  const [newSlotCapacity, setNewSlotCapacity] = useState(4);

  // New Gallery Form State
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState<GalleryItem['category']>('Saltos');
  const [newGalType, setNewGalType] = useState<'photo' | 'video'>('photo');
  const [newGalUrl, setNewGalUrl] = useState('');

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventPrice, setNewEventPrice] = useState(250000);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'skyjump123' || pinInput === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Export Bookings to CSV Excel
  const handleExportExcel = () => {
    const headers = [
      'Codigo',
      'Pasajero',
      'DNI',
      'Email',
      'Telefono',
      'Plan',
      'Fecha',
      'Hora',
      'Total ARS',
      'Sena 30%',
      'Estado Pago',
      'Estado Reserva',
    ];

    const csvRows = [
      headers.join(','),
      ...bookings.map((b) =>
        [
          b.referenceCode,
          `"${b.passengerName}"`,
          b.dni,
          b.email,
          b.phone,
          `"${b.planTitle}"`,
          b.date,
          b.timeSlot,
          b.totalPrice,
          b.depositAmount,
          b.paymentStatus,
          b.bookingStatus,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkyJump_Reservas_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.passengerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus =
      bookingStatusFilter === 'Todas' ? true : b.bookingStatus === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  // Analytics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalDeposits = bookings.reduce((sum, b) => sum + b.depositAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl glass-card-dark bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-white my-8 min-h-[80vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-6 bg-slate-950 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#FF9800]/20 text-[#FF9800]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-title font-extrabold text-xl text-white">
                Panel de Administración SkyJump
              </h2>
              <p className="text-xs text-sky-200">
                Gestión Integral de Reservas, Calendario, Pagos, Galería y Eventos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* PIN Security View */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6 border border-sky-500/20">
              <Lock className="w-8 h-8 text-[#FF9800]" />
            </div>

            <h3 className="font-title font-bold text-2xl mb-2 text-white">
              Acceso Restringido Admin
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Ingresá la clave de administrador para acceder a las herramientas de gestión (Clave demo: <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono">skyjump123</code>)
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Ingresar Clave PIN..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-center font-mono text-lg tracking-widest outline-none focus:border-[#FF9800]"
              />

              {pinError && (
                <div className="text-xs text-rose-400 font-semibold flex items-center justify-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Clave incorrecta. Probá "skyjump123".
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#FF9800] text-white font-title font-bold text-sm shadow-lg hover:brightness-110"
              >
                Ingresar al Panel
              </button>

              <button
                type="button"
                onClick={() => {
                  setPinInput('skyjump123');
                  setIsAuthenticated(true);
                }}
                className="text-xs text-slate-400 hover:text-sky-300 underline pt-2"
              >
                (Atajo de demostración: Auto-Completar PIN)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-64 bg-slate-950 p-4 border-r border-white/10 flex lg:flex-col gap-2 overflow-x-auto">
              {[
                { id: 'reservas', label: 'Reservas', icon: Calendar, badge: bookings.length },
                { id: 'calendario', label: 'Calendario & Cupos', icon: Clock },
                { id: 'pagos', label: 'Pagos & Señas', icon: CreditCard },
                { id: 'galeria', label: 'Galería', icon: ImageIcon },
                { id: 'eventos', label: 'Eventos', icon: Sparkles },
                { id: 'opiniones', label: 'Reseñas', icon: MessageSquare, badge: reviews.length },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-title text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1E88E5] text-white shadow-lg'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="mt-auto pt-4 border-t border-white/10 hidden lg:block">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" /> Bloquear Panel
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
              {/* TAB 1: RESERVAS */}
              {activeTab === 'reservas' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-title font-bold text-xl text-white">
                      Gestión de Reservas ({bookings.length})
                    </h3>

                    <button
                      onClick={handleExportExcel}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-title text-xs font-bold flex items-center gap-2 shadow-md"
                    >
                      <Download className="w-4 h-4" /> Exportar Excel / CSV
                    </button>
                  </div>

                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por pasajero, código SKJ, email..."
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none"
                      />
                    </div>

                    <select
                      value={bookingStatusFilter}
                      onChange={(e) => setBookingStatusFilter(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none"
                    >
                      <option value="Todas">Todos los Estados</option>
                      <option value="Confirmada">Confirmadas</option>
                      <option value="Pendiente">Pendientes</option>
                      <option value="Cancelada">Canceladas</option>
                    </select>
                  </div>

                  {/* Bookings Table */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-800 text-slate-300 font-title uppercase">
                        <tr>
                          <th className="p-3">Código</th>
                          <th className="p-3">Pasajero</th>
                          <th className="p-3">Plan</th>
                          <th className="p-3">Fecha & Hora</th>
                          <th className="p-3">Total / Seña</th>
                          <th className="p-3">Estado</th>
                          <th className="p-3">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredBookings.map((bk) => (
                          <tr key={bk.id} className="hover:bg-white/5">
                            <td className="p-3 font-mono font-bold text-[#FF9800]">
                              {bk.referenceCode}
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-white">{bk.passengerName}</div>
                              <div className="text-[10px] text-slate-400">{bk.dni} • {bk.email}</div>
                            </td>
                            <td className="p-3 text-slate-300">{bk.planTitle}</td>
                            <td className="p-3 text-sky-200">
                              {bk.date} a las {bk.timeSlot}hs
                            </td>
                            <td className="p-3">
                              <div>{formatMoney(bk.totalPrice)}</div>
                              <div className="text-[10px] text-emerald-400 font-semibold">
                                Seña 30%: {formatMoney(bk.depositAmount)}
                              </div>
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                  bk.bookingStatus === 'Confirmada'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : bk.bookingStatus === 'Cancelada'
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                {bk.bookingStatus}
                              </span>
                            </td>
                            <td className="p-3 flex items-center gap-1.5">
                              {bk.bookingStatus !== 'Confirmada' && (
                                <button
                                  onClick={() => onUpdateBookingStatus(bk.id, 'Confirmada')}
                                  title="Aceptar / Confirmar"
                                  className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              {bk.bookingStatus !== 'Cancelada' && (
                                <button
                                  onClick={() => onUpdateBookingStatus(bk.id, 'Cancelada')}
                                  title="Cancelar Reserva"
                                  className="p-1.5 rounded-lg bg-rose-600/30 text-rose-300 hover:bg-rose-600/50"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: CALENDARIO & CUPOS */}
              {activeTab === 'calendario' && (
                <div className="space-y-6">
                  <h3 className="font-title font-bold text-xl text-white">
                    Configuración de Calendario y Cupos por Horario
                  </h3>

                  {/* Add Slot Form */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4">
                    <h4 className="font-title font-bold text-sm text-[#FF9800]">
                      Crear Nuevo Turno o Horario de Salto
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Fecha</label>
                        <input
                          type="date"
                          value={newSlotDate}
                          onChange={(e) => setNewSlotDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Horario</label>
                        <input
                          type="time"
                          value={newSlotTime}
                          onChange={(e) => setNewSlotTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Cupos Máximos</label>
                        <input
                          type="number"
                          value={newSlotCapacity}
                          onChange={(e) => setNewSlotCapacity(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs outline-none"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => {
                            onAddSlot({
                              id: `s-${Date.now()}`,
                              date: newSlotDate,
                              time: newSlotTime,
                              maxCapacity: newSlotCapacity,
                              bookedCount: 0,
                            });
                            alert('Turno agregado con éxito');
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#1E88E5] hover:bg-[#1565C0] text-white font-title text-xs font-bold"
                        >
                          + Agregar Turno
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Existing Slots List */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {slots.map((s) => (
                      <div key={s.id} className="p-3 rounded-2xl bg-slate-950 border border-white/10 text-xs">
                        <div className="font-bold text-sky-200">{s.date}</div>
                        <div className="font-title font-black text-base text-[#FF9800]">{s.time} hs</div>
                        <div className="text-slate-400 mt-1">
                          Ocupación: {s.bookedCount} / {s.maxCapacity} personas
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PAGOS & SEÑAS */}
              {activeTab === 'pagos' && (
                <div className="space-y-6">
                  <h3 className="font-title font-bold text-xl text-white">
                    Balance Financiero de Señas (30%) y Facturación
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-emerald-500/30">
                      <span className="text-xs text-slate-400 font-bold uppercase">Recaudación Señas 30%</span>
                      <div className="font-title font-black text-3xl text-emerald-400 mt-1">
                        {formatMoney(totalDeposits)}
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-sky-500/30">
                      <span className="text-xs text-slate-400 font-bold uppercase">Facturación Total Proyectada</span>
                      <div className="font-title font-black text-3xl text-sky-400 mt-1">
                        {formatMoney(totalRevenue)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex justify-between items-center text-xs"
                      >
                        <div>
                          <strong className="text-white block">{b.passengerName} ({b.referenceCode})</strong>
                          <span className="text-slate-400">{b.paymentMethod} • {b.date}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">Seña 30%: {formatMoney(b.depositAmount)}</div>
                          <div className="text-slate-400">Total: {formatMoney(b.totalPrice)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GALERÍA */}
              {activeTab === 'galeria' && (
                <div className="space-y-6">
                  <h3 className="font-title font-bold text-xl text-white">
                    Administrar Galería Multimedia
                  </h3>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                    <h4 className="font-title font-bold text-sm text-[#FF9800]">Agregar Foto / Video</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Título de la Foto..."
                        value={newGalTitle}
                        onChange={(e) => setNewGalTitle(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700"
                      />
                      <input
                        type="text"
                        placeholder="URL de la Imagen..."
                        value={newGalUrl}
                        onChange={(e) => setNewGalUrl(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-white border border-slate-700"
                      />
                      <button
                        onClick={() => {
                          if (!newGalTitle || !newGalUrl) return;
                          onAddGalleryItem({
                            id: `gal-${Date.now()}`,
                            title: newGalTitle,
                            category: newGalCategory,
                            type: newGalType,
                            url: newGalUrl,
                          });
                          setNewGalTitle('');
                          setNewGalUrl('');
                        }}
                        className="py-2 rounded-xl bg-[#1E88E5] text-white font-bold text-xs"
                      >
                        + Publicar Foto
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative group rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-white/10">
                        <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => onDeleteGalleryItem(g.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: EVENTOS */}
              {activeTab === 'eventos' && (
                <div className="space-y-6">
                  <h3 className="font-title font-bold text-xl text-white">
                    Gestión de Eventos Especiales
                  </h3>

                  <div className="space-y-3">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-white text-sm block">{evt.title}</strong>
                          <span className="text-slate-400">{evt.date} • {evt.location}</span>
                        </div>
                        <button
                          onClick={() => onDeleteEvent(evt.id)}
                          className="p-2 rounded-xl bg-rose-600/30 text-rose-300 hover:bg-rose-600/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: OPINIONES */}
              {activeTab === 'opiniones' && (
                <div className="space-y-6">
                  <h3 className="font-title font-bold text-xl text-white">
                    Aprobar o Eliminar Reseñas de Clientes
                  </h3>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-white text-sm block">{rev.author} ({'★'.repeat(rev.rating)})</strong>
                          <p className="text-slate-300 mt-1 italic">"{rev.comment}"</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleReviewApproved(rev.id)}
                            className={`px-3 py-1.5 rounded-xl font-bold ${
                              rev.isApproved ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                            }`}
                          >
                            {rev.isApproved ? 'Aprobada' : 'Aprobar'}
                          </button>
                          <button
                            onClick={() => onDeleteReview(rev.id)}
                            className="p-2 rounded-xl bg-rose-600/30 text-rose-300 hover:bg-rose-600/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
