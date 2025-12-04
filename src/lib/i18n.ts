export type Locale = 'en' | 'ar' | 'fr'

export const defaultLocale: Locale = 'en'

export const locales: Locale[] = ['en', 'ar', 'fr']

export const dictionary = {
    en: {
        title: 'Sahel General Hospital',
        description: 'Providing exceptional healthcare services since 1983',
        nav: {
            home: 'Home',
            services: 'Services',
            doctors: 'Find a Doctor',
            about: 'About Us',
            contact: 'Contact',
        },
        hero: {
            title: 'Advanced Healthcare for a Better Life',
            subtitle: 'Leading the way in medical excellence with state-of-the-art technology and compassionate care.',
            cta: 'Book an Appointment',
        },
        footer: {
            rights: 'All rights reserved.',
        }
    },
    ar: {
        title: 'مستشفى الساحل العام',
        description: 'تقديم خدمات رعاية صحية استثنائية منذ عام 1983',
        nav: {
            home: 'الرئيسية',
            services: 'خدماتنا',
            doctors: 'الأطباء',
            about: 'من نحن',
            contact: 'اتصل بنا',
        },
        hero: {
            title: 'رعاية صحية متطورة لحياة أفضل',
            subtitle: 'الريادة في التميز الطبي مع أحدث التقنيات والرعاية الرحيمة.',
            cta: 'احجز موعداً',
        },
        footer: {
            rights: 'جميع الحقوق محفوظة.',
        }
    },
    fr: {
        title: 'Hôpital Général Sahel',
        description: 'Fournir des services de santé exceptionnels depuis 1983',
        nav: {
            home: 'Accueil',
            services: 'Services',
            doctors: 'Trouver un médecin',
            about: 'À propos',
            contact: 'Contact',
        },
        hero: {
            title: 'Des soins de santé avancés pour une vie meilleure',
            subtitle: 'Leader de l\'excellence médicale avec une technologie de pointe et des soins compatissants.',
            cta: 'Prendre rendez-vous',
        },
        footer: {
            rights: 'Tous droits réservés.',
        }
    }
}

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
    return locale === 'ar' ? 'rtl' : 'ltr'
}
