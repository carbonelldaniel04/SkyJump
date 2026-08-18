import React, { useState } from 'react';
import { TEAM_IMAGE } from '../data/mockData';
import { Review } from '../types';
import { Star, MessageSquarePlus, Quote, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (newReview: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      comment,
      date: 'Hace un momento',
      isApproved: true, // Auto-approve for instant user feedback
      location: location || 'Cliente Verificado',
      photoUrl: TEAM_IMAGE,
    };

    onAddReview(newRev);
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setAuthor('');
      setComment('');
      setLocation('');
    }, 1500);
  };

  return (
    <section id="opiniones" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/20">
            Experiencias Reales
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Lo que dicen nuestros valientes paracaidistas
          </h2>

          {/* Rating Badge */}
          <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card border border-white/80 shadow-md">
            <div className="flex text-amber-400 gap-1 text-xl">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
              ))}
            </div>
            <span className="font-title font-extrabold text-xl text-[#1B1B1B]">5.0 / 5.0</span>
            <span className="text-xs text-slate-500 font-medium">({reviews.length}+ reseñas verificadas)</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {approvedReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 shadow-lg border border-white/80 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-[#1E88E5]/30 mb-3" />
                <p className="font-body text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={rev.photoUrl || TEAM_IMAGE}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#1E88E5]"
                />
                <div>
                  <div className="font-title font-bold text-sm text-[#1B1B1B]">{rev.author}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{rev.location} • {rev.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action button to open Review Form */}
        <div className="text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:brightness-110 text-white font-title font-bold text-sm shadow-xl inline-flex items-center gap-2"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span>¿Ya saltaste? Dejá tu Opinión</span>
          </button>
        </div>

        {/* Review Submission Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-lg w-full glass-card bg-white p-8 rounded-3xl shadow-2xl border border-white"
              >
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-title font-bold text-2xl text-[#1B1B1B] mb-2">
                  Dejá tu Opinión sobre SkyJump
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Tu comentario ayuda a futuros valientes a dar el primer salto.
                </p>

                {submittedMessage ? (
                  <div className="py-8 text-center text-emerald-600 font-title font-bold text-lg flex flex-col items-center gap-2">
                    <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
                    <span>¡Gracias por compartir tu experiencia!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tu Nombre *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Lucas B."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad / Provincia</label>
                      <input
                        type="text"
                        placeholder="Ej. Buenos Aires"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Calificación (Estrellas)</label>
                      <div className="flex gap-2 text-2xl cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className={star <= rating ? 'text-amber-400' : 'text-slate-300'}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tu Comentario *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Contanos qué sentiste en la caída libre..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#1E88E5]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1E88E5] to-[#FF9800] text-white font-title font-bold text-sm shadow-lg hover:brightness-110"
                    >
                      Publicar Opinión
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
