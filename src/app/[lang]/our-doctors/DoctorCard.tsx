'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Doctor } from '@/types'
import { getDoctorImagePath, getDoctorName, isHeadOfDepartment } from '@/lib/doctorHelpers'

interface DoctorCardProps {
    doctor: Doctor
    lang: string
}

export default function DoctorCard({ doctor, lang }: DoctorCardProps) {
    const name = getDoctorName(doctor, lang as 'en' | 'ar')
    const imagePath = getDoctorImagePath(doctor)
    const isHead = isHeadOfDepartment(doctor)

    // Extract specialty from experience (simple version)
    const getSpecialty = () => {
        const exp = lang === 'ar' ? doctor.doctor_exp_ar : doctor.doctor_exp_en
        const match = exp.match(/<p>(.*?)<\/p>/)
        return match ? match[1].replace(/<[^>]+>/g, '').trim() : ''
    }

    return (
        <div className="card-warm overflow-hidden">
            {/* Image */}
            <div className="relative h-64 bg-warm-gray">
                <Image
                    src={imagePath}
                    alt={name}
                    fill
                    className="object-cover"
                />
                {isHead && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        {lang === 'ar' ? 'رئيس القسم' : 'Head of Dept.'}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-text-primary mb-1">{name}</h3>
                <p className="text-sm text-text-secondary mb-3">{getSpecialty()}</p>

                <Link
                    href={`/${lang}/our-doctors/${doctor.doctor_url_en}`}
                    className="text-primary hover:text-primary-hover font-medium text-sm inline-flex items-center"
                >
                    {lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                    <svg
                        className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
