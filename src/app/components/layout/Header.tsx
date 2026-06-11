import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Facebook,
  Instagram,
  Send,
  Youtube,
  ChevronRight,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { menuItems } from '../../data/menu';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useSettings } from '../../hooks/useSettings';
import { settingsService } from '../../services/settingsService';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);

  const siteName = settingsService.getTranslation(settings, i18n.language);
  const socialLinks = settingsService.getSocialLinks(settings);
  const contactInfo = settingsService.getContactInfo(settings);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languages = [
    { code: 'uz', label: "O'zbek", flag: 'uz' },
    { code: 'ru', label: 'Русский', flag: 'ru' },
    // { code: 'kr', label: 'Ўзбекча', flag: 'uz' },
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-[#0d89b1] text-white hidden sm:block">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity font-bold">
                  <Phone size={14} />
                  <span>{contactInfo.phone}</span>
                </a>
              )}
            </div>
            <div className="flex items-center gap-6">
              {/* Language Switcher Desktop */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 hover:text-white/80 transition-colors font-bold uppercase tracking-widest text-xs"
                >
                  <Globe size={14} />
                  <span>{currentLanguage.label}</span>
                  <ChevronDown size={12} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden py-1 border border-gray-100 dark:border-gray-800 z-[100] transition-all duration-200 ${isLangMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center gap-2 ${
                        i18n.language === lang.code 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-[#0d89b1]' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className={`fi fi-${lang.flag}`}></span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 ml-6 pl-6 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <Facebook size={16} />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <Instagram size={16} />
                  </a>
                )}
                {socialLinks.telegram && (
                  <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <Send size={16} />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <Youtube size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
           <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
             <div className="relative overflow-hidden rounded-lg p-1 bg-gray-50 dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors shadow-sm">
               <img src={contactInfo.logo || "/logoicon.png"} alt={siteName.short_name} className="w-8 h-8 md:w-14 md:h-14 object-contain" />
             </div>
             <div>
               <div className="text-xs md:text-lg font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight max-w-[120px] md:max-w-none">
                 {siteName.short_name}
               </div>
             </div>
           </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 hover:text-[#0d89b1] transition-colors font-black text-xs uppercase tracking-widest flex items-center gap-1.5 ${
                    location.pathname === item.href ? 'text-[#0d89b1]' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {t(item.label)}
                  {item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-0 w-64 bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden py-3 transition-all duration-200 ${openDropdown === item.label ? 'opacity-100 translate-y-0 visible scale-100' : 'opacity-0 translate-y-2 invisible scale-95'}`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className={`block px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                          location.pathname === child.href 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-[#0d89b1]' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[#0d89b1]'
                        }`}
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Switcher 
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}
            */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-[#0d89b1] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-gray-950 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <div className="flex items-center gap-2">
              <img src="/logoicon.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-black text-[#0d89b1] uppercase tracking-tight">FDTU 1-AL</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-2">
            {/* Mobile Language Switcher */}
            <div className="px-4 mb-6">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">{t('common.language')}</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-black uppercase transition-all ${
                      i18n.language === lang.code 
                        ? 'bg-[#0d89b1] text-white border-[#0d89b1] shadow-lg shadow-[#0d89b1]/20' 
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                        className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-colors ${
                          expandedItem === item.label ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0d89b1]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                        }`}
                      >
                        <span>{t(item.label)}</span>
                        <ChevronRight size={18} className={`transition-transform duration-300 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-gray-50/50 dark:bg-gray-900/50 mx-2 rounded-2xl mt-1`}>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className={`block px-6 py-4 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors ${
                              location.pathname === child.href ? 'text-[#0d89b1] font-black bg-white dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-[#0d89b1]'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(child.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-4 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] transition-colors ${
                        location.pathname === item.href ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0d89b1]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.label)}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex flex-col gap-4">
              <a href="tel:+998732413307" className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-black text-sm">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center text-[#0d89b1]">
                  <Phone size={20} />
                </div>
                +99873 241-33-07
              </a>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: "https://instagram.com/fdtu1al.uz", color: "text-pink-600" },
                  { icon: Send, href: "https://t.me/fdtu1al_uz", color: "text-blue-500" },
                  { icon: Facebook, href: "https://facebook.com", color: "text-blue-700" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center justify-center ${social.color} hover:scale-110 transition-transform`}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}