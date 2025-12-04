'use client'

import type { MedicalService } from '@/types'

interface DepartmentChartProps {
    services: MedicalService[]
    lang?: string
}

export default function DepartmentChart({ services, lang = 'en' }: DepartmentChartProps) {
    // Group services by department
    const departmentCounts = services.reduce(
        (acc, service) => {
            const depId = service.dep_id
            acc[depId] = (acc[depId] || 0) + 1
            return acc
        },
        {} as Record<number, number>
    )

    const maxCount = Math.max(...Object.values(departmentCounts), 1)
    const departments = Object.entries(departmentCounts)
        .map(([depId, count]) => ({ depId: parseInt(depId), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6) // Top 6

    if (departments.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {lang === 'ar' ? 'توزيع الأقسام الطبية' : 'Medical Department Distribution'}
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto" />
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'نظرة عامة على خدماتنا الطبية عبر مختلف الأقسام'
                            : 'Overview of our medical services across different departments'}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {departments.map(({ depId, count }, index) => {
                            const percentage = (count / maxCount) * 100
                            return (
                                <div key={depId} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {lang === 'ar' ? `قسم ${depId}` : `Department ${depId}`}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {count} {lang === 'ar' ? 'خدمة' : 'Services'}
                                        </span>
                                    </div>
                                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg"
                                            style={{
                                                width: `${percentage}%`,
                                                transitionDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

