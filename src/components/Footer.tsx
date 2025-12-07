'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Youtube, Heart, Stethoscope, Users, Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { dictionary, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface FooterProps {
    lang?: string
}

export default function Footer({ lang = 'en' }: FooterProps) {
    const t = dictionary[lang as Locale]?.footer || dictionary['en'].footer
    const isRtl = lang === 'ar'

    const quickLinks = [
        { name: lang === 'ar' ? 'من نحن' : 'About Us', href: `/${lang}/about-us`, icon: Heart },
        { name: lang === 'ar' ? 'أطباؤنا' : 'Our Doctors', href: `/${lang}/our-doctors`, icon: Users },
        { name: lang === 'ar' ? 'خدماتنا' : 'Our Services', href: `/${lang}/services`, icon: Stethoscope },
        { name: lang === 'ar' ? 'اتصل بنا' : 'Contact Us', href: `/${lang}/contact`, icon: Phone },
    ]

    const services = [
        { name: lang === 'ar' ? 'الأقسام الطبية' : 'Medical Departments', href: `/${lang}/services` },
        { name: lang === 'ar' ? 'مراكز التميز' : 'Centers of Excellence', href: `/${lang}/services/centers` },
        { name: lang === 'ar' ? 'المرضى والزوار' : 'Patients & Visitors', href: `/${lang}/insurance` },
    ]

    return (
        <footer className="relative bg-gradient-to-br from-primary-hover via-primary to-primary-light text-white mt-auto overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10 pattern-geometric" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A651] via-white to-[#ED1C24]" />
            
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & About */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/sahel_hospital_logo.png"
                                alt={lang === 'ar' ? 'مستشفى الساحل العام' : 'Sahel General Hospital'}
                                className="h-12 w-40 object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed">
                            {lang === 'ar'
                                ? 'تقديم خدمات رعاية صحية استثنائية لأكثر من 40 عاماً. نحن ملتزمون بتقديم أفضل رعاية طبية لمجتمعنا.'
                                : 'Providing exceptional healthcare services for over 40 years. We are dedicated to delivering the best medical care to our community.'}
                        </p>
                        
                        {/* Social Media with Enhanced Hover Effects */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/SahelGeneralHospital/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#1877F2] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Facebook
                                </span>
                            </a>
                            <a
                                href="https://www.instagram.com/sahelgeneralhospital/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-xl bg-white/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#FCAF45] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Instagram
                                </span>
                            </a>
                            <a
                                href="https://twitter.com/Sahelhospital1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#1DA1F2] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Twitter
                                </span>
                            </a>
                            <a
                                href="https://www.linkedin.com/company-beta/17923369/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#0A66C2] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    LinkedIn
                                </span>
                            </a>
                            <a
                                href="https://www.youtube.com/user/SahelHospital2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative p-3 rounded-xl bg-white/10 hover:bg-[#FF0000] backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    YouTube
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links with Icons */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-white/80" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                            </h4>
                        </div>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <li key={link.name}>
                                        <Link 
                                            href={link.href} 
                                            className="group flex items-center gap-3 text-sm text-white/90 hover:text-white transition-all duration-300 hover:translate-x-1"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="flex-1">{link.name}</span>
                                            <ArrowRight className={cn(
                                                "w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300",
                                                isRtl && "rotate-180"
                                            )} />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Stethoscope className="w-5 h-5 text-white/80" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                {lang === 'ar' ? 'خدمات' : 'Services'}
                            </h4>
                        </div>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link 
                                        href={service.href} 
                                        className="group flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all duration-300"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white group-hover:scale-150 transition-all duration-300" />
                                        <span className="flex-1 group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info with Enhanced Icons */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Phone className="w-5 h-5 text-white/80" />
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                                {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                            </h4>
                        </div>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="https://maps.google.com/?q=Beirut,Lebanon" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-3 text-sm text-white/90 hover:text-white transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="flex-1 pt-2">{lang === 'ar' ? 'بيروت، لبنان' : 'Beirut, Lebanon'}</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="tel:+9611858333" 
                                    className="group flex items-center gap-3 text-sm text-white/90 hover:text-white transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <span className="flex-1 font-semibold">+961 1 858 333</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="mailto:info@sahelhospital.com.lb" 
                                    className="group flex items-center gap-3 text-sm text-white/90 hover:text-white transition-all duration-300"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="flex-1">info@sahelhospital.com.lb</span>
                                </a>
                            </li>
                        </ul>

                        {/* Quick Action Button */}
                        <Link
                            href={`/${lang}/contact`}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm group"
                        >
                            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            <span>{lang === 'ar' ? 'احجز موعداً' : 'Book Appointment'}</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                            <Heart className="w-4 h-4 text-accent" />
                            <p>
                                &copy; {new Date().getFullYear()} {lang === 'ar' ? 'مستشفى الساحل العام' : 'Sahel General Hospital'}. {t.rights}
                            </p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <Link 
                                href="#" 
                                className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
                            >
                                {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </Link>
                            <Link 
                                href="#" 
                                className="text-white/70 hover:text-white transition-colors duration-300 hover:underline"
                            >
                                {lang === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
