import { Users, Building2, Calendar, Award } from 'lucide-react'

interface StatsSectionProps {
    lang?: string
}

export default function StatsSection({ lang = 'en' }: StatsSectionProps) {
    const stats = [
        {
            id: 1,
            number: '40+',
            label: lang === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience',
            icon: Calendar,
        },
        {
            id: 2,
            number: '150+',
            label: lang === 'ar' ? 'أطباء متخصصين' : 'Specialist Doctors',
            icon: Users,
        },
        {
            id: 3,
            number: '25+',
            label: lang === 'ar' ? 'أقسام طبية' : 'Medical Departments',
            icon: Building2,
        },
        {
            id: 4,
            number: '10k+',
            label: lang === 'ar' ? 'مرضى سعداء سنوياً' : 'Happy Patients Yearly',
            icon: Award,
        },
    ]

    return (
        <section className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat) => (
                        <div key={stat.id} className="text-center group">
                            <div className="mb-4 inline-flex p-4 rounded-full bg-gray-800 group-hover:bg-primary/20 transition-colors">
                                <stat.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.number}</div>
                            <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
