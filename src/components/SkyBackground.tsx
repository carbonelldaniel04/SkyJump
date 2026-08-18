import React from 'react';

export const SkyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#1E88E5]/30 via-[#E3F2FD] to-[#BBDEFB]/40">
      {/* Animated Clouds Layer 1 */}
      <div 
        className="absolute top-10 left-0 w-[200%] h-64 opacity-40 animate-cloud-slow"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%),
                            radial-gradient(circle at 70% 40%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%)`,
        }}
      />

      {/* Animated Clouds Layer 2 */}
      <div 
        className="absolute top-1/3 left-[-20%] w-[180%] h-80 opacity-30 animate-cloud-fast"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />

      {/* Subtle Sun Glow Top Right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF9800]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Wind/Bird Silhouette Accent Particles */}
      <div className="absolute top-1/4 right-[15%] w-3 h-3 bg-white/60 rounded-full blur-[1px] animate-bounce duration-1000" style={{ animationDuration: '4s' }} />
      <div className="absolute top-2/3 left-[10%] w-2 h-2 bg-white/50 rounded-full blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
    </div>
  );
};
