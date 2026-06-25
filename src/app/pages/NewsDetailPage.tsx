import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, ArrowLeft, Eye, Share2 } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { newsService } from '../services/newsService';
import { NewsItem } from '../types';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { uz, ru } from 'date-fns/locale';
import { SEO } from '../components/layout/SEO';
import { Helmet } from 'react-helmet-async';

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
      <article className="min-h-screen bg-white dark:bg-gray-950 pb-32">
        {/* Article Header Skeleton */}
        <header className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-4 w-28 mb-8" />
              <Skeleton className="h-10 md:h-12 w-full mb-3" />
              <Skeleton className="h-10 md:h-12 w-2/3 mb-8" />
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-32 rounded-lg ml-auto" />
              </div>
            </div>
          </div>
        </header>

        {/* Article Body Skeleton */}
        <div className="container mx-auto px-4 mt-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="w-full aspect-video rounded-2xl mb-16" />

            <div className="px-0 md:px-4 space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        </div>
      </article>
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
        description={newsService.getExcerpt(translation.content)}
        image={news.image}
        type="article"
        publishedTime={news.published_at}
        modifiedTime={news.updated_at}
        author={news.created_by}
        section="Yangiliklar"
        tags={['litsey', 'fdtu', 'yangiliklar', 'ta\'lim']}
      />
      
      {/* Structured Data for News Article */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": translation.title,
            "description": newsService.getExcerpt(translation.content),
            "image": [news.image],
            "datePublished": news.published_at,
            "dateModified": news.updated_at,
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
          </figure>

          {/* Content Body */}
          <div className="px-0 md:px-4">
            <div className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-[1.8] font-normal space-y-6">
              {translation.content.split(/\n{2,}/).map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>

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
