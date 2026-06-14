const API_BASE_URL = 'https://api.fdtu1al.uz';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContactInfo {
  id: number;
  phone: string;
  email: string;
  address: string;
  latitude: string;
  longitude: string;
  working_hours: string;
  working_days: string;
  map_embed_url: string;
  is_active: boolean;
}

export interface ContactInfoResponse {
  results: ContactInfo[];
}

export const contactService = {
  async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to submit contact form');
      }

      return response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  async getContactInfo(): Promise<ContactInfo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/info/`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact info');
      }
      const data: ContactInfoResponse = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return [];
    }
  }
};