'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Stethoscope, ArrowRight, Hospital, Trophy, LocationStar } from '@carbon/icons-react'
import { cn } from '@/lib/utils'
import type { Doctor } from '@/types'

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
          <div className="w-32 h-1 bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#ED1C24] mx-auto mb-4 rounded-full" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'تعرف على رؤساء أقسامنا المتخصصين ذوي الخبرة الواسعة'
              : 'Meet our experienced department heads and specialists'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {doctors.map((doctor, index) => (
            <Link
              key={doctor.id}
              href={`/${lang}/our-doctors/${isRtl ? doctor.doctor_url_ar : doctor.doctor_url_en}`}
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-primary/30 shadow-lg overflow-hidden"
            >
              {/* Lebanese Flag Color Accent Bar at Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00A651] via-primary to-[#ED1C24]" />
              
              {/* Head of Department Badge */}
              {doctor.head_of_dep === '1' && (
                <div className="relative mb-4">
                  <div className="absolute top-2 right-0 flex items-center gap-1 bg-[#ED1C24] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                    <Trophy className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'رئيس القسم' : 'Head'}</span>
                  </div>
                </div>
              )}

              {/* Doctor Image */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <Image
                  src={`/images/doctors/${doctor.doctor_photo_file || 'anonymous_doctor_male.png'}`}
                  alt={lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/doctors/anonymous_doctor_male.png'
                  }}
                />
              </div>

              {/* Doctor Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-primary mb-4">
                  <Stethoscope className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {lang === 'ar' ? 'طبيب متخصص' : 'Specialist Doctor'}
                  </span>
                </div>

                {/* Rating/Experience Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/15 to-primary-light/15 rounded-full mb-6 border border-primary/20">
                  <LocationStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-text-primary">
                    {lang === 'ar' ? 'خبرة واسعة' : 'Expert'}
                  </span>
                </div>

                {/* View Profile Button */}
                <div className="flex items-center justify-center gap-2 text-primary font-semibold">
                  <span>{lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}</span>
                  <ArrowRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
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

