import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru } from 'date-fns/locale';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';

export function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await newsService.getAllNews(page);
        if (page === 1) {
          setNews(data.results);
        } else {
          setNews(prev => [...prev, ...data.results]);
        }
        setHasMore(!!data.next);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = i18n.language === 'ru' ? ru : uz;
      return format(date, 'd MMMM, yyyy', { locale });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={t('nav.news')} 
        description={t('home.heroDesc')}
      />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0d89b1] to-[#0d89b1] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.news')}</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {t('home.heroDesc', 'Litseymiz faoliyati va yutuqlari haqida so\'nggi yangiliklardan xabardor bo\'ling')}
          </p>
        </div>
      </div>

      {/* News Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => {
              const translation = newsService.getTranslation(item, i18n.language);
              return (
                <Link
                  to={`/news/${item.slug}`}
                  key={item.id}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={translation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(item.published_at)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0d89b1] transition-colors">
                      {translation.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {newsService.getExcerpt(translation.content)}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[#0d89b1] font-semibold group-hover:gap-3 transition-all">
                      {t('home.moreBtn', 'Batafsil o\'qish')}
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              );
            })}
            
            {loading && Array.from({ length: page === 1 ? 6 : 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg p-0">
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-6 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-32 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {!loading && hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-8 py-3 bg-[#0d89b1] text-white rounded-xl font-bold hover:bg-[#0d89b1] transition-colors shadow-lg"
              >
                {t('common.loadMore', 'Yana yuklash')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

