import { Phone, Mail, Clock, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { leadershipService } from '../services/leadershipService';
import { LeadershipMember } from '../types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export function LeadershipPage() {
  const { t, i18n } = useTranslation();
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const currentLang = i18n.language || 'uz';

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const data = await leadershipService.getManagement();
        const activeLeadership = data
          .filter(member => member.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
        setLeadership(activeLeadership);
      } catch (error) {
        console.error('Error fetching leadership:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.leadership')} 
        description={t('leadership.pageSubtitle')}
      />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-medium">
            <Link to="/" className="text-gray-500 hover:text-[#0d89b1] transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>{t('nav.home')}</span>
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.leadership')}</span>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
          >
            {t('nav.leadership')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-3 text-base md:text-lg font-medium max-w-2xl mx-auto"
          >
            {t('leadership.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Leadership Grid */}
      <section className="py-12 md:py-16 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))
            ) : (
              leadership.map((member, index) => {
                const translation = leadershipService.getTranslation(member, currentLang);
                
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
                  >
                    {/* Image Section */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <ImageWithFallback
                        src={member.photo}
                        alt={member.full_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2">
                        {member.full_name}
                      </h3>
                      
                      <p className="text-xs text-[#0d89b1] font-semibold mb-3 leading-snug line-clamp-2">
                        {translation.position}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                        {/* Phone */}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                          >
                            <Phone size={12} className="text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{member.phone}</span>
                          </a>
                        )}

                        {/* Email */}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Mail size={12} className="text-rose-500 flex-shrink-0" />
                            <span className="truncate">{member.email}</span>
                          </a>
                        )}

                        {/* Reception Hours */}
                        {translation.reception_hours && (
                          <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Clock size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">
                              {t('leadership.receptionHours')}: {translation.reception_hours}
                            </span>
                          </div>
                        )}
                      </div>

                      {member.academic_degree && (
                        <p className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 dark:text-gray-500 italic">
                          {member.academic_degree}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Reception Note */}
      <section className="py-10 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm italic font-medium">
            {t('leadership.receptionNote')}
          </p>
        </div>
      </section>
    </div>
  );
}