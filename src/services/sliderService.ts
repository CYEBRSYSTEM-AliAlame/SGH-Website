import { query } from '@/lib/db'
import type { Slider } from '@/types'
import sliderData from '@/data/slider.json'

export const sliderService = {
  async getAll(): Promise<Slider[]> {
    try {
      // Try database first
      const slides = await query<Slider>(
        'SELECT * FROM main_slider ORDER BY display_order ASC'
      )
      return slides.length > 0 ? slides : (sliderData as Slider[])
    } catch (error) {
      // Fallback to JSON data - this is expected when DB is not configured
      return sliderData as Slider[]
    }
  },
}

