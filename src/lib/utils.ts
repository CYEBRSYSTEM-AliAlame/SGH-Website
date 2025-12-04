import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getRootPath(): string {
  return process.env.NEXT_PUBLIC_ROOT_PATH || 'http://localhost:3000'
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${getRootPath()}${path.startsWith('/') ? path : `/${path}`}`
}
