import { HeroSection } from '../components/home/HeroSection';
import { StatisticsSection } from '../components/home/StatisticsSection';
import { AboutSection } from '../components/home/AboutSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { NewsSection } from '../components/home/NewsSection';
import { AnnouncementsSection } from '../components/home/AnnouncementsSection';
import { FAQSection } from '../components/home/FAQSection';
import { SEO } from '../components/layout/SEO';

export function HomePage() {
  return (
    <div>
      <SEO />
      <HeroSection />
      <StatisticsSection />
      <AboutSection />
      <WhyUsSection />
      <NewsSection />
      <AnnouncementsSection />
      <FAQSection />
    </div>
  );
}
