import type { Doctor } from '@/types'
import doctorsData from '@/data/doctors.json'
import { query } from '@/lib/db'
import relationshipsData from '@/data/doctor_service_relationships.json'

export const doctorService = {
    /**
     * Get all doctors with optional filtering
     * @param params - Filter parameters
     * @returns Array of doctors matching the filters
     */
    async getAll(params: {
        serviceId?: number
        diseaseId?: number
        keyword?: string
        keywordName?: string
        keywordGeneral?: string
        headOfDep?: boolean
    }): Promise<Doctor[]> {
        let doctors: Doctor[] = []
        let useDatabase = true

        // Try database first
        try {
            let sql = 'SELECT DISTINCT d.* FROM doctors d'
            const dbParams: any[] = []
            const conditions: string[] = []

            // Filter by service using relationship table
            if (params.serviceId) {
                sql += ' INNER JOIN tbl_doctors_services tds ON d.id = tds.doctor_id'
                conditions.push('tds.service_id = ?')
                dbParams.push(params.serviceId)
            }

            // Filter by disease (if disease table exists)
            if (params.diseaseId) {
                conditions.push('d.disease_id = ?')
                dbParams.push(params.diseaseId)
            }

            // Filter by head of department
            if (params.headOfDep === true) {
                conditions.push('d.head_of_dep = ?')
                dbParams.push('1')
            } else if (params.headOfDep === false) {
                conditions.push('d.head_of_dep = ?')
                dbParams.push('0')
            }

            // Filter by name keyword
            if (params.keywordName) {
                conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ?)')
                dbParams.push(`%${params.keywordName}%`, `%${params.keywordName}%`)
            }

            // General keyword search (name + experience)
            if (params.keywordGeneral) {
                conditions.push('(d.doctor_name_en LIKE ? OR d.doctor_name_ar LIKE ? OR d.doctor_exp_en LIKE ? OR d.doctor_exp_ar LIKE ?)')
                dbParams.push(`%${params.keywordGeneral}%`, `%${params.keywordGeneral}%`, `%${params.keywordGeneral}%`, `%${params.keywordGeneral}%`)
            }

            // Add WHERE clause if there are conditions
            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ')
            }

            // Order by head of department first, then by name
            sql += ' ORDER BY d.head_of_dep DESC, d.doctor_name_en ASC'

            doctors = await query<Doctor>(sql, dbParams)
            // If database query succeeded but returned 0 results, still use JSON fallback
            if (doctors.length === 0) {
                useDatabase = false
            }
        } catch (dbError) {
            // Fallback to JSON data - this is expected when DB is not configured
            useDatabase = false
        }

        // Fallback to JSON data if database failed or returned no results
        if (!useDatabase || doctors.length === 0) {
            doctors = doctorsData as Doctor[]
            const relationships = relationshipsData as Array<{ doctor_id: number; service_id: number }>

            // Filter by service using relationship data
            if (params.serviceId) {
                const serviceIdNum = params.serviceId
                // Get doctor IDs for this service - convert to zero-padded strings to match JSON format
                const doctorIdsForService = new Set(
                    relationships
                        .filter(rel => rel.service_id === serviceIdNum)
                        .map(rel => {
                            // Convert number to zero-padded 5-digit string (e.g., 9 -> "00009", 118 -> "00118")
                            return rel.doctor_id.toString().padStart(5, '0')
                        })
                )
                
                // Debug logging (can be removed in production)
                if (process.env.NODE_ENV === 'development') {
                    console.log(`[doctorService] Filtering doctors for service ${serviceIdNum}:`, {
                        expectedDoctorIds: Array.from(doctorIdsForService).slice(0, 5),
                        totalExpected: doctorIdsForService.size,
                        totalDoctorsBeforeFilter: doctors.length
                    })
                }
                
                // Filter doctors by matching IDs
                const beforeCount = doctors.length
                doctors = doctors.filter(doc => {
                    // doc.id is already a zero-padded string like "00009"
                    const matches = doctorIdsForService.has(doc.id)
                    return matches
                })
                
                // Debug logging
                if (process.env.NODE_ENV === 'development') {
                    console.log(`[doctorService] Filtered ${beforeCount} doctors to ${doctors.length} for service ${serviceIdNum}`)
                }
            }

            // Filter by head of department
            if (params.headOfDep === true) {
                doctors = doctors.filter(doc => doc.head_of_dep === '1')
            } else if (params.headOfDep === false) {
                doctors = doctors.filter(doc => doc.head_of_dep === '0')
            }

            // Filter by disease ID (if implemented)
            if (params.diseaseId) {
                doctors = doctors.filter(doc => doc.disease_id === params.diseaseId)
            }

            // Filter by name keyword
            if (params.keywordName) {
                const keyword = params.keywordName.toLowerCase()
                doctors = doctors.filter(doc =>
                    doc.doctor_name_en.toLowerCase().includes(keyword) ||
                    doc.doctor_name_ar.includes(params.keywordName!)
                )
            }

            // General keyword search
            if (params.keywordGeneral) {
                const keyword = params.keywordGeneral.toLowerCase()
                doctors = doctors.filter(doc =>
                    doc.doctor_name_en.toLowerCase().includes(keyword) ||
                    doc.doctor_name_ar.includes(params.keywordGeneral!) ||
                    doc.doctor_exp_en.toLowerCase().includes(keyword) ||
                    doc.doctor_exp_ar.includes(params.keywordGeneral!)
                )
            }

            // Sort by head of department first, then by name
            doctors.sort((a, b) => {
                if (a.head_of_dep !== b.head_of_dep) {
                    return b.head_of_dep.localeCompare(a.head_of_dep) // '1' comes before '0'
                }
                return a.doctor_name_en.localeCompare(b.doctor_name_en)
            })
        }

        return doctors
    },

    /**
     * Get a single doctor by ID
     * @param id - Doctor ID
     * @returns Doctor or undefined if not found
     */
    async getById(id: string): Promise<Doctor | undefined> {
        const doctors = doctorsData as Doctor[]
        return doctors.find(doc => doc.id === id)
    },

    /**
     * Get a single doctor by URL slug
     * @param slug - URL slug (English or Arabic)
     * @returns Doctor or undefined if not found
     */
    async getBySlug(slug: string): Promise<Doctor | undefined> {
        const doctors = doctorsData as Doctor[]
        return doctors.find(doc =>
            doc.doctor_url_en === slug || doc.doctor_url_ar === slug
        )
    },

    /**
     * Get all heads of departments
     * @returns Array of doctors who are heads of departments
     */
    async getHeadsOfDepartment(): Promise<Doctor[]> {
        return this.getAll({ headOfDep: true })
    }
}

