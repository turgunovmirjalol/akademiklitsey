import { AnnouncementResponse, Announcement, AnnouncementTranslation } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const announcementService = {
  async getAllAnnouncements(page = 1): Promise<AnnouncementResponse> {
    const response = await fetch(`${API_BASE_URL}/announcements/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    return response.json();
  },

  async getAnnouncementBySlug(slug: string): Promise<Announcement> {
    const response = await fetch(`${API_BASE_URL}/announcements/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch announcement detail');
    }
    return response.json();
  },

  getTranslation(announcement: Announcement, lang: string): AnnouncementTranslation {
    const { translations } = announcement;
    
    // Map i18n codes to API codes
    // 'kr' in our app corresponds to 'uz_cyrl' in the API
    if (lang === 'kr') {
      // In announcements API, uz_cyrl might not be present, so default to uz
      return (translations as any).uz_cyrl || translations.uz;
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
