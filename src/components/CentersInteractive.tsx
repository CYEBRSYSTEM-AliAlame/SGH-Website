'use client'

import { useMemo, useState } from 'react'
import { Heart, BrainCog, Baby, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CentersInteractiveProps {
    lang?: string
}

const centersData = [
    {
        id: 'cardio',
        title_en: 'Cardiac Performance Center',
        title_ar: 'مركز القلب المتخصص',
        tagline_en: '24/7 cath lab • hybrid OR • rapid response cath team',
        tagline_ar: 'مختبر قسطرة على مدار الساعة • غرفة عمليات هجينة • فريق تدخل سريع',
        icon: Heart,
        gradient: 'from-[#c41e3a]/10 via-transparent to-primary/10',
        metrics: [
            { label_en: 'Cath Lab', label_ar: 'مختبر القسطرة', value: '24/7' },
            { label_en: 'EP studies / month', label_ar: 'دراسات كهربائية / شهر', value: '40+' },
            { label_en: 'Door-to-balloon', label_ar: 'زمن فتح الشريان', value: '< 30 min' },
        ],
        programs_en: ['Structural heart valve clinic', 'Advanced arrhythmia program', 'Heart failure optimization'],
        programs_ar: ['عيادة صمامات القلب', 'برنامج اضطرابات النظم المتقدم', 'تحسين قصور القلب'],
        support_en: 'Dedicated cardiac ICU, hybrid OR, and tele-cardiology follow-up.',
        support_ar: 'وحدة عناية قلبية مخصصة، غرفة عمليات هجينة، ومتابعة عن بعد.',
    },
    {
        id: 'neuro',
        title_en: 'Neuroscience & Spine Center',
        title_ar: 'مركز العلوم العصبية والعمود الفقري',
        tagline_en: 'Stroke-ready unit • intra-op monitoring • spine navigation',
        tagline_ar: 'جاهزية للسكتات الدماغية • مراقبة أثناء الجراحة • توجيه العمود الفقري',
        icon: BrainCog,
        gradient: 'from-[#7c3aed]/10 via-transparent to-[#14b8a6]/10',
        metrics: [
            { label_en: 'Stroke response', label_ar: 'استجابة السكتة', value: '15 min' },
            { label_en: 'Neuro ICU beds', label_ar: 'أسرة العناية العصبية', value: '12' },
            { label_en: 'Spine surgeries / yr', label_ar: 'عمليات العمود الفقري / سنة', value: '250+' },
        ],
        programs_en: ['Comprehensive stroke pathway', 'Deep brain monitoring', 'Minimally invasive spine lab'],
        programs_ar: ['مسار شامل للسكتة الدماغية', 'مراقبة دماغية متقدمة', 'مختبر عمود فقري طفيف التوغل'],
        support_en: 'Advanced MRI, CT perfusion, intra-operative neuromonitoring and rehab gym.',
        support_ar: 'رنين مغناطيسي متقدم، تصوير تروية، مراقبة عصبية أثناء الجراحة وصالة تأهيل.',
    },
    {
        id: 'motherchild',
        title_en: 'Mother & Child Institute',
        title_ar: 'معهد الأم والطفل',
        tagline_en: 'Family suites • neonatal ICU • high-risk obstetrics',
        tagline_ar: 'أجنحة عائلية • عناية مركزة لحديثي الولادة • حالات الحمل عالية الخطورة',
        icon: Baby,
        gradient: 'from-[#ec4899]/10 via-transparent to-[#fcd34d]/10',
        metrics: [
            { label_en: 'NICU beds', label_ar: 'أسرة العناية لحديثي الولادة', value: '20' },
            { label_en: 'VBAC success', label_ar: 'نجاح الولادة الطبيعية بعد قيصرية', value: '82%' },
            { label_en: 'Lactation coaches', label_ar: 'مدربات الرضاعة', value: '5' },
        ],
        programs_en: ['Family-centered birthing suites', 'Neonatal transport team', 'Women’s wellness coaching'],
        programs_ar: ['أجنحة ولادة عائلية', 'فريق نقل لحديثي الولادة', 'إرشاد صحة المرأة'],
        support_en: '24/7 obstetrics team, pediatric subspecialists, and parent lounge.',
        support_ar: 'فريق توليد على مدار الساعة، اختصاصيو أطفال فرعيون، وصالة للأهالي.',
    },
] as const

export default function CentersInteractive({ lang = 'en' }: CentersInteractiveProps) {
    const [activeCenter, setActiveCenter] = useState<typeof centersData[number]>(centersData[0])
    const isRTL = lang === 'ar'

    const programs = useMemo(
        () => (isRTL ? activeCenter.programs_ar : activeCenter.programs_en),
        [activeCenter, isRTL]
    )

    return (
        <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                <div className="card-warm">
                    <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">
                        {isRTL ? 'اختر المركز' : 'Select a center'}
                    </p>
                    <div className="space-y-3">
                        {centersData.map((center) => {
                            const Icon = center.icon
                            const active = activeCenter.id === center.id
                            return (
                                <button
                                    key={center.id}
                                    onClick={() => setActiveCenter(center)}
                                    className={cn(
                                        'w-full rounded-2xl border px-4 py-3 flex items-center gap-3 text-left transition-all',
                                        active ? 'border-primary bg-primary-light/20 shadow-md' : 'border-warm-gray/40 hover:border-primary/40'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'h-10 w-10 rounded-xl flex items-center justify-center text-white shadow',
                                            active ? 'bg-primary' : 'bg-primary-light/30 text-primary'
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-text-primary">
                                            {isRTL ? center.title_ar : center.title_en}
                                        </p>
                                        <p className="text-xs text-text-secondary">
                                            {active && (isRTL ? activeCenter.tagline_ar : activeCenter.tagline_en)}
                                        </p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className={cn('card-warm relative overflow-hidden border border-primary/20')}>
                    <div className={cn('absolute inset-0 opacity-40 blur-3xl pointer-events-none', `bg-gradient-to-br ${activeCenter.gradient}`)} />
                    <div className="relative space-y-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-[0.3em] flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                {isRTL ? 'مركز متميز' : 'Signature Center'}
                            </div>
                            <p className="text-sm text-text-secondary">{isRTL ? activeCenter.tagline_ar : activeCenter.tagline_en}</p>
                        </div>
                        <h3 className="text-3xl font-bold text-text-primary">
                            {isRTL ? activeCenter.title_ar : activeCenter.title_en}
                        </h3>
                        <p className="text-text-secondary">
                            {isRTL ? activeCenter.support_ar : activeCenter.support_en}
                        </p>

                        <div className="grid gap-4 md:grid-cols-3">
                            {activeCenter.metrics.map((metric) => (
                                <div key={metric.label_en} className="rounded-2xl border border-warm-gray/40 bg-white/80 p-4 text-center shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.4em] text-text-secondary">
                                        {isRTL ? metric.label_ar : metric.label_en}
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-primary">{metric.value}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">
                                {isRTL ? 'برامج مميزة' : 'Signature programs'}
                            </p>
                            <div className="grid gap-3 md:grid-cols-2">
                                {programs.map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-xl bg-primary-light/15 p-4 border border-primary/20">
                                        <ShieldCheck className="h-4 w-4 text-primary mt-1" />
                                        <p className="text-sm text-text-primary">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-4 pt-4 border-t border-warm-gray/40">
                            <div>
                                <p className="text-xs uppercase tracking-[0.5em] text-text-secondary">
                                    {isRTL ? 'مساعدة فورية' : 'Concierge support'}
                                </p>
                                <p className="text-lg font-semibold text-text-primary">
                                    {isRTL ? 'اتصل بـ 1701 - تحويلة 4' : 'Call 1701 - Extension 4'}
                                </p>
                            </div>
                            <a
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition"
                            >
                                {isRTL ? 'احجز استشارة' : 'Book a consultation'}
                                <ArrowRight className={cn('h-4 w-4', isRTL && 'rotate-180')} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


