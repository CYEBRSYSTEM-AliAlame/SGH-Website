export interface Doctor {
  id: string
  head_of_dep: string // "0" or "1" - indicates if doctor is head of department
  doctor_name_en: string
  doctor_name_ar: string
  doctor_url_en: string
  doctor_url_ar: string
  doctor_exp_en: string // HTML content with experience/bio in English
  doctor_exp_ar: string // HTML content with experience/bio in Arabic
  doctor_photo_file: string
  // Optional fields for filtering (may be added later)
  service_id?: number
  disease_id?: number
  doctor_speciality?: string
  doctor_language?: string
}


export interface MedicalService {
  id: number
  service_title_en: string
  service_title_ar: string
  service_desc_en: string
  service_desc_ar: string
  service_url_en: string
  service_url_ar: string
  service_icon_file: string
  box_color_id: number
  dep_id: number
  display_order: number
}

export interface Event {
  id: number
  event_title_en: string
  event_title_ar: string
  event_desc_en: string
  event_desc_ar: string
  event_url_en: string
  event_url_ar: string
  event_date: string
}

export interface Slider {
  id: number
  header1_en: string
  header1_ar: string
  header2_en: string
  header2_ar: string
  slide_image_file: string
  link_url: string
  display_order: number
}

export interface Color {
  id: number
  color_hex_code: string
}

export interface TextContent {
  id: number
  txt_title_en: string
  txt_title_ar: string
  txt_en: string
  txt_ar: string
  related_page: string
}

export interface Picture {
  id: number
  pic_file: string
  related_table: string
  related_table_id: number
  display_order: number
}

