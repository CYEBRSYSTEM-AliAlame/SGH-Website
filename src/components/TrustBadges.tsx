'use client'

import { Trophy, Security, CheckboxChecked, LocationStar, Hospital } from '@carbon/icons-react'
import ScrollAnimation from './ScrollAnimation'

interface TrustBadgesProps {
  lang?: string
}

export default function TrustBadges({ lang = 'en' }: TrustBadgesProps) {
  const badges = [
    {
      icon: Trophy,
      title: lang === 'ar' ? 'معتمد' : 'Accredited',
      description: lang === 'ar' ? 'مستشفى معتمد' : 'Accredited Hospital',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Security,
      title: lang === 'ar' ? 'جودة عالية' : 'Quality Assured',
      description: lang === 'ar' ? 'معايير الجودة العالمية' : 'International Quality Standards',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: CheckboxChecked,
      title: lang === 'ar' ? 'موثوق' : 'Trusted',
      description: lang === 'ar' ? '40+ سنة من الخبرة' : '40+ Years of Experience',
      color: 'text-[#00A651]',
      bgColor: 'bg-green-50',
    },
    {
      icon: LocationStar,
      title: lang === 'ar' ? 'متميز' : 'Excellence',
      description: lang === 'ar' ? 'رعاية صحية متميزة' : 'Excellence in Healthcare',
      color: 'text-accent',
      bgColor: 'bg-red-50',
    },
  ]

  return (
    <section className="py-16 bg-white border-y border-warm-gray/30">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="fade">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Hospital className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {lang === 'ar' ? 'ثقتكم' : 'Your Trust'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              {lang === 'ar' ? 'معتمد وموثوق' : 'Accredited & Trusted'}
            </h3>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <ScrollAnimation
                key={index}
                direction="up"
                delay={index * 100}
              >
                <div className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${badge.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className={`w-8 h-8 ${badge.color}`} />
                  </div>
                  <h4 className="font-bold text-text-primary mb-1 text-sm md:text-base">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {badge.description}
                  </p>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}

