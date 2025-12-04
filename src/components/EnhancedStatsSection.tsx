'use client'

import { useEffect, useState } from 'react'
import { UserMultiple, Building, Calendar, Trophy, Hospital } from '@carbon/icons-react'

interface EnhancedStatsSectionProps {
    lang?: string
}

export default function EnhancedStatsSection({ lang = 'en' }: EnhancedStatsSectionProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [counters, setCounters] = useState({ years: 0, doctors: 0, departments: 0, patients: 0 })

    const stats = [
        {
            id: 1,
            target: 40,
            label: lang === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience',
            icon: Calendar,
            color: 'from-primary to-primary-hover',
            suffix: '+',
        },
        {
            id: 2,
            target: 309,
            label: lang === 'ar' ? 'أطباء متخصصين' : 'Specialist Doctors',
            icon: UserMultiple,
            color: 'from-primary-light to-primary',
            suffix: '+',
        },
        {
            id: 3,
            target: 25,
            label: lang === 'ar' ? 'أقسام طبية' : 'Medical Departments',
            icon: Building,
            color: 'from-accent-light to-accent',
            suffix: '+',
        },
        {
            id: 4,
            target: 10000,
            label: lang === 'ar' ? 'مرضى سعداء سنوياً' : 'Happy Patients Yearly',
            icon: Trophy,
            color: 'from-primary to-primary-light',
            suffix: '+',
        },
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        const element = document.getElementById('stats-section')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        stats.forEach((stat) => {
            const duration = 2000 // 2 seconds
            const steps = 60
            const increment = stat.target / steps
            let current = 0

            const timer = setInterval(() => {
                current += increment
                if (current >= stat.target) {
                    current = stat.target
                    clearInterval(timer)
                }

                setCounters((prev) => ({
                    ...prev,
                    [stat.id === 1 ? 'years' : stat.id === 2 ? 'doctors' : stat.id === 3 ? 'departments' : 'patients']: Math.floor(current),
                }))
            }, duration / steps)
        })
    }, [isVisible])

    return (
        <section id="stats-section" className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary-hover text-white relative overflow-hidden pattern-cedar">
            {/* Lebanese Cedar Tree Pattern Overlay - Reduced opacity for better text visibility */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 20 L110 60 L120 40 L115 80 L130 50 L120 90 L140 70 L125 100 L150 85 L130 110 L160 100 L135 120 L170 115 L140 130 L175 130 L145 140 L180 145 L150 150 L185 160 L155 160 L190 175 L160 170 L195 190 L165 180 L200 200 L100 200 L0 200 L35 180 L5 190 L40 175 L10 160 L45 160 L15 150 L50 145 L20 140 L55 130 L25 120 L60 115 L30 100 L65 110 L45 85 L70 100 L55 70 L75 90 L65 50 L80 80 L75 40 L85 60 L100 20 Z' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E")`,
                        backgroundSize: '300px 300px',
                    }}
                />
            </div>
            
            {/* Lebanese Flag Colors Accent Stripes - Subtle */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#ED1C24] opacity-20" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                        <Hospital className="w-4 h-4 text-white" />
                        <span>{lang === 'ar' ? 'إحصائياتنا' : 'Our Impact'}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                        {lang === 'ar' ? 'إحصائياتنا' : 'Our Statistics'}
                    </h2>
                    {/* Lebanese Flag Colors in Gradient Line */}
                    <div className="w-32 h-1 bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#ED1C24] mx-auto mb-4 rounded-full" />
                    <p className="mt-4 text-white/95 text-lg max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'أرقام تعكس التميز والجودة في الرعاية الصحية'
                            : 'Numbers that reflect our commitment to excellence and quality healthcare'}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        const value =
                            stat.id === 1
                                ? counters.years
                                : stat.id === 2
                                ? counters.doctors
                                : stat.id === 3
                                ? counters.departments
                                : counters.patients
                        const displayValue = stat.target >= 1000 ? `${(value / 1000).toFixed(1)}k` : value

                        return (
                                <div
                                    key={stat.id}
                                    className="group relative bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                {/* Progress Ring */}
                                <div className="relative w-20 h-20 mx-auto mb-4">
                                    <svg className="w-20 h-20 transform -rotate-90">
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="36"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            className="text-white/20"
                                        />
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="36"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 36}`}
                                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - value / stat.target)}`}
                                            className={`text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                                    </div>
                                </div>

                                <div className="text-center relative z-10">
                                    <div
                                        className={`text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg`}
                                        style={{
                                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        {displayValue}
                                        {stat.suffix}
                                    </div>
                                    <div className="text-white/90 text-sm uppercase tracking-wider font-semibold drop-shadow-md">{stat.label}</div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

