import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, ArrowLeft, Loader2, Eye, Share2 } from 'lucide-react';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru } from 'date-fns/locale';
import { SEO } from '../components/layout/SEO';

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await newsService.getNewsBySlug(slug);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
    window.scrollTo(0, 0);
  }, [slug]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#0d89b1]" size={48} />
          <p className="text-gray-500 font-medium animate-pulse">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-950">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">404</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">{t('common.notFound', 'Kechirasiz, ushbu yangilik topilmadi yoki o\'chirilgan.')}</p>
          <Link 
            to="/news" 
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#0d89b1] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#0d89b1] transition-all shadow-lg shadow-[#0d89b1]/20"
          >
            <ArrowLeft size={20} />
            {t('nav.news', 'Yangiliklarga qaytish')}
          </Link>
        </div>
      </div>
    );
  }

  const translation = newsService.getTranslation(news, i18n.language);

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 pb-32">
      <SEO 
        title={translation.title} 
        description={translation.short_description}
        image={news.image}
        type="article"
      />
      {/* Article Header Section */}
      <header className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-8">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0d89b1] transition-colors font-bold uppercase tracking-widest text-[10px]"
              >
                <ArrowLeft size={14} />
                {t('nav.news', 'Yangiliklar')}
              </Link>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-[1.2] tracking-tight">
              {translation.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6">
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-[#0d89b1]" />
                <span className="text-sm font-semibold tracking-wide">{formatDate(news.published_at)}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Eye size={18} className="text-[#0d89b1]" />
                <span className="text-sm font-semibold tracking-wide">{news.views_count} {t('common.views', 'marta ko\'rildi')}</span>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button 
                  onClick={() => {
                    navigator.share?.({
                      title: translation.title,
                      url: window.location.href
                    }).catch(() => {});
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase tracking-widest shadow-sm"
                >
                  <Share2 size={14} />
                  Ulashish
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Article Image */}
          <figure className="mb-16">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 aspect-video relative">
              <img
                src={news.image}
                alt={translation.title}
                className="w-full h-full object-cover"
              />
            </div>
            {translation.short_description && (
              <figcaption className="mt-6 px-4 md:px-0">
                <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed italic bg-[#0d89b1]/5 p-6 rounded-xl border border-[#0d89b1]/10">
                  {translation.short_description}
                </p>
              </figcaption>
            )}
          </figure>

          {/* Content Body */}
          <div className="px-0 md:px-4">
            <div 
              className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
                text-gray-800 dark:text-gray-200 
                leading-[1.8] font-normal 
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:mb-8
                prose-img:rounded-xl prose-img:shadow-md
                prose-a:text-[#0d89b1] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: translation.content }}
            />

            {/* Bottom Navigation */}
            <footer className="mt-24 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <Link
                to="/news"
                className="flex items-center gap-2.5 text-gray-400 hover:text-[#0d89b1] transition-colors font-bold uppercase tracking-widest text-[11px]"
              >
                <ArrowLeft size={16} />
                Barcha yangiliklarga qaytish
              </Link>
              
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Maqolani ulashish:</span>
                <div className="flex gap-3">
                  {['Telegram', 'Facebook'].map(platform => (
                    <button key={platform} className="text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-[#0d89b1] dark:hover:text-[#0d89b1] transition-colors uppercase tracking-widest">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}
