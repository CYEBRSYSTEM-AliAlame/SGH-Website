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
    <section className="py-16 md:py-20 lg:py-24 bg-surface relative overflow-hidden">
      {/* Carbon Design System Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      
      {/* Glassmorphism Background Pattern Layer */}
      <div className="absolute inset-0">
        {/* Base Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f62fe' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Glassmorphism Overlay - Frosted Glass Effect */}
        <div className="absolute inset-0 backdrop-blur-[80px] bg-white/30" />
        
        {/* Additional Glass Layers for Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/3" />
        
        {/* Glass Border Effect - Subtle Inner Glow */}
        <div className="absolute inset-0 border border-white/30 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-primary mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 rounded-full border border-primary/20">
            <Hospital className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3 sm:mb-4 px-4">
            {lang === 'ar' ? 'خدماتنا الطبية' : 'Our Medical Services'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto px-4">
            {lang === 'ar'
              ? 'رعاية شاملة ومهنية عبر مجموعة واسعة من التخصصات الطبية'
              : 'Comprehensive and professional care across a wide range of medical specialties'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
                  className="group relative bg-surface rounded-xl border border-[#e0e0e0] hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Carbon Design System Accent on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary/0 group-hover:bg-primary transition-colors duration-300" />

                  {/* Card Header - HeroUI Style */}
                  <div className="px-4 sm:px-5 md:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4">
                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      {isPopular && (
                        <div className="ml-auto bg-primary text-white text-xs font-bold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-xl border-2 border-primary/20 flex-shrink-0 z-10 relative group-hover:bg-primary-hover group-hover:border-primary/40 transition-all duration-300">
                          <span className="relative z-10 whitespace-nowrap">{lang === 'ar' ? 'شائع' : 'Popular'}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300 leading-tight break-words">
                      {lang === 'ar' ? (service as any).service_title_ar || service.service_title_en : service.service_title_en}
                    </h3>
                  </div>

                  {/* Card Body - HeroUI Style */}
                  <div className="px-4 sm:px-5 md:px-6 pb-3 sm:pb-4 flex-grow">
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 break-words">
                      {lang === 'ar'
                        ? (service as any).service_desc_ar || service.service_desc_en
                        : service.service_desc_en}
                    </p>
                  </div>

                  {/* Card Footer - HeroUI Style */}
                  <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-3 sm:pt-4 border-t border-[#e0e0e0] group-hover:border-primary/30 transition-colors duration-300 mt-auto">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-primary group-hover:text-primary-hover transition-colors duration-300 break-words">
                        {lang === 'ar' ? 'اقرأ المزيد' : 'Read more'}
                      </span>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-primary/20 bg-primary/5 group-hover:bg-primary group-hover:border-primary flex items-center justify-center transition-all duration-300 flex-shrink-0">
                        <ArrowRight className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5", isRtl && "rotate-180 group-hover:-translate-x-0.5")} />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-300 pointer-events-none" />
                </Link>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 sm:mt-14 md:mt-16 text-center px-4">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white hover:bg-primary-hover font-semibold text-sm sm:text-base rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <span className="whitespace-nowrap">{lang === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
            <ArrowRight className={cn("w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0", isRtl && "rotate-180 group-hover:-translate-x-1")} />
          </Link>
        </div>
      </div>
    </section>
  )
}
