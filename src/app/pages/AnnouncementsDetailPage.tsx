import { useParams, Link } from 'react-router';
import { Megaphone, ArrowLeft, Loader2, Share2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { announcementService } from '../services/announcementService';
import { Announcement } from '../types';
import { motion } from 'framer-motion';
import { SEO } from '../components/layout/SEO';
import { Helmet } from 'react-helmet-async';

export function AnnouncementsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!slug) return;
      try {
        const data = await announcementService.getAnnouncementBySlug(slug);
        setAnnouncement(data);
      } catch (error) {
        console.error('Error fetching announcement detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-12 h-12 text-[#0d89b1] animate-spin" />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 text-center">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('announcements.notFound')}</h2>
        <Link to="/announcements" className="text-[#0d89b1] font-black uppercase tracking-widest hover:underline">
          {t('announcements.backToList')}
        </Link>
      </div>
    );
  }

  const translation = announcementService.getTranslation(announcement, i18n.language);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO
        title={translation.title}
        description={announcementService.getExcerpt(translation.content)}
        image={announcement.image}
        type="article"
        publishedTime={announcement.published_at}
        author={announcement.created_by}
        section={announcement.is_important ? "Muhim e'lonlar" : "E'lonlar"}
        tags={['litsey', 'fdtu', 'e\'lonlar', 'ta\'lim', announcement.is_important ? 'muhim' : ''].filter(Boolean)}
      />
      
      {/* Structured Data for Announcement */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Announcement",
            "headline": translation.title,
            "description": announcementService.getExcerpt(translation.content),
            "image": announcement.image,
            "datePublished": announcement.published_at,
            "author": {
              "@type": "Organization",
              "name": "FDTU 1-son Akademik Litseyi"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FDTU 1-son Akademik Litseyi",
              "logo": {
                "@type": "ImageObject",
                "url": "https://fdtu1al.uz/litseylogo.png"
              }
            }
          })}
        </script>
      </Helmet>
      {/* Header with Back Button */}
      <div className="bg-gray-50 dark:bg-gray-900 py-10 md:py-14 border-b border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d89b1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0d89b1]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-[#0d89b1] transition-all font-black uppercase tracking-[0.3em] text-xs mb-6 group"
          >
            <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-[#0d89b1] transition-colors">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            {t('common.back', 'Orqaga')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {announcement.is_important && (
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-full shadow-lg shadow-red-500/20 mb-5 text-[10px] font-black uppercase tracking-[0.2em]">
                <Megaphone size={14} />
                <span>{t('announcements.important', 'MUHIM')}</span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] uppercase tracking-tight max-w-5xl">
              {translation.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {announcement.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[450px] md:h-[700px] rounded-lg overflow-hidden mb-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
              >
                <img
                  src={announcement.image}
                  alt={translation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </motion.div>
            )}

            <div className="bg-white dark:bg-gray-950 p-10 md:p-20 border border-gray-200 dark:border-gray-800 relative -mt-32 z-20 mx-4 md:mx-0">
              <div className="text-xl text-gray-700 dark:text-gray-300 leading-[1.8] font-medium space-y-6">
                {translation.content.split(/\n{2,}/).map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph.trim()}
                    </p>
                  )
                ))}
              </div>

              <div className="mt-20 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">{t('announcements.share')}</span>
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <Link
                  to="/announcements"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-[#0d89b1] text-white rounded-2xl hover:bg-[#0d89b1] transition-all duration-300 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#0d89b1]/20 hover:-translate-y-1"
                >
                  {t('announcements.backToList')}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
