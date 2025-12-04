'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import servicesData from '@/data/services.json'

interface DoctorFiltersProps {
    lang: string
}

interface Service {
    id: number
    service_title_en: string
    service_title_ar: string
}

export default function DoctorFilters({ lang }: DoctorFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('keyword_name') || '')
    const [showHeadsOnly, setShowHeadsOnly] = useState(searchParams.get('head_of_dep') === 'true')
    const [selectedService, setSelectedService] = useState(searchParams.get('service_id') || '')
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch services on mount with fallback to JSON data
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_ROOT_PATH || window.location.origin
                const res = await fetch(`${baseUrl}/api/services`, {
                    cache: 'no-store',
                })
                if (res.ok) {
                    const data = await res.json()
                    setServices(data.services || [])
                } else {
                    // Fallback to JSON data if API fails
                    console.warn('API request failed, using fallback data')
                    setServices(servicesData as Service[])
                }
            } catch (error) {
                // Fallback to JSON data if fetch fails
                console.warn('Error fetching services, using fallback data:', error)
                setServices(servicesData as Service[])
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()

        if (searchTerm) {
            params.set('keyword_name', searchTerm)
        }
        if (showHeadsOnly) {
            params.set('head_of_dep', 'true')
        }
        if (selectedService) {
            params.set('service_id', selectedService)
        }

        router.push(`/${lang}/our-doctors?${params.toString()}`)
    }

    const handleClear = () => {
        setSearchTerm('')
        setShowHeadsOnly(false)
        setSelectedService('')
        router.push(`/${lang}/our-doctors`)
    }

    return (
        <div className="card-warm mb-8">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            {lang === 'ar' ? 'البحث عن طبيب' : 'Search for a doctor'}
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={lang === 'ar' ? 'ابحث بالاسم...' : 'Search by name...'}
                                className="w-full pl-10 pr-4 py-2 border border-warm-gray rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Service Filter */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            {lang === 'ar' ? 'التخصص / الخدمة' : 'Specialty / Service'}
                        </label>
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full px-4 py-2 border border-warm-gray rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            disabled={loading}
                        >
                            <option value="">
                                {lang === 'ar' ? 'جميع التخصصات' : 'All Specialties'}
                            </option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {lang === 'ar' ? service.service_title_ar : service.service_title_en}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Head of Department Filter */}
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            {lang === 'ar' ? 'تصفية' : 'Filter'}
                        </label>
                        <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer h-10">
                            <input
                                type="checkbox"
                                checked={showHeadsOnly}
                                onChange={(e) => setShowHeadsOnly(e.target.checked)}
                                className="w-4 h-4 text-primary border-warm-gray rounded focus:ring-primary"
                            />
                            <span className="text-text-secondary">
                                {lang === 'ar' ? 'رؤساء الأقسام فقط' : 'Heads of Department only'}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        {lang === 'ar' ? 'بحث' : 'Search'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-6 py-2 bg-warm-gray text-text-primary rounded-md hover:bg-warm-gray/80 transition-colors"
                    >
                        {lang === 'ar' ? 'مسح' : 'Clear'}
                    </button>
                </div>
            </form>
        </div>
    )
}
