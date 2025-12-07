'use client'

import { useState } from 'react'
import { Stethoscope, Activity, Microscope, Waves, HeartPulse, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const diagnosticModules = [
    {
        id: 'imaging',
        title_en: 'Advanced Imaging Hub',
        title_ar: 'مركز التصوير المتقدم',
        desc_en: '64-slice CT, 1.5T MRI, digital X-ray, ultrasound, and interventional imaging suites.',
        desc_ar: 'تصوير مقطعي متعدد المقاطع، رنين مغناطيسي 1.5 تسلا، أشعة رقمية، موجات فوق صوتية وتصوير تداخلي.',
        stats: [
            { label_en: 'CT/MRI slots per day', label_ar: 'حجوزات CT/MRI يومياً', value: '35+' },
            { label_en: 'Emergency response', label_ar: 'استجابة الطوارئ', value: '< 15 min' },
        ],
        icon: Waves,
        color: 'from-primary/15 via-transparent to-accent/10',
    },
    {
        id: 'laboratory',
        title_en: 'Smart Laboratory',
        title_ar: 'مختبر ذكي متكامل',
        desc_en: 'Clinical chemistry, microbiology, hematology and pathology with automated analyzers.',
        desc_ar: 'كيمياء سريرية، أحياء دقيقة، أمراض الدم وعلم الأمراض بمنظومات تحليل مؤتمتة.',
        stats: [
            { label_en: 'Tests per hour', label_ar: 'فحوصات في الساعة', value: '120+' },
            { label_en: 'STAT turnaround', label_ar: 'زمن النتيجة العاجلة', value: '45 min' },
        ],
        icon: Microscope,
        color: 'from-[#00A651]/15 via-transparent to-primary/5',
    },
    {
        id: 'cardio',
        title_en: 'Cardio-Diagnostic Suite',
        title_ar: 'وحدة التشخيص القلبي',
        desc_en: 'Cath lab, stress tests, Holter, echo, and electrophysiology monitoring.',
        desc_ar: 'مختبر قسطرة، اختبارات جهد، هولتر، إيكو ومراقبة كهربية القلب.',
        stats: [
            { label_en: 'Cath lab availability', label_ar: 'توفر مختبر القسطرة', value: '24/7' },
            { label_en: 'Echocardiograms weekly', label_ar: 'إيكو أسبوعياً', value: '70+' },
        ],
        icon: HeartPulse,
        color: 'from-[#c41e3a]/10 via-transparent to-[#00A651]/5',
    },
]

const quickChecks = [
    { title_en: 'Same-day reporting', title_ar: 'تقارير في نفس اليوم', value: '82%' },
    { title_en: 'Digital access portal', title_ar: 'بوابة النتائج الرقمية', value: '24/7' },
    { title_en: 'Multilingual technologists', title_ar: 'فنيون متعددو اللغات', value: '3+' },
]

interface DiagnosticsExperienceProps {
    lang?: string
}

export default function DiagnosticsExperience({ lang = 'en' }: DiagnosticsExperienceProps) {
    const [activeModule, setActiveModule] = useState(diagnosticModules[0].id)
    const isRTL = lang === 'ar'
    const module = diagnosticModules.find((m) => m.id === activeModule)!

    return (
        <div className="space-y-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="card-warm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                            <Stethoscope className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                                {lang === 'ar' ? 'منصة تشخيصية' : 'Diagnostic platform'}
                            </p>
                            <h3 className="text-2xl font-bold text-text-primary">
                                {lang === 'ar' ? 'اختر الوحدة' : 'Choose a unit'}
                            </h3>
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-auto pb-2">
                        {diagnosticModules.map((item) => {
                            const Icon = item.icon
                            const active = item.id === activeModule
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveModule(item.id)}
                                    className={cn(
                                        'flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all',
                                        active ? 'border-primary bg-primary-light/20 text-primary shadow-sm' : 'border-warm-gray/60 bg-white hover:border-primary/30'
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {isRTL ? item.title_ar : item.title_en}
                                </button>
                            )
                        })}
                    </div>
                    <div className={`mt-6 rounded-2xl border border-primary/15 bg-gradient-to-br ${module.color} p-6`}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-text-primary shadow-sm">
                                {isRTL ? module.title_ar : module.title_en}
                            </div>
                            <p className="text-sm text-text-secondary">
                                {lang === 'ar' ? 'قدرات الوحدة' : 'Unit capability'}
                            </p>
                        </div>
                        <p className="mt-4 text-text-secondary">
                            {isRTL ? module.desc_ar : module.desc_en}
                        </p>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                            {module.stats.map((stat, idx) => (
                                <div key={idx} className="rounded-xl bg-white p-4 shadow-sm">
                                    <p className="text-sm font-semibold text-text-primary">{isRTL ? stat.label_ar : stat.label_en}</p>
                                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card-warm space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                            <Activity className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                                {lang === 'ar' ? 'حجز فوري' : 'Instant booking'}
                            </p>
                            <h3 className="text-xl font-bold text-text-primary">
                                {lang === 'ar' ? 'اختر نوع الفحص' : 'Pick a test type'}
                            </h3>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-warm-gray/50 p-4">
                            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-text-primary">
                                <span>{lang === 'ar' ? 'فحوصات التصوير' : 'Imaging tests'}</span>
                                <span className="text-primary">CT / MRI / US</span>
                            </div>
                            <input type="range" min={2} max={12} defaultValue={4} className="w-full accent-primary" />
                            <p className="mt-2 text-xs text-text-secondary">
                                {lang === 'ar' ? 'حدد عدد الفحوصات اليومية المتوقعة' : 'Estimated slots per day'}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-warm-gray/50 p-4">
                            <div className="flex items-center justify-between text-sm font-semibold text-text-primary">
                                <span>{lang === 'ar' ? 'نسبة التقارير في نفس اليوم' : 'Same-day reporting rate'}</span>
                                <span className="text-primary font-bold">82%</span>
                            </div>
                            <p className="mt-2 text-sm text-text-secondary">
                                {lang === 'ar'
                                    ? 'يمكن تسليم معظم الفحوصات قبل التاسعة مساءً عبر البوابة الرقمية أو من مكتب النتائج.'
                                    : 'Most reports are ready before 9:00 PM via the digital portal or pick-up desk.'}
                            </p>
                        </div>
                        <div className="rounded-xl bg-primary/10 p-4 text-sm text-primary">
                            {lang === 'ar'
                                ? 'ينصح بالحصول على إحالة الطبيب للحجز السريع خاصة لفحوصات التصوير أو القبول الجراحي.'
                                : 'Bring your physician order when booking—expedites imaging or pre-op slots.'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {quickChecks.map((item, idx) => (
                    <div key={idx} className="card-warm text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {isRTL ? item.title_ar : item.title_en}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-primary">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="card-warm bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {lang === 'ar' ? 'معايير الجودة' : 'Quality assured'}
                        </p>
                        <h3 className="text-2xl font-bold text-text-primary">
                            {lang === 'ar' ? 'ضمان النتائج والسلامة' : 'Results & safety assurance'}
                        </h3>
                        <p className="text-text-secondary">
                            {lang === 'ar'
                                ? 'المختبرات والتصوير لدينا معتمدة وتخضع لاختبارات ضبط الجودة اليومية.'
                                : 'Our labs and imaging suites are accredited and undergo daily quality checks for calibration and radiation safety.'}
                        </p>
                    </div>
                    <a
                        href={`/${lang}/contact`}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
                    >
                        <ShieldCheck className="h-5 w-5" />
                        {lang === 'ar' ? 'حجز أو استفسار' : 'Book or inquire'}
                    </a>
                </div>
            </div>
        </div>
    )
}

