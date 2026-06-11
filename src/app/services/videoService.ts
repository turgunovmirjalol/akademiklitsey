import { Video, VideoTranslation, VideoResponse } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const videoService = {
  async getVideos(): Promise<VideoResponse> {
    const response = await fetch(`${API_BASE_URL}/videos/`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return response.json();
  },

  getTranslation(video: Video, lang: string): VideoTranslation {
    const { translations } = video;

    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }

    return translations[lang as keyof typeof translations] || translations.uz;
  },
};

