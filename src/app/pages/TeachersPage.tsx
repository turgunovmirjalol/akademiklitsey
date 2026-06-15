import { Mail, Phone, Award, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teacherService } from '../services/teacherService';
import { Teacher } from '../types';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export function TeachersPage() {
  const { t, i18n } = useTranslation();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const currentLang = i18n.language || 'uz';

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await teacherService.getAllTeachers();
        const activeTeachers = data.results
          .filter(teacher => teacher.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
        setTeachers(activeTeachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.teachers')} 
        description={t('teachers.pageSubtitle')}
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
            <span className="text-gray-900 dark:text-white font-bold">{t('nav.teachers')}</span>
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
            {t('nav.teachers')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-3 text-base md:text-lg font-medium max-w-2xl mx-auto"
          >
            {t('teachers.pageSubtitle')}
          </motion.p>
        </div>
      </div>

      {/* Teachers Grid */}
      <section className="py-12 md:py-16 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
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
              teachers.map((teacher, index) => {
                const translation = teacherService.getTranslation(teacher, currentLang);
                
                return (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
                  >
                    {/* Image Section */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <ImageWithFallback
                        src={teacher.photo}
                        alt={teacher.full_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-2">
                        {teacher.full_name}
                      </h3>
                      
                      <p className="text-xs text-[#0d89b1] font-semibold mb-3 leading-snug line-clamp-2">
                        {translation.position}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                        {/* Phone */}
                        {teacher.phone && (
                          <a
                            href={`tel:${teacher.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                          >
                            <Phone size={12} className="text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{teacher.phone}</span>
                          </a>
                        )}

                        {/* Email */}
                        {teacher.email && (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Mail size={12} className="text-rose-500 flex-shrink-0" />
                            <span className="truncate">{teacher.email}</span>
                          </a>
                        )}

                        {/* Experience */}
                        {teacher.experience_years > 0 && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Calendar size={12} className="text-purple-500 flex-shrink-0" />
                            <h4 className='text-sm font-bold'>Tajriba: </h4>
                            <span className='text-sm'>{teacher.experience_years} {t('teachers.years')}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-1.5">
                        {teacher.category && (
                          <span className="inline-block px-2 py-0.5 bg-[#0d89b1]/10 dark:bg-[#0d89b1]/20 text-[10px] font-semibold text-[#0d89b1] rounded-md">
                            {teacher.category_display || teacher.category}
                          </span>
                        )}
                        {(teacher.academic_degree || teacher.academic_rank) && (
                          <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] font-medium text-gray-500 dark:text-gray-400 rounded-md">
                            {teacher.academic_degree || teacher.academic_rank}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0d89b1] to-[#0a7a9e] rounded-xl p-8 md:p-10 text-center text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <Mail size={24} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t('teachers.ctaTitle')}
              </h2>
              <p className="text-sm md:text-base text-white/80 mb-6 max-w-xl mx-auto leading-relaxed">
                {t('teachers.ctaDesc')}
              </p>
              <a
                href="mailto:info@fdtu1al.uz"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0d89b1] rounded-xl hover:bg-gray-100 transition-all font-bold shadow-lg hover:shadow-xl text-sm"
              >
                <Mail size={18} />
                INFO@FDTU1AL.UZ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}