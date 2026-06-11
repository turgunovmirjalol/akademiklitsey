export interface SiteTranslations {
  short_name: string;
  full_name: string;
  address: string;
}

export interface SiteSettings {
  id: number;
  translations: {
    uz: SiteTranslations;
    ru: SiteTranslations;
  };
  established_year: number;
  phone: string;
  email: string;
  website: string;
  logo: string;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

const API_BASE_URL = 'https://api.fdtu1al.uz';

export const settingsService = {
  async getSettings(): Promise<SiteSettings | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/`);
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  getTranslation(settings: SiteSettings | null, lang: string): SiteTranslations {
    if (!settings) {
      return {
        short_name: lang === 'ru' ? 'ФДТУ 1-АЛ' : 'FDTU 1-AL',
        full_name: lang === 'ru' 
          ? 'Академический лицей №1 Ферганского государственного технического университета'
          : "FARG'ONA DAVLAT TEXNIKA UNIVERSITETI 1-SON AKADEMIK LITSEYI",
        address: lang === 'ru'
          ? 'г. Фергана, МСГ Мурувват, ул. Ферганская, 84'
          : "Farg'ona sh., Muruvvat MFY, Farg'ona ko'chasi, 84-uy"
      };
    }

    // Map kr to uz since API doesn't have kr translations
    const apiLang = lang === 'kr' ? 'uz' : lang;
    return settings.translations[apiLang as keyof typeof settings.translations] || settings.translations.uz;
  },

  getSocialLinks(settings: SiteSettings | null) {
    if (!settings) {
      return {
        telegram: 'https://t.me/fdtu1al_uz',
        instagram: 'https://instagram.com/fdtu1al.uz',
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com'
      };
    }

    return {
      telegram: settings.telegram || 'https://t.me/fdtu1al_uz',
      instagram: settings.instagram || 'https://instagram.com/fdtu1al.uz',
      facebook: settings.facebook || 'https://facebook.com',
      youtube: settings.youtube || 'https://youtube.com'
    };
  },

  getContactInfo(settings: SiteSettings | null) {
    if (!settings) {
      return {
        phone: '+998 (73) 241-33-07',
        email: 'info@fdtu1al.uz',
        website: 'https://fdtu1al.uz',
        established_year: 2000
      };
    }

    return {
      phone: settings.phone || '+998 (73) 241-33-07',
      email: settings.email || 'info@fdtu1al.uz',
      website: settings.website || 'https://fdtu1al.uz',
      established_year: settings.established_year || 2000,
      logo: settings.logo || '/logoicon.png'
    };
  }
};

// Default settings for fallback
export const defaultSettings: SiteSettings = {
  id: 1,
  translations: {
    uz: {
      short_name: "FDTU 1-AL",
      full_name: "FARG'ONA DAVLAT TEXNIKA UNIVERSITETI 1-SON AKADEMIK LITSEYI",
      address: ""
    },
    ru: {
      short_name: "ФДТУ 1-АЛ",
      full_name: "Академический лицей №1 Ферганского государственного технического университета",
      address: ""
    }
  },
  established_year: 2000,
  phone: "",
  email: "",
  website: "",
  logo: "https://api.fdtu1al.uz/media/settings/logoicon.png",
  telegram: null,
  instagram: null,
  facebook: null,
  youtube: null
};