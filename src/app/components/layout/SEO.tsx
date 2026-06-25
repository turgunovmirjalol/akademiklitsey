import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const SEO = ({
  title,
  description,
  keywords,
  image = '/litseylogo.png',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps) => {
  const { t, i18n } = useTranslation();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const baseUrl = 'https://fdtu1al.uz';
    const path = window.location.pathname;
    setCurrentUrl(url || `${baseUrl}${path}`);
  }, [url]);

  // Convert relative image URLs to absolute
  const getAbsoluteImageUrl = (imgUrl?: string | null) => {
    if (!imgUrl) {
      return 'https://fdtu1al.uz/litseylogo.png';
    }
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      return imgUrl;
    }
    return `https://fdtu1al.uz${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`;
  };

  const seoTitle = title 
    ? t('seo.titleTemplate', { title }) 
    : t('seo.defaultTitle');
    
  // Backward compatibility: if %s is still in the template (just in case)
  const finalTitle = seoTitle.includes('%s') 
    ? seoTitle.replace('%s', title || '')
    : seoTitle;
    
  const seoDescription = description || t('seo.defaultDescription');
  const seoKeywords = keywords || t('seo.keywords');
  const siteName = t('seo.defaultTitle');
  const absoluteImage = getAbsoluteImageUrl(image);
  const language = i18n.language === 'ru' ? 'ru_RU' : 'uz_UZ';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="language" content={language} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={author || 'FDTU 1-son Akademik Litseyi'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={language} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@fdtu1al" />
      <meta name="twitter:creator" content="@fdtu1al" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={seoTitle} />

      {/* Telegram specific meta tags */}
      <meta property="og:telegram:channel" content="@fdtu1al" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="uz" href={`https://fdtu1al.uz${window.location.pathname}`} />
      <link rel="alternate" hrefLang="ru" href={`https://fdtu1al.uz${window.location.pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://fdtu1al.uz${window.location.pathname}`} />
    </Helmet>
  );
};
