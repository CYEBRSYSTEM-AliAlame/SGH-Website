import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Stethoscope, Users, Phone, Calendar, Award, TreePine } from 'lucide-react'
import { medicalService } from '@/services/medicalService'
import { doctorService } from '@/services/doctorService'
import type { Doctor } from '@/types'
import { cn } from '@/lib/utils'
import DoctorImage from '@/components/DoctorImage'

interface ServiceDetailPageProps {
    params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
    const { lang, slug } = await params
    const service = await medicalService.getBySlug(slug)
    
    if (!service) {
        return {
            title: 'Service Not Found | Sahel General Hospital',
        }
    }

    const title = lang === 'ar' ? service.service_title_ar : service.service_title_en
    const description = lang === 'ar' ? service.service_desc_ar : service.service_desc_en

    return {
        title: `${title} | Sahel General Hospital`,
        description: description,
    }
}

// Enhanced service descriptions (can be extended with more details)
const enhancedDescriptions: Record<string, { en: string; ar: string }> = {
    'cardiology': {
        en: 'Our Cardiology Department provides comprehensive cardiac care with state-of-the-art diagnostic and treatment facilities. We offer advanced cardiac catheterization, echocardiography, stress testing, and cardiac rehabilitation programs. Our team of experienced cardiologists specializes in treating coronary artery disease, heart failure, arrhythmias, and preventive cardiology.',
        ar: 'يوفر قسم أمراض القلب لدينا رعاية قلبية شاملة مع مرافق تشخيص وعلاج حديثة. نقدم قسطرة قلبية متقدمة، وفحص القلب بالموجات فوق الصوتية، واختبارات الإجهاد، وبرامج إعادة تأهيل القلب. يتخصص فريق أطباء القلب ذوي الخبرة لدينا في علاج أمراض الشرايين التاجية، وفشل القلب، واضطرابات نظم القلب، وطب القلب الوقائي.'
    },
    'gastroenterology': {
        en: 'Our Gastroenterology Department offers comprehensive care for digestive system disorders. We provide advanced endoscopic procedures including upper endoscopy, colonoscopy, ERCP, and capsule endoscopy. Our specialists treat conditions such as GERD, inflammatory bowel disease, liver diseases, and pancreatic disorders with the latest medical and surgical interventions.',
        ar: 'يقدم قسم أمراض الجهاز الهضمي لدينا رعاية شاملة لاضطرابات الجهاز الهضمي. نقدم إجراءات تنظيرية متقدمة تشمل تنظير الجهاز الهضمي العلوي، والتنظير السيني، وERCP، وتنظير الكبسولة. يعالج أخصائيو الحالات مثل الارتجاع المعدي المريئي، وأمراض الأمعاء الالتهابية، وأمراض الكبد، واضطرابات البنكرياس بأحدث التدخلات الطبية والجراحية.'
    },
    'neurology': {
        en: 'Our Neurology Department provides expert care for disorders of the brain, spinal cord, and nervous system. We offer comprehensive evaluation and treatment for stroke, epilepsy, multiple sclerosis, Parkinson\'s disease, headaches, and neuromuscular disorders. Our team utilizes advanced neuroimaging and neurophysiological testing to provide accurate diagnoses and personalized treatment plans.',
        ar: 'يوفر قسم طب الأعصاب لدينا رعاية متخصصة لاضطرابات الدماغ والحبل الشوكي والجهاز العصبي. نقدم تقييماً وعلاجاً شاملاً للسكتة الدماغية، والصرع، والتصلب المتعدد، ومرض باركنسون، والصداع، واضطرابات العضلات والأعصاب. يستخدم فريقنا التصوير العصبي المتقدم واختبارات الفسيولوجيا العصبية لتوفير تشخيصات دقيقة وخطط علاج مخصصة.'
    },
    'pediatrics': {
        en: 'Our Pediatrics Department provides comprehensive healthcare for infants, children, and adolescents. We offer well-child visits, immunizations, acute and chronic disease management, and specialized care for developmental disorders. Our child-friendly environment and experienced pediatricians ensure compassionate, family-centered care for your little ones.',
        ar: 'يوفر قسم طب الأطفال لدينا رعاية صحية شاملة للرضع والأطفال والمراهقين. نقدم زيارات فحص الأطفال، والتطعيمات، وإدارة الأمراض الحادة والمزمنة، ورعاية متخصصة لاضطرابات النمو. بيئتنا الصديقة للأطفال وأطباء الأطفال ذوي الخبرة يضمنون رعاية رحيمة تركز على الأسرة لأطفالكم الصغار.'
    },
    'ophthalmology': {
        en: 'Our Ophthalmology Department provides comprehensive eye care services including routine eye exams, cataract surgery, glaucoma treatment, retinal procedures, and pediatric ophthalmology. We utilize the latest diagnostic equipment and surgical techniques to preserve and restore vision for patients of all ages.',
        ar: 'يوفر قسم طب العيون لدينا خدمات رعاية عينية شاملة تشمل فحوصات العين الروتينية، وجراحة إعتام عدسة العين، وعلاج الجلوكوما، وإجراءات الشبكية، وطب عيون الأطفال. نستخدم أحدث المعدات التشخيصية والتقنيات الجراحية للحفاظ على البصر واستعادته للمرضى من جميع الأعمار.'
    },
    'orthopedics': {
        en: 'Our Orthopedics Department specializes in the diagnosis and treatment of musculoskeletal conditions. We provide comprehensive care for bone fractures, joint replacements, sports injuries, spine disorders, and orthopedic trauma. Our team includes orthopedic surgeons, physiotherapists, and rehabilitation specialists working together to restore mobility and function.',
        ar: 'يتخصص قسم جراحة العظام لدينا في تشخيص وعلاج حالات الجهاز العضلي الهيكلي. نقدم رعاية شاملة لكسور العظام، واستبدال المفاصل، وإصابات الرياضة، واضطرابات العمود الفقري، والصدمات العظمية. يتضمن فريقنا جراحي العظام، والمعالجين الفيزيائيين، وأخصائيي إعادة التأهيل الذين يعملون معاً لاستعادة الحركة والوظيفة.'
    },
    'ent': {
        en: 'Our ENT (Ear, Nose, and Throat) Department provides comprehensive care for disorders affecting the head and neck region. We treat conditions such as hearing loss, sinusitis, tonsillitis, voice disorders, and head and neck cancers. Our specialists perform advanced diagnostic procedures and surgical interventions using state-of-the-art equipment.',
        ar: 'يوفر قسم الأنف والأذن والحنجرة لدينا رعاية شاملة لاضطرابات المنطقة الرأس والعنق. نعالج حالات مثل فقدان السمع، والتهاب الجيوب الأنفية، والتهاب اللوزتين، واضطرابات الصوت، وسرطانات الرأس والعنق. يقوم أخصائيو بإجراءات تشخيصية متقدمة وتدخلات جراحية باستخدام أحدث المعدات.'
    },
    'obgyn': {
        en: 'Our Obstetrics and Gynecology Department provides comprehensive women\'s healthcare services. We offer prenatal care, high-risk pregnancy management, gynecological surgeries, fertility treatments, and menopause management. Our modern delivery suites and experienced team ensure safe and comfortable care for mothers and newborns.',
        ar: 'يوفر قسم النساء والتوليد لدينا خدمات رعاية صحية شاملة للنساء. نقدم رعاية ما قبل الولادة، وإدارة حالات الحمل عالية الخطورة، والجراحات النسائية، وعلاجات الخصوبة، وإدارة انقطاع الطمث. أجنحة الولادة الحديثة وفريقنا ذو الخبرة يضمنون رعاية آمنة ومريحة للأمهات وحديثي الولادة.'
    },
    'general-surgery': {
        en: 'Our General Surgery Department provides a wide range of surgical procedures for various conditions. We perform minimally invasive surgeries, laparoscopic procedures, and traditional open surgeries. Our experienced surgeons treat conditions affecting the abdomen, digestive system, endocrine system, and soft tissues with the highest standards of surgical care.',
        ar: 'يوفر قسم الجراحة العامة لدينا مجموعة واسعة من الإجراءات الجراحية لحالات مختلفة. نقوم بإجراءات جراحية طفيفة التوغل، وإجراءات تنظيرية، وجراحات مفتوحة تقليدية. يعالج جراحونا ذوو الخبرة حالات تؤثر على البطن، والجهاز الهضمي، والجهاز الصماء، والأنسجة الرخوة بأعلى معايير الرعاية الجراحية.'
    },
    'emergency': {
        en: 'Our Emergency Department operates 24/7 to provide immediate medical care for urgent and life-threatening conditions. We are equipped with advanced life support systems, trauma bays, and a dedicated team of emergency physicians and nurses. We handle everything from minor injuries to critical emergencies with rapid response and expert care.',
        ar: 'يعمل قسم الطوارئ لدينا على مدار الساعة لتوفير رعاية طبية فورية للحالات الطارئة والمهددة للحياة. نحن مجهزون بأنظمة دعم الحياة المتقدمة، وأجنحة الصدمات، وفريق مخصص من أطباء الطوارئ والممرضات. نتعامل مع كل شيء من الإصابات البسيطة إلى حالات الطوارئ الحرجة مع استجابة سريعة ورعاية متخصصة.'
    },
    'internal-medicine': {
        en: 'Our Internal Medicine Department provides comprehensive primary and specialized care for adults. Our internists diagnose and manage a wide range of conditions including diabetes, hypertension, heart disease, respiratory disorders, and infectious diseases. We focus on preventive care, chronic disease management, and coordination of care across specialties.',
        ar: 'يوفر قسم الطب الباطني لدينا رعاية أولية ومتخصصة شاملة للبالغين. يقوم أطباؤنا الباطنيون بتشخيص وإدارة مجموعة واسعة من الحالات بما في ذلك مرض السكري، وارتفاع ضغط الدم، وأمراض القلب، واضطرابات الجهاز التنفسي، والأمراض المعدية. نركز على الرعاية الوقائية، وإدارة الأمراض المزمنة، وتنسيق الرعاية عبر التخصصات.'
    },
    'endocrinology': {
        en: 'Our Endocrinology Department specializes in the diagnosis and treatment of hormonal and metabolic disorders. We provide comprehensive care for diabetes, thyroid disorders, adrenal gland conditions, pituitary disorders, and metabolic bone diseases. Our endocrinologists work closely with patients to develop personalized treatment plans for optimal health outcomes.',
        ar: 'يتخصص قسم الغدد الصماء لدينا في تشخيص وعلاج الاضطرابات الهرمونية والتمثيل الغذائي. نقدم رعاية شاملة لمرض السكري، واضطرابات الغدة الدرقية، وحالات الغدة الكظرية، واضطرابات الغدة النخامية، وأمراض العظام الأيضية. يعمل أطباء الغدد الصماء لدينا بشكل وثيق مع المرضى لوضع خطط علاج مخصصة لتحقيق أفضل النتائج الصحية.'
    }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const { lang, slug } = await params
    const isRtl = lang === 'ar'

    // Fetch service by slug
    const service = await medicalService.getBySlug(slug)
    
    if (!service) {
        notFound()
    }

    // Fetch doctors for this service
    let doctors: Doctor[] = []
    try {
        doctors = await doctorService.getAll({
            serviceId: service.id
        })
        // Debug logging in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[ServiceDetailPage] Found ${doctors.length} doctors for service ${service.id} (${service.service_title_en})`)
        }
    } catch (error) {
        console.error('Error fetching doctors for service:', error)
    }

    const title = isRtl ? service.service_title_ar : service.service_title_en
    const description = isRtl ? service.service_desc_ar : service.service_desc_en
    const enhancedDesc = enhancedDescriptions[service.service_url_en]
    const fullDescription = enhancedDesc 
        ? (isRtl ? enhancedDesc.ar : enhancedDesc.en)
        : description

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary via-primary-hover to-primary-light text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <Link
                        href={`/${lang}/services`}
                        className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className={cn("w-5 h-5", isRtl ? "ml-2 rotate-180" : "mr-2")} />
                        {lang === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                        <p className="text-xl text-white/90 leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Service Description */}
                            <div className="card-warm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-primary-light/20 rounded-xl flex items-center justify-center">
                                        <Stethoscope className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        {lang === 'ar' ? 'عن الخدمة' : 'About This Service'}
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
                                    {enhancedDesc ? (
                                        <p className="whitespace-pre-line">{fullDescription}</p>
                                    ) : (
                                        <p>{fullDescription}</p>
                                    )}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="card-warm">
                                <h2 className="text-2xl font-bold text-text-primary mb-6">
                                    {lang === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-text-secondary">
                                            {lang === 'ar' ? 'أحدث التقنيات والمعدات الطبية' : 'State-of-the-art medical technology and equipment'}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-text-secondary">
                                            {lang === 'ar' ? 'فريق متعدد التخصصات من الخبراء' : 'Multidisciplinary team of experts'}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-text-secondary">
                                            {lang === 'ar' ? 'رعاية مخصصة لكل مريض' : 'Personalized care for each patient'}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-text-secondary">
                                            {lang === 'ar' ? 'متابعة مستمرة بعد العلاج' : 'Continuous follow-up care'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="card-warm">
                                <h3 className="text-xl font-bold text-text-primary mb-4">
                                    {lang === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        href={`/${lang}/contact`}
                                        className="w-full btn-primary text-center block"
                                    >
                                        <Calendar className="w-5 h-5 inline mr-2" />
                                        {lang === 'ar' ? 'احجز موعداً' : 'Book Appointment'}
                                    </Link>
                                    <Link
                                        href="tel:+9611858333"
                                        className="w-full px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors text-center block"
                                    >
                                        <Phone className="w-5 h-5 inline mr-2" />
                                        {lang === 'ar' ? 'اتصل بنا' : 'Call Us'}
                                    </Link>
                                </div>
                            </div>

                            {/* Service Stats */}
                            <div className="card-warm">
                                <div className="flex items-center gap-2 mb-4">
                                    <TreePine className="w-5 h-5 text-[#00A651]" />
                                    <h3 className="text-xl font-bold text-text-primary">
                                        {lang === 'ar' ? 'إحصائيات' : 'Service Stats'}
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-3xl font-bold text-primary mb-1">
                                            {doctors.length}+
                                        </div>
                                        <div className="text-sm text-text-secondary">
                                            {lang === 'ar' ? 'أطباء متخصصين' : 'Specialist Doctors'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                                        <div className="text-sm text-text-secondary">
                                            {lang === 'ar' ? 'متاح للطوارئ' : 'Emergency Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctors Section */}
                    {doctors.length > 0 && (
                        <div className="mt-12">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-primary-light/20 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-text-primary">
                                        {lang === 'ar' ? 'أطباؤنا المتخصصون' : 'Our Specialist Doctors'}
                                    </h2>
                                    <p className="text-text-secondary mt-1">
                                        {lang === 'ar' 
                                            ? `تعرف على ${doctors.length} طبيب متخصص في ${title}`
                                            : `Meet our ${doctors.length} specialist doctor${doctors.length !== 1 ? 's' : ''} in ${title}`}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {doctors.map((doctor) => {
                                    const doctorName = isRtl ? doctor.doctor_name_ar : doctor.doctor_name_en
                                    const doctorUrl = isRtl ? doctor.doctor_url_ar : doctor.doctor_url_en
                                    
                                    return (
                                        <Link
                                            key={doctor.id}
                                            href={`/${lang}/our-doctors/${doctorUrl}`}
                                            className="card-warm group hover:scale-105 transition-transform"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0 bg-white">
                                                    <DoctorImage
                                                        doctor={doctor}
                                                        alt={doctorName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors truncate">
                                                        {doctorName}
                                                    </h3>
                                                    {doctor.head_of_dep === '1' && (
                                                        <div className="inline-flex items-center gap-1 bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full mb-1">
                                                            <Award className="w-3 h-3" />
                                                            <span>{lang === 'ar' ? 'رئيس' : 'Head'}</span>
                                                        </div>
                                                    )}
                                                    <p className="text-sm text-text-secondary">
                                                        {lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'} →
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>

                            {doctors.length > 6 && (
                                <div className="text-center mt-8">
                                    <Link
                                        href={`/${lang}/our-doctors?service_id=${service.id}`}
                                        className="btn-primary"
                                    >
                                        {lang === 'ar' ? 'عرض جميع الأطباء' : 'View All Doctors'}
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

