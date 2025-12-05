'use client'

import { useEffect, useState } from 'react'
import { UserMultiple, Building, Calendar, Trophy, Hospital } from '@carbon/icons-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface EnhancedStatsSectionProps {
    lang?: string
}

const getStats = (lang: string) => [
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

export default function EnhancedStatsSection({ lang = 'en' }: EnhancedStatsSectionProps) {
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [counters, setCounters] = useState({ years: 0, doctors: 0, departments: 0, patients: 0 })
    
    const stats = getStats(lang)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

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
    }, [mounted])

    useEffect(() => {
        if (!mounted || !isVisible) return

        const timers: NodeJS.Timeout[] = []

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

            timers.push(timer)
        })

        return () => {
            timers.forEach(timer => clearInterval(timer))
        }
    }, [mounted, isVisible])

    return (
        <section id="stats-section" className="py-20 bg-primary text-white relative overflow-hidden">
            {/* Modern Grid Pattern Background */}
            <div className="absolute inset-0">
                {/* Clean Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px',
                    }}
                />
                
                {/* Subtle Dot Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px',
                    }}
                />
                
                {/* Glassmorphism Overlay - Frosted Glass Effect */}
                <div className="absolute inset-0 backdrop-blur-[60px] bg-primary/20" />
                
                {/* Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-hover/10 via-transparent to-primary/10" />
                
                {/* Subtle Radial Gradient for Focus */}
                <div className="absolute inset-0 bg-radial-gradient from-white/5 via-transparent to-transparent" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)'
                }} />
            </div>
            
            {/* Carbon Design System Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-hover" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                        <Hospital className="w-4 h-4 text-white" />
                        <span className="text-white">{lang === 'ar' ? 'إحصائياتنا' : 'Our Impact'}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                        {lang === 'ar' ? 'إحصائياتنا' : 'Our Statistics'}
                    </h2>
                    <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'أرقام تعكس التميز والجودة في الرعاية الصحية'
                            : 'Numbers that reflect our commitment to excellence and quality healthcare'}
                    </p>
                </div>

                {/* Desktop Grid - Show all stats */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                                className="group relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            >
                                {/* Carbon Design System Accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
                                
                                {/* Progress Ring */}
                                <div className="relative w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="42"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            className="text-white/20"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="42"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 42}`}
                                            strokeDashoffset={`${2 * Math.PI * 42 * (1 - value / stat.target)}`}
                                            className={`text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white drop-shadow-md" />
                                    </div>
                                </div>

                                <div className="text-center relative z-10">
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white drop-shadow-md">
                                        {displayValue}
                                        <span className="text-white/90">{stat.suffix}</span>
                                    </div>
                                    <div className="text-white/90 text-xs md:text-sm uppercase tracking-wider font-semibold">
                                        {stat.label}
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none" />
                            </div>
                        )
                    })}
                </div>

                {/* Mobile Carousel - Show stats in carousel */}
                <div className="md:hidden relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-sm mx-auto"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
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
                                    <CarouselItem key={stat.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2">
                                        <div className="group relative bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl">
                                            {/* Carbon Design System Accent */}
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
                                            
                                            {/* Progress Ring */}
                                            <div className="relative w-16 h-16 mx-auto mb-4">
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="42"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        className="text-white/20"
                                                    />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="42"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                        strokeDasharray={`${2 * Math.PI * 42}`}
                                                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - value / stat.target)}`}
                                                        className={`text-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Icon className="w-6 h-6 text-white drop-shadow-md" />
                                                </div>
                                            </div>

                                            <div className="text-center relative z-10">
                                                <div className="text-3xl font-bold mb-2 text-white drop-shadow-md">
                                                    {displayValue}
                                                    <span className="text-white/90">{stat.suffix}</span>
                                                </div>
                                                <div className="text-white/90 text-xs uppercase tracking-wider font-semibold">
                                                    {stat.label}
                                                </div>
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none" />
                                        </div>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40" />
                        <CarouselNext className="right-0 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}

