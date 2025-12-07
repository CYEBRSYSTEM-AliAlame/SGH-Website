'use client'

import { useMemo, useState } from 'react'
import { Clock, Users, Coffee, Bell, Moon, HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/utils'

const visitingBlocks = [
    {
        id: 'general',
        titleEn: 'General Wards',
        titleAr: 'الأقسام العامة',
        hours: [
            { labelEn: 'Morning', labelAr: 'الصباح', time: '10:00 AM – 1:00 PM' },
            { labelEn: 'Evening', labelAr: 'المساء', time: '4:00 PM – 8:00 PM' },
        ],
        notesEn: 'Maximum 2 visitors per slot. Children above 12 may visit with an adult.',
        notesAr: 'عدد الزوار: شخصان كحد أقصى لكل فترة. يسمح للأطفال فوق 12 عاماً برفقة شخص بالغ.',
        color: 'bg-primary/10 text-primary',
    },
    {
        id: 'icu',
        titleEn: 'ICU / CCU',
        titleAr: 'العناية المركزة / عناية القلب',
        hours: [
            { labelEn: 'Midday', labelAr: 'الظهيرة', time: '11:00 AM – 12:00 PM' },
            { labelEn: 'Evening', labelAr: 'المساء', time: '5:00 PM – 6:00 PM' },
        ],
        notesEn: 'Only first-degree family members. Two visitors per day, rotating inside.',
        notesAr: 'مسموح فقط لأفراد العائلة من الدرجة الأولى. زائران يومياً مع التبديل داخل القسم.',
        color: 'bg-[#c41e3a]/10 text-[#c41e3a]',
    },
    {
        id: 'maternity',
        titleEn: 'Maternity & Pediatrics',
        titleAr: 'الأمومة والأطفال',
        hours: [
            { labelEn: 'Family', labelAr: 'العائلة', time: '10:00 AM – 12:00 PM' },
            { labelEn: 'Friends', labelAr: 'الأصدقاء', time: '4:00 PM – 6:00 PM' },
        ],
        notesEn: 'Parents may stay longer. Only parents in NICU unless special approval.',
        notesAr: 'يمكن للأهل البقاء لفترة أطول. في عناية الأطفال الخاصة يسمح فقط بالأبوين إلا بموافقة خاصة.',
        color: 'bg-[#00A651]/10 text-[#00A651]',
    },
]

const loungeHighlights = [
    {
        titleEn: 'Family Waiting Lounge (GF)',
        titleAr: 'قاعة انتظار العائلات (الطابق الأرضي)',
        descEn: 'Comfortable seating, Wi-Fi, beverages, and live patient updates via nursing station.',
        descAr: 'مقاعد مريحة، إنترنت، مشروبات، وتحديثات مباشرة عبر قسم التمريض.',
        icon: Coffee,
    },
    {
        titleEn: 'Quiet Hours & Rest',
        titleAr: 'ساعات الهدوء والراحة',
        descEn: 'Quiet time daily from 2:00–4:00 PM and after 8:30 PM for patient recovery.',
        descAr: 'ساعات هدوء يومية من 2:00 – 4:00 بعد الظهر وبعد 8:30 مساءً لضمان راحة المرضى.',
        icon: Moon,
    },
    {
        titleEn: 'Special Passes',
        titleAr: 'تصاريح خاصة',
        descEn: 'Extended permits issued for critical cases, parents, or compassionate visits.',
        descAr: 'يتم منح تصاريح خاصة للحالات الحرجة، للأهل، أو الزيارات الاستثنائية.',
        icon: Bell,
    },
]

interface VisitingExperienceProps {
    lang?: string
}

export default function VisitingExperience({ lang = 'en' }: VisitingExperienceProps) {
    const isRTL = lang === 'ar'
    const [activeBlock, setActiveBlock] = useState(visitingBlocks[0].id)
    const [guests, setGuests] = useState(1)
    const [selectedTime, setSelectedTime] = useState('morning')

    const suggestion = useMemo(() => {
        if (guests > 2) {
            return lang === 'ar'
                ? 'يُنصح بتقسيم الزيارة على مجموعات صغيرة لضمان راحة المريض.'
                : 'Split the visit into smaller groups so the patient can rest comfortably.'
        }
        if (selectedTime === 'evening') {
            return lang === 'ar' ? 'المساء أكثر كثافة، حاول الوصول قبل الوقت المحدد.' : 'Evenings get busy—arrive a few minutes early.'
        }
        return lang === 'ar'
            ? 'زيارة الصباح مثالية للحديث مع الفريق الطبي وطرح الأسئلة.'
            : 'Morning visits are ideal if you need to speak with the care team.'
    }, [guests, selectedTime, lang])

    const currentBlock = visitingBlocks.find((block) => block.id === activeBlock)!

    return (
        <div className="space-y-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="card-warm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                                {lang === 'ar' ? 'جداول الزيارة' : 'Visiting schedules'}
                            </p>
                            <h3 className="text-2xl font-bold text-text-primary">
                                {lang === 'ar' ? 'اختر قسمك' : 'Choose a department'}
                            </h3>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-auto pb-2">
                        {visitingBlocks.map((block) => (
                            <button
                                key={block.id}
                                onClick={() => setActiveBlock(block.id)}
                                className={cn(
                                    'rounded-2xl border px-4 py-3 text-sm font-semibold transition-all',
                                    block.id === activeBlock
                                        ? 'border-primary bg-primary-light/20 text-primary shadow-sm'
                                        : 'border-warm-gray/50 bg-white hover:border-primary/30'
                                )}
                            >
                                {isRTL ? block.titleAr : block.titleEn}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className={cn('rounded-full px-3 py-1 text-xs font-semibold', currentBlock.color)}>
                                {isRTL ? currentBlock.titleAr : currentBlock.titleEn}
                            </div>
                            <p className="text-sm text-text-secondary">
                                {lang === 'ar' ? 'أوقات الزيارة' : 'Visiting slots'}
                            </p>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {currentBlock.hours.map((hour, idx) => (
                                <div key={idx} className="rounded-xl bg-white p-4 shadow-sm">
                                    <p className="text-sm font-semibold text-text-primary">
                                        {isRTL ? hour.labelAr : hour.labelEn}
                                    </p>
                                    <p className="text-text-secondary">{hour.time}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 rounded-xl bg-white/70 p-4 text-sm text-text-secondary shadow-inner">
                            {isRTL ? currentBlock.notesAr : currentBlock.notesEn}
                        </p>
                    </div>
                </div>

                <div className="card-warm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                                {lang === 'ar' ? 'مساعد الحضور' : 'Visitor helper'}
                            </p>
                            <h3 className="text-xl font-bold text-text-primary">
                                {lang === 'ar' ? 'نصائح مخصصة' : 'Personalized tips'}
                            </h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="mb-1 text-sm font-semibold text-text-primary">
                                {lang === 'ar' ? 'عدد الزوار' : 'Number of visitors'}
                            </p>
                            <input
                                type="range"
                                min={1}
                                max={4}
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <p className="text-sm text-text-secondary">
                                {lang === 'ar' ? 'زوار' : 'Guests'}: {guests}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-semibold text-text-primary">
                                {lang === 'ar' ? 'توقيت الزيارة' : 'Preferred slot'}
                            </p>
                            <div className="flex gap-2">
                                {[
                                    { id: 'morning', labelEn: 'Morning', labelAr: 'الصباح' },
                                    { id: 'evening', labelEn: 'Evening', labelAr: 'المساء' },
                                ].map((time) => (
                                    <button
                                        key={time.id}
                                        onClick={() => setSelectedTime(time.id)}
                                        className={cn(
                                            'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                                            selectedTime === time.id
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'bg-primary-light/10 text-text-primary hover:bg-primary-light/20'
                                        )}
                                    >
                                        {isRTL ? time.labelAr : time.labelEn}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl bg-primary/10 p-4 text-sm text-primary">
                            {suggestion}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {loungeHighlights.map((highlight, idx) => {
                    const Icon = highlight.icon
                    return (
                        <div key={idx} className="card-warm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h4 className="text-lg font-bold text-text-primary">
                                    {isRTL ? highlight.titleAr : highlight.titleEn}
                                </h4>
                            </div>
                            <p className="text-sm text-text-secondary">
                                {isRTL ? highlight.descAr : highlight.descEn}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="card-warm bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {lang === 'ar' ? 'مراعاة المرضى' : 'Be mindful'}
                        </p>
                        <h3 className="text-2xl font-bold text-text-primary">
                            {lang === 'ar' ? 'دعم الراحة والخصوصية' : 'Support rest & privacy'}
                        </h3>
                        <p className="text-text-secondary">
                            {lang === 'ar'
                                ? 'يرجى احترام مساحات المرضى وإيقاف الهواتف أو وضعها على الوضع الصامت داخل الغرف.'
                                : 'Please keep phones on silent, respect privacy curtains, and avoid strong perfumes while visiting.'}
                        </p>
                    </div>
                    <a
                        href={`/${lang}/contact`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
                    >
                        <HeartHandshake className="h-5 w-5" />
                        {lang === 'ar' ? 'تواصل معنا للاستفسارات' : 'Contact our support team'}
                    </a>
                </div>
            </div>
        </div>
    )
}

