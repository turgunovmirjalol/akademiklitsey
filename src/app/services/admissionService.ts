import { AdmissionDocument, AdmissionDocumentTranslation, Subject, SubjectTranslation, AdmissionCurrentResponse } from '../types';

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const admissionService = {
  async getAdmissionDocuments(): Promise<AdmissionDocument[]> {
    const response = await fetch(`${API_BASE_URL}/documents/`);
    if (!response.ok) {
      throw new Error('Failed to fetch admission documents');
    }
    return response.json();
  },

  async getSubjects(): Promise<Subject[]> {
    const response = await fetch(`${API_BASE_URL}/subjects/`);
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    return response.json();
  },

  async getCurrentAdmission(): Promise<AdmissionCurrentResponse> {
    const response = await fetch(`${API_BASE_URL}/current/`);
    if (!response.ok) {
      throw new Error('Failed to fetch current admission info');
    }
    return response.json();
  },

  getTranslation(item: AdmissionDocument | Subject, lang: string): any {
    const { translations } = item;
    
    // Map i18n codes to API codes
    if (lang === 'kr') {
      return (translations as any).uz_cyrl || (translations as any).uz;
    }
    
    // Default to 'uz' if translation for the requested language doesn't exist
    return (translations as any)[lang] || (translations as any).uz;
  }
};
