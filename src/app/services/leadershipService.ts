import { LeadershipMember, LeadershipTranslation } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const leadershipService = {
  async getManagement(): Promise<LeadershipMember[]> {
    const response = await fetch(`${API_BASE_URL}/management/`);
    if (!response.ok) {
      throw new Error('Failed to fetch management data');
    }
    return response.json();
  },

  getTranslation(member: LeadershipMember, lang: string): LeadershipTranslation {
    const { translations } = member;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return (translations as any).uz_cyrl || translations.uz;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz;
  }
};
