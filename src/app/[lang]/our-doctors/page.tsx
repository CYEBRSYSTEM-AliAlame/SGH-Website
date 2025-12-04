import DoctorsList from './DoctorsList'
import type { Doctor } from '@/types'
import DoctorDiscoveryHub from '@/components/DoctorDiscoveryHub'

interface OurDoctorsPageProps {
    params: Promise<{ lang: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function OurDoctorsPage({ params, searchParams }: OurDoctorsPageProps) {
    const { lang } = await params
    const search = await searchParams

    // Build query parameters
    const queryParams = new URLSearchParams()
    if (typeof search.keyword_name === 'string' && search.keyword_name) {
        queryParams.set('keyword_name', search.keyword_name)
    }
    if (search.head_of_dep === 'true') {
        queryParams.set('head_of_dep', 'true')
    }
    if (typeof search.service_id === 'string' && search.service_id) {
        queryParams.set('service_id', search.service_id)
    }

    // Fetch doctors directly from service (no HTTP calls)
    let doctors: Doctor[] = []
    
    try {
        const { doctorService } = await import('@/services/doctorService')
        doctors = await doctorService.getAll({
            keywordName: typeof search.keyword_name === 'string' ? search.keyword_name : undefined,
            headOfDep: search.head_of_dep === 'true' ? true : search.head_of_dep === 'false' ? false : undefined,
            serviceId: typeof search.service_id === 'string' ? parseInt(search.service_id) : undefined,
        })
    } catch (error) {
        console.error('Error fetching doctors:', error)
        // Continue with empty array - page will show "No doctors found"
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Page-specific Header */}
            <div className="bg-primary text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {lang === 'ar' ? 'أطباؤنا' : 'Our Doctors'}
                    </h1>
                    <p className="text-xl opacity-90 max-w-3xl">
                        {lang === 'ar'
                            ? 'تعرف على فريقنا من الأطباء المتخصصين ذوي الخبرة العالية'
                            : 'Meet our team of highly qualified and experienced medical professionals'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-16">
                <DoctorDiscoveryHub doctors={doctors} lang={lang} />
                <DoctorsList doctors={doctors} lang={lang} />
            </div>
        </div>
    )
}
