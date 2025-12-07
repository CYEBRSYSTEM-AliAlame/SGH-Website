import Image from 'next/image'
import { Calendar, Award, Building2, Users, Shield } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

export default async function CorporateHistoryPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params

    const accreditations = [
        {
            icon: Building2,
            title: "University Medical Center",
            description: "Classified as a University Medical Center by the Lebanese University School of Medicine and the Ministry of Public Health."
        },
        {
            icon: Award,
            title: "Highest Accreditation",
            description: "Holds the highest accreditation ranking by the Ministry of Health."
        },
        {
            icon: Shield,
            title: "ISO 9001 Certified",
            description: "The management system at SGH is ISO 9001 certified since 2003."
        },
        {
            icon: Users,
            title: "Executive Board Member",
            description: "Executive board member at the Lebanese Syndicate of Private Hospitals."
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
                                <Calendar className="w-4 h-4" />
                                Since 1983
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Corporate History
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                                Four decades of excellence in healthcare, built on vision and dedication.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">

                            {/* Founding Story */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/main_slider/Main-SGH 1.svg"
                                        alt="Sahel General Hospital Founding 1983"
                                        className="w-full h-auto"
                                        width={1024}
                                        height={1024}
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                                        <p className="text-2xl font-bold text-primary">1983</p>
                                        <p className="text-xs text-text-secondary uppercase tracking-wider">Founded</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/20 text-primary text-sm font-medium mb-4">
                                        <span className="w-2 h-2 rounded-full bg-primary" />
                                        The Beginning
                                    </div>
                                    <h2 className="text-3xl font-bold text-text-primary mb-6">
                                        A Vision Born in Adversity
                                    </h2>
                                    <div className="space-y-4 text-text-secondary leading-relaxed">
                                        <p>
                                            During the beginning of 1980s, while Lebanon was drowning in war, <span className="font-semibold text-text-primary">Dr. Fakhry Alame</span> was a visionary who aimed at serving his community and strived to establish Sahel General Hospital, which was officially inaugurated on <span className="font-semibold text-primary">April 13, 1983</span>.
                                        </p>
                                        <p>
                                            Dr. F. Alame was assisted by a group of highly qualified physicians and administrators all of whom are graduates of leading Lebanese, American, Canadian, and European Medical and Management schools.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Growth Story */}
                            <div className="bg-gradient-to-br from-primary-light/20 to-primary/10 rounded-2xl p-8 md:p-12 mb-20 border border-primary/20">
                                <div className="max-w-3xl">
                                    <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                        Rapid Growth & Expansion
                                    </h3>
                                    <div className="space-y-4 text-text-secondary leading-relaxed">
                                        <p>
                                            The combined efforts of the board have broadened the scope of our activities and services; it brought the hospital a long way in a relatively short period.
                                        </p>
                                        <p className="text-lg font-semibold text-text-primary">
                                            SGH stands today, with its present capacity of <span className="text-primary">172 beds</span>, as a monument in the Greater Beirut Area.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Accreditations Section */}
                <section className="py-20 bg-cream">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                    Accreditation & Privileges
                                </h2>
                                <div className="w-20 h-1 bg-primary mx-auto mb-6" />
                                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                    Recognized excellence in healthcare delivery and management.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {accreditations.map((item, index) => (
                                    <div
                                        key={index}
                                        className="card-warm group"
                                    >
                                        <div className="w-14 h-14 bg-primary-light/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                                            <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-primary mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-text-secondary leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy CTA */}
                <section className="py-20 bg-gradient-to-br from-primary to-primary-hover text-white">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Building on a Legacy of Excellence
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                For over 40 years, we've been committed to providing exceptional healthcare to our community. Join us as we continue this journey.
                            </p>
                            <a
                                href={`/${lang}/about-us/mission-vision`}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-cream transition-colors"
                            >
                                Learn About Our Mission
                            </a>
                        </div>
                    </div>
                </section>
        </main>
    )
}
