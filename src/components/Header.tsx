'use client'

import Link from 'next/link'
import { Mail, Phone, Search, Facebook, Instagram, Twitter, Linkedin, Youtube, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import logo from '@/assets/sahel_hospital_logo.png'

interface HeaderProps {
  lang?: string
}

export default function Header({ lang = 'en' }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/${lang}/search?keyword=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-primary/95 via-primary to-primary-hover/95 backdrop-blur-sm shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 min-h-[52px]">
          {/* Left Side - Social & Contact */}
          <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
            <Link href={`/${lang}`} className="flex items-center gap-3">
            <img
              src="/assets/sahel_hospital_logo.png"
              alt={lang === 'ar' ? 'مستشفى الساحل العام' : 'Sahel General Hospital'}
              className="h-10 w-32 object-contain"
              loading="lazy"
              decoding="async"
            />
            </Link>

            {/* Social Icons with Hover Effects */}
            <div className="flex items-center gap-1.5 lg:gap-2">
              <a
                href="https://www.facebook.com/SahelGeneralHospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/20 hover:bg-[#1877F2] text-white hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Facebook
                </span>
              </a>
              <a
                href="https://www.instagram.com/sahelgeneralhospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/20 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#FCAF45] text-white hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Instagram
                </span>
              </a>
              <a
                href="https://twitter.com/Sahelhospital1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/20 hover:bg-[#1DA1F2] text-white hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Twitter
                </span>
              </a>
              <a
                href="https://www.linkedin.com/company-beta/17923369/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/20 hover:bg-[#0A66C2] text-white hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://www.youtube.com/user/SahelHospital2"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/20 hover:bg-[#FF0000] text-white hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  YouTube
                </span>
              </a>
            </div>

            {/* Contact Info with Icons */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <a
                href="mailto:info@sahelhospital.com.lb"
                className="group flex items-center gap-2 text-sm text-white hover:text-white/80 transition-all duration-300 hover:scale-105"
              >
                <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{lang === 'ar' ? 'البريد الإلكتروني' : 'info@sahelhospital.com.lb'}</span>
              </a>

              <a
                href="tel:+9611858333"
                className="group flex items-center gap-2 text-sm text-white hover:text-white/80 transition-all duration-300 hover:scale-105"
              >
                <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">{lang === 'ar' ? 'اتصل بنا' : '+961 1 858 333'}</span>
              </a>
            </div>
          </div>

          {/* Right Side - Search & Language */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Enhanced Search */}
            <form 
              onSubmit={handleSearch} 
              className={cn(
                "relative transition-all duration-300",
                isSearchFocused && "scale-105"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-white/20 rounded-xl blur-md opacity-0 transition-opacity duration-300",
                isSearchFocused && "opacity-100"
              )} />
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={lang === 'ar' ? 'ابحث...' : 'Search...'}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 pr-10 rounded-xl text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 w-48 transition-all duration-300 border border-white/30 focus:border-white/60"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg text-white/80 hover:bg-white hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Language Switcher with Animation */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <Link
                href="/en"
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300",
                  lang === 'en'
                    ? 'bg-white text-primary shadow-md scale-110'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                )}
              >
                EN
              </Link>
              <span className="text-white/50">|</span>
              <Link
                href="/ar"
                className={cn(
                  "px-2 py-1 rounded-lg text-xs font-bold transition-all duration-300",
                  lang === 'ar'
                    ? 'bg-white text-primary shadow-md scale-110'
                    : 'text-white/80 hover:text-white hover:bg-white/20'
                )}
              >
                AR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
