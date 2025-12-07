'use client'

import { useMemo, useState } from 'react'
import {
    ClipboardCheck,
    Shield,
    Handshake,
    Activity,
    Sparkles,
    MapPin,
    Clock,
    BadgeCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const documents = [
    { id: 'id', labelEn: 'Personal ID', labelAr: 'الهوية الشخصية' },
    { id: 'order', labelEn: 'Medical order from admitting physician', labelAr: 'تقرير الطبيب المعالج' },
    { id: 'guarantor-id', labelEn: "Guarantor's ID (if applicable)", labelAr: 'هوية الضامن (إن وجدت)' },
    {
        id: 'approval',
        labelEn: "Guarantor's approval with diagnosis & length of stay",
        labelAr: 'موافقة الضامن مع سبب الاستشفاء ومدة الإقامة',
    },
]

const timelineSteps = [
    {
        id: 'arrival',
        icon: MapPin,
        titleEn: 'Arrival at Admissions Office (GF)',
        titleAr: 'الوصول إلى قسم الاستقبال (الطابق الأرضي)',
        descEn: 'Admissions officers welcome you, verify documents, and create your file.',
        descAr: 'موظفو الاستقبال يستقبلونك، يتحققون من المستندات، ويجهزون ملفك الطبي.',
        duration: '5-10 min',
    },
    {
        id: 'verification',
        icon: ClipboardCheck,
        titleEn: 'Insurance / Guarantor verification',
        titleAr: 'تأكيد الضمان والتأمين',
        descEn: 'Our team secures approvals and confirms coverage or deposits.',
        descAr: 'يؤمن فريقنا الموافقات اللازمة ويتأكد من التغطية أو الدفعات المطلوبة.',
        duration: '10-20 min',
    },
    {
        id: 'orientation',
        icon: Shield,
        titleEn: 'Orientation & Ward assignment',
        titleAr: 'التوجيه وتحديد الغرفة',
        descEn: 'Nurses escort you to your ward, explain facilities, and coordinate with physicians.',
        descAr: 'يرافقك فريق التمريض إلى الجناح، يعرّفك على التسهيلات، وينسّق مع الأطباء.',
        duration: '5 min',
    },
    {
        id: 'assessment',
        icon: Activity,
        titleEn: 'Initial medical assessment',
        titleAr: 'التقييم الطبي الأولي',
        descEn: 'Admitting physician meets you to confirm the care plan and required tests.',
        descAr: 'يقوم الطبيب بتقييم وضعك وتأكيد خطة الرعاية والفحوصات المطلوبة.',
        duration: '10-15 min',
    },
]

const floorHighlights = [
    {
        titleEn: 'Admissions Office',
        titleAr: 'قسم الاستقبال',
        detailsEn: 'Ground Floor · Open 24/7 · Primary entry point for planned admissions.',
        detailsAr: 'الطابق الأرضي · خدمة 24/7 · نقطة الدخول الأساسية للحالات المقررة.',
        noteEn: 'After-hours (Sunday & holidays) handled via Cashier Counter (GF).',
        noteAr: 'بعد الدوام (الأحد والعطل) عبر صندوق الدفع في الطابق الأرضي.',
    },
    {
        titleEn: 'Emergency Admissions',
        titleAr: 'القبول عبر الطوارئ',
        detailsEn: 'Emergency Room provides interim admission with ER sheet & physician order.',
        detailsAr: 'قسم الطوارئ يؤمن القبول المؤقت مع تقرير الطوارئ وأمر الطبيب.',
        noteEn: 'Guarantor approvals must be secured within 24 hours when applicable.',
        noteAr: 'يجب الحصول على موافقات الضامن خلال 24 ساعة عند الحاجة.',
    },
    {
        titleEn: 'Patient Orientation',
        titleAr: 'توجيه المرضى',
        detailsEn: 'Nursing team escorts patients to rooms, explains amenities, and coordinates care.',
        detailsAr: 'فريق التمريض يرافق المرضى إلى الغرف، يشرح الخدمات، ويؤمن المتابعة الطبية.',
        noteEn: 'Your physician will visit shortly after admission for assessments.',
        noteAr: 'يزورك طبيبك بعد القبول مباشرة لإجراء التقييم اللازم.',
    },
]

interface AdmissionExperienceProps {
    lang?: string
}

export default function AdmissionExperience({ lang = 'en' }: AdmissionExperienceProps) {
    const [selectedStep, setSelectedStep] = useState(timelineSteps[0].id)
    const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({})

    const progress = useMemo(() => {
        const completed = Object.values(checkedDocs).filter(Boolean).length
        return Math.round((completed / documents.length) * 100)
    }, [checkedDocs])

    const isRTL = lang === 'ar'

    return (
        <div className="space-y-10">
            {/* Interactive checklist */}
            <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="card-warm">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                            <ClipboardCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                                {lang === 'ar' ? 'قائمة التحقق' : 'Admission Checklist'}
                            </p>
                            <h3 className="text-2xl font-bold text-text-primary">
                                {lang === 'ar' ? 'المستندات المطلوبة' : 'Documents to bring'}
                            </h3>
                        </div>
                        <div className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {progress}% {lang === 'ar' ? 'جاهز' : 'ready'}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {documents.map((doc) => (
                            <label
                                key={doc.id}
                                className={cn(
                                    'flex cursor-pointer items-center gap-3 rounded-xl border border-warm-gray/60 bg-white/80 p-4 transition-all',
                                    checkedDocs[doc.id] ? 'border-primary/40 bg-primary-light/20 shadow-sm' : 'hover:border-primary/30'
                                )}
                            >
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-warm-gray text-primary focus:ring-primary"
                                    checked={checkedDocs[doc.id] || false}
                                    onChange={(e) => setCheckedDocs((prev) => ({ ...prev, [doc.id]: e.target.checked }))}
                                />
                                <span className="text-sm font-medium text-text-primary">
                                    {isRTL ? doc.labelAr : doc.labelEn}
                                </span>
                            </label>
                        ))}
                    </div>

                    <p className="mt-4 flex items-start gap-2 text-sm text-text-secondary">
                        <Shield className="h-4 w-4 text-primary" />
                        {lang === 'ar'
                            ? 'ملاحظة: الحالات الطارئة تُقبل من قسم الطوارئ مع تقرير ER وأمر الطبيب. يجب تأمين موافقات الضامن خلال 24 ساعة عند الحاجة.'
                            : 'Note: Emergency cases are admitted via ER with an ER sheet and doctor order. Guarantor approvals must be secured within 24 hours when applicable.'}
                    </p>
                </div>

                <div className="card-warm relative overflow-hidden">
                    <div className="absolute right-4 top-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {lang === 'ar' ? 'متابعة مباشرة' : 'Real-time support'}
                    </div>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                            <Handshake className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                                {lang === 'ar' ? 'دعم القبول' : 'Admission support'}
                            </p>
                            <h3 className="text-xl font-bold text-text-primary">
                                {lang === 'ar' ? 'مكتب الاستقبال متوفر 24/7' : 'Admissions office available 24/7'}
                            </h3>
                        </div>
                    </div>
                    <div className="space-y-3 text-sm text-text-secondary">
                        <p>
                            {lang === 'ar'
                                ? 'يقع القسم في الطابق الأرضي (GF). بعد الدوام أو في الإجازات الرسمية تتم إجراءات القبول عبر مكتب الصندوق في الطابق الأرضي.'
                                : 'Located on the Ground Floor (GF). On Sundays or holidays after hours, admissions are handled via the Cashier counter (GF).'}
                        </p>
                        <p>
                            {lang === 'ar'
                                ? 'فريق القبول جاهز لمساعدتك على مدار الساعة: التحقق من المستندات، التواصل مع الضامن، وتنسيق النقل إلى الجناح.'
                                : 'Admissions officers are available around the clock to verify documents, liaise with guarantors, and coordinate ward transfers.'}
                        </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 rounded-xl bg-primary/10 p-4 text-sm text-primary">
                        <Sparkles className="h-4 w-4" />
                        {lang === 'ar'
                            ? 'ينصح بالوصول قبل 30 دقيقة من موعد الدخول لتسريع الإجراءات.'
                            : 'Arrive 30 minutes before your scheduled admission to streamline the process.'}
                    </div>
                </div>
            </div>

            {/* Interactive timeline */}
            <div className="card-warm">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A651]/15 text-[#00A651]">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {lang === 'ar' ? 'رحلة القبول' : 'Admission journey'}
                        </p>
                        <h3 className="text-2xl font-bold text-text-primary">
                            {lang === 'ar' ? 'خطوات تفاعلية' : 'Interactive steps'}
                        </h3>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[280px,1fr]">
                    <div className="space-y-3">
                        {timelineSteps.map((step) => {
                            const Icon = step.icon
                            const active = selectedStep === step.id
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setSelectedStep(step.id)}
                                    className={cn(
                                        'w-full rounded-2xl border px-4 py-3 text-left transition-all',
                                        active
                                            ? 'border-primary bg-primary-light/20 text-primary shadow-sm'
                                            : 'border-warm-gray/50 bg-white hover:border-primary/40'
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                'flex h-10 w-10 items-center justify-center rounded-xl',
                                                active ? 'bg-primary text-white' : 'bg-primary-light/20 text-primary'
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-text-primary">
                                                {isRTL ? step.titleAr : step.titleEn}
                                            </p>
                                            <p className="text-xs text-text-secondary">{step.duration}</p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6">
                        {timelineSteps
                            .filter((step) => step.id === selectedStep)
                            .map((step) => (
                                <div key={step.id} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <BadgeCheck className="h-5 w-5 text-primary" />
                                        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                                            {lang === 'ar' ? 'تفاصيل الخطوة' : 'Step details'}
                                        </p>
                                    </div>
                                    <h4 className="text-xl font-bold text-text-primary">
                                        {isRTL ? step.titleAr : step.titleEn}
                                    </h4>
                                    <p className="text-text-secondary">{isRTL ? step.descAr : step.descEn}</p>
                                    <div className="rounded-xl bg-white/80 p-4 text-sm text-text-secondary shadow-sm">
                                        {lang === 'ar'
                                            ? 'الموظفون يتابعون مع مكتب الضمان، يتم تجهيز الغرفة، ويُعطى المريض سوار التعريف قبل الانتقال إلى الجناح.'
                                            : 'Our coordinators update the guarantor, prepare the ward, and issue the patient ID band before transfer.'}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Floor highlights / site map */}
            <div className="grid gap-6 md:grid-cols-3">
                {floorHighlights.map((point, idx) => (
                    <div key={idx} className="card-warm relative overflow-hidden">
                        <div className="absolute right-4 top-4 text-sm font-semibold text-primary/70">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-text-primary">
                                    {isRTL ? point.titleAr : point.titleEn}
                                </h4>
                                <p className="text-xs uppercase tracking-wider text-text-secondary">
                                    {lang === 'ar' ? 'موقع على المخطط' : 'Site map point'}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary">{isRTL ? point.detailsAr : point.detailsEn}</p>
                        <div className="mt-4 rounded-xl bg-primary/5 p-3 text-xs text-primary">
                            {isRTL ? point.noteAr : point.noteEn}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

