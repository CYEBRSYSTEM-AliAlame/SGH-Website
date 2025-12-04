'use client'

import { Activity, ArrowUp, Time, CheckboxChecked } from '@carbon/icons-react'

interface MedicalDashboardProps {
    lang?: string
}

export default function MedicalDashboard({ lang = 'en' }: MedicalDashboardProps) {
    const metrics = [
        {
            label: lang === 'ar' ? 'معدل النجاح' : 'Success Rate',
            value: '98.5%',
            change: '+2.3%',
            icon: CheckboxChecked,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
        },
        {
            label: lang === 'ar' ? 'متوسط وقت الانتظار' : 'Avg. Wait Time',
            value: '15 min',
            change: '-5 min',
            icon: Time,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: lang === 'ar' ? 'المرضى النشطون' : 'Active Patients',
            value: '1,247',
            change: '+12%',
            icon: Activity,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: lang === 'ar' ? 'نمو سنوي' : 'Annual Growth',
            value: '24%',
            change: '+4%',
            icon: ArrowUp,
            color: 'text-teal-500',
            bgColor: 'bg-teal-500/10',
        },
    ]

    return (
        <section className="py-16 bg-gradient-to-b from-white to-cream">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <Activity className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                            {lang === 'ar' ? 'الأداء' : 'Performance'}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        {lang === 'ar' ? 'لوحة الأداء الطبي' : 'Medical Performance Dashboard'}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-4" />
                    <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'مؤشرات الأداء الرئيسية التي تعكس جودة خدماتنا'
                            : 'Key performance indicators reflecting the quality of our services'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon
                        return (
                            <div
                                key={index}
                                className="relative p-6 rounded-2xl border border-warm-gray/50 hover:border-primary transition-all duration-300 hover:shadow-xl group bg-white hover:scale-105"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className={`w-6 h-6 ${metric.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-text-primary mb-1">{metric.value}</div>
                                <div className="text-sm text-text-secondary mb-2">{metric.label}</div>
                                <div className="text-xs text-primary font-semibold flex items-center gap-1">
                                    <ArrowUp className="w-4 h-4" />
                                    {metric.change}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

