import Link from 'next/link'
import { Calendar, UserProfile, Phone, Document, ArrowRight } from '@carbon/icons-react'
import { dictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface QuickAccessProps {
    lang?: string
}

export default function QuickAccess({ lang = 'en' }: QuickAccessProps) {
    const isRtl = lang === 'ar'

    const actions = [
        {
            icon: UserProfile,
            title: lang === 'ar' ? 'ابحث عن طبيب' : 'Find a Doctor',
            desc: lang === 'ar' ? 'تصفح أطباءنا المتخصصين' : 'Browse our specialist doctors',
            href: `/${lang}/our-doctors`,
            color: 'bg-blue-600'
        },
        {
            icon: Calendar,
            title: lang === 'ar' ? 'احجز موعداً' : 'Book Appointment',
            desc: lang === 'ar' ? 'حدد موعد زيارتك القادمة' : 'Schedule your next visit',
            href: `/${lang}/contact`,
            color: 'bg-teal-600'
        },
        {
            icon: Document,
            title: lang === 'ar' ? 'بوابة المرضى' : 'Patient Portal',
            desc: lang === 'ar' ? 'الوصول إلى سجلاتك الطبية' : 'Access your medical records',
            href: '#',
            color: 'bg-purple-600'
        },
        {
            icon: Phone,
            title: lang === 'ar' ? 'الطوارئ' : 'Emergency',
            desc: lang === 'ar' ? '24/7 خط ساخن للطوارئ' : '24/7 Emergency Hotline',
            href: 'tel:+9611858333',
            color: 'bg-red-600'
        }
    ]

    return (
        <section className="relative z-20 mt-8 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shadow-2xl rounded-2xl overflow-hidden">
                {actions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className={cn(
                            "group relative p-8 flex flex-col justify-between h-52 transition-all duration-300 overflow-hidden",
                            "bg-white hover:shadow-xl border-r border-warm-gray/30 last:border-r-0",
                            "hover:scale-105 hover:z-10 hover:-translate-y-1"
                        )}
                    >
                        <div className="relative z-10">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
                                "bg-gradient-to-br from-primary-light/20 to-primary/20",
                                "group-hover:from-primary group-hover:to-primary-hover group-hover:scale-110 group-hover:rotate-3"
                            )}>
                                <action.icon className={cn(
                                    "w-7 h-7 text-primary transition-all duration-300",
                                    "group-hover:text-white group-hover:scale-110"
                                )} />
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {action.desc}
                            </p>
                            {/* Quick Stats */}
                            {index === 0 && (
                                <div className="mt-3 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    {lang === 'ar' ? '309+ طبيب متاح' : '309+ Doctors Available'}
                                </div>
                            )}
                            {index === 3 && (
                                <div className="mt-3 text-xs font-semibold text-[#ED1C24] opacity-0 group-hover:opacity-100 transition-opacity">
                                    {lang === 'ar' ? '24/7 متاح' : '24/7 Available'}
                                </div>
                            )}
                        </div>

                        <div className={cn(
                            "relative z-10 flex items-center gap-2 text-primary font-semibold text-sm",
                            "opacity-0 group-hover:opacity-100 transition-all duration-300",
                            isRtl ? "justify-start" : "justify-end"
                        )}>
                            {lang === 'ar' ? 'المزيد' : 'Learn More'}
                            <ArrowRight className={cn(
                                "w-4 h-4 transition-transform group-hover:translate-x-1",
                                isRtl && "rotate-180 group-hover:-translate-x-1"
                            )} />
                        </div>

                        {/* Warm gradient overlay on hover */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300",
                            action.color === 'bg-blue-600' ? 'from-primary to-primary-light' :
                            action.color === 'bg-teal-600' ? 'from-primary-light to-primary' :
                            action.color === 'bg-purple-600' ? 'from-primary to-accent' :
                            'from-accent to-accent-light'
                        )} />
                    </Link>
                ))}
            </div>
        </section>
    )
}
