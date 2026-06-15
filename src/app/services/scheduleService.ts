import { ScheduleItem } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const scheduleService = {
  async getSchedules(): Promise<ScheduleItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dars-jadvali/`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching schedules:', error);
      return [];
    }
  },

  getTranslation(item: ScheduleItem, lang: string): { title: string } {
    // Map kr to uz since API doesn't have kr translations
    const apiLang = lang === 'kr' ? 'uz' : lang;
    const trans = item.translations[apiLang as keyof typeof item.translations];
    if (!trans || !trans.title) {
      // Fallback to uz
      return item.translations.uz || { title: '' };
    }
    return trans;
  }
};