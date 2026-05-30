import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, CheckCircle, Youtube } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../hooks/useSettings';
import { settingsService } from '../services/settingsService';
import { SEO } from '../components/layout/SEO';

export function ContactPage() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();
  
  const siteName = settingsService.getTranslation(settings, i18n.language);
  const socialLinks = settingsService.getSocialLinks(settings);
  const contactInfo = settingsService.getContactInfo(settings);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialIcons = [
    { icon: Facebook, label: "Facebook", href: socialLinks.facebook, color: "text-blue-700", hover: "hover:bg-blue-700", show: !!socialLinks.facebook },
    { icon: Instagram, label: "Instagram", href: socialLinks.instagram, color: "text-pink-600", hover: "hover:bg-pink-600", show: !!socialLinks.instagram },
    { icon: Send, label: "Telegram", href: socialLinks.telegram, color: "text-blue-500", hover: "hover:bg-blue-500", show: !!socialLinks.telegram },
    { icon: Youtube, label: "YouTube", href: socialLinks.youtube, color: "text-red-600", hover: "hover:bg-red-600", show: !!socialLinks.youtube }
  ].filter(s => s.show);

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.contact')} 
        description={t('contact.pageSubtitle')}
      />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0d89b1] to-[#0d89b1] text-white py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.contact')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('contact.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Cards */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up">
              <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-8 group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <MapPin size={32} className="text-[#0d89b1] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('contact.addressTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-bold">
                {siteName.address || t('footer.address')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-8 group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <Phone size={32} className="text-[#0d89b1] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('contact.phoneTitle')}</h3>
              <div className="space-y-3">
                {contactInfo.phone && (
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="block text-gray-600 dark:text-gray-400 hover:text-[#0d89b1] text-lg font-black transition-colors">
                    {contactInfo.phone}
                  </a>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-lg border border-gray-100 dark:border-gray-800 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-8 group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <Mail size={32} className="text-[#0d89b1] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('contact.emailTitle')}</h3>
              {contactInfo.email && (
                <a href={`mailto:${contactInfo.email}`} className="text-gray-600 dark:text-gray-400 hover:text-[#0d89b1] text-lg font-black transition-colors break-all">
                  {contactInfo.email}
                </a>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white dark:bg-gray-950 rounded-lg p-10 shadow-2xl border border-gray-100 dark:border-gray-800" data-aos="fade-right">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">{t('contact.formTitle')}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium">
                {t('contact.formSubtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0d89b1] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="Ikboljon Boltaboyev"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0d89b1] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0d89b1] transition-all text-gray-900 dark:text-white font-bold"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.subject')}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0d89b1] transition-all text-gray-900 dark:text-white font-bold appearance-none"
                    >
                      <option value="">{t('contact.subject')}</option>
                      <option value="admission">{t('contact.subjects.admission')}</option>
                      <option value="education">{t('contact.subjects.education')}</option>
                      <option value="other">{t('contact.subjects.other')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">{t('contact.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-[#0d89b1] transition-all text-gray-900 dark:text-white font-bold resize-none"
                    placeholder={t('contact.message')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-5 rounded-lg font-black uppercase tracking-widest transition-all duration-300 shadow-xl ${
                    submitted 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'bg-[#0d89b1] text-white hover:bg-[#0d89b1] hover:shadow-2xl transform hover:-translate-y-1'
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle size={20} />
                      {t('contact.success')}
                    </span>
                  ) : (
                    t('contact.send')
                  )}
                </button>
              </form>
            </div>

            {/* Social & Map */}
            <div className="space-y-8" data-aos="fade-left">
              <div className="bg-white dark:bg-gray-950 rounded-lg p-10 text-gray-900 dark:text-white shadow-2xl relative overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-bl-full"></div>
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight relative z-10">{t('footer.socials')}</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {socialIcons.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all group border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform ${social.color}`}>
                        <social.icon size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-1">{t('footer.socials')}</span>
                        <span className="font-black text-sm md:text-base uppercase tracking-tight text-gray-900 dark:text-white leading-none">{social.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-2xl h-[400px] border border-gray-100 dark:border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.7663435134983!2d71.7828!3d40.3864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIzJzExLjAiTiA3McKwNDYnNTguMSJF!5e0!3m2!1sen!2suz!4v1620000000000!5m2!1sen!2suz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
