'use client'

import { useState } from 'react'
import { Phone, MessageCircle, X, Calendar } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FloatingContactButtonProps {
  lang?: string
}

export default function FloatingContactButton({ lang = 'en' }: FloatingContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isRtl = lang === 'ar'

  const contacts = [
    {
      icon: Phone,
      label: lang === 'ar' ? 'اتصل بنا' : 'Call Us',
      href: 'tel:+9611858333',
      color: 'bg-primary hover:bg-primary-hover',
    },
    {
      icon: MessageCircle,
      label: lang === 'ar' ? 'واتساب' : 'WhatsApp',
      href: 'https://wa.me/9611858333',
      color: 'bg-[#25D366] hover:bg-[#20BA5A]',
    },
    {
      icon: Calendar,
      label: lang === 'ar' ? 'احجز موعداً' : 'Book Appointment',
      href: `/${lang}/contact`,
      color: 'bg-accent hover:bg-accent-light',
    },
  ]

  return (
    <div className={cn(
      "fixed z-50",
      isRtl ? "left-4" : "right-4",
      "bottom-4"
    )}>
      {/* Contact Options */}
      <div
        className={cn(
          "absolute bottom-20 mb-2 flex flex-col gap-3 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {contacts.map((contact, index) => {
          const Icon = contact.icon
          return (
            <Link
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-white font-semibold shadow-xl transition-all hover:scale-105",
                contact.color,
                isRtl && "flex-row-reverse"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{contact.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 bg-primary hover:bg-primary-hover text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110",
          isOpen && "rotate-45"
        )}
        aria-label={lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}

