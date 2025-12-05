'use client'

import Link from 'next/link'
import { Mail, Phone, Search, Facebook, Instagram, Twitter, Linkedin, Youtube, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary text-white shadow-lg border-b border-primary-hover/30">
      {/* Carbon Design System Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-hover" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 min-h-[52px]">
          {/* Left Side - Social & Contact */}
          <div className="flex items-center gap-3 lg:gap-5 flex-wrap">
            {/* Social Icons with Carbon Design System Styling */}
            <div className="flex items-center gap-1">
              <a
                href="https://www.facebook.com/SahelGeneralHospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-[#1877F2] text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-[#1877F2]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sahelgeneralhospital/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#FCAF45] text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-transparent"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/Sahelhospital1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-[#1DA1F2] text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-[#1DA1F2]"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company-beta/17923369/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-[#0A66C2] text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-[#0A66C2]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/user/SahelHospital2"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-white/10 hover:bg-[#FF0000] text-white/90 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/20 hover:border-[#FF0000]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Contact Info with Carbon Design System Styling */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="mailto:info@sahelhospital.com.lb"
                className="group flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all duration-300"
              >
                <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-300 border border-white/20 group-hover:border-white">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{lang === 'ar' ? 'البريد الإلكتروني' : 'info@sahelhospital.com.lb'}</span>
              </a>

              <a
                href="tel:+9611858333"
                className="group flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all duration-300"
              >
                <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-300 border border-white/20 group-hover:border-white">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold">{lang === 'ar' ? 'اتصل بنا' : '+961 1 858 333'}</span>
              </a>
            </div>
          </div>

          {/* Right Side - Search & Language */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            {/* Enhanced Search with Carbon Design System */}
            <form 
              onSubmit={handleSearch} 
              className={cn(
                "relative transition-all duration-300",
                isSearchFocused && "scale-105"
              )}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={lang === 'ar' ? 'ابحث...' : 'Search...'}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 pr-10 rounded-lg text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/15 w-40 lg:w-48 transition-all duration-300 border border-white/20 focus:border-white/40"
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 h-7 w-7 text-white/70 hover:bg-white/20 hover:text-white rounded-lg"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Language Switcher with Carbon Design System */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <Link
                href="/en"
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-300",
                  lang === 'en'
                    ? 'bg-white text-primary shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                EN
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href="/ar"
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-300",
                  lang === 'ar'
                    ? 'bg-white text-primary shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
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
