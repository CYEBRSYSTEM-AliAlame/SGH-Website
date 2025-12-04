'use client'

import { useState, useEffect } from 'react'
import { Quotes, ChevronLeft, ChevronRight, LocationStar, Favorite, Hospital } from '@carbon/icons-react'
import { cn } from '@/lib/utils'
import ScrollAnimation from './ScrollAnimation'

interface TestimonialsSectionProps {
    lang?: string
}

export default function TestimonialsSection({ lang = 'en' }: TestimonialsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const isRtl = lang === 'ar'

    const testimonials = [
        {
            id: 1,
            quote: lang === 'ar'
                ? "الرعاية التي تلقيتها في مستشفى الساحل كانت استثنائية. كان الطاقم الطبي محترفاً ورحيماً للغاية. شعرت بالراحة والثقة طوال فترة علاجي."
                : "The care I received at Sahel General Hospital was exceptional. The medical staff was professional and extremely compassionate. I felt comfortable and confident throughout my treatment.",
            author: lang === 'ar' ? "أحمد م." : "Ahmad M.",
            role: lang === 'ar' ? "مريض قلب" : "Cardiology Patient",
            rating: 5,
            avatar: '👨‍⚕️'
        },
        {
            id: 2,
            quote: lang === 'ar'
                ? "مرافق حديثة وأطباء على مستوى عالمي. شعرت أنني في أيد أمينة طوال فترة علاجي. أنصح الجميع بزيارة هذا المستشفى."
                : "State-of-the-art facilities and world-class doctors. I felt I was in safe hands throughout my treatment. I highly recommend this hospital to everyone.",
            author: lang === 'ar' ? "سارة ك." : "Sarah K.",
            role: lang === 'ar' ? "مريضة جراحة" : "Surgery Patient",
            rating: 5,
            avatar: '👩‍⚕️'
        },
        {
            id: 3,
            quote: lang === 'ar'
                ? "شكراً لكم على تفانيكم ورعايتكم الممتازة. أنتم حقاً تحدثون فرقاً في حياة الناس. تجربة رائعة من البداية للنهاية."
                : "Thank you for your dedication and excellent care. You truly make a difference in people's lives. An amazing experience from start to finish.",
            author: lang === 'ar' ? "رنا ح." : "Rana H.",
            role: lang === 'ar' ? "مريضة ولادة" : "Maternity Patient",
            rating: 5,
            avatar: '👩'
        },
        {
            id: 4,
            quote: lang === 'ar'
                ? "خدمة طوارئ ممتازة وسريعة. وصلت في منتصف الليل وتم استقبالي بسرعة ورعاية فورية. شكراً لكم."
                : "Excellent and fast emergency service. I arrived in the middle of the night and was received quickly with immediate care. Thank you.",
            author: lang === 'ar' ? "خالد د." : "Khalid D.",
            role: lang === 'ar' ? "مريض طوارئ" : "Emergency Patient",
            rating: 5,
            avatar: '👨'
        },
        {
            id: 5,
            quote: lang === 'ar'
                ? "أطباء محترفون ومرافق نظيفة وحديثة. الرعاية كانت على أعلى مستوى. أشكر الفريق بأكمله."
                : "Professional doctors and clean, modern facilities. The care was at the highest level. I thank the entire team.",
            author: lang === 'ar' ? "ليلى س." : "Layla S.",
            role: lang === 'ar' ? "مريضة أطفال" : "Pediatrics Patient",
            rating: 5,
            avatar: '👩‍🦱'
        },
        {
            id: 6,
            quote: lang === 'ar'
                ? "تجربة رائعة. الطاقم الطبي متعاون ومحترف. المستشفى مجهز بأحدث التقنيات. أنصح به بشدة."
                : "Amazing experience. The medical staff is cooperative and professional. The hospital is equipped with the latest technology. I highly recommend it.",
            author: lang === 'ar' ? "محمد ع." : "Mohammad A.",
            role: lang === 'ar' ? "مريض عظام" : "Orthopedics Patient",
            rating: 5,
            avatar: '👨‍🦱'
        }
    ]

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [testimonials.length])

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-20 bg-gradient-to-b from-cream to-white relative pattern-geometric">
            <div className="absolute inset-0 pattern-cedar opacity-10 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <ScrollAnimation direction="fade">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-primary mb-4">
                            <Hospital className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {lang === 'ar' ? 'شهادات المرضى' : 'Patient Testimonials'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                            {lang === 'ar' ? 'ماذا يقول مرضانا' : 'What Our Patients Say'}
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#ED1C24] mx-auto mb-4 rounded-full" />
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            {lang === 'ar'
                                ? 'نفتخر بثقة مرضانا ونلتزم بتقديم أفضل رعاية صحية'
                                : 'We are proud of our patients\' trust and committed to providing the best healthcare'}
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="max-w-5xl mx-auto relative">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-warm-gray/50 relative overflow-hidden">
                        <Quotes className="absolute top-8 left-8 w-16 h-16 text-primary/10 rotate-180" />
                        
                        <div className="relative z-10">
                            {/* Testimonial Content with Smooth Transition */}
                            <div className="min-h-[200px] flex flex-col items-center justify-center">
                                <div
                                    key={currentIndex}
                                    className="text-center px-4 md:px-12 animate-fade-in"
                                >
                                    {/* Avatar */}
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-4xl shadow-lg">
                                        {testimonials[currentIndex].avatar}
                                    </div>
                                    
                                    {/* Rating Stars */}
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <LocationStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    
                                    {/* Quote */}
                                    <p className="text-xl md:text-2xl text-text-primary italic mb-8 leading-relaxed">
                                        "{testimonials[currentIndex].quote}"
                                    </p>
                                    
                                    {/* Author Info */}
                                    <div>
                                        <div className="font-bold text-text-primary text-lg mb-1">
                                            {testimonials[currentIndex].author}
                                        </div>
                                        <div className="text-primary text-sm font-semibold">
                                            {testimonials[currentIndex].role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full bg-white border border-warm-gray/50 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:scale-110"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className={cn("w-6 h-6", isRtl && "rotate-180")} />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        index === currentIndex
                                            ? "bg-primary w-8"
                                            : "bg-warm-gray hover:bg-primary/50"
                                    )}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                        
                        <button
                            onClick={next}
                            className="p-3 rounded-full bg-white border border-warm-gray/50 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:scale-110"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className={cn("w-6 h-6", isRtl && "rotate-180")} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
