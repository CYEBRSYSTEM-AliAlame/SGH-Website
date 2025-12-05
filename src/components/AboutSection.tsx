import Image from 'next/image'
import Link from 'next/link'
import { contentService } from '@/services/contentService'
import { Favorite, Trophy, UserMultiple, Tag, ArrowRight, Hospital } from '@carbon/icons-react'
import { cn } from '@/lib/utils'

interface AboutSectionProps {
  lang?: string
}

export default async function AboutSection({ lang = 'en' }: AboutSectionProps) {
  const isRtl = lang === 'ar'
  
  // Fetch content directly from service (no HTTP calls)
  let aboutContent: { title?: string; content?: string; image?: string | null } | null = null
  try {
    aboutContent = await contentService.getByPage('specialists')
  } catch (error) {
    console.error('Error fetching about content:', error)
  }

  // Default content if database is not available
  const defaultContent = {
    title_en: 'About Sahel General Hospital',
    title_ar: 'عن مستشفى الساحل العام',
    content_en: `<p>We are a highly professional team of medical experts that are here to serve you through a unique partnership of academic medicine, private industry, and the community. Our doctors are committed to treating you by applying the most high-tech therapies and innovative technologies.</p>
    <p>With over 40 years of experience, we have built a reputation for excellence in healthcare delivery, combining cutting-edge medical technology with compassionate patient care.</p>`,
    content_ar: `<p>يضم فريقنا أطباء محترفين يتمتعون بخبرة طبية كبيرة يعملون على تقديم الخدمات لك من خلال شراكة فريدة من نوعها مع الطب الأكاديمي، والقطاع الخاص، والمجتمع. كما يلتزم أطباؤنا بمعالجتك باعتماد معظم العلاجات التقنية العالية والتكنولوجيا الحديثة.</p>
    <p>مع أكثر من 40 عاماً من الخبرة، بنينا سمعة للتميز في تقديم الرعاية الصحية، ونجمع بين أحدث التقنيات الطبية والرعاية الرحيمة للمرضى.</p>`,
  }

  const title = aboutContent?.title || (lang === 'ar' ? defaultContent.title_ar : defaultContent.title_en)
  const content = aboutContent?.content || (lang === 'ar' ? defaultContent.content_ar : defaultContent.content_en)
  const image = aboutContent?.image

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative pattern-geometric">
      {/* Lebanese Cultural Pattern Overlay */}
      <div className="absolute inset-0 pattern-cedar opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Hospital className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual Side */}
          <div className="relative">
            <div
              className="relative min-h-[500px] rounded-2xl overflow-hidden bg-cover bg-center shadow-2xl"
              style={{
                backgroundImage: image
                  ? `url(/images/content/${image})`
                  : 'linear-gradient(135deg, #81cdc1 0%, #118cb7 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
              
              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute bottom-8 right-8 w-24 h-24 bg-teal-500/20 rounded-full blur-xl" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className={cn(
              "absolute -bottom-6 bg-white rounded-2xl shadow-xl p-6 border border-warm-gray/50 hidden lg:block",
              isRtl ? "-left-6" : "-right-6"
            )}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">40+</div>
                  <div className="text-sm text-text-secondary">
                    {lang === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div
              className="text-lg text-text-secondary leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: String(content) }}
            />

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-warm-gray/50 hover:border-primary transition-all hover:shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UserMultiple className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-text-primary">309+ {lang === 'ar' ? 'طبيب' : 'Doctors'}</div>
                  <div className="text-sm text-text-secondary">
                    {lang === 'ar' ? 'أطباء متخصصون' : 'Expert Specialists'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-warm-gray/50 hover:border-primary transition-all hover:shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-light/20 to-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-text-primary">25+ {lang === 'ar' ? 'قسم' : 'Departments'}</div>
                  <div className="text-sm text-text-secondary">
                    {lang === 'ar' ? 'خدمات طبية' : 'Medical Services'}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${lang}/about-us`}
              className={cn(
                "inline-flex items-center gap-2 mt-6 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all hover:shadow-lg group",
                isRtl && "flex-row-reverse"
              )}
            >
              {lang === 'ar' ? 'اعرف المزيد عنا' : 'Learn More About Us'}
              <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", isRtl && "group-hover:-translate-x-1 rotate-180")} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

