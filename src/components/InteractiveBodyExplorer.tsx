'use client'

import { useState, useEffect } from 'react'
import { Favorite, User, Activity, Hospital, Eyedropper, Stethoscope, ArrowRight, Close, Information, Flash, LocationStar } from '@carbon/icons-react'
import { cn } from '@/lib/utils'
import ScrollAnimation from './ScrollAnimation'

interface BodyPart {
    id: string
    name_en: string
    name_ar: string
    icon: any
    description_en: string
    description_ar: string
    services_en: string[]
    services_ar: string[]
    color: string
    hoverColor: string
    position: { x: number; y: number }
    size: { width: number; height: number }
}

interface InteractiveBodyExplorerProps {
    lang?: string
}

const bodyParts: BodyPart[] = [
    {
        id: 'brain',
        name_en: 'Brain & Nervous System',
        name_ar: 'الدماغ والجهاز العصبي',
        icon: User,
        description_en: 'Expert care for disorders of the brain, spinal cord, and nervous system including stroke, epilepsy, and neurodegenerative diseases. Our neurology department utilizes advanced neuroimaging and neurophysiological testing.',
        description_ar: 'رعاية متخصصة لاضطرابات الدماغ والحبل الشوكي والجهاز العصبي بما في ذلك السكتة الدماغية والصرع والأمراض التنكسية العصبية. يستخدم قسم طب الأعصاب لدينا التصوير العصبي المتقدم واختبارات الفسيولوجيا العصبية.',
        services_en: ['Neurology', 'Neurosurgery', 'Stroke Care', 'Epilepsy Treatment', 'Neuroimaging'],
        services_ar: ['طب الأعصاب', 'جراحة الأعصاب', 'رعاية السكتة الدماغية', 'علاج الصرع', 'التصوير العصبي'],
        color: 'from-purple-500 to-purple-700',
        hoverColor: 'purple',
        position: { x: 50, y: 10 },
        size: { width: 30, height: 25 }
    },
    {
        id: 'eyes',
        name_en: 'Eyes & Vision',
        name_ar: 'العيون والرؤية',
        icon: Eyedropper,
        description_en: 'Comprehensive eye care services including routine eye exams, cataract surgery, glaucoma treatment, retinal procedures, and pediatric ophthalmology. We preserve and restore vision for patients of all ages.',
        description_ar: 'خدمات رعاية العين الشاملة بما في ذلك الفحوصات الروتينية وجراحة إعتام عدسة العين وعلاج الجلوكوما وإجراءات الشبكية وطب عيون الأطفال. نحافظ على البصر ونستعيده للمرضى من جميع الأعمار.',
        services_en: ['Ophthalmology', 'Cataract Surgery', 'Retinal Care', 'Glaucoma Treatment', 'Pediatric Eye Care'],
        services_ar: ['طب العيون', 'جراحة إعتام عدسة العين', 'رعاية الشبكية', 'علاج الجلوكوما', 'رعاية عيون الأطفال'],
        color: 'from-cyan-500 to-cyan-700',
        hoverColor: 'cyan',
        position: { x: 50, y: 20 },
        size: { width: 8, height: 8 }
    },
    {
        id: 'heart',
        name_en: 'Heart & Cardiovascular',
        name_ar: 'القلب والأوعية الدموية',
        icon: Favorite,
        description_en: 'Comprehensive cardiac care with state-of-the-art diagnostic and treatment facilities. We offer advanced cardiac catheterization, echocardiography, stress testing, and cardiac rehabilitation programs. Our team specializes in treating coronary artery disease, heart failure, and arrhythmias.',
        description_ar: 'رعاية قلبية شاملة مع مرافق تشخيص وعلاج حديثة. نقدم قسطرة قلبية متقدمة وفحص القلب بالموجات فوق الصوتية واختبارات الإجهاد وبرامج إعادة تأهيل القلب. يتخصص فريقنا في علاج أمراض الشرايين التاجية وفشل القلب واضطرابات نظم القلب.',
        services_en: ['Cardiology', 'Cardiac Catheterization', 'Echocardiography', 'Cardiac Rehabilitation', 'Heart Surgery'],
        services_ar: ['أمراض القلب', 'قسطرة القلب', 'فحص القلب بالموجات', 'إعادة تأهيل القلب', 'جراحة القلب'],
        color: 'from-red-500 to-red-700',
        hoverColor: 'red',
        position: { x: 45, y: 30 },
        size: { width: 20, height: 18 }
    },
    {
        id: 'lungs',
        name_en: 'Lungs & Respiratory',
        name_ar: 'الرئتين والجهاز التنفسي',
        icon: Activity,
        description_en: 'Specialized care for respiratory conditions including asthma, COPD, lung diseases, and sleep disorders. Our pulmonology department provides comprehensive respiratory therapy and advanced lung function testing.',
        description_ar: 'رعاية متخصصة لحالات الجهاز التنفسي بما في ذلك الربو ومرض الانسداد الرئوي المزمن وأمراض الرئة واضطرابات النوم. يوفر قسم طب الرئة لدينا علاجاً تنفسياً شاملاً واختبارات متقدمة لوظائف الرئة.',
        services_en: ['Pulmonology', 'Respiratory Therapy', 'Lung Function Tests', 'Sleep Medicine', 'COPD Care'],
        services_ar: ['طب الرئة', 'العلاج التنفسي', 'اختبارات وظائف الرئة', 'طب النوم', 'رعاية مرض الانسداد الرئوي المزمن'],
        color: 'from-blue-500 to-blue-700',
        hoverColor: 'blue',
        position: { x: 55, y: 32 },
        size: { width: 28, height: 35 }
    },
    {
        id: 'bones',
        name_en: 'Bones & Joints',
        name_ar: 'العظام والمفاصل',
        icon: Hospital,
        description_en: 'Comprehensive orthopedic care for bone fractures, joint replacements, sports injuries, spine disorders, and orthopedic trauma. Our team includes orthopedic surgeons, physiotherapists, and rehabilitation specialists working together to restore mobility and function.',
        description_ar: 'رعاية عظمية شاملة لكسور العظام واستبدال المفاصل وإصابات الرياضة واضطرابات العمود الفقري والصدمات العظمية. يتضمن فريقنا جراحي العظام والمعالجين الفيزيائيين وأخصائيي إعادة التأهيل الذين يعملون معاً لاستعادة الحركة والوظيفة.',
        services_en: ['Orthopedics', 'Joint Replacement', 'Sports Medicine', 'Physical Therapy', 'Spine Surgery'],
        services_ar: ['جراحة العظام', 'استبدال المفاصل', 'الطب الرياضي', 'العلاج الطبيعي', 'جراحة العمود الفقري'],
        color: 'from-amber-500 to-amber-700',
        hoverColor: 'amber',
        position: { x: 50, y: 58 },
        size: { width: 40, height: 80 }
    }
]

export default function InteractiveBodyExplorer({ lang = 'en' }: InteractiveBodyExplorerProps) {
    const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null)
    const [hoveredPart, setHoveredPart] = useState<string | null>(null)
    const [pulseAnimation, setPulseAnimation] = useState<string | null>(null)
    const isRtl = lang === 'ar'

    useEffect(() => {
        if (selectedPart) {
            setPulseAnimation(selectedPart.id)
            const timer = setTimeout(() => setPulseAnimation(null), 2000)
            return () => clearTimeout(timer)
        }
    }, [selectedPart])

    const handlePartClick = (part: BodyPart) => {
        setSelectedPart(selectedPart?.id === part.id ? null : part)
    }

    return (
        <section className="py-20 bg-gradient-to-b from-cream via-background to-cream relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pattern-geometric z-0" />
            <div className="container mx-auto px-4 relative z-10">
                <ScrollAnimation direction="fade">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-primary mb-4">
                            <Hospital className="w-5 h-5" />
                            <Flash className="w-5 h-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">
                                {lang === 'ar' ? 'استكشف تفاعلي' : 'Interactive Explorer'}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                            {lang === 'ar' ? 'استكشف جسم الإنسان' : 'Explore the Human Body'}
                        </h2>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            {lang === 'ar'
                                ? 'انقر على أي جزء من الجسم لمعرفة المزيد عن الخدمات الطبية المتوفرة'
                                : 'Click on any body part to learn more about available medical services'}
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Enhanced Interactive Body Visualization */}
                    <ScrollAnimation direction="right" delay={100}>
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl border-4 border-primary/20 overflow-hidden">
                            {/* X-Ray Style Background with Animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-3xl opacity-60" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent rounded-3xl animate-pulse" />
                            
                            {/* Scan Line Effect */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-[scan_3s_linear_infinite]" 
                                     style={{ animation: 'scan 3s linear infinite' }} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                                        <Stethoscope className="w-6 h-6 text-primary animate-pulse" />
                                        {lang === 'ar' ? 'الفحص التفاعلي' : 'Interactive Medical Scan'}
                                    </h3>
                                    {selectedPart && (
                                        <button
                                            onClick={() => setSelectedPart(null)}
                                            className="p-2 rounded-lg hover:bg-warm-gray transition-colors group"
                                            aria-label="Close"
                                        >
                                            <Close className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                                        </button>
                                    )}
                                </div>

                                {/* Realistic Body Silhouette with Interactive Points */}
                                <div className="relative h-[600px] flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent rounded-2xl">
                                    <svg
                                        viewBox="0 0 200 400"
                                        className="w-full h-full"
                                        style={{ maxHeight: '600px' }}
                                    >
                                        {/* Head - More Realistic */}
                                        <ellipse
                                            cx="100"
                                            cy="50"
                                            rx="38"
                                            ry="42"
                                            fill="none"
                                            stroke={hoveredPart === 'brain' || selectedPart?.id === 'brain' ? '#9333ea' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'brain' || selectedPart?.id === 'brain' ? '4' : '2.5'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('brain')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'brain')!)}
                                        />
                                        
                                        {/* Brain Area Highlight */}
                                        {(hoveredPart === 'brain' || selectedPart?.id === 'brain') && (
                                            <ellipse
                                                cx="100"
                                                cy="50"
                                                rx="35"
                                                ry="38"
                                                fill="url(#brainGradient)"
                                                opacity="0.3"
                                                className="animate-pulse"
                                            >
                                                <defs>
                                                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="#9333ea" />
                                                        <stop offset="100%" stopColor="#7e22ce" />
                                                    </linearGradient>
                                                </defs>
                                            </ellipse>
                                        )}

                                        {/* Eyes - More Realistic */}
                                        <circle
                                            cx="90"
                                            cy="48"
                                            r="6"
                                            fill="none"
                                            stroke={hoveredPart === 'eyes' || selectedPart?.id === 'eyes' ? '#06b6d4' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'eyes' || selectedPart?.id === 'eyes' ? '3.5' : '2'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('eyes')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'eyes')!)}
                                        />
                                        <circle
                                            cx="110"
                                            cy="48"
                                            r="6"
                                            fill="none"
                                            stroke={hoveredPart === 'eyes' || selectedPart?.id === 'eyes' ? '#06b6d4' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'eyes' || selectedPart?.id === 'eyes' ? '3.5' : '2'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('eyes')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'eyes')!)}
                                        />
                                        
                                        {/* Eye Highlights */}
                                        {(hoveredPart === 'eyes' || selectedPart?.id === 'eyes') && (
                                            <>
                                                <circle cx="90" cy="48" r="4" fill="#06b6d4" opacity="0.4" className="animate-pulse" />
                                                <circle cx="110" cy="48" r="4" fill="#06b6d4" opacity="0.4" className="animate-pulse" />
                                            </>
                                        )}

                                        {/* Neck */}
                                        <rect
                                            x="85"
                                            y="85"
                                            width="30"
                                            height="25"
                                            rx="5"
                                            fill="none"
                                            stroke="#94a3b8"
                                            strokeWidth="2"
                                            className="transition-all duration-300"
                                        />

                                        {/* Torso - More Realistic Shape */}
                                        <path
                                            d="M 60 110 Q 55 120 55 140 L 55 280 Q 55 300 60 310 L 140 310 Q 145 300 145 280 L 145 140 Q 145 120 140 110 Z"
                                            fill="none"
                                            stroke={hoveredPart === 'heart' || hoveredPart === 'lungs' || selectedPart?.id === 'heart' || selectedPart?.id === 'lungs' ? '#3b82f6' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'heart' || hoveredPart === 'lungs' || selectedPart?.id === 'heart' || selectedPart?.id === 'lungs' ? '3.5' : '2.5'}
                                            className="transition-all duration-300"
                                        />

                                        {/* Heart - More Realistic Shape with Animation */}
                                        <path
                                            d="M 100 140 Q 115 130 125 145 Q 120 165 100 175 Q 80 165 75 145 Q 85 130 100 140"
                                            fill={hoveredPart === 'heart' || selectedPart?.id === 'heart' ? 'url(#heartGradient)' : 'rgba(239, 68, 68, 0.2)'}
                                            stroke={hoveredPart === 'heart' || selectedPart?.id === 'heart' ? '#ef4444' : 'rgba(239, 68, 68, 0.4)'}
                                            strokeWidth={hoveredPart === 'heart' || selectedPart?.id === 'heart' ? '4' : '2.5'}
                                            className={cn(
                                                "transition-all duration-300 cursor-pointer",
                                                (hoveredPart === 'heart' || selectedPart?.id === 'heart') && "animate-pulse"
                                            )}
                                            onMouseEnter={() => setHoveredPart('heart')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'heart')!)}
                                        >
                                            <defs>
                                                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#ef4444" />
                                                    <stop offset="100%" stopColor="#dc2626" />
                                                </linearGradient>
                                            </defs>
                                        </path>

                                        {/* Lungs - More Realistic Shape */}
                                        <ellipse
                                            cx="75"
                                            cy="165"
                                            rx="22"
                                            ry="40"
                                            fill={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? 'url(#lungGradient)' : 'rgba(59, 130, 246, 0.2)'}
                                            stroke={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)'}
                                            strokeWidth={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? '4' : '2.5'}
                                            className={cn(
                                                "transition-all duration-300 cursor-pointer",
                                                (hoveredPart === 'lungs' || selectedPart?.id === 'lungs') && "animate-pulse"
                                            )}
                                            onMouseEnter={() => setHoveredPart('lungs')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'lungs')!)}
                                        >
                                            <defs>
                                                <linearGradient id="lungGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#2563eb" />
                                                </linearGradient>
                                            </defs>
                                        </ellipse>
                                        <ellipse
                                            cx="125"
                                            cy="165"
                                            rx="22"
                                            ry="40"
                                            fill={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? 'url(#lungGradient)' : 'rgba(59, 130, 246, 0.2)'}
                                            stroke={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? '#3b82f6' : 'rgba(59, 130, 246, 0.4)'}
                                            strokeWidth={hoveredPart === 'lungs' || selectedPart?.id === 'lungs' ? '4' : '2.5'}
                                            className={cn(
                                                "transition-all duration-300 cursor-pointer",
                                                (hoveredPart === 'lungs' || selectedPart?.id === 'lungs') && "animate-pulse"
                                            )}
                                            onMouseEnter={() => setHoveredPart('lungs')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'lungs')!)}
                                        />

                                        {/* Arms - More Realistic */}
                                        <ellipse
                                            cx="45"
                                            cy="200"
                                            rx="18"
                                            ry="90"
                                            fill="none"
                                            stroke={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '#f59e0b' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '3.5' : '2.5'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('bones')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'bones')!)}
                                        />
                                        <ellipse
                                            cx="155"
                                            cy="200"
                                            rx="18"
                                            ry="90"
                                            fill="none"
                                            stroke={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '#f59e0b' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '3.5' : '2.5'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('bones')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'bones')!)}
                                        />

                                        {/* Legs - More Realistic */}
                                        <ellipse
                                            cx="80"
                                            cy="340"
                                            rx="20"
                                            ry="75"
                                            fill={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? 'rgba(245, 158, 11, 0.2)' : 'none'}
                                            stroke={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '#f59e0b' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '3.5' : '2.5'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('bones')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'bones')!)}
                                        />
                                        <ellipse
                                            cx="120"
                                            cy="340"
                                            rx="20"
                                            ry="75"
                                            fill={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? 'rgba(245, 158, 11, 0.2)' : 'none'}
                                            stroke={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '#f59e0b' : '#94a3b8'}
                                            strokeWidth={hoveredPart === 'bones' || selectedPart?.id === 'bones' ? '3.5' : '2.5'}
                                            className="transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredPart('bones')}
                                            onMouseLeave={() => setHoveredPart(null)}
                                            onClick={() => handlePartClick(bodyParts.find(p => p.id === 'bones')!)}
                                        />
                                    </svg>

                                    {/* Enhanced Interactive Hotspots with Pulse Effect */}
                                    {bodyParts.map((part) => {
                                        const Icon = part.icon
                                        const isActive = selectedPart?.id === part.id || hoveredPart === part.id
                                        const isPulsing = pulseAnimation === part.id
                                        
                                        return (
                                            <div
                                                key={part.id}
                                                className="absolute cursor-pointer transition-all duration-300 z-20"
                                                style={{
                                                    left: `${part.position.x}%`,
                                                    top: `${part.position.y}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                                onMouseEnter={() => setHoveredPart(part.id)}
                                                onMouseLeave={() => setHoveredPart(null)}
                                                onClick={() => handlePartClick(part)}
                                            >
                                                {/* Pulse Ring Effect */}
                                                {isPulsing && (
                                                    <div className={cn(
                                                        "absolute inset-0 rounded-full animate-ping",
                                                        `bg-${part.hoverColor}-500/30`
                                                    )} style={{ 
                                                        width: '80px', 
                                                        height: '80px',
                                                        marginLeft: '-40px',
                                                        marginTop: '-40px'
                                                    }} />
                                                )}
                                                
                                                <div className={cn(
                                                    "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                                                    isActive
                                                        ? `bg-gradient-to-br ${part.color} text-white scale-125 shadow-xl`
                                                        : "bg-white/90 text-text-secondary hover:scale-110 hover:bg-white"
                                                )}>
                                                    <Icon className={cn(
                                                        "w-7 h-7 transition-transform duration-300",
                                                        isActive && "animate-pulse"
                                                    )} />
                                                    
                                                    {/* Sparkle Effect */}
                                                    {isActive && (
                                                        <LocationStar className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-spin" />
                                                    )}
                                                </div>
                                                
                                                {/* Enhanced Tooltip */}
                                                {isActive && (
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap animate-fade-in">
                                                        <div className="bg-gradient-to-r from-text-primary to-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl">
                                                            {isRtl ? part.name_ar : part.name_en}
                                                        </div>
                                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-primary rotate-45" />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Enhanced Instructions */}
                                <div className="text-center mt-6 p-4 bg-primary-light/10 rounded-xl border border-primary/20">
                                    <p className="text-sm text-text-primary font-medium mb-1">
                                        {lang === 'ar' 
                                            ? '💡 انقر على أي جزء من الجسم' 
                                            : '💡 Click on any body part'}
                                    </p>
                                    <p className="text-xs text-text-secondary">
                                        {lang === 'ar' 
                                            ? 'أو استخدم الأزرار أدناه للوصول السريع' 
                                            : 'or use the buttons below for quick access'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>

                    {/* Enhanced Information Panel */}
                    <ScrollAnimation direction="left" delay={200}>
                        <div className="space-y-6">
                            {selectedPart ? (
                                <div className="card-warm animate-fade-in relative overflow-hidden">
                                    {/* Background Gradient */}
                                    <div className={cn(
                                        "absolute top-0 left-0 right-0 h-2 bg-gradient-to-r opacity-80",
                                        selectedPart.color
                                    )} />
                                    
                                    <div className="relative pt-6">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className={cn(
                                                "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-xl relative",
                                                selectedPart.color
                                            )}>
                                                <selectedPart.icon className="w-10 h-10 text-white" />
                                                {pulseAnimation === selectedPart.id && (
                                                    <div className="absolute inset-0 rounded-2xl bg-white/30 animate-ping" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-text-primary mb-2">
                                                    {isRtl ? selectedPart.name_ar : selectedPart.name_en}
                                                </h3>
                                                <div className="w-20 h-1 bg-primary rounded-full" />
                                            </div>
                                        </div>

                                        <p className="text-text-secondary leading-relaxed mb-6 text-base">
                                            {isRtl ? selectedPart.description_ar : selectedPart.description_en}
                                        </p>

                                        <div className="mb-6">
                                            <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                                                <Information className="w-5 h-5 text-primary" />
                                                {lang === 'ar' ? 'الخدمات المتوفرة' : 'Available Services'}
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {(isRtl ? selectedPart.services_ar : selectedPart.services_en).map((service, index) => (
                                                    <div
                                                        key={index}
                                                        className="group flex items-center gap-3 px-4 py-3 bg-primary-light/10 rounded-xl border border-primary/20 hover:bg-primary-light/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                                                    >
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full transition-all duration-300",
                                                            `bg-${selectedPart.hoverColor}-500 group-hover:scale-150`
                                                        )} />
                                                        <span className="text-sm text-text-primary font-medium flex-1">{service}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <a
                                            href={`/${lang}/services`}
                                            className="inline-flex items-center gap-2 btn-primary group"
                                        >
                                            <span>{lang === 'ar' ? 'استكشف الخدمات' : 'Explore Services'}</span>
                                            <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", isRtl && "rotate-180")} />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="card-warm">
                                    <div className="text-center py-12">
                                        <div className="relative inline-block mb-4">
                                            <Stethoscope className="w-16 h-16 text-primary mx-auto animate-pulse" />
                                            <LocationStar className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-primary mb-2">
                                            {lang === 'ar' ? 'اختر جزءاً من الجسم' : 'Select a Body Part'}
                                        </h3>
                                        <p className="text-text-secondary mb-6">
                                            {lang === 'ar'
                                                ? 'انقر على أي جزء من الجسم في الصورة لمعرفة المزيد عن الخدمات الطبية المتوفرة'
                                                : 'Click on any body part in the image to learn more about available medical services'}
                                        </p>
                                    </div>

                                    {/* Enhanced Quick Access Grid */}
                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        {bodyParts.map((part) => {
                                            const Icon = part.icon
                                            const isHovered = hoveredPart === part.id
                                            return (
                                                <button
                                                    key={part.id}
                                                    onClick={() => handlePartClick(part)}
                                                    onMouseEnter={() => setHoveredPart(part.id)}
                                                    onMouseLeave={() => setHoveredPart(null)}
                                                    className={cn(
                                                        "group relative p-5 rounded-xl border-2 transition-all duration-300 overflow-hidden",
                                                        isHovered
                                                            ? `bg-gradient-to-br ${part.color} border-transparent text-white scale-105 shadow-xl`
                                                            : "bg-primary-light/10 border-primary/20 hover:border-primary/40 hover:scale-105"
                                                    )}
                                                >
                                                    {/* Background Gradient on Hover */}
                                                    {isHovered && (
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                                    )}
                                                    
                                                    <div className={cn(
                                                        "relative w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 mx-auto transition-all duration-300",
                                                        isHovered
                                                            ? "bg-white/20 scale-110"
                                                            : part.color
                                                    )}>
                                                        <Icon className={cn(
                                                            "w-6 h-6 transition-all duration-300",
                                                            isHovered ? "text-white" : "text-white"
                                                        )} />
                                                    </div>
                                                    <p className={cn(
                                                        "text-sm font-semibold text-center transition-colors",
                                                        isHovered ? "text-white" : "text-text-primary"
                                                    )}>
                                                        {isRtl ? part.name_ar : part.name_en}
                                                    </p>
                                                    
                                                    {/* Arrow Indicator */}
                                                    {isHovered && (
                                                        <ArrowRight className={cn(
                                                            "absolute top-2 right-2 w-4 h-4 text-white/80 animate-bounce",
                                                            isRtl && "rotate-180 left-2 right-auto"
                                                        )} />
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollAnimation>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(600px);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    )
}
