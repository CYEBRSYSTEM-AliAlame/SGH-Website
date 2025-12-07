import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import MainSlider from '@/components/MainSlider'
import QuickAccess from '@/components/QuickAccess'
import ServicesSection from '@/components/ServicesSection'
import EnhancedStatsSection from '@/components/EnhancedStatsSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import MedicalDashboard from '@/components/MedicalDashboard'
import FeaturedDoctors from '@/components/FeaturedDoctors'
import FindDoctorSection from '@/components/FindDoctorSection'
import SatisfactionMetrics from '@/components/SatisfactionMetrics'
import TestimonialsSection from '@/components/TestimonialsSection'
import TrustBadges from '@/components/TrustBadges'
import EventsSection from '@/components/EventsSection'
import FloatingContactButton from '@/components/FloatingContactButton'

import { type Locale } from '@/lib/i18n'
import { medicalService } from '@/services/medicalService'
import { eventService } from '@/services/eventService'
import { sliderService } from '@/services/sliderService'

// Dynamically import heavy components to improve initial load
const InteractiveBodyExplorer = dynamic(
  () => import('@/components/InteractiveBodyExplorer'),
  { 
    loading: () => null // Don't show loading indicator
  }
)

const AboutSection = dynamic(
  () => import('@/components/AboutSection'),
  {
    loading: () => null // Don't show loading indicator
  }
)

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale = (lang === 'ar' || lang === 'en' ? lang : 'en') as Locale
  
  // Fetch slider first (critical for LCP), then other data in parallel
  // This allows the slider to render immediately while other data loads
  try {
    const slider = await sliderService.getAll()
    
    // Start fetching other data but don't block on it
    const [services, events] = await Promise.all([
      medicalService.getAll().catch(() => []),
      eventService.getAll().catch(() => []),
    ])

    return (
      <>
        {/* Hero Section - Render immediately for LCP */}
        <MainSlider slides={slider || []} lang={locale} />

        {/* Quick Access Actions */}
        <QuickAccess lang={locale} />

        {/* Services Grid */}
        <ServicesSection services={services || []} lang={locale} />

        {/* Interactive Body Explorer */}
        <Suspense fallback={null}>
          <InteractiveBodyExplorer lang={locale} />
        </Suspense>

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
        <Suspense fallback={null}>
          <AboutSection lang={locale} />
        </Suspense>

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

