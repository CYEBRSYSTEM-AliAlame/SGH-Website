'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Hospital, UserMultiple, ChevronDown } from '@carbon/icons-react'
import type { Slider } from '@/types'
import { cn } from '@/lib/utils'

import exteriorImg from '@/assets/hero/exterior.png'
import operatingRoomImg from '@/assets/hero/operating-room.png'
import doctorPatientImg from '@/assets/hero/doctor-patient.png'
import mriImg from '@/assets/hero/mri.png'

interface MainSliderProps {
  slides: Slider[]
  lang?: string
}

export default function MainSlider({ slides, lang = 'en' }: MainSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isRtl = lang === 'ar'

  // Default high-quality slides if DB is empty - Warm, welcoming, Lebanese-friendly
  const defaultSlides = [
    {
      id: 101,
      image: exteriorImg,
      header1_en: 'Welcome to Sahel General Hospital',
      header2_en: 'Your trusted healthcare partner in Lebanon for over 40 years',
      header1_ar: 'مرحباً بكم في مستشفى الساحل العام',
      header2_ar: 'شريككم الموثوق في الرعاية الصحية في لبنان لأكثر من 40 عاماً',
      link_url: `/${lang}/about-us`,
      isLocal: true
    },
    {
      id: 102,
      image: doctorPatientImg,
      header1_en: 'Caring for Your Family Like Our Own',
      header2_en: 'Compassionate medical care with a personal touch',
      header1_ar: 'نعتني بعائلتكم كما نعتني بعائلتنا',
      header2_ar: 'رعاية طبية رحيمة بلمسة شخصية',
      link_url: `/${lang}/our-doctors`,
      isLocal: true
    },
    {
      id: 103,
      image: operatingRoomImg,
      header1_en: 'Excellence in Every Step',
      header2_en: 'Advanced technology meets compassionate care',
      header1_ar: 'التميز في كل خطوة',
      header2_ar: 'التكنولوجيا المتقدمة تلتقي بالرعاية الرحيمة',
      link_url: `/${lang}/medical-division`,
      isLocal: true
    },
    {
      id: 104,
      image: mriImg,
      header1_en: 'Your Health, Our Priority',
      header2_en: 'Comprehensive care for you and your loved ones',
      header1_ar: 'صحتكم، أولويتنا',
      header2_ar: 'رعاية شاملة لكم ولأحبائكم',
      link_url: `/${lang}/services`,
      isLocal: true
    }
  ]

  // Use generated slides as primary content for the redesign
  const activeSlides = defaultSlides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [activeSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  return (
    <section className="relative h-[600px] md:h-[750px] bg-gradient-to-br from-primary via-primary-light to-primary-hover text-white overflow-hidden group">
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[10s]"
              style={{
                backgroundImage: `url(${(slide as any).image ? (slide as any).image.src : `/images/main_slider/${(slide as any).slide_image_file}`})`,
              }}
            />

            {/* Warm Mediterranean Overlay - Soft teal/cyan tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary-light/50 to-primary-hover/70 z-0" />

            {/* Warm Gradient Overlay - Soft and welcoming */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-0" />

            {/* Bottom Gradient for text readability - warmer tone */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 via-primary/80 to-transparent z-0" />
            
            {/* Subtle pattern overlay for texture */}
            <div className="absolute inset-0 opacity-5 z-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 4c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-3xl pt-20">
              {/* Hospital Badge */}
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                <Hospital className="w-4 h-4 text-white" />
                <span>{lang === 'ar' ? 'مستشفى الساحل العام - لبنان' : 'Sahel General Hospital - Lebanon'}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-normal mb-6 leading-tight text-white drop-shadow-lg">
                {lang === 'ar' ? (slide as any).header1_ar || slide.header1_en : slide.header1_en}
              </h1>
              <h2 className="text-xl md:text-2xl text-white/95 mb-10 font-normal leading-relaxed drop-shadow-md max-w-2xl">
                {lang === 'ar' ? (slide as any).header2_ar || slide.header2_en : slide.header2_en}
              </h2>

              {slide.link_url && (
                <a
                  href={slide.link_url}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-cream px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-2xl animate-fade-in-up delay-300"
                >
                  {lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                  <ArrowRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
                </a>
              )}
            </div>
          </div>
          
          {/* Lebanese Flag Colors Accent - Subtle */}
          <div className="absolute top-0 right-0 w-32 h-full opacity-10 pattern-cedar z-0" />
          <div className="absolute bottom-0 left-0 w-1 h-32 bg-gradient-to-t from-[#00A651] via-[#FFFFFF] to-[#ED1C24] opacity-20 z-10" />
        </div>
      ))}

      {/* Controls */}
      <div className={cn(
        "absolute bottom-0 z-20 flex bg-white/10 backdrop-blur-md rounded-t-2xl",
        isRtl ? "left-0" : "right-0"
      )}>
        <button
          onClick={prevSlide}
          className="p-6 hover:bg-white/20 text-white transition-all rounded-tl-2xl border-r border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className={cn("w-6 h-6", isRtl && "rotate-180")} />
        </button>
        <button
          onClick={nextSlide}
          className="p-6 hover:bg-white/20 text-white transition-all rounded-tr-2xl"
          aria-label="Next slide"
        >
          <ChevronRight className={cn("w-6 h-6", isRtl && "rotate-180")} />
        </button>
      </div>

      {/* Progress Bar - Warmer color */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${((currentSlide + 1) / activeSlides.length) * 100}%` }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-white/80">
          <span className="text-xs font-semibold uppercase tracking-wider">
            {lang === 'ar' ? 'انتقل للأسفل' : 'Scroll Down'}
          </span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* Trust Badge - Top Right */}
      <div className={cn(
        "absolute top-8 z-20 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30",
        isRtl ? "left-8" : "right-8"
      )}>
        <div className="flex items-center gap-2 text-white">
          <UserMultiple className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {lang === 'ar' ? '309+ طبيب' : '309+ Doctors'}
          </span>
        </div>
      </div>
    </section>
  )
}
