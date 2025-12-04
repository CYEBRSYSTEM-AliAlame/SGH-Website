import DiagnosticsExperience from '@/components/DiagnosticsExperience'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Diagnostic Services | Sahel General Hospital',
    description: 'Explore advanced imaging, smart laboratory, and cardio-diagnostic capabilities at Sahel General Hospital.',
}

export default async function DiagnosticsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary">
                        {lang === 'ar' ? 'الخدمات التشخيصية' : 'Diagnostic Suite'}
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'منصة تشخيص تفاعلية' : 'Interactive Diagnostic Platform'}
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'قمنا بتحديث بيانات الموقع القديم حول التصوير والمختبر والقلب إلى تجربة تفاعلية حديثة للمراجعة والحجز.'
                            : 'We transformed the legacy diagnostic content (imaging, laboratory, cardiology) into an interactive experience for planning and booking tests.'}
                    </p>
                </div>

                <DiagnosticsExperience lang={lang} />
            </div>
        </div>
    )
}

