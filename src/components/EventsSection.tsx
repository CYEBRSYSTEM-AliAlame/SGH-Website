'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from '@carbon/icons-react'
import type { Event } from '@/types'
import { cn } from '@/lib/utils'

interface EventsSectionProps {
  events: Event[]
  lang?: string
}

export default function EventsSection({ events, lang = 'en' }: EventsSectionProps) {
  const isRtl = lang === 'ar'

  if (events.length === 0) {
    return null
  }

  // Only show latest 3 events
  const displayEvents = events.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {lang === 'ar' ? 'أحدث الأخبار والفعاليات' : 'Latest News & Events'}
            </h2>
            <div className="w-20 h-1 bg-primary" />
          </div>
          <Link
            href={`/${lang}/csr`}
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {lang === 'ar' ? 'عرض الكل' : 'View All'}
            <ArrowRight className={cn("w-5 h-5", isRtl && "rotate-180")} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayEvents.map((event) => {
            const eventDate = new Date(event.event_date)
            // Use ISO date (YYYY-MM-DD) for href to ensure consistent server/client rendering
            const formattedDate = eventDate.toISOString().split('T')[0]

            return (
              <Link
                key={event.id}
                href={`/${lang}/csr/${formattedDate}/${event.event_url_en}`}
                className="group flex flex-col h-full bg-white border border-gray-200 hover:border-primary transition-colors"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(/images/content/event_${event.id}.jpg)`,
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-bold text-gray-900 rounded-sm shadow-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Intl.DateTimeFormat(lang === 'ar' ? 'ar-LB' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'UTC'
                    }).format(eventDate)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {lang === 'ar' ? (event as any).event_title_ar || event.event_title_en : event.event_title_en}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
                    {lang === 'ar' ? (event as any).event_desc_ar || event.event_desc_en : event.event_desc_en}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-auto">
                    {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", isRtl && "group-hover:-translate-x-1 rotate-180")} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
