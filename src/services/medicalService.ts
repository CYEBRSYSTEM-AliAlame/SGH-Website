import { query } from '@/lib/db'
import type { MedicalService } from '@/types'
import servicesData from '@/data/services.json'

export const medicalService = {
    async getAll(limit?: number): Promise<MedicalService[]> {
        try {
            // Try database first
            let sql = 'SELECT * FROM medical_services ORDER BY dep_id, display_order'
            if (limit) {
                sql += ' LIMIT ?'
                const services = await query<MedicalService>(sql, [limit])
                return services.length > 0 ? services : (servicesData as MedicalService[])
            }
            const services = await query<MedicalService>(sql)
            return services.length > 0 ? services : (servicesData as MedicalService[])
        } catch (error) {
            // Fallback to JSON data - this is expected when DB is not configured
            const services = servicesData as MedicalService[]
            return limit ? services.slice(0, limit) : services
        }
    },

    async getBySlug(slug: string): Promise<MedicalService | undefined> {
        try {
            // Try database first
            try {
                const services = await query<MedicalService>(
                    'SELECT * FROM medical_services WHERE service_url_en = ? OR service_url_ar = ? LIMIT 1',
                    [slug, slug]
                )
                if (services.length > 0) {
                    return services[0]
                }
            } catch (dbError) {
                // Fallback to JSON
            }
            
            // Fallback to JSON data
            const services = servicesData as MedicalService[]
            return services.find(service => 
                service.service_url_en === slug || service.service_url_ar === slug
            )
        } catch (error) {
            console.error('Error fetching service by slug:', error)
            return undefined
        }
    }
}
