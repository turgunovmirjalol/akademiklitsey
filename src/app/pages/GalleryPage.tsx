import { Skeleton } from '../components/ui/skeleton';
import { ChevronRight, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { galleryService } from '../services/galleryService';
import { Album } from '../types';
import { SEO } from '../components/layout/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function GalleryPage() {
  const { t, i18n } = useTranslation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const currentLang = i18n.language || 'uz';

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await galleryService.getAllAlbums();
        const activeAlbums = data.results
          .filter(album => album.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
        setAlbums(activeAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.photos')} 
        description={t('home.heroDesc')}
      />
      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-gray-500 hover:text-[#0d89b1] transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>{t('nav.home')}</span>
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.photos')}</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
          >
            {t('nav.photos').toUpperCase()}
          </motion.h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))
            ) : (
              albums.map((album, index) => {
                const translation = galleryService.getTranslation(album, currentLang);
                
                return (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    <ImageWithFallback
                      src={album.cover_image}
                      alt={translation.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

