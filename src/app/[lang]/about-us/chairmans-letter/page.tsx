import Image from 'next/image'
import { Quote } from 'lucide-react'
import chairmanImg from '@/assets/about/Fadi-Alame.jpg'
import { type Locale } from '@/lib/i18n'

export default async function ChairmansLetterPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const isRtl = lang === 'ar'

    return (
        <main className="min-h-screen bg-background">
                {/* Hero / Lead Space */}
                <section className="relative bg-gradient-to-br from-primary-hover via-primary to-primary-light text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-hover/90 via-primary/90 to-transparent z-10" />
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url(${chairmanImg.src})`, backgroundPosition: 'center 20%' }}
                    />

                    <div className="container mx-auto px-4 relative z-20">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6 border border-white/30 backdrop-blur">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                Leadership
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                                Chairman's Letter
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
                                A message of commitment, vision, and care from our leadership.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Letter Content */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-12 items-start">

                            {/* Image Column */}
                            <div className="w-full lg:w-1/3 sticky top-24">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 group">
                                    <div className="absolute inset-0 opacity-10 pattern-geometric" />
                                    <Image
                                        src={chairmanImg}
                                        alt="Fadi Fakhry Alame"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        placeholder="blur"
                                        priority
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                                        <h3 className="text-xl font-bold">Fadi Fakhry Alame</h3>
                                        <p className="text-sm opacity-80">Chairman of the Board</p>
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none" />
                                </div>

                                <div className="mt-8 bg-primary-light/20 p-6 rounded-xl border border-primary/20">
                                    <Quote className="w-8 h-8 text-primary mb-4" />
                                    <p className="text-text-primary font-medium italic">
                                        "For the Sake of Humanity & Science"
                                    </p>
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className="w-full lg:w-2/3">
                                <div className="prose prose-lg max-w-none text-text-secondary">
                                    <p className="text-sm text-text-secondary font-medium mb-8 uppercase tracking-wider">
                                        November 15, 2016
                                    </p>

                                    <p className="lead text-xl text-text-primary font-medium mb-8">
                                        I would like to welcome you to Sahel General Hospital - Dr. Fakhry Alame University Medical Center.
                                    </p>

                                    <p className="mb-6">
                                        Guided by our founder's vision; <span className="text-primary font-semibold">For the Sake of Humanity & Science</span>, our dedicated personnel and state-of-the-art facilities aim to provide the best patient centered care possible. The rapid sustainable growth of our institution comes as a direct response to satisfying the community's needs & wants. We continue to expand while investing in our personnel, technology, & teaching programs.
                                    </p>

                                    <p className="mb-6">
                                        Our strategic location on Beirut's Southern peripherals provides easy access to all of our constituencies. Based on yearly reviews & market conditions assessments, we constantly evaluate and update our clinical & administrative departments to provide the most efficient patient and family encounters. We believe in our community and aim to strengthen the ties by utilizing a yearly Corporate Social Responsibility program (CSR) aimed at education, prevention, & engagement.
                                    </p>

                                    <div className="my-10 p-8 bg-cream rounded-xl border-l-4 border-primary">
                                        <p className="text-lg font-medium text-text-primary italic m-0">
                                            "As Chairman of the Board, I pledge our continued commitment to a lasting, pleasant and positive evidence based healthcare experience."
                                        </p>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-warm-gray/50">
                                        <p className="font-serif text-lg text-text-primary mb-1">Sincerely yours,</p>
                                        <div className="mt-4">
                                            <p className="text-2xl font-bold text-text-primary font-serif">Fadi Fakhry Alame</p>
                                            <p className="text-text-secondary">Chairman</p>
                                            <p className="text-text-secondary text-sm">Sahel Healthcare Corporation - Sahel Group</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
        </main>
    )
}
