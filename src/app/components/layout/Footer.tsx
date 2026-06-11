import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Instagram, Send, Youtube, Globe, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../hooks/useSettings';
import { settingsService } from '../../services/settingsService';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Footer() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();

  const siteName = settingsService.getTranslation(settings, i18n.language);
  const socialLinks = settingsService.getSocialLinks(settings);
  const contactInfo = settingsService.getContactInfo(settings);

  const socialIcons = [
    { icon: Facebook, href: socialLinks.facebook, color: "hover:bg-blue-600", show: !!socialLinks.facebook },
    { icon: Instagram, href: socialLinks.instagram, color: "hover:bg-pink-600", show: !!socialLinks.instagram },
    { icon: Send, href: socialLinks.telegram, color: "hover:bg-sky-500", show: !!socialLinks.telegram },
    { icon: Youtube, href: socialLinks.youtube, color: "hover:bg-red-600", show: !!socialLinks.youtube }
  ].filter(s => s.show);

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0d89b1] to-[#0d89b1] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg overflow-hidden p-1">
                {contactInfo.logo ? (
                  <ImageWithFallback src={contactInfo.logo} alt={siteName.short_name} className="w-full h-full" objectFit="contain" />
                ) : (
                  "FDTU 1-AL"
                )}
              </div>
              <div>
                <div className="font-black text-white text-lg tracking-tight leading-tight">{siteName.short_name}</div>
                <div className="text-xs text-[#0d89b1] font-bold uppercase tracking-widest">{t('nav.leadership')}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              {t('footer.about')}
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-[#0d89b1]"></span>
              {t('footer.quickLinks')}
            </h3>
            <ul className="grid grid-cols-1 gap-4 text-sm font-bold">
              {[
                { to: "/about", label: t('nav.about') },
                { to: "/admission", label: t('nav.admission') },
                { to: "/news", label: t('nav.news') },
                { to: "/teachers", label: t('nav.teachers') },
                { to: "/contact", label: t('nav.contact') }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.to} className="text-gray-400 hover:text-[#0d89b1] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d89b1] scale-0 group-hover:scale-100 transition-transform"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-[#0d89b1]"></span>
              {t('footer.contact')}
            </h3>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#0d89b1] group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <span className="text-gray-400 leading-relaxed">{siteName.address || t('footer.address')}</span>
              </li>
              {contactInfo.phone && (
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#0d89b1] group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-[#0d89b1] transition-colors font-bold">{contactInfo.phone}</a>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#0d89b1] group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-[#0d89b1] transition-colors font-bold">{contactInfo.email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Working Hours & Map Mini */}
          <div>
            <h3 className="text-white font-black text-lg mb-8 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-[#0d89b1]"></span>
              {t('footer.workTime')}
            </h3>
            <div className="bg-white/5 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 text-white mb-2">
                <Clock size={18} className="text-[#0d89b1]" />
                <span className="font-bold">{t('footer.days')}</span>
              </div>
              <p className="text-2xl font-black text-[#0d89b1]">08:00 - 17:00</p>
            </div>
            {/* Small Google Map */}
            <div className="rounded-2xl overflow-hidden h-48 w-full border border-white/10 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.1234567890123!2d71.77196941208126!3d40.42417922132789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzI3LjAiTiA3McKwNDYnMTkuMSJF!5e0!3m2!1sen!2s!4v1647000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-bold text-center md:text-left">
            &copy; {contactInfo.established_year} - {new Date().getFullYear()} {siteName.full_name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-sm font-black text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
