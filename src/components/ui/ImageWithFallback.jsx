import React, { useState, useEffect } from 'react';
import { Box, Sparkles, Headphones, Watch, Gamepad2, Glasses, Speaker, Footprints } from 'lucide-react';

const categoryIcons = {
  sneakers: Footprints,
  headphones: Headphones,
  watches: Watch,
  gaming: Gamepad2,
  sunglasses: Glasses,
  speakers: Speaker,
  handbags: Box,
};

const ImageWithFallback = ({
  src,
  alt = 'Product Image',
  category = 'all',
  className = '',
  containerClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const IconComponent = categoryIcons[category?.toLowerCase()] || Sparkles;

  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#14141e] to-[#0a0a0f] ${containerClassName}`}>
      {/* Background Cyber Tech Grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          onError={(e) => {
            setHasError(true);
          }}
          className={`w-full h-full object-contain p-3.5 transition-transform duration-300 ${className}`}
        />
      ) : (
        /* Attractive Category Fallback */
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center w-full h-full">
          <div className="relative mb-2.5 flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-purple-600/20 blur-md animate-pulse" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-950/80 to-[#1e1b4b] border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-glow-purple">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 mb-0.5">
            {category}
          </span>
          <span className="text-xs text-gray-200 font-medium line-clamp-1 max-w-[90%]">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
