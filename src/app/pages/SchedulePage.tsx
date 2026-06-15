import { Calendar, Clock, Download, FileText, Loader2, Info, BookOpen, ChevronRight, Home, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { scheduleService } from '../services/scheduleService';
import { ScheduleItem } from '../types';
import { Link } from 'react-router';
import { SEO } from '../components/layout/SEO';

export function SchedulePage() {
  const { t, i18n } = useTranslation();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await scheduleService.getSchedules();
        // Filter only active items and sort by sort_order
        const sortedData = data
          .filter(item => item.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);
        setSchedules(sortedData);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <Loader2 className="w-14 h-14 text-[#0d89b1] animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t('common.loading', 'Yuklanmoqda...')}</p>
        </div>
      </div>
    );
  }

  // Get the file URL for the first schedule item or null
  const scheduleFileUrl = schedules.length > 0 ? schedules[0].file : null;

  return (
    <>
      <SEO
        title={t('nav.schedule')}
        description={t('schedule.pageSubtitle')}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link to="/" className="text-gray-500 hover:text-[#0d89b1] transition-colors flex items-center gap-1">
                <Home size={16} />
                <span>{t('nav.home')}</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-900 dark:text-white font-bold">{t('nav.schedule')}</span>
            </nav>
          </div>
        </div>

        {/* Page Title */}
        <div className="py-12 md:py-16 text-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight"
            >
              {t('nav.schedule')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 mt-3 text-base md:text-lg font-medium max-w-2xl mx-auto"
            >
              {t('schedule.pageSubtitle')}
            </motion.p>
          </div>
        </div>

        {/* Schedule Info Section */}
        <section className="py-8 md:py-10 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/50"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#0d89b1]/10 dark:bg-[#0d89b1]/20 rounded-xl flex-shrink-0">
                    <Info size={24} className="text-[#0d89b1]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t('schedule.infoTitle')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                      {t('schedule.infoDesc')}
                    </p>

                    {/* Timetable */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-white dark:bg-gray-900/60 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          {t('schedule.timeTitle')}
                        </h3>
                        <div className="space-y-2">
                          {[
                            { lesson: '1', time: '08:30 - 09:15' },
                            { lesson: '2', time: '09:25 - 10:10' },
                            { lesson: '3', time: '10:20 - 11:05' },
                            { lesson: '4', time: '11:15 - 12:00' },
                            { lesson: '5', time: '12:10 - 12:55' },
                          ].map((item) => (
                            <div key={item.lesson} className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400 font-medium">
                                {item.lesson}-{t('schedule.lesson')}
                              </span>
                              <span className="text-gray-900 dark:text-white font-bold">{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-900/60 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          {t('schedule.timeTitle')}
                        </h3>
                        <div className="space-y-2">
                          {[
                            { lesson: '6', time: '13:35 - 14:20' },
                            { lesson: '7', time: '14:30 - 15:15' },
                            { lesson: '8', time: '15:25 - 16:10' },
                            { lesson: '9', time: '16:20 - 17:05' },
                          ].map((item) => (
                            <div key={item.lesson} className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400 font-medium">
                                {item.lesson}-{t('schedule.lesson')}
                              </span>
                              <span className="text-gray-900 dark:text-white font-bold">{item.time}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                            <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                              <Clock size={14} />
                              {t('schedule.break')}
                            </span>
                            <span className="text-amber-600 dark:text-amber-400 font-bold">12:55 - 13:35</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Schedule Documents List */}
        <section className="py-8 md:py-12 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-[#0d89b1]/10 rounded-lg">
                    <FileText size={20} className="text-[#0d89b1]" />
                  </div>
                  {t('nav.schedule')}
                </h2>
              </motion.div>

              <div className="space-y-4">
                {schedules.length > 0 ? (
                  schedules.map((schedule, index) => {
                    const trans = scheduleService.getTranslation(schedule, i18n.language);
                    return (
                      <motion.div
                        key={schedule.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={schedule.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-5 md:p-6 bg-white dark:bg-gray-900 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all group border border-gray-100 dark:border-gray-800 hover:border-[#0d89b1]/30 dark:hover:border-[#0d89b1]/30 hover:shadow-lg hover:shadow-[#0d89b1]/5"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="p-3 bg-gradient-to-br from-[#0d89b1]/10 to-cyan-500/10 dark:from-[#0d89b1]/20 dark:to-cyan-500/20 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                              <BookOpen size={24} className="text-[#0d89b1]" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white block truncate">
                                {trans.title || `${t('nav.schedule')} - ${index + 1}`}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                                <FileText size={12} />
                                PDF
                                <span className="mx-1">•</span>
                                <Calendar size={12} />
                                {new Date(schedule.created_at).toLocaleDateString(i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className="hidden sm:inline text-sm text-[#0d89b1] font-medium group-hover:underline">
                              {t('schedule.downloadBtn')}
                            </span>
                            <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm group-hover:bg-[#0d89b1] group-hover:text-white transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#0d89b1]/20">
                              <Download size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
                  >
                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full inline-flex mb-4">
                      <FileText size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                      {t('common.notFound')}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      {t('schedule.pageSubtitle')}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        {scheduleFileUrl && (
          <section className="py-8 md:py-12 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-6 md:p-8 border border-emerald-100 dark:border-emerald-900/50 text-center"
                >
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl inline-flex mb-4">
                    <ExternalLink size={24} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {t('nav.schedule')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 max-w-md mx-auto">
                    {t('schedule.pageSubtitle')}
                  </p>
                  <a
                    href={scheduleFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d89b1] hover:bg-[#0a7a9e] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#0d89b1]/20 hover:shadow-xl hover:shadow-[#0d89b1]/30"
                  >
                    <Download size={18} />
                    {t('schedule.downloadBtn')}
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}