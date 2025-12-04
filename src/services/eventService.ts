import { query } from '@/lib/db'
import type { Event } from '@/types'
import eventsData from '@/data/events.json'

export const eventService = {
    async getAll(limit?: number): Promise<Event[]> {
        try {
            // Try database first
            let sql = 'SELECT * FROM events ORDER BY event_date DESC'
            if (limit) {
                sql += ' LIMIT ?'
                const events = await query<Event>(sql, [limit])
                return events.length > 0 ? events : (eventsData as Event[])
            }
            const events = await query<Event>(sql)
            return events.length > 0 ? events : (eventsData as Event[])
        } catch (error) {
            // Fallback to JSON data - this is expected when DB is not configured
            const events = eventsData as Event[]
            return limit ? events.slice(0, limit) : events
        }
    },

    async getUpcoming(): Promise<Event[]> {
        try {
            const today = new Date().toISOString().split('T')[0]
            const events = await query<Event>(
                "SELECT * FROM events WHERE event_date > ? ORDER BY event_date DESC, id DESC",
                [today]
            )
            return events.length > 0 ? events : []
        } catch (error) {
            console.warn('Database query failed for upcoming events:', error)
            // Filter upcoming events from JSON data
            const today = new Date().toISOString().split('T')[0]
            return (eventsData as Event[]).filter(event => event.event_date > today)
        }
    }
}
