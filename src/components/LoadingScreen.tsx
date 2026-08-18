import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#0e3c6c] via-[#1E88E5] to-[#E3F2FD] text-white p-6 overflow-hidden"
      >
        {/* Sky Clouds Background Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-36 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-48 bg-white rounded-full blur-3xl" />
        </div>

        {/* Parachutist Graphic Descending */}
        <div className="relative mb-8 text-center">
          <motion.div
            animate={{
              y: [-15, 20, -15],
              rotate: [-4, 4, -4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex flex-col items-center"
          >
            {/* Parachute Canopy Visual */}
            <div className="relative w-28 h-16 bg-gradient-to-r from-[#FF9800] via-[#F57C00] to-[#E65100] rounded-t-full shadow-2xl flex items-center justify-center border-b-2 border-amber-300">
              <div className="w-full h-full flex justify-around items-end pb-1 opacity-40">
                <div className="w-1 h-12 bg-white/60 transform -rotate-12" />
                <div className="w-1 h-12 bg-white/60 transform -rotate-6" />
                <div className="w-1 h-12 bg-white/60 transform rotate-6" />
                <div className="w-1 h-12 bg-white/60 transform rotate-12" />
              </div>
            </div>

            {/* Parachutist Skydiver SVG Icon */}
            <div className="relative text-3xl mt-2 animate-bounce">
              🪂
            </div>
          </motion.div>
        </div>

        <h1 className="font-title text-3xl sm:text-4xl font-extrabold tracking-wider text-center text-white mb-2 text-shadow-lg">
          SKYSJUMP EXPERIENCE
        </h1>
        <p className="font-body text-sky-100 text-sm sm:text-base text-center max-w-sm mb-8 font-medium">
          Preparando el salto... Descendiendo entre las nubes
        </p>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 h-3 bg-black/30 rounded-full p-0.5 overflow-hidden border border-white/20 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF9800] to-[#FFB74D] rounded-full shadow-lg"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <span className="mt-3 text-xs font-mono font-semibold text-sky-200">
          {progress}% COMPLETADO
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
