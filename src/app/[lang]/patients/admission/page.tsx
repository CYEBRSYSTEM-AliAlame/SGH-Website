import AdmissionExperience from '@/components/AdmissionExperience'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admission Guide | Sahel General Hospital',
    description: 'Interactive guide covering admission steps, required documents, and orientation for Sahel General Hospital patients.',
}

export default async function AdmissionPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-10 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/20 px-4 py-2 text-sm font-semibold text-primary">
                        {lang === 'ar' ? 'قسم الاستقبال' : 'Admissions Office'}
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'دليل القبول التفاعلي' : 'Interactive Admission Guide'}
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'اكتشف خطوات القبول، المستندات المطلوبة، وماذا يحدث بعد وصولك إلى المستشفى. تم جمع البيانات من الموقع القديم وتحديثها لتجربة تفاعلية مبسطة.'
                            : 'Explore the admission steps, required documents, and what happens once you enter the hospital. We modernized the original content from the legacy site into an interactive experience.'}
                    </p>
                </div>

                <AdmissionExperience lang={lang} />
            </div>
        </div>
    )
}

