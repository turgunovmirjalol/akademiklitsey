import { Target, Eye, Heart, Building2, Calendar, Phone, MapPin, User, GraduationCap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/layout/SEO';

export function AboutPage() {
  const { t } = useTranslation();

  const generalInfo = [
    {
      icon: Building2,
      label: t('about.director'),
      value: 'Boltaboyev Ikboljon Tursunalievich'
    },
    {
      icon: Calendar,
      label: t('about.established'),
      value: t('about.establishedDate')
    },
    {
      icon: MapPin,
      label: t('about.address'),
      value: t('footer.address')
    },
    {
      icon: Phone,
      label: t('about.phone'),
      value: '+99873 241-33-07'
    },
    {
      icon: GraduationCap,
      label: t('about.founder'),
      value: t('about.founderValue')
    }
  ];

  const values = [
    {
      icon: Target,
      title: t('about.goalTitle'),
      description: t('about.goalDesc'),
    },
    {
      icon: Eye,
      title: t('about.missionTitle'),
      description: t('about.missionDesc'),
    },
    {
      icon: Heart,
      title: t('about.valuesTitle'),
      description: t('about.valuesDesc'),
    },
  ];

  const advantages = [
    t('about.adv1'),
    t('about.adv2'),
    t('about.adv3'),
    t('about.adv4'),
    t('about.adv5'),
    t('about.adv6'),
    t('about.adv7'),
    t('about.adv8')
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.about')} 
        description={t('about.pageSubtitle')}
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
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.about')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('about.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* General Info Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">{t('about.generalInfo')}</h2>
            <div className="w-24 h-2 bg-[#0d89b1] mx-auto rounded-full shadow-lg shadow-[#0d89b1]/30"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {generalInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:border-[#0d89b1] transition-all group"
                >
                  <div className="w-14 h-14 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                    <Icon size={28} className="text-[#0d89b1] group-hover:text-white" />
                  </div>
                  <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">{item.label}</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-6 uppercase tracking-[0.2em]">
              {t('about.history')}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">{t('about.history')}</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              <p>{t('about.historyP1')}</p>
              <p>{t('about.historyP2')}</p>
              <p>{t('about.historyP3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals and Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">{t('about.mission')}</h2>
            <div className="w-24 h-2 bg-[#0d89b1] mx-auto rounded-full shadow-lg shadow-[#0d89b1]/30"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-950 p-10 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 text-center group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-20 h-20 bg-[#0d89b1]/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                    <Icon size={36} className="text-[#0d89b1] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-wider">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black mb-6 uppercase tracking-[0.2em]">
                {t('about.advantages')}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">{t('about.advantages')}</h2>
              <div className="grid gap-6">
                {advantages.map((adv, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full flex items-center justify-center group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                      <CheckCircle size={18} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-bold text-lg">{adv}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc1NDU4MzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Afzalliklar"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-[#0d89b1] p-10 rounded-lg text-white shadow-xl hidden md:block">
                <div className="text-4xl font-black mb-2 tracking-tighter">100%</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Natija kafolati</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
