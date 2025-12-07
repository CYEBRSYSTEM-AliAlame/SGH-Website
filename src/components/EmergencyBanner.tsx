'use client'

import { Phone, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface EmergencyBannerProps {
  lang?: string
}

export default function EmergencyBanner({ lang = 'en' }: EmergencyBannerProps) {
  
  return (
    <section className="relative py-6 bg-gradient-to-r from-[#ED1C24] via-red-600 to-[#ED1C24] text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Emergency Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-semibold opacity-90">
                  {lang === 'ar' ? 'خدمات الطوارئ' : 'Emergency Services'}
                </div>
                <div className="text-xs opacity-75">
                  {lang === 'ar' ? 'متاحة على مدار الساعة' : 'Available 24/7'}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{lang === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
            </div>
          </div>

          {/* Right: Emergency Contact */}
          <div className="flex items-center gap-4">
            <Link
              href="tel:+9611858333"
              className="flex items-center gap-3 bg-white text-[#ED1C24] px-6 py-3 rounded-xl font-bold hover:bg-cream transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg">+961 1 858 333</span>
            </Link>
            
            <Link
              href={`/${lang}/services/emergency`}
              className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-white/50 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold"
            >
              {lang === 'ar' ? 'المزيد' : 'Learn More'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

