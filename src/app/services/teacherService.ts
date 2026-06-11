import { TeacherResponse, Teacher, TeacherTranslation } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const teacherService = {
  async getAllTeachers(page = 1): Promise<TeacherResponse> {
    const response = await fetch(`${API_BASE_URL}/teachers/?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return response.json();
  },

  async getTeacherBySlug(slug: string): Promise<Teacher> {
    const response = await fetch(`${API_BASE_URL}/teachers/${slug}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch teacher detail');
    }
    return response.json();
  },

  getTranslation(teacher: Teacher, lang: string): TeacherTranslation {
    const { translations } = teacher;
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || translations.uz;
  }
};
