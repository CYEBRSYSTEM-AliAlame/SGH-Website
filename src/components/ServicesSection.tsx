import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Activity,
  Favorite,
  User,
  UserMultiple,
  Eyedropper,
  Hospital,
  Stethoscope,
  Medication,
} from '@carbon/icons-react'
import type { MedicalService } from '@/types'
import { cn } from '@/lib/utils'
import ScrollAnimation from './ScrollAnimation'

interface ServicesSectionProps {
  services: MedicalService[]
  lang?: string
}

const iconMap: { [key: string]: any } = {
  activity: Activity,
  heart: Favorite,
  brain: User,
  baby: UserMultiple,
  eye: Eyedropper,
  bone: Hospital,
  stethoscope: Stethoscope,
  syringe: Medication,
}

export default function ServicesSection({ services, lang = 'en' }: ServicesSectionProps) {
  const isRtl = lang === 'ar'

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-background relative pattern-geometric">
      {/* Lebanese Cultural Accent - Cedar Tree Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pattern-cedar opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Hospital className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {lang === 'ar' ? 'خدماتنا الطبية' : 'Our Medical Services'}
          </h2>
          {/* Lebanese Flag Colors in Gradient Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#ED1C24] mx-auto mb-4 rounded-full" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'رعاية شاملة ومهنية عبر مجموعة واسعة من التخصصات الطبية'
              : 'Comprehensive and professional care across a wide range of medical specialties'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service, index) => {
            const Icon = iconMap[service.service_icon_file] || Hospital
            const isPopular = index < 2 // First 2 services are "popular"
            return (
              <ScrollAnimation
                key={service.id}
                direction="up"
                delay={index * 50}
                className="h-full"
              >
                <Link
                  href={`/${lang}/services/${isRtl ? service.service_url_ar : service.service_url_en}`}
                  className="group card-warm hover:scale-105 hover:-translate-y-2 flex flex-col h-full relative"
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-accent to-accent-light text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {lang === 'ar' ? 'شائع' : 'Popular'}
                    </div>
                  )}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-light to-primary text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                    {lang === 'ar' ? (service as any).service_title_ar || service.service_title_en : service.service_title_en}
                  </h3>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {lang === 'ar'
                    ? (service as any).service_desc_ar || service.service_desc_en
                    : service.service_desc_en}
                </p>

                <div className="flex items-center gap-2 text-primary font-semibold text-sm mt-auto group-hover:gap-3 transition-all">
                  {lang === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                  <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                </div>
              </Link>
              </ScrollAnimation>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            {lang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}
            <ArrowRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
          </Link>
        </div>
      </div>
    </section>
  )
}
