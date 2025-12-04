import ServiceCard from '@/components/ServiceCard'
import { Metadata } from 'next'
import { medicalService } from '@/services/medicalService'
import type { MedicalService } from '@/types'

export const metadata: Metadata = {
    title: 'Medical Services | Sahel General Hospital',
    description: 'Explore our comprehensive range of medical services and specialties.',
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    
    // Fetch services directly from service (no HTTP calls)
    let services: MedicalService[] = []
    try {
        services = await medicalService.getAll()
    } catch (error) {
        console.error('Error fetching services:', error)
        // Continue with empty array - page will show empty state
    }

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'خدماتنا الطبية' : 'Our Medical Services'}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'نقدم مجموعة شاملة من الخدمات الطبية المتخصصة لتلبية احتياجاتك الصحية بأعلى معايير الجودة.'
                            : 'We offer a comprehensive range of specialized medical services to meet your health needs with the highest standards of quality.'}
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} lang={lang} />
                    ))}
                </div>
            </div>
        </div>
    )
}
