import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ImageWithFallback({ src, alt, className = '', style = {}, fallbackSrc = '/assets/fallback_placeholder.png' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const finalSrc = error ? fallbackSrc : (src || fallbackSrc);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }} className={className}>
      {/* Shimmer Placeholder */}
      {loading && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
            backgroundSize: '200% 100%',
            zIndex: 1,
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
        />
      )}
      
      {/* Actual Image */}
      <motion.img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}
