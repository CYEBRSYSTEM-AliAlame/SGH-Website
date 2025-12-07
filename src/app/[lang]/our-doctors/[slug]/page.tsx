import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { doctorService } from '@/services/doctorService'
import { getDoctorImagePath, getDoctorName, getDoctorExperience, isHeadOfDepartment } from '@/lib/doctorHelpers'
import { ArrowLeft, Mail, Phone, Award } from 'lucide-react'
import { sanitizeHtml } from '@/lib/sanitize'

interface DoctorProfilePageProps {
    params: Promise<{ lang: string; slug: string }>
}

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
    const { lang, slug } = await params

    // Get doctor by slug (checks both English and Arabic slugs)
    const doctor = await doctorService.getBySlug(slug)

    if (!doctor) {
        notFound()
    }

    const name = getDoctorName(doctor, lang as 'en' | 'ar')
    const experience = getDoctorExperience(doctor, lang as 'en' | 'ar')
    const imagePath = getDoctorImagePath(doctor)
    const isHead = isHeadOfDepartment(doctor)

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary text-white py-12">
                <div className="container mx-auto px-4">
                    <Link
                        href={`/${lang}/our-doctors`}
                        className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
                        {lang === 'ar' ? 'العودة إلى الأطباء' : 'Back to Doctors'}
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Doctor Image */}
                        <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-white/10 flex-shrink-0 border-4 border-white/20">
                            <Image
                                src={imagePath}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{name}</h1>
                            {isHead && (
                                <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full mb-4 border border-white/30">
                                    <Award className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                                    <span className="font-medium">
                                        {lang === 'ar' ? 'رئيس القسم' : 'Head of Department'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Biography */}
                    <div className="card-warm mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-text-primary">
                            {lang === 'ar' ? 'السيرة الذاتية' : 'Biography'}
                        </h2>
                        <div
                            className="prose prose-lg max-w-none text-text-secondary"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(experience) }}
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="card-warm">
                        <h2 className="text-2xl font-bold mb-6 text-text-primary">
                            {lang === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center text-text-secondary">
                                <Phone className="w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 text-primary" />
                                <div>
                                    <p className="font-medium text-text-primary">
                                        {lang === 'ar' ? 'الهاتف' : 'Phone'}
                                    </p>
                                    <p className="text-text-secondary">01-858333</p>
                                </div>
                            </div>

                            <div className="flex items-center text-text-secondary">
                                <Mail className="w-5 h-5 mr-3 rtl:mr-0 rtl:ml-3 text-primary" />
                                <div>
                                    <p className="font-medium text-text-primary">
                                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                    </p>
                                    <p className="text-text-secondary">info@sahelhospital.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Button */}
                        <div className="mt-8 pt-8 border-t border-warm-gray/50">
                            <Link
                                href={`/${lang}/contact`}
                                className="btn-primary"
                            >
                                {lang === 'ar' ? 'حجز موعد' : 'Book Appointment'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
