import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import { sliderService } from '../../services/sliderService';
import { SliderItem } from '../../types';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await sliderService.getSliders();
        setSliders(data.filter(s => s.is_active).sort((a, b) => a.sort_order - b.sort_order));
      } catch (error) {
        console.error('Error fetching sliders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  // Show immediate fallback/default content while loading or if no sliders
  if (loading || sliders.length === 0) {
    return (
      <section className="relative h-[80vh] md:h-[95vh] min-h-[600px] overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://www.samdu.uz/upload/cover-images/62b00cc62723f-62b00cc627241-62b00cc627242-62b00cc627243.png"
            alt="FDTU 1-son Akademik Litseyi"
            className="w-full h-full object-cover opacity-50"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/20 z-[1]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d89b1]/90 via-[#0d89b1]/40 to-transparent md:w-[65%] z-[2]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d89b1]/40 via-transparent to-transparent z-[3]"></div>
          <div className="absolute inset-0 bg-[#0d89b1]/5 mix-blend-overlay z-[4]"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#0d89b1]/15 backdrop-blur-xl rounded-full text-xs font-black mb-8 uppercase tracking-[0.3em] border border-[#0d89b1]/40"
            >
              <span className="w-2 h-2 bg-[#0d89b1] rounded-full animate-pulse"></span>
              {t('home.heroBadge', 'LITSEYIMIZNING YANGI DAVRI')}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black mb-6 leading-tight uppercase"
            >
              {t('home.heroTitle')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-gray-200 mb-10 font-bold opacity-90 max-w-2xl border-l-4 border-[#0d89b1] pl-8 italic"
            >
              {t('home.heroDesc')}
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] md:h-[95vh] min-h-[600px] overflow-hidden bg-gray-950 group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        parallax={true}
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={sliders.length > 1}
        className="h-full w-full hero-swiper"
      >
        {sliders.map((slider, index) => {
          const translation = sliderService.getTranslation(slider, i18n.language);
          return (
            <SwiperSlide key={slider.id} className="w-full h-full relative">
              {/* Background Image Container */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full overflow-hidden"
                  data-swiper-parallax="30%"
                >
                  <ImageWithFallback
                    src={slider.image}
                    alt={translation.title}
                    className="w-full h-full object-cover transform-gpu slide-zoom-image"
                    priority={index === 0}
                  />
                </div>
                {/* Optimized overlays: Brand color #0d89b1 gradient only on the left for text, clear image in the center/right */}
                <div className="absolute inset-0 bg-black/10 z-[1]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d89b1]/90 via-[#0d89b1]/40 to-transparent md:w-[65%] z-[2]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d89b1]/40 via-transparent to-transparent z-[3]"></div>
                <div className="absolute inset-0 bg-[#0d89b1]/5 mix-blend-overlay z-[4]"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-4xl text-white">
                    <div 
                      data-swiper-parallax="-300"
                      className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-[#0d89b1]/15 backdrop-blur-xl rounded-full text-[10px] md:text-xs font-black mb-6 md:mb-8 uppercase tracking-[0.3em] border border-[#0d89b1]/40 shadow-[0_0_20px_rgba(13,137,177,0.2)]"
                    >
                      <span className="w-2 h-2 bg-[#0d89b1] rounded-full animate-pulse shadow-[0_0_10px_#0d89b1]"></span>
                      {t('home.heroBadge', 'LITSEYIMIZNING YANGI DAVRI')}
                    </div>
                  
                  <h1 
                    data-swiper-parallax="-500"
                    className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1.1] tracking-tight uppercase"
                  >
                    <span className="block text-white">
                      {translation.title}
                    </span>
                  </h1>
                  
                  <p 
                    data-swiper-parallax="-700"
                    className="text-lg md:text-2xl text-gray-200 mb-8 md:mb-12 leading-relaxed font-bold opacity-90 max-w-2xl border-l-4 border-[#0d89b1] pl-6 md:pl-8 italic"
                  >
                    {translation.description}
                  </p>
                  
                  <div 
                    data-swiper-parallax="-900"
                    className="flex flex-wrap gap-4 md:gap-6"
                  >
                    <Link
                      to="/admission"
                      className="group/btn relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-6 bg-[#0d89b1] text-white rounded-xl hover:bg-[#0d89b1] transition-all duration-500 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl"
                    >
                      {t('home.admissionBtn')}
                      <ChevronRight size={20} className="md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-white/5 backdrop-blur-xl text-white rounded-xl hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-1 font-black uppercase tracking-[0.2em] text-xs md:text-sm border border-white/10"
                    >
                      {t('home.moreBtn')}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Controls Wrapper */}
        <div className="absolute bottom-10 left-0 right-0 z-30 container mx-auto px-4 flex items-center justify-between pointer-events-none">
          {/* Custom Pagination Container */}
          <div className="custom-pagination flex gap-3 md:gap-4 pointer-events-auto"></div>
          
          {/* Custom Navigation Container */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto">
            <button className="swiper-button-prev-custom group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#0d89b1] hover:border-[#0d89b1] transition-all duration-500">
              <ChevronRight size={28} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button className="swiper-button-next-custom group w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#0d89b1] hover:border-[#0d89b1] transition-all duration-500">
              <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </Swiper>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3 opacity-50 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0d89b1] to-transparent animate-bounce"></div>
      </div>

      {/* Decorative Bottom Gradient for Section Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-20 pointer-events-none"></div>

      <style>{`
        .hero-swiper .swiper-slide {
          opacity: 0 !important;
          transition-property: opacity;
        }
        .hero-swiper .swiper-slide-active {
          opacity: 1 !important;
        }
        .slide-zoom-image {
          animation: slide-zoom 15s infinite alternate ease-in-out;
        }
        @keyframes slide-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .custom-bullet {
          width: 40px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          display: inline-block;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .custom-bullet { width: 60px; height: 4px; }
        }
        .custom-bullet-active {
          background: rgba(255, 255, 255, 0.4);
          width: 60px;
        }
        @media (min-width: 768px) {
          .custom-bullet-active { width: 100px; }
        }
        .custom-bullet-active::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #0d89b1;
          animation: progress-line 6s linear forwards;
          transform-origin: left;
        }
        @keyframes progress-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
