import { ClipboardCheck, Phone, Clock } from 'lucide-react'
import { Metadata } from 'next'
import InsuranceNetwork from '@/components/InsuranceNetwork'

export const metadata: Metadata = {
    title: 'Insurance & Guarantors | Sahel General Hospital',
    description: 'Explore approved guarantors, insurance steps, and support for Sahel General Hospital patients.',
}

export default async function InsurancePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'التأمين والضامنين' : 'Insurance & Guarantors'}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'كل ما تحتاج معرفته عن الضامنين المعتمدين، خطوات الموافقة، والدعم المتوفر لفريق التأمين لدينا.'
                            : 'Everything you need to know about approved guarantors, authorization steps, and our insurance support team.'}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Required Documents */}
                    <div className="card-warm">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                            <ClipboardCheck className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-xl font-bold text-text-primary">
                            {lang === 'ar' ? 'خطوات الموافقة' : 'Approval Checklist'}
                        </h2>
                        <ul className="space-y-3 text-text-secondary">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {lang === 'ar' ? 'بطاقة التأمين أو إفادة الضامن' : 'Insurance card or guarantor letter'}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {lang === 'ar' ? 'تقرير طبي أو إحالة الطبيب' : 'Medical report or doctor referral'}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                {lang === 'ar' ? 'الموافقة المسبقة للحالات الجراحية' : 'Pre-authorization for procedures'}
                            </li>
                        </ul>
                    </div>

                    {/* Pre-authorization timeline */}
                    <div className="card-warm">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A651]/20 text-[#00A651]">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-xl font-bold text-text-primary">
                            {lang === 'ar' ? 'مدة الموافقات' : 'Pre-Authorization Timeline'}
                        </h2>
                        <div className="space-y-4 text-text-secondary">
                            <div>
                                <h3 className="font-semibold text-text-primary">{lang === 'ar' ? 'الاستشارات' : 'Consultations'}</h3>
                                <p>{lang === 'ar' ? '24 ساعة' : 'Within 24 hours'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary">{lang === 'ar' ? 'الفحوصات والمختبرات' : 'Lab & Imaging'}</h3>
                                <p>{lang === 'ar' ? '12-24 ساعة' : '12–24 hours'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary">{lang === 'ar' ? 'الإجراءات أو العمليات' : 'Procedures / Surgery'}</h3>
                                <p>{lang === 'ar' ? '24-48 ساعة' : '24–48 hours'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="card-warm">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-xl font-bold text-text-primary">
                            {lang === 'ar' ? 'مكتب التأمين' : 'Insurance Support Desk'}
                        </h2>
                        <p className="mb-4 text-text-secondary">
                            {lang === 'ar'
                                ? 'يعمل فريقنا مع جميع الضامنين للمساعدة في الموافقات، المطالبات، والاستفسارات.'
                                : 'Our insurance team coordinates with all guarantors to assist with approvals, claims, and inquiries.'}
                        </p>
                        <a
                            href={`/${lang}/contact`}
                            className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light"
                        >
                            {lang === 'ar' ? 'تواصل مع مكتب التأمين' : 'Contact Insurance Desk'} →
                        </a>
                    </div>
                </div>

                <InsuranceNetwork lang={lang} />
            </div>
        </div>
    )
}

