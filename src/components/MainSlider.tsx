'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight, Hospital, UserMultiple, ChevronDown, Calendar, Play, Checkmark } from '@carbon/icons-react'
import type { Slider } from '@/types'
import { cn } from '@/lib/utils'

// Using images from public/images/main_slider/ for consistency
const operatingRoomImg = '/images/main_slider/operating-room.png'
const doctorPatientImg = '/images/main_slider/doctor-patient.png'
const mriImg = '/images/main_slider/mri.png'

// Helper function to normalize image paths and handle SVG files
const getImageSrc = (slide: any): string => {
  let src = ''
  
  if ((slide as any).image) {
    src = typeof (slide as any).image === 'string' 
      ? (slide as any).image 
      : (slide as any).image.src
  } else if ((slide as any).slide_image_file) {
    src = (slide as any).slide_image_file.startsWith('/') 
      ? (slide as any).slide_image_file 
      : `/images/main_slider/${(slide as any).slide_image_file}`
  } else {
    src = '/images/main_slider/Main-SGH 1.svg'
  }
  
  return src
}

// Check if image is SVG
const isSvgImage = (src: string): boolean => {
  return src.toLowerCase().endsWith('.svg')
}

interface MainSliderProps {
  slides: Slider[]
  lang?: string
}

export default function MainSlider({ slides, lang = 'en' }: MainSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const isRtl = lang === 'ar'

  // Default high-quality slides if DB is empty - Using images from public/images/main_slider/
  const defaultSlides = [
    {
      id: 101,
      image: '/images/main_slider/Main-SGH 1.svg',
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

  // Use slides from props if available, otherwise use default slides
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [mounted, activeSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[700px] md:h-[800px] lg:h-[900px] xl:h-[1000px] overflow-hidden">
      {activeSlides.map((slide, index) => {
        const imageSrc = getImageSrc(slide)
        const isSvg = isSvgImage(imageSrc)
        const isActive = index === currentSlide
        
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              isActive ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
            )}
          >
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 transform transition-transform duration-1000 ease-out" style={{ 
              transform: isActive ? 'scale(1)' : 'scale(1.1)'
            }}>
              {isSvg ? (
                <img
                  src={imageSrc}
                  alt={lang === 'ar' ? (slide as any).header1_ar || slide.header1_en : slide.header1_en}
                  className="w-full h-full object-cover object-center"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    if (!target.src.includes('doctor-patient.png')) {
                      target.src = '/images/main_slider/doctor-patient.png'
                    }
                  }}
                />
              ) : (
                <Image
                  src={imageSrc}
                  alt={lang === 'ar' ? (slide as any).header1_ar || slide.header1_en : slide.header1_en}
                  fill
                  priority={index === 0}
                  quality={95}
                  unoptimized={false}
                  className="object-cover object-center"
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    if (!target.src.includes('doctor-patient.png')) {
                      target.src = '/images/main_slider/doctor-patient.png'
                    }
                  }}
                />
              )}
            </div>

            {/* Dynamic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
        )
      })}

      {/* Main Content - Split Layout */}
      <div className="relative h-full container mx-auto px-4 md:px-6 lg:px-8 z-20">
        <div className="h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content Section */}
          <div className={cn(
            "flex-1 flex flex-col justify-center pt-20 lg:pt-0",
            isRtl && "lg:order-2"
          )}>
            <div className="space-y-6 md:space-y-8 max-w-2xl">
              {/* Badge with Animation */}
              <div className={cn(
                "inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg",
                "animate-fade-in-up"
              )}>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Hospital className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm md:text-base font-semibold text-white">
                  {lang === 'ar' ? 'مستشفى الساحل العام - لبنان' : 'Sahel General Hospital - Lebanon'}
                </span>
              </div>

              {/* Main Heading with Stagger Animation */}
              <div className="space-y-4">
                <h1 className={cn(
                  "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight",
                  "animate-fade-in-up",
                  "drop-shadow-2xl"
                )}>
                  {lang === 'ar' 
                    ? (activeSlides[currentSlide] as any).header1_ar || activeSlides[currentSlide].header1_en 
                    : activeSlides[currentSlide].header1_en}
                </h1>
                
                <p className={cn(
                  "text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl",
                  "animate-fade-in-up"
                )}>
                  {lang === 'ar' 
                    ? (activeSlides[currentSlide] as any).header2_ar || activeSlides[currentSlide].header2_en 
                    : activeSlides[currentSlide].header2_en}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {activeSlides[currentSlide].link_url && (
                  <a
                    href={activeSlides[currentSlide].link_url}
                    className={cn(
                      "group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary",
                      "hover:bg-primary hover:text-white font-bold text-base rounded-xl",
                      "transition-all duration-300 hover:shadow-2xl hover:scale-105",
                      "border-2 border-white"
                    )}
                  >
                    <span>{lang === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
                    <ArrowRight className={cn(
                      "w-5 h-5 transition-transform duration-300 group-hover:translate-x-1",
                      isRtl && "rotate-180 group-hover:-translate-x-1"
                    )} />
                  </a>
                )}
                
                <button className={cn(
                  "group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white",
                  "hover:bg-white/20 font-semibold text-base rounded-xl border-2 border-white/30",
                  "transition-all duration-300 hover:shadow-xl hover:scale-105"
                )}>
                  <Play className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'شاهد الفيديو' : 'Watch Video'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Checkmark className="w-5 h-5 text-success" />
                  <span className="text-sm md:text-base">{lang === 'ar' ? '40+ سنة خبرة' : '40+ Years Experience'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Checkmark className="w-5 h-5 text-success" />
                  <span className="text-sm md:text-base">{lang === 'ar' ? '309+ طبيب' : '309+ Doctors'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Checkmark className="w-5 h-5 text-success" />
                  <span className="text-sm md:text-base">{lang === 'ar' ? 'رعاية شاملة' : 'Comprehensive Care'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Stats Cards Section */}
          <div className={cn(
            "flex flex-col gap-4 w-full lg:w-auto lg:min-w-[280px]",
            isRtl && "lg:order-1"
          )}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <UserMultiple className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">309+</div>
                  <div className="text-sm text-white/80">{lang === 'ar' ? 'طبيب متخصص' : 'Expert Doctors'}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-success/20 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">40+</div>
                  <div className="text-sm text-white/80">{lang === 'ar' ? 'سنة من التميز' : 'Years of Excellence'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-md border-t border-white/10",
        "px-4 md:px-8 py-4"
      )}>
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "w-12 bg-white" 
                    : "w-2 bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className={cn("w-5 h-5", isRtl && "rotate-180")} />
            </button>
            
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            {lang === 'ar' ? 'انتقل للأسفل' : 'Scroll Down'}
          </span>
          <ChevronDown className="w-5 h-5 text-white/80" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-40">
        <div
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / activeSlides.length) * 100}%` }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
