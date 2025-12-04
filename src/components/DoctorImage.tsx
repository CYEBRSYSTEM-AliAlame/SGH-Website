'use client'

import Image from 'next/image'
import { useState } from 'react'

interface DoctorImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    className?: string
}

export default function DoctorImage({ src, alt, width, height, fill, className }: DoctorImageProps) {
    const [imgSrc, setImgSrc] = useState(src)

    const handleError = () => {
        setImgSrc('/images/doctors/anonymous_doctor_male.png')
    }

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                className={className}
                onError={handleError}
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
        />
    )
}

