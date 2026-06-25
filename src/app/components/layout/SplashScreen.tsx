import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../hooks/useSettings';

const SPLASH_DURATION_MS = 1500;

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { settings, loading: settingsLoading } = useSettings();
  const [imgState, setImgState] = useState<'pending' | 'loaded' | 'error'>('pending');
  const [visible, setVisible] = useState(true);

  // Fixed, network-independent duration — never blocked by a slow logo fetch.
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const logoUrl = !settingsLoading ? settings.logo : '';
  const showImage = !!logoUrl && imgState !== 'error';

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0d89b1] to-[#0a6d8f] overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-44 h-44 md:w-56 md:h-56 flex items-center justify-center overflow-hidden"
            >
              {showImage && (
                <img
                  src={logoUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  onLoad={() => setImgState('loaded')}
                  onError={() => setImgState('error')}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <p className="text-white font-black text-sm md:text-base uppercase tracking-[0.3em]">
                FDTU 1-son Akademik Litseyi
              </p>
            </motion.div>

            <div className="flex gap-2">
              <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-white/80 rounded-full animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
