import { getDirection, type Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HtmlAttributes from '@/components/HtmlAttributes'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = (lang === 'ar' || lang === 'en' ? lang : 'en') as Locale
  const dir = getDirection(locale)

  return (
    <>
      <HtmlAttributes lang={locale} dir={dir} />
      <Header lang={locale} />
      <Navigation lang={locale} />
      <main className="pt-[108px]">
        {children}
      </main>
      <Footer lang={locale} />
    </>
  )
}

