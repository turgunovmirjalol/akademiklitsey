import { Department } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const departmentService = {
  async getAllDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/departments/`);
    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }
    return response.json();
  },

  async getDepartmentBySlug(slug: string): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/departments/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch department detail');
    }
    return response.json();
  },

  getTranslation(department: Department, lang: string) {
    const { translations } = department;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return translations.uz_cyrl || translations.uz;
    }
    
    return translations[lang as keyof typeof translations] || translations.uz;
  }
};
