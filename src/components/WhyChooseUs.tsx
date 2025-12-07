'use client'

import { Trophy, UserMultiple, Time, Security, Hospital } from '@carbon/icons-react'
import ScrollAnimation from './ScrollAnimation'

interface WhyChooseUsProps {
  lang?: string
}

export default function WhyChooseUs({ lang = 'en' }: WhyChooseUsProps) {
  const features = [
    {
      icon: Trophy,
      title: lang === 'ar' ? '40+ سنة من الخبرة' : '40+ Years of Experience',
      description: lang === 'ar' 
        ? 'خبرة طويلة في تقديم رعاية صحية متميزة' 
        : 'Long-standing expertise in delivering exceptional healthcare',
      color: 'from-primary to-primary-hover',
    },
    {
      icon: UserMultiple,
      title: lang === 'ar' ? '309 أطباء متخصصين' : '309 Specialist Doctors',
      description: lang === 'ar'
        ? 'فريق من الأطباء المؤهلين تأهيلاً عالياً'
        : 'Team of highly qualified medical professionals',
      color: 'from-primary-light to-primary',
    },
    {
      icon: Time,
      title: lang === 'ar' ? 'رعاية على مدار الساعة' : '24/7 Care',
      description: lang === 'ar'
        ? 'خدمات طوارئ وطبية متاحة دائماً'
        : 'Emergency and medical services always available',
      color: 'from-accent-light to-accent',
    },
    {
      icon: Security,
      title: lang === 'ar' ? 'معايير الجودة العالمية' : 'International Quality Standards',
      description: lang === 'ar'
        ? 'التزام بأعلى معايير الرعاية الصحية'
        : 'Commitment to the highest healthcare standards',
      color: 'from-[#00A651] to-[#2d5016]',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream relative pattern-geometric">
      <div className="absolute inset-0 pattern-cedar opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="fade">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Hospital className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                {lang === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {lang === 'ar' ? 'لماذا تختار مستشفى الساحل' : 'Why Choose Sahel General Hospital'}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'نحن ملتزمون بتقديم أفضل رعاية صحية ممكنة'
                : 'We are committed to providing the best possible healthcare'}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <ScrollAnimation
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <div className="group h-full bg-white rounded-2xl p-8 border border-warm-gray/50 hover:border-primary transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
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

