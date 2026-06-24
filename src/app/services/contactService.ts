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
      // Backend (`/send/`) expects `full_name` and a subject from a fixed
      // choice set (admission|general|complaint|suggestion|other).
      const payload = {
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject || 'general',
        message: data.message,
      };

      const response = await fetch(`${API_BASE_URL}/send/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json().catch(() => null);

      if (!response.ok) {
        const errMsg =
          resData?.detail ||
          resData?.message ||
          (resData && typeof resData === 'object'
            ? Object.values(resData).flat().join(', ')
            : null);
        throw new Error(errMsg || 'Failed to submit contact form');
      }

      return { success: true, message: resData?.detail || 'OK' };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // The backend has no dedicated contact-info endpoint; contact details
  // (address/phone/email/socials) come from `/settings/` via settingsService.
  // The contact page falls back to those, so this returns an empty overlay.
  async getContactInfo(): Promise<ContactInfo[]> {
    return [];
  }
};