import { Link } from 'react-router';
import { Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { announcementService } from '../../services/announcementService';
import { Announcement } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AnnouncementsSection() {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await announcementService.getAllAnnouncements(1);
        // Show only first 3 announcements on home page
        setAnnouncements(data.results.slice(0, 3));
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d89b1]"></div>
      </section>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12" data-aos="fade-up">
          <div>
            <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em]">
              {t('home.announcements.badge', 'E\'LONLAR')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
              {t('home.announcements.title', 'Muhim e\'lonlar')}
            </h2>
          </div>
          <Link
            to="/announcements"
            className="hidden md:inline-flex items-center gap-2 text-[#0d89b1] hover:gap-4 transition-all font-black uppercase tracking-widest text-sm"
          >
            {t('home.announcements.allAnnouncements', 'Barcha e\'lonlar')}
            <ArrowRight size={22} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.map((announcement, index) => {
            const translation = announcementService.getTranslation(announcement, i18n.language);
            const date = new Date(announcement.published_at).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ');
            
            return (
              <Link
                to={`/announcements/${announcement.slug}`}
                key={announcement.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative block bg-white dark:bg-gray-950 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-800"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {announcement.image ? (
                    <ImageWithFallback
                      src={announcement.image}
                      alt={translation.title}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      objectFit="contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0d89b1] to-[#0d89b1] flex items-center justify-center">
                      <Megaphone size={48} className="text-white/20" />
                    </div>
                  )}
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-10 border border-white/20">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#0d89b1] uppercase tracking-[0.2em]">
                      <Calendar size={14} />
                      <span>{date}</span>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#0d89b1]/10 rounded-xl flex items-center justify-center text-[#0d89b1]">
                      <Megaphone size={20} />
                    </div>
                    {announcement.is_important && (
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                        {t('announcements.important', 'MUHIM')}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight uppercase tracking-tight group-hover:text-[#0d89b1] transition-colors">
                    {translation.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed text-sm font-medium">
                    {announcementService.getExcerpt(translation.content)}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[#0d89b1] font-black uppercase tracking-[0.2em] text-xs group-hover:gap-4 transition-all">
                    {t('home.announcements.details', 'Batafsil')}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-[#0d89b1] font-black uppercase tracking-widest text-sm"
          >
            {t('home.announcements.allAnnouncements', 'Barcha e\'lonlar')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
