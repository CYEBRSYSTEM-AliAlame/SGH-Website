'use client'

import type { Doctor } from '@/types'
import DoctorCard from './DoctorCard'
import DoctorFilters from './DoctorFilters'

interface DoctorsListProps {
    doctors: Doctor[]
    lang: string
}

export default function DoctorsList({ doctors, lang }: DoctorsListProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Filters */}
            <DoctorFilters lang={lang} />

            {/* Stats */}
            <div className="mb-8 text-text-secondary">
                <p>
                    {lang === 'ar'
                        ? `عرض ${doctors.length} طبيب`
                        : `Showing ${doctors.length} doctor${doctors.length !== 1 ? 's' : ''}`}
                </p>
            </div>

            {/* Doctors Grid */}
            {doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} lang={lang} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-text-secondary text-lg">
                        {lang === 'ar'
                            ? 'لم يتم العثور على أطباء'
                            : 'No doctors found'}
                    </p>
                </div>
            )}
        </div>
    )
}
