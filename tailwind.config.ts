import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Carbon Design System - Gray 10 Theme Base
        background: '#f4f4f4', // Gray 10
        surface: '#ffffff',
        'surface-hover': '#e0e0e0', // Gray 20

        // Primary - Blue 60
        primary: {
          DEFAULT: '#0f62fe',
          hover: '#0353e9',
          active: '#002d9c',
        },

        // Secondary - Gray 80
        secondary: {
          DEFAULT: '#393939',
          hover: '#4c4c4c',
        },

        // UI Shell
        'ui-shell': '#161616', // Gray 100

        // Text
        text: {
          primary: '#161616', // Gray 100
          secondary: '#525252', // Gray 60
          placeholder: '#a8a8a8', // Gray 40
          onColor: '#ffffff',
        },

        // Feedback
        error: '#da1e28', // Red 60
        success: '#24a148', // Green 50
        warning: '#f1c21b', // Yellow 30
        info: '#0043ce', // Blue 70
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-ibm-plex-arabic)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        arabic: ['var(--font-ibm-plex-arabic)', 'sans-serif'],
      },
      spacing: {
        // Carbon Spacing Scale
        2: '0.125rem', // 2px
        4: '0.25rem',  // 4px
        8: '0.5rem',   // 8px
        12: '0.75rem', // 12px
        16: '1rem',    // 16px
        24: '1.5rem',  // 24px
        32: '2rem',    // 32px
        48: '3rem',    // 48px
        64: '4rem',    // 64px
        80: '5rem',    // 80px
        96: '6rem',    // 96px
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}

export default config

