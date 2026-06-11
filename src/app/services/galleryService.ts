import { AlbumResponse, Album } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const galleryService = {
  async getAllAlbums(page = 1): Promise<AlbumResponse> {
    const response = await fetch(`${API_BASE_URL}/gallery/albums/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch albums');
    }
    return response.json();
  },

  async getAlbumBySlug(slug: string): Promise<Album> {
    const response = await fetch(`${API_BASE_URL}/gallery/albums/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch album detail');
    }
    return response.json();
  },

  getTranslation(album: Album, lang: string) {
    const { translations } = album;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }
    
    return translations[lang as keyof typeof translations] || translations.uz;
  }
};
