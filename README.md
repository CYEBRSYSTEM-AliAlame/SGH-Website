# Sahel General Hospital Website

Modern Next.js 16 website for Sahel General Hospital, built with TypeScript, Tailwind CSS v4, and optimized for AWS Amplify.

## Tech Stack

- **Framework:** Next.js 16 (React Server Components & App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono
- **Database:** MySQL (via mysql2)
- **Hosting:** AWS Amplify

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- MySQL database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your database credentials and configuration.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
SGH-Website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [lang]/      # Language-specific routes (en, ar)
│   │   └── api/         # API routes
│   ├── components/      # React components
│   ├── lib/            # Utilities and helpers
│   ├── services/       # Business logic services
│   ├── data/           # JSON data files
│   ├── styles/         # Global styles
│   └── types/          # TypeScript types
├── public/             # Static assets
│   ├── images/        # Image files
│   └── assets/        # Other assets
└── amplify.yml        # AWS Amplify configuration
```

## Deployment to AWS Amplify

1. Connect your repository to AWS Amplify
2. Configure environment variables in Amplify Console
3. Build settings are automatically configured via `amplify.yml`
4. Deploy!

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without building

## Features

- ✅ Server-Side Rendering (SSR)
- ✅ API Routes
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Responsive Design
- ✅ SEO Optimized
- ✅ Image Optimization
- ✅ Database Integration
- ✅ AWS Amplify Ready

## License

Private - Sahel General Hospital

