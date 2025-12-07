import { z } from 'zod'

/**
 * Environment variable validation schema
 * Validates all required and optional environment variables at runtime
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database configuration (optional - app works without DB)
  DB_HOST: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_PORT: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 3306))
    .refine((val) => !isNaN(val) && val > 0 && val <= 65535, {
      message: 'DB_PORT must be a valid port number (1-65535)',
    }),
  DB_SSL: z
    .string()
    .optional()
    .transform((val) => val === 'true'),

  // Add other environment variables as needed
})

type Env = z.infer<typeof envSchema>

let validatedEnv: Env | null = null

/**
 * Validates and returns environment variables
 * Throws error if validation fails
 */
export function getEnv(): Env {
  if (validatedEnv) {
    return validatedEnv
  }

  try {
    validatedEnv = envSchema.parse(process.env)
    return validatedEnv
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Environment variable validation failed:\n${errorMessages}`)
    }
    throw error
  }
}

/**
 * Validates that required database environment variables are present
 * Returns true if all are present, false otherwise
 */
export function hasDatabaseConfig(): boolean {
  const env = getEnv()
  return !!(
    env.DB_HOST &&
    env.DB_USER &&
    env.DB_PASSWORD &&
    env.DB_NAME
  )
}

// Validate environment variables on module load
// This will throw if validation fails, causing the app to fail fast
try {
  getEnv()
} catch (error) {
  // In development, log the error but don't crash
  // In production, we want to fail fast
  if (process.env.NODE_ENV === 'production') {
    console.error('Fatal: Environment variable validation failed:', error)
    process.exit(1)
  } else {
    console.warn('Environment variable validation warning:', error)
  }
}

