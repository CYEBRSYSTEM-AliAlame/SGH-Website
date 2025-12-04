'use client'

import { useMemo, useState } from 'react'
import { Sparkles, SlidersHorizontal, Users, Star, Award, ArrowRight, Stethoscope, Languages, MapPin, Clock } from 'lucide-react'
import type { Doctor } from '@/types'
import { cn } from '@/lib/utils'

interface DoctorDiscoveryHubProps {
    doctors: Doctor[]
    lang?: string
}

const experienceBuckets = [
    { id: 'junior', label_en: 'Rising talent (0-10 yrs)', label_ar: 'موهبة صاعدة (0-10 سنوات)', min: 0, max: 10 },
    { id: 'seasoned', label_en: 'Seasoned expert (10-20 yrs)', label_ar: 'خبير متمرس (10-20 سنة)', min: 10, max: 20 },
    { id: 'veteran', label_en: 'Veteran specialist (20+ yrs)', label_ar: 'اختصاصي مخضرم (20+ سنة)', min: 20, max: 50 },
]

const languageBadges = [
    { id: 'en', label_en: 'English', label_ar: 'إنجليزي' },
    { id: 'ar', label_en: 'Arabic', label_ar: 'عربي' },
    { id: 'fr', label_en: 'French', label_ar: 'فرنسي' },
]

const stripHtml = (value: string) =>
    value
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/\\r\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

export default function DoctorDiscoveryHub({ doctors, lang = 'en' }: DoctorDiscoveryHubProps) {
    const isRTL = lang === 'ar'
    const [experienceRange, setExperienceRange] = useState(30)
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [compareList, setCompareList] = useState<string[]>([])

    const toggleLanguage = (id: string) => {
        setSelectedLanguages((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const exp = parseInt(doctor.doctor_exp_en || '0', 10) || 0
            const matchesExperience = exp <= experienceRange
            const matchesLanguage =
                selectedLanguages.length === 0 ||
                selectedLanguages.some((langId) => doctor.doctor_language?.toLowerCase().includes(langId))
            return matchesExperience && matchesLanguage
        })
    }, [doctors, experienceRange, selectedLanguages])

    const toggleCompare = (id: string) => {
        setCompareList((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : prev.length >= 3 ? prev : [...prev, id]
        )
    }

    const compareDoctors = doctors.filter((doc) => compareList.includes(doc.id))

    return (
        <section className="space-y-8">
            <div className="card-warm">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                        <SlidersHorizontal className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {lang === 'ar' ? 'مرشح الأطباء الذكي' : 'Smart doctor matcher'}
                        </p>
                        <h3 className="text-2xl font-bold text-text-primary">
                            {lang === 'ar' ? 'خصّص تجربتك' : 'Personalize the experience'}
                        </h3>
                    </div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {filteredDoctors.length} {lang === 'ar' ? 'أطباء مناسبين' : 'matching doctors'}
                    </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-text-primary">
                            <span>{lang === 'ar' ? 'الخبرة (حتى)' : 'Experience (up to)'}</span>
                            <span className="text-primary">{experienceRange}+ {lang === 'ar' ? 'سنة' : 'years'}</span>
                        </div>
                        <input
                            type="range"
                            min={5}
                            max={35}
                            value={experienceRange}
                            onChange={(e) => setExperienceRange(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <div className="mt-3 flex gap-2 text-xs text-text-secondary">
                            {experienceBuckets.map((bucket) => (
                                <div key={bucket.id} className="flex flex-col">
                                    <span className="font-semibold text-text-primary">
                                        {isRTL ? bucket.label_ar : bucket.label_en}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-3 text-sm font-semibold text-text-primary">
                            {lang === 'ar' ? 'اللغات المتحدث بها' : 'Languages spoken'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {languageBadges.map((badge) => (
                                <button
                                    key={badge.id}
                                    onClick={() => toggleLanguage(badge.id)}
                                    className={cn(
                                        'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                                        selectedLanguages.includes(badge.id)
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-primary-light/10 text-text-primary hover:bg-primary-light/20'
                                    )}
                                >
                                    {isRTL ? badge.label_ar : badge.label_en}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {compareDoctors.length > 0 && (
                <div className="card-warm">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                                {lang === 'ar' ? 'مقارنة' : 'Comparison'}
                            </p>
                            <h3 className="text-xl font-bold text-text-primary">
                                {lang === 'ar' ? 'حتى 3 أطباء' : 'Up to 3 doctors'}
                            </h3>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {compareDoctors.map((doctor) => (
                            <div key={doctor.id} className="rounded-2xl border border-primary/20 bg-white p-4 shadow-sm">
                                <p className="text-sm font-semibold text-text-primary">{doctor.doctor_name_en}</p>
                                <p className="text-xs text-text-secondary">{doctor.doctor_speciality}</p>
                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary">
                                        <Award className="h-3 w-3" />
                                        {doctor.head_of_dep === '1' ? (lang === 'ar' ? 'رئيس قسم' : 'Head of Dept.') : (lang === 'ar' ? 'استشاري' : 'Consultant')}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-accent">
                                        <Star className="h-3 w-3" />
                                        {doctor.doctor_exp_en || '10+'} {lang === 'ar' ? 'سنوات خبرة' : 'yrs exp'}
                                    </span>
                                </div>
                                <button
                                    className="mt-4 text-sm font-semibold text-accent hover:text-accent-light"
                                    onClick={() => setCompareList((prev) => prev.filter((id) => id !== doctor.id))}
                                >
                                    {lang === 'ar' ? 'إزالة من المقارنة' : 'Remove from comparison'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                {filteredDoctors.slice(0, 6).map((doctor) => (
                    <div key={doctor.id} className="card-warm space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-text-primary">{doctor.doctor_name_en}</p>
                                <p className="text-sm text-text-secondary">{doctor.doctor_speciality}</p>
                            </div>
                            <button
                                onClick={() => toggleCompare(doctor.id)}
                                className={cn(
                                    'ml-auto rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider',
                                    compareList.includes(doctor.id) ? 'bg-primary text-white' : 'bg-primary-light/10 text-primary'
                                )}
                            >
                                {compareList.includes(doctor.id)
                                    ? lang === 'ar'
                                        ? 'في المقارنة'
                                        : 'In compare'
                                    : lang === 'ar'
                                        ? 'أضف للمقارنة'
                                        : 'Add to compare'}
                            </button>
                        </div>

                        <p className="text-sm text-text-secondary">
                            {(() => {
                                const text = stripHtml(
                                    doctor.doctor_exp_en || (lang === 'ar' ? 'خبرة معتمدة في مجالاته' : 'Trusted experience in their specialty')
                                )
                                return text.length > 160 ? `${text.slice(0, 160)}…` : text
                            })()}
                        </p>

                        <div className="grid gap-3 text-sm text-text-secondary md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-primary" />
                                {doctor.head_of_dep === '1' ? (lang === 'ar' ? 'رئيس قسم' : 'Head of Department') : (lang === 'ar' ? 'استشاري' : 'Consultant')}
                            </div>
                            <div className="flex items-center gap-2">
                                <Languages className="h-4 w-4 text-accent" />
                                {doctor.doctor_language || (lang === 'ar' ? 'متعدد اللغات' : 'Multilingual')}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#00A651]" />
                                {lang === 'ar' ? 'موعد متاح هذا الأسبوع' : 'Available this week'}
                            </div>
                        </div>

                        <a
                            href={`/${lang}/our-doctors/${doctor.doctor_url_en || doctor.doctor_url_ar}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-light"
                        >
                            {lang === 'ar' ? 'استكشف الملف' : 'View profile'} <ArrowRight className={isRTL ? 'rotate-180' : ''} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}
