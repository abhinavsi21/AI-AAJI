import React from 'react';

interface AiOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: 'idle' | 'requesting-permission' | 'connecting' | 'connected' | 'listening' | 'speaking' | 'interrupted' | 'error';
  audioLevel?: number; // 0 to 1
  className?: string;
}

export const AiOrb: React.FC<AiOrbProps> = ({
  size = 'md',
  state = 'idle',
  audioLevel = 0,
  className = '',
}) => {
  // Dimension mappings
  const sizeMap = {
    sm: { core: 'w-16 h-16', outer: 'w-24 h-24', ring1: 'w-20 h-20', ring2: 'w-28 h-28' },
    md: { core: 'w-32 h-32', outer: 'w-48 h-48', ring1: 'w-40 h-40', ring2: 'w-52 h-52' },
    lg: { core: 'w-48 h-48', outer: 'w-72 h-72', ring1: 'w-60 h-60', ring2: 'w-80 h-80' },
    xl: { core: 'w-64 h-64', outer: 'w-96 h-96', ring1: 'w-80 h-80', ring2: 'w-[420px] h-[420px]' },
  };

  const currentSize = sizeMap[size];

  // Dynamic scale from audio level
  const dynamicScale = state === 'speaking' || state === 'listening' 
    ? 1 + audioLevel * 0.25 
    : state === 'connecting' 
    ? 1.05 
    : 1;

  // Glow intensity based on state
  const glowColor =
    state === 'error'
      ? 'rgba(255, 107, 129, 0.4)'
      : state === 'speaking'
      ? 'rgba(53, 217, 242, 0.5)'
      : state === 'listening'
      ? 'rgba(128, 101, 255, 0.6)'
      : 'rgba(128, 101, 255, 0.35)';

  return (
    <div className={`orb-container relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background glow */}
      <div
        className={`ai-orb-glow ${currentSize.outer} absolute transition-all duration-300`}
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(53, 217, 242, 0.15) 50%, transparent 75%)`,
          transform: `scale(${dynamicScale * 1.1})`,
        }}
      />

      {/* Outer decorative orbit ring */}
      <div
        className={`ai-orb-ring-secondary ${currentSize.ring2} opacity-40`}
        style={{
          borderColor: state === 'error' ? '#FF6B81' : state === 'speaking' ? '#35D9F2' : '#8065FF',
        }}
      />

      {/* Inner orbit ring */}
      <div
        className={`ai-orb-ring ${currentSize.ring1} opacity-60`}
        style={{
          borderColor: state === 'speaking' ? '#35D9F2' : '#B8A6FF',
        }}
      />

      {/* Signature Animated Core */}
      <div
        className={`ai-orb-core ${currentSize.core} relative flex items-center justify-center cursor-pointer`}
        style={{
          transform: `scale(${dynamicScale})`,
          boxShadow: `0 0 ${30 + audioLevel * 60}px ${glowColor}, 0 0 ${60 + audioLevel * 80}px rgba(53, 217, 242, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.4)`,
        }}
      >
        {/* Internal refractive highlight */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/40 pointer-events-none" />

        {/* Pulse waveform inside orb when active */}
        {(state === 'speaking' || state === 'listening') && (
          <div className="flex items-center gap-1.5 z-10">
            <span
              className="w-1 bg-white/80 rounded-full transition-all duration-75"
              style={{ height: `${12 + audioLevel * 32}px` }}
            />
            <span
              className="w-1 bg-[#35D9F2] rounded-full transition-all duration-75"
              style={{ height: `${18 + audioLevel * 48}px` }}
            />
            <span
              className="w-1 bg-white rounded-full transition-all duration-75"
              style={{ height: `${24 + audioLevel * 56}px` }}
            />
            <span
              className="w-1 bg-[#B8A6FF] rounded-full transition-all duration-75"
              style={{ height: `${18 + audioLevel * 48}px` }}
            />
            <span
              className="w-1 bg-white/80 rounded-full transition-all duration-75"
              style={{ height: `${12 + audioLevel * 32}px` }}
            />
          </div>
        )}

        {state === 'connecting' && (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin z-10" />
        )}
      </div>
    </div>
  );
};
