'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, User, Stethoscope, ArrowUp, Close } from '@carbon/icons-react'
import { cn } from '@/lib/utils'
import ScrollAnimation from './ScrollAnimation'

interface FindDoctorSectionProps {
  lang?: string
}

export default function FindDoctorSection({ lang = 'en' }: FindDoctorSectionProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    service_id: '',
    disease_id: '',
    keyword_name: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [services, setServices] = useState<Array<{ id: number; title: string }>>([])
  const [popularSearches] = useState([
    { id: 1, name: lang === 'ar' ? 'قلب' : 'Cardiology', service_id: '1' },
    { id: 2, name: lang === 'ar' ? 'أطفال' : 'Pediatrics', service_id: '2' },
    { id: 3, name: lang === 'ar' ? 'عظام' : 'Orthopedics', service_id: '3' },
    { id: 4, name: lang === 'ar' ? 'نساء وتوليد' : 'Obstetrics', service_id: '4' },
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const isRtl = lang === 'ar'

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServices(data.services?.slice(0, 10).map((s: any) => ({
            id: s.id,
            title: lang === 'ar' ? s.service_title_ar || s.service_title_en : s.service_title_en
          })) || [])
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchServices()
  }, [lang])

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (formData.keyword_name.length >= 2) {
      const timeoutId = setTimeout(async () => {
        try {
          const res = await fetch(`/api/suggestions?keyword=${encodeURIComponent(formData.keyword_name)}`)
          if (res.ok) {
            const data = await res.json()
            setSuggestions(data.suggestions || [])
            setShowSuggestions(true)
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        }
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [formData.keyword_name])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShowSuggestions(false)
    const params = new URLSearchParams()
    if (formData.service_id) params.append('service_id', formData.service_id)
    if (formData.keyword_name) params.append('keyword_name', formData.keyword_name)

    router.push(`/${lang}/our-doctors?${params.toString()}`)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, keyword_name: suggestion })
    setShowSuggestions(false)
  }

  const handlePopularSearch = (serviceId: string) => {
    setFormData({ ...formData, service_id: serviceId })
    router.push(`/${lang}/our-doctors?service_id=${serviceId}`)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-background relative pattern-geometric">
      <div className="absolute inset-0 pattern-cedar opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation direction="fade">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {lang === 'ar' ? 'ابحث عن طبيبك' : 'Find Your Doctor'}
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'تواصل مع أفضل المتخصصين لدينا للحصول على أفضل رعاية طبية'
                : 'Connect with our top specialists for the best medical care'}
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-warm-gray/50">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div
              className="hidden md:block bg-cover bg-center relative"
              style={{ backgroundImage: 'url(/images/doctor-consultation.jpg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary-hover/90 flex items-center justify-center p-12 text-white">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    {lang === 'ar' ? '309+ طبيب متخصص' : '309+ Specialist Doctors'}
                  </h3>
                  <p className="text-lg opacity-90">
                    {lang === 'ar'
                      ? 'تواصل مع أفضل المتخصصين لدينا للحصول على أفضل رعاية طبية.'
                      : 'Connect with our top specialists for the best medical care.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-12 relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Specialty Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    {lang === 'ar' ? 'التخصص' : 'Specialty'}
                  </label>
                  <select
                    value={formData.service_id}
                    onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                    className="w-full h-12 px-4 bg-cream border-2 border-warm-gray/50 focus:border-primary outline-none transition-colors rounded-xl"
                  >
                    <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select Specialty'}</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Name Input with Autocomplete */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {lang === 'ar' ? 'اسم الطبيب' : 'Doctor Name'}
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={formData.keyword_name}
                      onChange={(e) => setFormData({ ...formData, keyword_name: e.target.value })}
                      onFocus={() => formData.keyword_name.length >= 2 && setShowSuggestions(true)}
                      placeholder={lang === 'ar' ? 'ابحث بالاسم...' : 'Search by name...'}
                      className="w-full h-12 px-4 pr-10 bg-cream border-2 border-warm-gray/50 focus:border-primary outline-none transition-colors rounded-xl"
                    />
                    {formData.keyword_name && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, keyword_name: '' })}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                      >
                        <Close className="w-4 h-4" />
                      </button>
                    )}
                    
                    {/* Autocomplete Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div
                        ref={suggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border-2 border-primary/20 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center gap-2"
                          >
                            <Search className="w-4 h-4 text-primary" />
                            <span>{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Popular Searches */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-primary" />
                    {lang === 'ar' ? 'البحث الشائع' : 'Popular Searches'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <button
                        key={search.id}
                        type="button"
                        onClick={() => handlePopularSearch(search.service_id)}
                        className="px-4 py-2 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full text-sm font-semibold transition-all"
                      >
                        {search.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 mt-8 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      {lang === 'ar' ? 'بحث' : 'Search'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
