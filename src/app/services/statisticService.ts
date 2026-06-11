import { StatItem, StatTranslation } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const statisticService = {
  async getStatistics(): Promise<StatItem[]> {
    const response = await fetch(`${API_BASE_URL}/statistics/`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  },

  getTranslation(stat: StatItem, lang: string): StatTranslation {
    const { translations } = stat;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz;
  }
};
