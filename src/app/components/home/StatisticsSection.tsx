import { useState, useEffect } from 'react';
import { statisticService } from '../../services/statisticService';
import { StatItem } from '../../types';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export function StatisticsSection() {
  const { t, i18n } = useTranslation();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statisticService.getStatistics();
        // Sort by sort_order
        const sortedStats = [...data].sort((a, b) => a.sort_order - b.sort_order);
        setStats(sortedStats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!loading && stats.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden" ref={ref}>
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc1NDU4MzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Statistika"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d89b1]/40 to-gray-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
            {t('home.stats.title', 'Litseyimiz raqamlarda')}
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-[0.2em] opacity-80">
            {t('home.stats.subtitle', 'Bizning yutuqlarimiz va ko\'rsatkichlarimiz')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-xl rounded-xl p-8 text-center border border-white/10 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-10 w-20 bg-white/10 rounded-md animate-pulse mb-3"></div>
                <div className="h-3 w-24 bg-white/10 rounded-md animate-pulse"></div>
              </div>
            </div>
          ))}

          {!loading && stats.map((stat, index) => {
            const translation = statisticService.getTranslation(stat, i18n.language);
            
            // Handle numeric values
            const valueStr = String(stat.value);
            const numericValue = parseInt(valueStr.replace(/\D/g, '')) || 0;
            const suffix = valueStr.replace(/[0-9]/g, '');

            return (
              <div
                key={stat.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-white/5 backdrop-blur-xl rounded-xl p-8 text-center border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#0d89b1]/10 rounded-full blur-2xl group-hover:bg-[#0d89b1]/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                    {inView ? (
                      <CountUp end={numericValue} duration={3} suffix={suffix} />
                    ) : (
                      '0'
                    )}
                  </div>
                  
                  <div className="text-[10px] md:text-xs font-black text-[#0d89b1] uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                    {translation.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
