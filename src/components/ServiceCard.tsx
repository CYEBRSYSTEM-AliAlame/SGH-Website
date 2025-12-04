'use client'

import Link from 'next/link'
import { ArrowRight, Activity, Heart, Brain, Baby, Eye, Bone, Stethoscope, Syringe } from 'lucide-react'

interface ServiceCardProps {
    service: {
        id: number
        service_title_en: string
        service_title_ar: string
        service_desc_en: string
        service_desc_ar: string
        service_url_en: string
        service_url_ar: string
        service_icon_file: string
        box_color_id: number
    }
    lang: string
}

const iconMap: { [key: string]: any } = {
    activity: Activity,
    heart: Heart,
    brain: Brain,
    baby: Baby,
    eye: Eye,
    bone: Bone,
    stethoscope: Stethoscope,
    syringe: Syringe,
}

export default function ServiceCard({ service, lang }: ServiceCardProps) {
    const isRTL = lang === 'ar'
    const title = isRTL ? service.service_title_ar : service.service_title_en
    const desc = isRTL ? service.service_desc_ar : service.service_desc_en
    const Icon = iconMap[service.service_icon_file] || Activity
    const readMoreText = isRTL ? 'اقرأ المزيد' : 'Read More'

    const colorClasses = [
        'bg-primary-light/20 text-primary hover:bg-primary-light/30',
        'bg-[#00A651]/20 text-[#00A651] hover:bg-[#00A651]/30',
        'bg-purple-50 text-purple-600 hover:bg-purple-100',
        'bg-accent/20 text-accent hover:bg-accent/30',
    ]

    const colorClass = colorClasses[(service.box_color_id - 1) % colorClasses.length]

    return (
        <div className="card-warm group">
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorClass} transition-colors`}>
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-text-primary group-hover:text-primary">
                {title}
            </h3>

            <p className="mb-4 flex-grow text-text-secondary line-clamp-3">
                {desc}
            </p>

            <div className="mt-auto pt-4">
                <Link
                    href={`/${lang}/services/${isRTL ? service.service_url_ar : service.service_url_en}`}
                    className="inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                    {readMoreText}
                    <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </Link>
            </div>
        </div>
    )
}
