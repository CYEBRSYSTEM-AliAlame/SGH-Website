import { Target, Heart, CheckCircle2, Users, GraduationCap, Activity } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

export default async function MissionVisionPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params

    const objectives = [
        {
            icon: Heart,
            text: "Providing quality patient care in different divisions"
        },
        {
            icon: Activity,
            text: "Providing outpatient diagnosis through effective utilization of Ancillary Services"
        },
        {
            icon: Target,
            text: "Providing specialized medical care services"
        },
        {
            icon: CheckCircle2,
            text: "Participating in the planning of future health care services and programs through strategic planning and reviews"
        },
        {
            icon: GraduationCap,
            text: "Providing a clinical environment for academic programs in conjunction with educational institutions on full time basis, through housing the Lebanese University (between 55-60 rotating medical residents, fellows and interns/month) and on rotation basis for other Nursing/Midwifery/Laboratory/Radiology/Physiotherapy/Pharmacy and Dietary students"
        },
        {
            icon: Users,
            text: "Providing regional preventive and informative health care programs to its community through yearly planning and implementing of activities and trainings (lectures, site visits, & collaborations with NGOs, municipalities, & civic societies in any given year)"
        }
    ]

    return (
        <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary-hover via-primary to-primary-light text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 pattern-geometric opacity-10" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 border border-white/30">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                Our Purpose
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Mission & Vision
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                                Guiding principles that drive our commitment to excellence in healthcare.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission Cards */}
                <section className="py-20 -mt-16 relative z-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                            {/* Vision Card */}
                            <div className="card-warm">
                                <div className="w-16 h-16 bg-primary-light/20 rounded-2xl flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold text-text-primary mb-6">Vision</h2>
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    To become the <span className="text-primary font-semibold">preferred general hospital</span> and <span className="text-primary font-semibold">leading disease state specialists</span> in our community, providing quality and efficient healthcare services.
                                </p>
                            </div>

                            {/* Mission Card */}
                            <div className="card-warm">
                                <div className="w-16 h-16 bg-primary-light/20 rounded-2xl flex items-center justify-center mb-6">
                                    <Heart className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-3xl font-bold text-text-primary mb-6">Mission</h2>
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    To provide our community with <span className="text-primary font-semibold">affordable, quality, competent, and compassionate care</span>; our people with a safe and healthy work environment fostering career growth; and our university affiliates a trusted partner in academic advancement, all within an efficient, sustainable, socially responsible and progressive healthcare organization.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Objectives Section */}
                <section className="py-20 bg-cream">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                    Our Objectives
                                </h2>
                                <div className="w-20 h-1 bg-primary mx-auto mb-6" />
                                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                    Strategic goals that guide our daily operations and long-term planning.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {objectives.map((objective, index) => (
                                    <div
                                        key={index}
                                        className="card-warm group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary-light/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <objective.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                            </div>
                                            <p className="text-text-secondary leading-relaxed pt-2">
                                                {objective.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-primary text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Join Us in Our Mission
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Whether you're seeking care, looking to join our team, or interested in partnership opportunities, we welcome you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`/${lang}/contact`}
                                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-cream transition-colors"
                            >
                                Contact Us
                            </a>
                            <a
                                href={`/${lang}/careers`}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                            >
                                Career Opportunities
                            </a>
                        </div>
                    </div>
                </section>
        </main>
    )
}
