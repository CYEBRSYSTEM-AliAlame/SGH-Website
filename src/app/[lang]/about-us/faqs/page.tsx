'use client'

import { useState } from 'react'
import { MessageCircle, ChevronDown, Send, Mail, User, FileText } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface FAQPageProps {
    params: Promise<{ lang: Locale }>
}

export default function FAQPage({ params }: FAQPageProps) {
    const [lang, setLang] = useState<Locale>('en')
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        question: ''
    })

    // Unwrap params
    params.then(p => setLang(p.lang))

    const faqs = [
        {
            question: "Can Type 2 Diabetes be Prevented?",
            answer: "The short answer is: Yes, most of the time.\n\nOnly 5% of diabetic people have Type 1 diabetes, which can't be prevented; but Type 2 is usually very dependent on lifestyle. A good diet and 30 minutes of exercise each day should be enough to sustain a good health away from diabetes. If you're overweight, losing just 5-7% of your body weight can significantly reduce your risk.\n\nKey prevention strategies include:\n• Maintaining a healthy weight\n• Regular physical activity (at least 150 minutes per week)\n• Eating a balanced diet rich in whole grains, fruits, and vegetables\n• Limiting sugar and processed foods\n• Regular health check-ups, especially if you have a family history"
        },
        {
            question: "What are Prostate Cancer's symptoms?",
            answer: "Are you a man over 50? Maybe it's time for a prostate check-up, especially if you have one or several of these symptoms:\n\n• Burning or pain during urination\n• Difficulty urinating or trouble starting and stopping while urinating\n• More frequent urges to urinate at night\n• Loss of bladder control\n• Decreased flow or velocity of urine stream\n• Blood in urine (hematuria)\n• Blood in seminal fluid\n• Erectile dysfunction\n• Painful ejaculation\n\nImportant: Many of these symptoms can also be caused by benign conditions. However, if you experience any of these, consult with a urologist for proper evaluation. Early detection significantly improves treatment outcomes."
        },
        {
            question: "Should I brush my child's teeth?",
            answer: "A lot of times, people believe that because a child will lose its teeth, then there's no point in brushing them or caring for them - this couldn't be further from the truth.\n\nChildren's oral hygiene is critical for their overall wellbeing, as well as for their permanent teeth. Here's why:\n\n• Baby teeth hold space for permanent teeth\n• Cavities in baby teeth can affect permanent teeth development\n• Poor oral hygiene can lead to infections and pain\n• Early habits set the foundation for lifelong dental health\n\nBrushing Guidelines:\n• Start cleaning your baby's gums even before teeth appear\n• Use a soft-bristled brush and fluoride toothpaste (rice-grain size for under 3, pea-size for 3+)\n• Brush twice daily for 2 minutes\n• Supervise brushing until age 7-8\n• Schedule first dental visit by age 1"
        }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        alert('Thank you! Your question has been submitted. Our medical team will respond within 24-48 hours.')
        setFormData({ name: '', email: '', subject: '', question: '' })
    }

    return (
        <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary via-primary-hover to-primary-light text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 pattern-geometric opacity-10" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 border border-white/30">
                                <MessageCircle className="w-4 h-4" />
                                Help Center
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto">
                                Get answers to common health questions or submit your own inquiry to our medical team.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Advice Box Section */}
                <section className="py-16 -mt-10 relative z-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="card-warm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-primary-light/20 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-text-primary">The Advice Box</h2>
                                        <p className="text-text-secondary">Free Medical Advice - Free Online Consultation</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3 border border-warm-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-text-primary mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-11 pr-4 py-3 border border-warm-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-text-primary mb-2">
                                            Subject <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full pl-11 pr-4 py-3 border border-warm-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                placeholder="Brief description of your question"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-text-primary mb-2">
                                            Question <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            value={formData.question}
                                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-warm-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                                            placeholder="Please describe your medical question in detail..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Submit Question
                                    </button>
                                </form>

                                <div className="mt-6 p-4 bg-primary-light/20 rounded-lg border border-primary/20">
                                    <p className="text-sm text-text-primary">
                                        <strong>Note:</strong> This service is for general medical information only and does not replace professional medical advice. For emergencies, please call our hotline or visit the ER immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Q&A Section */}
                <section className="py-16 bg-cream">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                                    Questions & Answers
                                </h2>
                                <p className="text-lg text-text-secondary">
                                    Discover answers to common health questions
                                </p>
                            </div>

                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="card-warm overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cream transition-colors"
                                        >
                                            <span className="font-semibold text-lg text-text-primary pr-4">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${expandedFAQ === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${expandedFAQ === index ? 'max-h-[1000px]' : 'max-h-0'
                                                }`}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-text-secondary leading-relaxed whitespace-pre-line border-t border-warm-gray/50">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-primary to-primary-hover text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Our medical team is here to help. Contact us directly or schedule an appointment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`/${lang}/contact`}
                                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-cream transition-colors"
                            >
                                Contact Us
                            </a>
                            <a
                                href={`/${lang}/our-doctors`}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                            >
                                Find a Doctor
                            </a>
                        </div>
                    </div>
                </section>
        </main>
    )
}
