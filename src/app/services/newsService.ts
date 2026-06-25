import { NewsResponse, NewsItem, NewsTranslation } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const newsService = {
  async getAllNews(page = 1): Promise<NewsResponse> {
    const response = await fetch(`${API_BASE_URL}/news/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  },

  async getNewsBySlug(slug: string): Promise<NewsItem> {
    const response = await fetch(`${API_BASE_URL}/news/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch news detail');
    }
    return response.json();
  },

  getTranslation(news: NewsItem, lang: string): NewsTranslation {
    const { translations } = news;
    
    // Map i18n codes to API codes
    // 'kr' in our app corresponds to 'uz_cyrl' in the API
    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz;
  },

  getExcerpt(content: string, maxLen = 140): string {
    const plain = (content || '').replace(/\s+/g, ' ').trim();
    if (plain.length <= maxLen) return plain;
    return `${plain.slice(0, maxLen).trimEnd()}...`;
  }
};
