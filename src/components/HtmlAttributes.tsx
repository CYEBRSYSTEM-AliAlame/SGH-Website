'use client'

import { useEffect } from 'react'

interface HtmlAttributesProps {
  lang: string
  dir: 'ltr' | 'rtl'
}

export default function HtmlAttributes({ lang, dir }: HtmlAttributesProps) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = dir
    }
  }, [lang, dir])

  return null
}

