import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, ArrowRight } from 'lucide-react';
import { newsService } from '../../services/newsService';
import { NewsItem } from '../../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru } from 'date-fns/locale';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getAllNews();
        setNews(data.results.slice(0, 3)); // Show only first 3 news on home page
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = i18n.language === 'ru' ? ru : uz;
      return format(date, 'd MMMM, yyyy', { locale });
    } catch (e) {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-800"></div>
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 w-1/4 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12" data-aos="fade-up">
          <div>
            <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-4 uppercase tracking-[0.2em]">
              {t('nav.news')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
              {t('home.newsTitle', 'So\'nggi yangiliklar')}
            </h2>
          </div>
          <Link
            to="/news"
            className="hidden md:inline-flex items-center gap-2 text-[#0d89b1] hover:gap-4 transition-all font-black uppercase tracking-widest text-sm"
          >
            {t('home.moreBtn', 'Barcha yangiliklar')}
            <ArrowRight size={22} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => {
            const translation = newsService.getTranslation(item, i18n.language);
            return (
              <Link
                to={`/news/${item.slug}`}
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="block bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 dark:border-gray-800"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <ImageWithFallback
                    src={item.image}
                    alt={translation.title}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-black text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full uppercase tracking-[0.2em] border border-white/20">
                    <Calendar size={14} />
                    <span>{formatDate(item.published_at)}</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-[#0d89b1] transition-colors leading-tight uppercase tracking-tight">
                    {translation.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed text-lg font-medium">
                    {newsService.getExcerpt(translation.content)}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[#0d89b1] font-black uppercase tracking-[0.2em] text-xs group-hover:gap-4 transition-all">
                    {t('home.moreBtn', 'Batafsil o\'qish')}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-[#0d89b1] font-black uppercase tracking-widest text-sm"
          >
            {t('home.moreBtn', 'Barcha yangiliklar')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
