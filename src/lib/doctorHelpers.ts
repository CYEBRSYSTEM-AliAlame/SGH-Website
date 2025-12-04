import type { Doctor } from '@/types'

/**
 * Get the full path to a doctor's photo
 * @param doctor - Doctor object
 * @returns Path to the doctor's photo or default avatar
 */
export function getDoctorImagePath(doctor: Doctor): string {
    // For now, use placeholder avatars until actual photos are added
    // Female doctors typically have names ending in 'a' or contain certain patterns
    const isFemale = doctor.doctor_name_en.match(/\b(Dr\.|Doctor)\s+(.*?)\s*$/)?.[2]?.endsWith('a') ||
        doctor.doctor_photo_file === 'anonymous_doctor_female.png'

    // Use Dicebear avatars as placeholders
    const seed = doctor.doctor_name_en.replace(/\s+/g, '-').toLowerCase()
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`
}

/**
 * Get the default avatar based on doctor name or gender
 * @param isFemale - Whether to use female avatar (optional)
 * @returns Path to default avatar
 */
export function getDefaultDoctorAvatar(isFemale: boolean = false): string {
    return isFemale
        ? '/images/doctors/anonymous_doctor_female.png'
        : '/images/doctors/anonymous_doctor_male.png'
}

/**
 * Check if a doctor has a custom photo (not default avatar)
 * @param doctor - Doctor object
 * @returns True if doctor has custom photo
 */
export function hasCustomPhoto(doctor: Doctor): boolean {
    const photoFile = doctor.doctor_photo_file
    return photoFile !== 'anonymous_doctor_male.png' &&
        photoFile !== 'anonymous_doctor_female.png'
}

/**
 * Get doctor's full name in specified language
 * @param doctor - Doctor object
 * @param lang - Language code ('en' or 'ar')
 * @returns Doctor's full name
 */
export function getDoctorName(doctor: Doctor, lang: 'en' | 'ar' = 'en'): string {
    return lang === 'ar' ? doctor.doctor_name_ar : doctor.doctor_name_en
}

/**
 * Get doctor's experience/bio in specified language
 * @param doctor - Doctor object
 * @param lang - Language code ('en' or 'ar')
 * @returns Doctor's experience HTML content (cleaned)
 */
export function getDoctorExperience(doctor: Doctor, lang: 'en' | 'ar' = 'en'): string {
    const rawHtml = lang === 'ar' ? doctor.doctor_exp_ar : doctor.doctor_exp_en

    // Clean escaped characters from the JSON data
    return rawHtml
        .replace(/\\r\\n/g, '')  // Remove escaped line breaks
        .replace(/\\n/g, '')     // Remove escaped newlines
        .replace(/\\r/g, '')     // Remove escaped carriage returns
        .replace(/\\\\/g, '')    // Remove escaped backslashes
        .trim()
}

/**
 * Get doctor's URL slug in specified language
 * @param doctor - Doctor object
 * @param lang - Language code ('en' or 'ar')
 * @returns Doctor's URL slug
 */
export function getDoctorUrl(doctor: Doctor, lang: 'en' | 'ar' = 'en'): string {
    return lang === 'ar' ? doctor.doctor_url_ar : doctor.doctor_url_en
}

/**
 * Check if doctor is head of department
 * @param doctor - Doctor object
 * @returns True if doctor is head of department
 */
export function isHeadOfDepartment(doctor: Doctor): boolean {
    return doctor.head_of_dep === "1"
}
