import dynamic from 'next/dynamic'
import MainSlider from '@/components/MainSlider'
import QuickAccess from '@/components/QuickAccess'
import ServicesSection from '@/components/ServicesSection'
import EnhancedStatsSection from '@/components/EnhancedStatsSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import MedicalDashboard from '@/components/MedicalDashboard'
import FeaturedDoctors from '@/components/FeaturedDoctors'
import FindDoctorSection from '@/components/FindDoctorSection'
import SatisfactionMetrics from '@/components/SatisfactionMetrics'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import TrustBadges from '@/components/TrustBadges'
import EventsSection from '@/components/EventsSection'
import FloatingContactButton from '@/components/FloatingContactButton'

import { type Locale } from '@/lib/i18n'
import { medicalService } from '@/services/medicalService'
import { eventService } from '@/services/eventService'
import { sliderService } from '@/services/sliderService'

// Dynamically import InteractiveBodyExplorer to avoid bundling issues on other pages
const InteractiveBodyExplorer = dynamic(
  () => import('@/components/InteractiveBodyExplorer'),
  { loading: () => <div className="py-20" /> }
)

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang === 'ar' || lang === 'en' ? lang : 'en') as Locale
  
  // Fetch data directly from services (no HTTP calls)
  try {
    const [services, events, slider] = await Promise.all([
      medicalService.getAll(),
      eventService.getAll(),
      sliderService.getAll(),
    ])

    return (
      <>
        {/* Hero Section */}
        <MainSlider slides={slider || []} lang={locale} />

        {/* Quick Access Actions */}
        <QuickAccess lang={locale} />

        {/* Services Grid */}
        <ServicesSection services={services || []} lang={locale} />

        {/* Interactive Body Explorer */}
        <InteractiveBodyExplorer lang={locale} />

        {/* Enhanced Stats & Trust */}
        <EnhancedStatsSection lang={locale} />

        {/* Why Choose Us */}
        <WhyChooseUs lang={locale} />

        {/* Medical Performance Dashboard */}
        <MedicalDashboard lang={locale} />

        {/* Featured Doctors */}
        <FeaturedDoctors lang={locale} />

        {/* Find Doctor & CTA */}
        <FindDoctorSection lang={locale} />

        {/* Patient Satisfaction Metrics */}
        <SatisfactionMetrics lang={locale} />

        {/* Trust Badges */}
        <TrustBadges lang={locale} />

        {/* About & History */}
        <AboutSection lang={locale} />

        {/* Testimonials */}
        <TestimonialsSection lang={locale} />

        {/* Latest News */}
        <EventsSection events={events || []} lang={locale} />

        {/* Floating Contact Button */}
        <FloatingContactButton lang={locale} />
      </>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return (
      <main className="container mx-auto px-4 py-8">
        <p className="text-center text-text-secondary">Error loading content. Please try again later.</p>
      </main>
    )
  }
}

