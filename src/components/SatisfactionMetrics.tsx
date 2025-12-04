'use client'

import { Favorite, LocationStar, ThumbsUp, FaceActivated } from '@carbon/icons-react'

interface SatisfactionMetricsProps {
    lang?: string
}

export default function SatisfactionMetrics({ lang = 'en' }: SatisfactionMetricsProps) {
    const metrics = [
        {
            label: lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction',
            value: 96,
            icon: Favorite,
            color: 'text-red-500',
            strokeColor: 'stroke-red-500',
        },
        {
            label: lang === 'ar' ? 'جودة الرعاية' : 'Care Quality',
            value: 94,
            icon: LocationStar,
            color: 'text-yellow-500',
            strokeColor: 'stroke-yellow-500',
        },
        {
            label: lang === 'ar' ? 'التوصية' : 'Recommendation',
            value: 98,
            icon: ThumbsUp,
            color: 'text-green-500',
            strokeColor: 'stroke-green-500',
        },
        {
            label: lang === 'ar' ? 'تجربة إيجابية' : 'Positive Experience',
            value: 95,
            icon: FaceActivated,
            color: 'text-blue-500',
            strokeColor: 'stroke-blue-500',
        },
    ]

    return (
        <section className="py-16 bg-gradient-to-b from-cream to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <Favorite className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wider">
                            {lang === 'ar' ? 'رضا المرضى' : 'Patient Satisfaction'}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                        {lang === 'ar' ? 'مؤشرات رضا المرضى' : 'Patient Satisfaction Metrics'}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto mb-4" />
                    <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
                        {lang === 'ar'
                            ? 'نقيس رضا مرضانا باستمرار لضمان أفضل تجربة رعاية صحية'
                            : 'We continuously measure patient satisfaction to ensure the best healthcare experience'}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon
                        const circumference = 2 * Math.PI * 45 // radius = 45
                        const offset = circumference - (metric.value / 100) * circumference

                        return (
                            <div key={index} className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
                                <div className="relative w-32 h-32 mb-4">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            className="text-warm-gray"
                                        />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="45"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            className={`${metric.strokeColor} transition-all duration-1000`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <Icon className={`w-8 h-8 ${metric.color} mb-1 group-hover:scale-110 transition-transform`} />
                                        <span className="text-2xl font-bold text-text-primary">{metric.value}%</span>
                                    </div>
                                </div>
                                <p className="text-sm text-text-secondary text-center font-semibold">{metric.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

