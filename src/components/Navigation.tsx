'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Globe, Calendar, Home, Users, Stethoscope, Heart, Phone, Sparkles, TreePine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dictionary, type Locale } from '@/lib/i18n'

interface NavigationProps {
  lang?: string
  currentPage?: string
}

interface MenuItem {
  name: string
  href?: string
  page?: string
  icon?: any
  submenu?: {
    name: string
    href: string
    desc?: string
    icon?: any
  }[]
}

export default function Navigation({ lang = 'en', currentPage = 'home' }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t = dictionary[lang as Locale]?.nav || dictionary['en'].nav
  const isRtl = lang === 'ar'

  const menuItems: MenuItem[] = [
    { 
      name: t.home, 
      href: `/${lang}`, 
      page: 'home',
      icon: Home
    },
    {
      name: t.about,
      page: 'about',
      icon: Heart,
      submenu: [
        { 
          name: "Chairman's Letter", 
          href: `/${lang}/about-us/chairmans-letter`, 
          desc: "A message from our leadership",
          icon: Heart
        },
        { 
          name: 'Mission & Vision', 
          href: `/${lang}/about-us/mission-vision`, 
          desc: "Our core values and goals",
          icon: Sparkles
        },
        { 
          name: 'Corporate History', 
          href: `/${lang}/about-us/corporate-history`, 
          desc: "Serving since 1983",
          icon: TreePine
        },
        { 
          name: 'FAQs', 
          href: `/${lang}/about-us/faqs`, 
          desc: "Common questions answered",
          icon: Users
        },
      ],
    },
    { 
      name: t.doctors, 
      href: `/${lang}/our-doctors`, 
      page: 'ourdoctors',
      icon: Users
    },
    {
      name: t.services,
      href: `/${lang}/services`,
      page: 'services',
      icon: Stethoscope,
      submenu: [
        { 
          name: 'Medical Departments', 
          href: `/${lang}/services`, 
          desc: "Explore our specialties",
          icon: Stethoscope
        },
        { 
          name: 'Centers of Excellence', 
          href: `/${lang}/services/centers`, 
          desc: "Specialized care centers",
          icon: Heart
        },
        { 
          name: 'Diagnostic services', 
          href: `/${lang}/services/diagnostics`, 
          desc: "Lab & Imaging",
          icon: Stethoscope
        },
      ]
    },
    {
      name: 'Patients',
      href: `/${lang}/insurance`,
      page: 'patients',
      icon: Heart,
      submenu: [
        { 
          name: 'Admission', 
          href: `/${lang}/patients/admission`, 
          desc: "Procedures & Guidelines",
          icon: Calendar
        },
        { 
          name: 'Visiting Hours', 
          href: `/${lang}/visiting-hours`, 
          desc: "Timings & Rules",
          icon: Calendar
        },
        { 
          name: 'Insurance', 
          href: `/${lang}/insurance`, 
          desc: "Accepted guarantors",
          icon: Heart
        },
      ],
    },
    { 
      name: t.contact, 
      href: `/${lang}/contact`, 
      page: 'contact',
      icon: Phone
    },
  ]

  return (
    <>
      <header className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "top-[52px] bg-white/98 backdrop-blur-lg shadow-lg border-b border-primary/10 py-2" 
          : "top-[52px] bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-gray/50 py-2.5"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with Animation */}
            <Link 
              href={`/${lang}`} 
              className="flex items-center gap-3 group"
            >
              <img
                src="/assets/sahel_hospital_logo.png"
                alt={lang === 'ar' ? 'مستشفى الساحل العام' : 'Sahel General Hospital'}
                className="h-12 w-36 object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.page
                
                return (
                  <div key={item.name} className="relative group/menu">
                    {item.submenu ? (
                      <>
                        <button className={cn(
                          "relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group/button",
                          isActive
                            ? "text-primary bg-primary-light/20"
                            : "text-text-secondary hover:text-primary hover:bg-primary-light/10"
                        )}>
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{item.name}</span>
                          <ChevronDown className="w-3 h-3 opacity-70 group-hover/button:rotate-180 transition-transform duration-300" />
                          {isActive && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                          )}
                        </button>

                        {/* Enhanced Mega Menu Dropdown */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[650px] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-4 group-hover/menu:translate-y-0">
                          <div className="bg-white rounded-2xl shadow-2xl border border-warm-gray/50 overflow-hidden p-6 relative">
                            {/* Decorative gradient background */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A651] via-primary to-[#ED1C24]" />
                            
                            <div className="grid grid-cols-2 gap-4">
                              {item.submenu.map((sub) => {
                                const SubIcon = sub.icon
                                return (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-br hover:from-primary-light/10 hover:to-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-md"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-primary-light/20 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">
                                      {SubIcon && <SubIcon className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="font-semibold text-text-primary group-hover/item:text-primary transition-colors block mb-1">
                                        {sub.name}
                                      </span>
                                      {sub.desc && (
                                        <span className="text-xs text-text-secondary leading-relaxed">
                                          {sub.desc}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className={cn(
                          "relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group/link",
                          isActive
                            ? "text-primary bg-primary-light/20"
                            : "text-text-secondary hover:text-primary hover:bg-primary-light/10"
                        )}
                      >
                        {Icon && <Icon className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />}
                        <span>{item.name}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                        )}
                      </Link>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cream border border-warm-gray/50">
                <Globe className="w-4 h-4 text-text-secondary" />
                <div className="flex gap-1">
                  <Link 
                    href="/en" 
                    className={cn(
                      "px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-300",
                      lang === 'en' 
                        ? "bg-primary text-white shadow-md" 
                        : "text-text-secondary hover:text-primary hover:bg-primary-light/10"
                    )}
                  >
                    EN
                  </Link>
                  <Link 
                    href="/ar" 
                    className={cn(
                      "px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-300",
                      lang === 'ar' 
                        ? "bg-primary text-white shadow-md" 
                        : "text-text-secondary hover:text-primary hover:bg-primary-light/10"
                    )}
                  >
                    AR
                  </Link>
                </div>
              </div>

              {/* Emergency Contact */}
              <Link
                href="tel:+9611858333"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-accent text-white hover:bg-accent-light transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <Phone className="w-4 h-4 group-hover:animate-pulse" />
                <span className="hidden xl:inline">{lang === 'ar' ? 'طوارئ' : 'Emergency'}</span>
              </Link>

              {/* Book Appointment CTA */}
              <Link
                href={`/${lang}/contact`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-primary to-primary-hover text-white hover:from-primary-hover hover:to-primary transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>{lang === 'ar' ? 'احجز موعداً' : 'Book Appointment'}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl text-text-primary hover:bg-primary-light/10 hover:text-primary transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Enhanced Mobile Menu Drawer */}
      <div className={cn(
        "fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white z-[70] shadow-2xl transition-transform duration-300 lg:hidden flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        isRtl && (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full left-0 right-auto")
      )}>
        {/* Mobile Header */}
        <div className="p-6 border-b border-warm-gray/50 bg-gradient-to-r from-primary-light/10 to-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white flex items-center justify-center shadow-lg">
              <TreePine className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-text-primary">Menu</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-text-secondary hover:text-accent hover:bg-accent/10 rounded-xl transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.page
            
            return (
              <div key={item.name} className="border-b border-warm-gray/30 last:border-0 pb-2">
                {item.submenu ? (
                  <>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between py-3 px-2 text-left font-semibold rounded-xl transition-all duration-300",
                        isActive
                          ? "text-primary bg-primary-light/20"
                          : "text-text-primary hover:text-primary hover:bg-primary-light/10"
                      )}
                      onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        openSubmenu === item.name && "rotate-180"
                      )} />
                    </button>
                    <div className={cn(
                      "space-y-1 overflow-hidden transition-all duration-300 bg-cream rounded-xl",
                      openSubmenu === item.name ? "max-h-[500px] p-2 mt-2" : "max-h-0"
                    )}>
                      {item.submenu.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-white rounded-lg transition-all duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {SubIcon && (
                              <div className="w-8 h-8 rounded-lg bg-primary-light/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <SubIcon className="w-4 h-4" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{sub.name}</div>
                              {sub.desc && (
                                <div className="text-xs opacity-70 mt-0.5">{sub.desc}</div>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 py-3 px-2 font-semibold rounded-xl transition-all duration-300",
                      isActive
                        ? "text-primary bg-primary-light/20"
                        : "text-text-primary hover:text-primary hover:bg-primary-light/10"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile Footer Actions */}
        <div className="p-4 border-t border-warm-gray/50 bg-cream space-y-3">
          <div className="flex justify-center gap-2">
            <Link 
              href="/en" 
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                lang === 'en' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white text-text-secondary hover:bg-primary-light/10 hover:text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              English
            </Link>
            <Link 
              href="/ar" 
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                lang === 'ar' 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white text-text-secondary hover:bg-primary-light/10 hover:text-primary"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              العربية
            </Link>
          </div>
          
          <Link
            href="tel:+9611858333"
            className="flex items-center justify-center gap-2 w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-light transition-all shadow-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone className="w-5 h-5" />
            {lang === 'ar' ? 'اتصل بالطوارئ' : 'Emergency Call'}
          </Link>
          
          <Link
            href={`/${lang}/contact`}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-primary-hover text-white py-3 rounded-xl font-semibold hover:from-primary-hover hover:to-primary transition-all shadow-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Calendar className="w-5 h-5" />
            {lang === 'ar' ? 'احجز موعداً' : 'Book Appointment'}
          </Link>
        </div>
      </div>
    </>
  )
}
