'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
    const params = useParams()
    const lang = (params?.lang as string) || 'en'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const isRTL = lang === 'ar'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async () => {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000)
    }

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-3xl font-bold text-text-primary md:text-4xl">
                        {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-text-secondary">
                        {lang === 'ar'
                            ? 'نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو حجز موعد.'
                            : 'We are here to help. Contact us for any inquiries or to schedule an appointment.'}
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="card-warm">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-text-primary">
                                {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
                            </h3>
                            <p className="mb-2 text-text-secondary">
                                {lang === 'ar' ? 'متاح 24/7 للطوارئ' : 'Available 24/7 for emergencies'}
                            </p>
                            <a href="tel:+9611858333" className="text-lg font-semibold text-primary hover:text-primary-hover">
                                +961 1 858 333
                            </a>
                        </div>

                        <div className="card-warm">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-text-primary">
                                {lang === 'ar' ? 'راسلنا' : 'Email Us'}
                            </h3>
                            <p className="mb-2 text-text-secondary">
                                {lang === 'ar' ? 'سنرد عليك خلال 24 ساعة' : 'We will reply within 24 hours'}
                            </p>
                            <a href="mailto:info@sahelhospital.com.lb" className="text-lg font-semibold text-primary hover:text-primary-hover">
                                info@sahelhospital.com.lb
                            </a>
                        </div>

                        <div className="card-warm">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light/20 text-primary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-text-primary">
                                {lang === 'ar' ? 'موقعنا' : 'Our Location'}
                            </h3>
                            <p className="text-text-secondary">
                                {lang === 'ar' ? 'بيروت، لبنان' : 'Beirut, Lebanon'}
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card-warm lg:col-span-2">
                        <h2 className="mb-6 text-2xl font-bold text-text-primary">
                            {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
                        </h2>

                        {isSuccess && (
                            <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-700">
                                {lang === 'ar'
                                    ? 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
                                    : 'Your message has been sent successfully. We will contact you soon.'}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
                                        {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                                    </label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-warm-gray focus:border-primary focus:ring-primary/20'
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
                                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                                    </label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-warm-gray focus:border-primary focus:ring-primary/20'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-text-primary">
                                    {lang === 'ar' ? 'الموضوع' : 'Subject'}
                                </label>
                                <input
                                    {...register('subject')}
                                    type="text"
                                    className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-warm-gray focus:border-primary focus:ring-primary/20'
                                        }`}
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
                                    {lang === 'ar' ? 'الرسالة' : 'Message'}
                                </label>
                                <textarea
                                    {...register('message')}
                                    rows={5}
                                    className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-warm-gray focus:border-primary focus:ring-primary/20'
                                        }`}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        {lang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                                    </>
                                ) : (
                                    <>
                                        <Send className={`mr-2 h-5 w-5 ${isRTL ? 'ml-2 mr-0' : ''}`} />
                                        {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
