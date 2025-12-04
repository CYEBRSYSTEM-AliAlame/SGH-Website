import VisitingExperience from '@/components/VisitingExperience'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Visiting Hours | Sahel General Hospital',
    description: 'Interactive visiting hours, guest guidelines, and support services for Sahel General Hospital.',
}

export default async function VisitingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary">
                        {lang === 'ar' ? 'الزوار' : 'Guests & Families'}
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'ساعات الزيارة التفاعلية' : 'Interactive Visiting Hours'}
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'تعرف على جداول الزيارة لكل الأقسام، القواعد الخاصة بالضيوف، وأماكن الانتظار، في تجربة تفاعلية مستوحاة من الموقع القديم.'
                            : 'Get a clear breakdown of visiting schedules, guest etiquette, and lounge locations—modernizing the legacy content into an interactive experience.'}
                    </p>
                </div>

                <VisitingExperience lang={lang} />
            </div>
        </div>
    )
}

