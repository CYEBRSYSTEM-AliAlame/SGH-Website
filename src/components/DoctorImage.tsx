'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Doctor } from '@/types'
import { getDoctorImagePath } from '@/lib/doctorHelpers'

interface DoctorImageProps {
    src?: string
    doctor?: Doctor
    alt: string
    width?: number
    height?: number
    fill?: boolean
    className?: string
}

export default function DoctorImage({ src, doctor, alt, width, height, fill, className }: DoctorImageProps) {
    // Use helper function if doctor object is provided, otherwise use src
    const initialSrc = doctor ? getDoctorImagePath(doctor) : (src || '/images/doctors/anonymous_doctor_male.png')
    const [imgSrc, setImgSrc] = useState(initialSrc)

    const handleError = () => {
        // Fallback to a simple data URI placeholder
        const fallbackSvg = `data:image/svg+xml,${encodeURIComponent(`
            <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="160" fill="#0f62fe"/>
                <text x="50%" y="50%" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">${alt.charAt(0).toUpperCase()}</text>
            </svg>
        `)}`
        setImgSrc(fallbackSvg)
    }

    const isDicebear = imgSrc.includes('dicebear.com')

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                className={className}
                onError={handleError}
                unoptimized={isDicebear}
            />
        )
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width || 160}
            height={height || 160}
            className={className}
            onError={handleError}
            unoptimized={isDicebear}
        />
    )
}

