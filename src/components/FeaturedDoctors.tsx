'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Stethoscope, ArrowRight, Hospital, Trophy, LocationStar } from '@carbon/icons-react'
import { cn } from '@/lib/utils'
import type { Doctor } from '@/types'
import { getDoctorImagePath } from '@/lib/doctorHelpers'

interface FeaturedDoctorsProps {
  lang?: string
}

export default function FeaturedDoctors({ lang = 'en' }: FeaturedDoctorsProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const isRtl = lang === 'ar'

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Fetch heads of department via API
        const res = await fetch('/api/doctors?head_of_dep=true')
        if (res.ok) {
          const data = await res.json()
          setDoctors((data.doctors || []).slice(0, 6)) // Show top 6
        }
      } catch (error) {
        console.error('Error fetching featured doctors:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  // Always render to avoid hooks violation - conditionally show content
  if (isLoading || doctors.length === 0) {
    return <></>
  }

  return (
    <section className="py-20 bg-gradient-to-b from-primary-light/20 via-cream to-primary-light/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Hospital className="w-5 h-5" />
            <Stethoscope className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'أطباؤنا المميزون' : 'Featured Doctors'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {lang === 'ar' ? 'أطباؤنا المميزون' : 'Meet Our Expert Doctors'}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'تعرف على رؤساء أقسامنا المتخصصين ذوي الخبرة الواسعة'
              : 'Meet our experienced department heads and specialists'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor, index) => (
            <Link
              key={doctor.id}
              href={`/${lang}/our-doctors/${isRtl ? doctor.doctor_url_ar : doctor.doctor_url_en}`}
              className="relative bg-surface rounded-2xl p-6 lg:p-8 border border-[#e0e0e0] shadow-md hover:shadow-2xl hover:border-primary hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden group"
            >
              {/* Carbon Design System Accent Bar at Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary group-hover:h-1.5 transition-all duration-300" />
              
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/2 group-hover:via-primary/1 group-hover:to-primary/0 transition-all duration-300 pointer-events-none" />
              
              {/* Head of Department Badge */}
              {doctor.head_of_dep === '1' && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border-2 border-white group-hover:bg-primary-hover group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="whitespace-nowrap">{lang === 'ar' ? 'رئيس القسم' : 'Head'}</span>
                  </div>
                </div>
              )}

              {/* Doctor Image Container */}
              <div className="relative mb-6 flex justify-center mt-2">
                <div className="relative w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-primary shadow-xl group-hover:border-primary-hover group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 bg-white">
                  <Image
                    src={getDoctorImagePath(doctor)}
                    alt={lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to a simple data URI placeholder if Dicebear fails
                      const target = e.target as HTMLImageElement
                      target.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                          <rect width="160" height="160" fill="#0f62fe"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">${(lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en).charAt(0).toUpperCase()}</text>
                        </svg>
                      `)}`
                    }}
                    unoptimized={getDoctorImagePath(doctor).includes('dicebear')}
                  />
                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center relative z-10">
                <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-primary mb-5 group-hover:text-primary-hover transition-colors duration-300">
                  <Stethoscope className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-xs lg:text-sm font-semibold tracking-wide">
                    {lang === 'ar' ? 'طبيب متخصص' : 'Specialist Doctor'}
                  </span>
                </div>

                {/* Rating/Experience Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-hover rounded-full mb-6 border border-[#a8a8a8] group-hover:bg-[#c6c6c6] group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300">
                  <LocationStar className="w-4 h-4 text-warning fill-warning group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs lg:text-sm font-semibold text-text-primary">
                    {lang === 'ar' ? 'خبرة واسعة' : 'Expert'}
                  </span>
                </div>

                {/* View Profile Button */}
                <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm lg:text-base group-hover:text-primary-hover transition-colors duration-300 pt-2 border-t border-[#e0e0e0] group-hover:border-primary/30">
                  <span className="tracking-wide">{lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}</span>
                  <ArrowRight className={cn("w-4 h-4 lg:w-5 lg:h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110", isRtl && "rotate-180 group-hover:-translate-x-1")} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href={`/${lang}/our-doctors`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
          >
            <span>{lang === 'ar' ? 'عرض جميع الأطباء' : 'View All Doctors'}</span>
            <ArrowRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
          </Link>
        </div>
      </div>
    </section>
  )
}

