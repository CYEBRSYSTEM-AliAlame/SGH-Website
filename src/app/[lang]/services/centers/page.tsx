import { dictionary, type Locale } from '@/lib/i18n'
import { Award, HeartPulse, Brain, Baby, Activity, Microscope, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import CentersInteractive from '@/components/CentersInteractive'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Centers of Excellence | Sahel General Hospital',
    description: 'Our specialized centers providing world-class medical care and advanced treatments.',
}

const stats = [
    { label_en: 'Rapid response cath lab', label_ar: 'مختبر قسطرة سريع الاستجابة', value: '24/7', icon: HeartPulse },
    { label_en: 'Stroke-ready neuro team', label_ar: 'فريق عصبي جاهز للسكتات', value: '15 min', icon: Brain },
    { label_en: 'Maternal-fetal programs', label_ar: 'برامج الأمومة والجنين', value: '3', icon: Baby },
]

const journey = [
    {
        icon: Sparkles,
        title_en: 'Precision referral',
        title_ar: 'إحالة دقيقة',
        desc_en: 'Digital triage and direct transfer to the appropriate center.',
        desc_ar: 'فرز رقمي ونقل مباشر إلى المركز المناسب.',
    },
    {
        icon: Microscope,
        title_en: 'Multidisciplinary board',
        title_ar: 'مجلس خبراء متعدد التخصصات',
        desc_en: 'Cardio, neuro, oncologic and maternal boards meet daily for complex cases.',
        desc_ar: 'مجالس قلبية وعصبية وأورام وأمومة تجتمع يومياً للحالات المعقدة.',
    },
    {
        icon: ShieldCheck,
        title_en: 'Continuum of care',
        title_ar: 'استمرارية الرعاية',
        desc_en: 'Rehab, virtual rounds, and concierge follow-ups keep patients connected.',
        desc_ar: 'التأهيل والمتابعة الافتراضية وخدمة الكونسييرج تحافظ على التواصل مع المرضى.',
    },
]

const supportCards = [
    {
        title_en: 'Virtual Tumor Boards',
        title_ar: 'مجالس أورام افتراضية',
        desc_en: 'Secure telemedicine board reviews for oncology and complex cases.',
        desc_ar: 'مراجعات مجالس أورام عبر الطب الاتصالي للحالات المعقدة.',
    },
    {
        title_en: 'Family Liaison Lounge',
        title_ar: 'صالة تنسيق العائلات',
        desc_en: 'Dedicated concierge supporting travel, accommodation, and updates.',
        desc_ar: 'فريق كونسييرج مخصص لدعم السفر والإقامة وتحديث العائلة.',
    },
    {
        title_en: 'Recovery Navigation',
        title_ar: 'مرافقة التعافي',
        desc_en: 'Post-discharge coaching, home nursing coordination, and remote monitoring.',
        desc_ar: 'إرشاد ما بعد الخروج، تنسيق التمريض المنزلي، ومراقبة عن بعد.',
    },
]

export default async function CentersPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = dictionary[lang as Locale] || dictionary['en']
    const isRtl = lang === 'ar'

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4 space-y-16">
                {/* Hero */}
                <section className="rounded-3xl bg-gradient-to-br from-primary via-primary-hover to-primary-light text-white p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pattern-geometric" />
                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em]">
                            <Award className="h-4 w-4" />
                            {isRtl ? 'مراكز التميز' : 'Centers of Excellence'}
                        </div>
                        <div className="flex flex-wrap items-center gap-6 justify-between">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                    {isRtl
                                        ? 'شبكة متكاملة من المراكز المتخصصة'
                                        : 'Integrated centers delivering advanced, human-centered care'}
                                </h1>
                                <p className="text-white/90 text-lg">
                                    {isRtl
                                        ? 'من القسطرة إلى العلوم العصبية، نقدم برامج تميّز مدعومة بفِرق متعددة التخصصات وتقنيات متطورة.'
                                        : 'From cath labs to neurosciences, our flagship hubs combine multidisciplinary teams, advanced tech, and concierge pathways.'}
                                </p>
                            </div>
                            <a
                                href={`/${lang}/contact`}
                                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-sm font-semibold backdrop-blur-sm hover:bg-white/30 transition"
                            >
                                {isRtl ? 'تنسيق زيارة' : 'Coordinate your visit'}
                                <ArrowRight className={cn('h-4 w-4', isRtl && 'rotate-180')} />
                            </a>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 pt-6 border-t border-white/30">
                            {stats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div key={stat.label_en} className="rounded-2xl bg-white/10 p-4 shadow-lg backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-xl bg-white/20 p-2">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                                                    {isRtl ? stat.label_ar : stat.label_en}
                                                </p>
                                                <p className="text-2xl font-bold">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Interactive center selector */}
                <CentersInteractive lang={lang} />

                {/* Journey */}
                <section className="card-warm">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                            {isRtl ? 'رحلة المريض' : 'Patient pathway'}
                        </div>
                        <p className="text-sm text-text-secondary">
                            {isRtl
                                ? 'نرافقك في كل مرحلة من لحظة الإحالة وحتى التعافي الكامل.'
                                : 'Every center works within a single continuum – from referral to recovery.'}
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {journey.map((step, idx) => {
                            const Icon = step.icon
                            return (
                                <div key={idx} className="rounded-2xl border border-warm-gray/40 p-5">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-primary mb-2">
                                        {isRtl ? step.title_ar : step.title_en}
                                    </h3>
                                    <p className="text-sm text-text-secondary">
                                        {isRtl ? step.desc_ar : step.desc_en}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Support services */}
                <section className="grid gap-6 md:grid-cols-3">
                    {supportCards.map((card, idx) => (
                        <div key={idx} className="card-warm border border-primary/10">
                            <div className="mb-3 flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-[0.4em]">
                                <Activity className="h-4 w-4" />
                                {isRtl ? 'دعم مخصص' : 'Special support'}
                            </div>
                            <h4 className="text-xl font-bold text-text-primary mb-2">
                                {isRtl ? card.title_ar : card.title_en}
                            </h4>
                            <p className="text-sm text-text-secondary">
                                {isRtl ? card.desc_ar : card.desc_en}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}
