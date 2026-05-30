import { Mail, Phone, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teacherService } from '../services/teacherService';
import { Teacher } from '../types';
import { Skeleton } from '../components/ui/skeleton';
import { SEO } from '../components/layout/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function TeachersPage() {
  const { t, i18n } = useTranslation();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const currentLang = i18n.language || 'uz';

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await teacherService.getAllTeachers();
        // Sort by sort_order and filter only active members
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
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO 
        title={t('nav.teachers')} 
        description={t('teachers.pageSubtitle')}
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
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">{t('nav.teachers')}</h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t('teachers.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Teachers Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-950 rounded-[20px] overflow-hidden shadow-sm p-5 border border-gray-100 dark:border-gray-800">
                  <Skeleton className="aspect-[4/5] rounded-[15px] w-full mb-6" />
                  <div className="px-3 pb-5">
                    <Skeleton className="h-8 w-3/4 mb-6" />
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-6 w-1/2" />
                    </div>
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
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-950 rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col group"
                  >
                    {/* Image Section */}
                    <div className="p-5">
                      <div className="aspect-[4/5] overflow-hidden rounded-[15px] bg-gray-100 dark:bg-gray-800">
                        <ImageWithFallback
                          src={teacher.photo}
                          alt={teacher.full_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pb-10 flex flex-col flex-grow">
                      <h3 className="text-[28px] font-bold text-[#2d3e50] dark:text-white mb-6 leading-tight tracking-tight">
                        {teacher.full_name}
                      </h3>
                      
                      <div className="space-y-5">
                        {/* Position */}
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex-shrink-0">
                            <Award className="w-6 h-6 text-blue-500" />
                          </div>
                          <p className="text-[#334155] dark:text-gray-300 text-lg font-medium leading-snug">
                            {translation.position}
                          </p>
                        </div>

                        {/* Phone */}
                        {teacher.phone && (
                          <a
                            href={`tel:${teacher.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-4 text-[#334155] dark:text-gray-300 hover:text-emerald-600 transition-colors group/link"
                          >
                            <div className="flex-shrink-0">
                              <Phone className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="text-lg font-medium tracking-tight">{teacher.phone}</span>
                          </a>
                        )}

                        {/* Email */}
                        {teacher.email && (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="flex items-center gap-4 text-[#334155] dark:text-gray-300 hover:text-rose-500 transition-colors group/link"
                          >
                            <div className="flex-shrink-0">
                              <Mail className="w-6 h-6 text-rose-500" />
                            </div>
                            <span className="text-lg font-medium tracking-tight">{teacher.email}</span>
                          </a>
                        )}
                      </div>

                      {(teacher.academic_degree || teacher.academic_rank) && (
                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium italic leading-relaxed">
                            {[teacher.academic_degree, teacher.academic_rank].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0d89b1] to-[#0d89b1] rounded-lg p-16 text-center text-white shadow-2xl relative overflow-hidden" data-aos="zoom-in">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center mx-auto mb-10 shadow-inner border border-white/20">
                <Mail size={48} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
                {t('teachers.ctaTitle')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-bold opacity-90 uppercase tracking-widest">
                {t('teachers.ctaDesc')}
              </p>
              <a
                href="mailto:info@fstu.uz"
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#0d89b1] rounded-lg hover:bg-gray-100 transition-all font-black shadow-2xl hover:scale-105 uppercase tracking-[0.2em] text-sm"
              >
                <Mail size={28} />
                INFO@FSTU.UZ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
