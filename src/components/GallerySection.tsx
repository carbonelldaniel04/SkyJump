import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Play, X, Eye, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const categories = ['Todos', 'Saltos', 'Caída Libre', 'Aterrizajes', 'Clientes', 'Paisajes'];

  const filteredItems =
    activeCategory === 'Todos'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="galeria" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-4 py-1.5 rounded-full bg-[#1E88E5]/15 text-[#1E88E5] text-xs font-bold uppercase tracking-widest inline-block mb-3 border border-[#1E88E5]/20">
            Galería Fotográfica & Video HD
          </span>
          <h2 className="font-title text-3xl sm:text-5xl font-extrabold text-[#1B1B1B] tracking-tight">
            Reviví las emociones en el aire
          </h2>
          <p className="font-body text-slate-600 text-base sm:text-lg mt-3">
            Explorá fotos y videos tomados por nuestros camarógrafos paracaidistas profesionales.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl font-title font-semibold text-xs sm:text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] text-white shadow-lg scale-105'
                  : 'glass-card text-slate-700 hover:bg-white/90'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-3xl overflow-hidden glass-card cursor-pointer shadow-lg hover:shadow-2xl transition-all border border-white/60 aspect-[4/3] bg-slate-900"
            >
              <img
                src={item.url}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Video Play Overlay Badge */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#FF9800] text-slate-900 flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Hover Dark Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#FF9800] mb-1">
                  {item.category}
                </span>
                <h4 className="font-title font-bold text-base leading-snug">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 text-white"
              >
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {selectedMedia.type === 'video' ? (
                  <div className="aspect-video w-full bg-black">
                    <video
                      controls
                      autoPlay
                      src={selectedMedia.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-slate-950">
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      referrerPolicy="no-referrer"
                      className="max-h-[75vh] w-auto object-contain"
                    />
                  </div>
                )}

                <div className="p-6 bg-slate-900 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-[#FF9800] uppercase tracking-wider">
                      {selectedMedia.category}
                    </span>
                    <h3 className="font-title font-bold text-xl text-white mt-0.5">
                      {selectedMedia.title}
                    </h3>
                    {selectedMedia.description && (
                      <p className="text-sm text-slate-300 mt-1">{selectedMedia.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
