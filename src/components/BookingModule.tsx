import React, { useState } from 'react';
import { PLANS, EXTRA_SERVICES, INITIAL_SLOTS } from '../data/mockData';
import { Plan, TimeSlot, Booking } from '../types';
import { Calendar, Clock, Users, ShieldCheck, CreditCard, QrCode, Building2, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModuleProps {
  selectedPlanInitial?: Plan | null;
  onBookingSuccess: (newBooking: Booking) => void;
}

export const BookingModule: React.FC<BookingModuleProps> = ({ selectedPlanInitial, onBookingSuccess }) => {
  // Step 1: Plan & Date/Time | Step 2: Passenger Info & Extras | Step 3: Payment (30% deposit) | Step 4: Voucher Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedPlan, setSelectedPlan] = useState<Plan>(selectedPlanInitial || PLANS[1]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-01');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(INITIAL_SLOTS[0]);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Personal Info State
  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dni, setDni] = useState('');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [notes, setNotes] = useState('');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'Mercado Pago' | 'Tarjeta de Crédito' | 'Transferencia Bancaria'>('Mercado Pago');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Filter slots for selected date
  const availableSlots = INITIAL_SLOTS.filter((s) => s.date === selectedDate);

  // Calculate pricing
  const basePricePerPerson = selectedPlan.price;
  const extrasTotalPerPerson = EXTRA_SERVICES.filter((e) => selectedExtras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0
  );
  const totalPrice = (basePricePerPerson + extrasTotalPerPerson) * passengerCount;
  const depositAmount = Math.round(totalPrice * 0.3); // 30% advance deposit

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleNextToStep2 = () => {
    if (!selectedSlot) return;
    setStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !email || !phone || !dni) {
      alert('Por favor completa todos los campos requeridos (*)');
      return;
    }
    setStep(3);
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const refCode = `SKJ-${Math.floor(1000 + Math.random() * 9000)}`;
      const extrasNames = EXTRA_SERVICES.filter((e) => selectedExtras.includes(e.id)).map((e) => e.name);

      const newBk: Booking = {
        id: `bk-${Date.now()}`,
        referenceCode: refCode,
        planId: selectedPlan.id,
        planTitle: selectedPlan.title,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        passengerName,
        email,
        phone,
        dni,
        weightKg,
        passengerCount,
        selectedExtras: extrasNames,
        totalPrice,
        depositAmount,
        paymentMethod,
        paymentStatus: 'Seña Pagada 30%',
        bookingStatus: 'Confirmada',
        notes,
        createdAt: new Date().toISOString(),
      };

      setCompletedBooking(newBk);
      setIsProcessingPayment(false);
      setStep(4);
      onBookingSuccess(newBk);
    }, 1800);
  };

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="reservas" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/30">
            Reserva Directa Online
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Reservá tu salto en paracaídas
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-3">
            Elegí fecha, turno e instructores. Aboná el 30% de seña para congelar el precio y el resto el día del salto.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/90 relative overflow-hidden">
          {/* Step Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center text-xs font-title font-bold text-slate-500 mb-3 px-2">
              <span className={step >= 1 ? 'text-[#1E88E5]' : ''}>1. PLAN Y FECHA</span>
              <span className={step >= 2 ? 'text-[#1E88E5]' : ''}>2. PASAJERO Y EXTRAS</span>
              <span className={step >= 3 ? 'text-[#1E88E5]' : ''}>3. SEÑA DEL 30%</span>
              <span className={step >= 4 ? 'text-emerald-600' : ''}>4. CONFIRMACIÓN</span>
            </div>
            <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#1E88E5] to-[#FF9800] rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Plan, Date, Time & Passenger Count */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-8">
                {/* Select Plan */}
                <div>
                  <label className="block font-title font-bold text-[#1B1B1B] text-base mb-3">
                    1. Seleccioná tu Plan de Salto
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          selectedPlan.id === plan.id
                            ? 'border-[#1E88E5] bg-sky-50 shadow-md scale-[1.02]'
                            : 'border-slate-200 hover:border-sky-300 bg-white/60'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-title font-bold text-sm text-[#1B1B1B]">
                            {plan.title}
                          </span>
                          {plan.isPopular && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FF9800] text-slate-900 text-[10px] font-bold">
                              ★ Más Vendido
                            </span>
                          )}
                        </div>
                        <div className="font-title font-extrabold text-base text-[#1E88E5]">
                          {formatMoney(plan.price)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-title font-bold text-[#1B1B1B] text-base mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#1E88E5]" />
                      2. Seleccioná la Fecha
                    </label>
                    <div className="flex gap-2 mb-3">
                      {['2026-08-01', '2026-08-02', '2026-08-08', '2026-08-09'].map((dateStr) => {
                        const dateObj = new Date(dateStr + 'T00:00:00');
                        const dayName = dateObj.toLocaleDateString('es-AR', { weekday: 'short' });
                        const dayNum = dateObj.getDate();
                        const isSelected = selectedDate === dateStr;

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setSelectedDate(dateStr)}
                            className={`flex-1 py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                              isSelected
                                ? 'border-[#1E88E5] bg-[#1E88E5] text-white shadow-md'
                                : 'border-slate-200 bg-white/80 text-slate-700 hover:border-sky-300'
                            }`}
                          >
                            <div className="text-xs uppercase font-bold opacity-80">{dayName}</div>
                            <div className="font-title font-extrabold text-lg">{dayNum} Ago</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Passenger Count */}
                  <div>
                    <label className="block font-title font-bold text-[#1B1B1B] text-base mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#1E88E5]" />
                      3. Cantidad de Personas
                    </label>
                    <div className="flex items-center gap-4 bg-white/80 p-2 rounded-2xl border border-slate-200">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPassengerCount(num)}
                          className={`flex-1 py-3 rounded-xl font-title font-bold text-sm transition-all ${
                            passengerCount === num
                              ? 'bg-[#1E88E5] text-white shadow-md'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {num} {num === 1 ? 'Persona' : 'Personas'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Slots Selection */}
                <div>
                  <label className="block font-title font-bold text-[#1B1B1B] text-base mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#1E88E5]" />
                    4. Horarios Disponibles para el {selectedDate}
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => {
                      const slotsLeft = slot.maxCapacity - slot.bookedCount;
                      const isFull = slotsLeft <= 0 || slot.isBlocked;
                      const isSelected = selectedSlot.id === slot.id;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isFull}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all ${
                            isFull
                              ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                              : isSelected
                              ? 'border-[#FF9800] bg-[#FF9800] text-slate-900 shadow-md font-bold'
                              : 'border-slate-200 bg-white/90 hover:border-amber-400 text-slate-800'
                          }`}
                        >
                          <div className="font-title font-extrabold text-base">{slot.time} hs</div>
                          <div className="text-[11px] mt-0.5">
                            {isFull ? 'Agotado' : `${slotsLeft} cupos`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary bar */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Subtotal Estimado:</span>
                    <div className="font-title font-extrabold text-2xl text-[#1E88E5]">
                      {formatMoney(totalPrice)}{' '}
                      <span className="text-xs font-normal text-slate-600">
                        (Seña 30%: {formatMoney(depositAmount)})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleNextToStep2}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:brightness-110 text-white font-title font-bold text-base shadow-xl"
                  >
                    Continuar a Datos & Extras →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Passenger Details & Extra Add-ons */}
          {step === 2 && (
            <motion.form initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleNextToStep3}>
              <div className="space-y-6">
                <h3 className="font-title font-bold text-xl text-[#1B1B1B]">
                  Datos del Pasajero Titular
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Camila Rodriguez"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">DNI / Pasaporte *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 38.452.109"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email (para recibir Voucher) *</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+54 9 11 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Peso Aproximado (kg) *</label>
                    <input
                      type="number"
                      min={40}
                      max={110}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Notas especiales (opcional)</label>
                    <input
                      type="text"
                      placeholder="Festejo de cumpleaños, sorpresa, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#1E88E5] outline-none bg-white text-sm"
                    />
                  </div>
                </div>

                {/* Extras Add-ons */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-title font-bold text-base text-[#1B1B1B] mb-3">
                    Sumar Opciones Extras
                  </h4>
                  <div className="space-y-3">
                    {EXTRA_SERVICES.map((extra) => {
                      const isChecked = selectedExtras.includes(extra.id);

                      return (
                        <label
                          key={extra.id}
                          className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'border-[#FF9800] bg-amber-50/60'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleExtra(extra.id)}
                              className="w-5 h-5 accent-[#FF9800] rounded"
                            />
                            <div>
                              <div className="font-title font-bold text-sm text-[#1B1B1B]">{extra.name}</div>
                              <div className="text-xs text-slate-500">{extra.description}</div>
                            </div>
                          </div>
                          <span className="font-title font-bold text-sm text-[#1E88E5]">
                            +{formatMoney(extra.price)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm"
                  >
                    ← Volver
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:brightness-110 text-white font-title font-bold text-base shadow-xl"
                  >
                    Proceder al Pago de Seña (30%) →
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {/* STEP 3: 30% Deposit Payment */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <div className="space-y-6">
                <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="font-title font-bold text-lg text-sky-900">
                      Resumen del Pago Anticipado
                    </h4>
                    <p className="text-xs text-sky-700">
                      Reserva para el <strong className="font-semibold">{selectedDate}</strong> a las{' '}
                      <strong className="font-semibold">{selectedSlot.time}hs</strong> ({passengerCount} {passengerCount === 1 ? 'persona' : 'personas'}).
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium">Total Experiencia: {formatMoney(totalPrice)}</div>
                    <div className="font-title font-black text-2xl text-[#1E88E5]">
                      Seña 30%: {formatMoney(depositAmount)}
                    </div>
                  </div>
                </div>

                <h3 className="font-title font-bold text-lg text-[#1B1B1B]">
                  Elegí tu Método de Pago Seguro
                </h3>

                {/* Payment Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Mercado Pago')}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'Mercado Pago'
                        ? 'border-[#009EE3] bg-cyan-50/60 shadow-md font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <QrCode className="w-8 h-8 text-[#009EE3]" />
                    <span className="text-sm font-title">Mercado Pago / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Tarjeta de Crédito')}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'Tarjeta de Crédito'
                        ? 'border-[#1E88E5] bg-sky-50 shadow-md font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-8 h-8 text-[#1E88E5]" />
                    <span className="text-sm font-title">Tarjeta Crédito / Débito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Transferencia Bancaria')}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'Transferencia Bancaria'
                        ? 'border-[#FF9800] bg-amber-50 shadow-md font-bold'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Building2 className="w-8 h-8 text-[#FF9800]" />
                    <span className="text-sm font-title">Transferencia CBU</span>
                  </button>
                </div>

                {/* Payment Method Details Simulation */}
                {paymentMethod === 'Mercado Pago' && (
                  <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                    <div className="w-32 h-32 bg-slate-900 text-white mx-auto rounded-xl flex items-center justify-center font-mono text-xs">
                      [ CÓDIGO QR MP ]
                    </div>
                    <p className="text-xs text-slate-600">
                      Escaneá desde tu App de Mercado Pago o Banco para acreditar la seña de{' '}
                      <strong>{formatMoney(depositAmount)}</strong>.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Transferencia Bancaria' && (
                  <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-slate-700 space-y-1.5">
                    <div><strong>Banco:</strong> Banco Galicia</div>
                    <div><strong>CBU:</strong> 0070123920000012345678</div>
                    <div><strong>Alias:</strong> SKYJUMP.EXPERIENCE.PARACAIDAS</div>
                    <div><strong>Titular:</strong> SkyJump SRL (CUIT: 30-71829304-9)</div>
                    <p className="pt-2 text-slate-500 font-medium">
                      Recordá enviar el comprobante de transferencia por WhatsApp.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Tarjeta de Crédito' && (
                  <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        placeholder="4509 •••• •••• 8812"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Vencimiento</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm"
                  >
                    ← Modificar Datos
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isProcessingPayment}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] hover:brightness-110 text-white font-title font-bold text-base shadow-xl flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <span>Procesando Seña...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Confirmar y Abonar {formatMoney(depositAmount)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success & Voucher Download */}
          {step === 4 && completedBooking && (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-4xl shadow-xl">
                  ✓
                </div>

                <h3 className="font-title font-extrabold text-3xl text-emerald-700">
                  ¡Reserva Confirmada con Éxito!
                </h3>

                <p className="text-slate-600 text-base max-w-md mx-auto">
                  Hemos enviado el comprobante oficial y recordatorio a <strong>{completedBooking.email}</strong>.
                </p>

                {/* Printable Ticket Box */}
                <div className="max-w-xl mx-auto bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <div className="text-xs text-sky-300 uppercase font-bold tracking-widest">
                        Voucher de Reserva
                      </div>
                      <div className="font-title font-black text-2xl text-[#FF9800]">
                        {completedBooking.referenceCode}
                      </div>
                    </div>
                    <div className="p-2 bg-white text-slate-900 rounded-xl font-mono text-[10px]">
                      [ QR VALIDADOR ]
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-slate-400 block">Titular:</span>
                      <strong className="text-white">{completedBooking.passengerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">DNI:</span>
                      <strong className="text-white">{completedBooking.dni}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Fecha y Hora:</span>
                      <strong className="text-amber-300">
                        {completedBooking.date} a las {completedBooking.timeSlot}hs
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Plan Reservado:</span>
                      <strong className="text-white">{completedBooking.planTitle}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-400">Seña Abonada (30%):</span>{' '}
                      <strong className="text-emerald-400">{formatMoney(completedBooking.depositAmount)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Saldo a Pagar en Pista:</span>{' '}
                      <strong className="text-amber-300">{formatMoney(completedBooking.totalPrice - completedBooking.depositAmount)}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 rounded-xl bg-slate-800 text-white font-title font-bold text-sm hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Imprimir / Descargar Voucher PDF
                  </button>

                  <button
                    onClick={() => {
                      setStep(1);
                      setCompletedBooking(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#1E88E5] text-white font-title font-bold text-sm hover:bg-[#1565C0]"
                  >
                    Realizar Otra Reserva
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
