'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { Map, ShieldCheck, Building2, Landmark, Search, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

type Category =
    | 'insurance'
    | 'mutual'
    | 'government'
    | 'municipality'
    | 'corporate'
    | 'tpa'

interface Guarantor {
    name: string
    category: Category
    description: string
}

const categories: Array<{ id: Category | 'all'; label: string; color: string }> = [
    { id: 'all', label: 'All Partners', color: 'bg-primary' },
    { id: 'insurance', label: 'Insurance', color: 'bg-primary/80' },
    { id: 'tpa', label: 'TPA & Assistance', color: 'bg-[#00A651]/80' },
    { id: 'mutual', label: 'Mutual Funds', color: 'bg-accent/70' },
    { id: 'government', label: 'Government', color: 'bg-[#c41e3a]/80' },
    { id: 'municipality', label: 'Municipalities', color: 'bg-[#8c6239]/80' },
    { id: 'corporate', label: 'Corporate', color: 'bg-[#2563eb]/70' },
]

const guarantors: Guarantor[] = [
    { name: 'Adir Insurance & Reinsurance', category: 'insurance', description: 'Comprehensive coverage plans' },
    { name: 'AFHIL', category: 'mutual', description: 'Healthcare mutual fund' },
    { name: 'Ajial Mutual Fund', category: 'mutual', description: 'Education focused mutual fund' },
    { name: 'Al Aman Takaful', category: 'insurance', description: 'Takaful insurance programs' },
    { name: 'Al Nisr', category: 'insurance', description: 'Regional insurance provider' },
    { name: 'ALICO', category: 'insurance', description: 'Life & medical insurance' },
    { name: 'Alig', category: 'insurance', description: 'International insurance partner' },
    { name: 'Amana', category: 'insurance', description: 'Takaful health coverage' },
    { name: 'Arabia Insurance Company', category: 'insurance', description: 'General & health insurance' },
    { name: 'Arope Insurance', category: 'insurance', description: 'Bank assurance partner' },
    { name: 'Assalam', category: 'insurance', description: 'Sharia-compliant coverage' },
    { name: 'Assurex', category: 'insurance', description: 'Corporate insurance plans' },
    { name: 'AXA Middle East', category: 'insurance', description: 'Global health coverage' },
    { name: 'AXA ME Libano-Suisse', category: 'insurance', description: 'Joint venture partnership' },
    { name: 'Bankers', category: 'insurance', description: 'General insurance solutions' },
    { name: 'Banque Du Liban', category: 'corporate', description: 'Central bank employees program' },
    { name: 'Berytus Insurance & Reinsurance', category: 'insurance', description: 'Specialty insurance services' },
    { name: 'Best Assistance', category: 'tpa', description: 'Claims administration services' },
    { name: 'Burgan Insurance Company', category: 'insurance', description: 'Regional insurance network' },
    { name: 'C.L.A (Credit Libanais Assurance)', category: 'insurance', description: 'Bank insurance partner' },
    { name: 'Capital Insurance & Reinsurance', category: 'insurance', description: 'Corporate coverage' },
    { name: 'Commercial Insurance', category: 'insurance', description: 'Retail & corporate plans' },
    { name: 'Compass', category: 'tpa', description: 'Third party administrator' },
    { name: 'Continental Trust Insurance', category: 'insurance', description: 'International coverage' },
    { name: 'Cumberland', category: 'insurance', description: 'Reinsurance partner' },
    { name: 'Fidelity', category: 'insurance', description: 'Employee benefits' },
    { name: 'Globemed', category: 'tpa', description: 'Managed care services' },
    { name: 'Health Care Society', category: 'mutual', description: 'Community mutual fund' },
    { name: 'Imdad', category: 'mutual', description: 'Healthcare support fund' },
    { name: 'Inaya', category: 'tpa', description: 'Claims administrator' },
    { name: 'La Medical', category: 'insurance', description: 'Medical insurance' },
    { name: 'La Phénicienne', category: 'insurance', description: 'Historic insurer' },
    { name: 'Leaders Insurance & Reinsurance', category: 'insurance', description: 'Corporate solutions' },
    { name: 'LIA / Libano Arab', category: 'insurance', description: 'Regional health plans' },
    { name: 'Libano-Suisse', category: 'insurance', description: 'Comprehensive coverage' },
    { name: 'Liberty Insurance', category: 'insurance', description: 'International partner' },
    { name: 'Mashrek', category: 'insurance', description: 'Northern region coverage' },
    { name: 'MedGulf', category: 'insurance', description: 'Large regional insurer' },
    { name: 'MedNet', category: 'tpa', description: 'TPA - Mother Company' },
    { name: 'MedCam', category: 'tpa', description: 'Healthcare network administrator' },
    { name: 'Medical Express', category: 'tpa', description: 'Medical assistance services' },
    { name: 'Medicar', category: 'tpa', description: 'Claims & assistance' },
    { name: 'Nation Union', category: 'insurance', description: 'Regional coverage' },
    { name: 'NextCare', category: 'tpa', description: 'Digital claims platform' },
    { name: 'North Assurance', category: 'insurance', description: 'Northern Lebanon coverage' },
    { name: 'Olivier', category: 'insurance', description: 'Corporate insurance' },
    { name: 'SNA', category: 'insurance', description: 'Life & medical plans' },
    { name: 'Trust Insurance Company', category: 'insurance', description: 'International coverage' },
    { name: 'UCA - United Commercial Assurance', category: 'insurance', description: 'Commercial coverage' },
    { name: 'Victoire', category: 'insurance', description: 'Heritage insurer' },
    { name: 'General Security Forces', category: 'government', description: 'State security coverage' },
    { name: 'Internal Security Forces', category: 'government', description: 'Public safety coverage' },
    { name: 'Lebanese Army', category: 'government', description: 'Military medical program' },
    { name: 'Ministry of Public Health', category: 'government', description: 'National healthcare support' },
    { name: 'National Social Security Fund (NSSF)', category: 'government', description: 'Social security coverage' },
    { name: 'Customs Department', category: 'government', description: 'Government employees program' },
    { name: 'General Security', category: 'government', description: 'Government agency coverage' },
    { name: 'MEA', category: 'corporate', description: 'Airline employees program' },
    { name: 'Pepsi Cola', category: 'corporate', description: 'Corporate health program' },
    { name: 'Casino Du Liban', category: 'corporate', description: 'Entertainment sector coverage' },
    { name: 'Regie Co.', category: 'corporate', description: 'Public sector entity' },
    { name: 'Ghobeiry Municipality', category: 'municipality', description: 'Local municipality program' },
    { name: 'Hart Hreik Municipality', category: 'municipality', description: 'Municipal employees coverage' },
    { name: 'Municipality of Beirut', category: 'municipality', description: 'Capital city coverage' },
    { name: 'Borj El Barajneh Municipality', category: 'municipality', description: 'Municipal coverage' },
]

const categoryMeta: Record<Category, { icon: ReactNode; label: string }> = {
    insurance: {
        label: 'Insurance Companies',
        icon: <ShieldCheck className="w-5 h-5" />,
    },
    government: {
        label: 'Government & Forces',
        icon: <Landmark className="w-5 h-5" />,
    },
    municipality: {
        label: 'Municipal Partners',
        icon: <Building2 className="w-5 h-5" />,
    },
    corporate: {
        label: 'Corporate Programs',
        icon: <Users className="w-5 h-5" />,
    },
    mutual: {
        label: 'Mutual Funds',
        icon: <ShieldCheck className="w-5 h-5" />,
    },
    tpa: {
        label: 'TPA & Assistance',
        icon: <Map className="w-5 h-5" />,
    },
}

export default function InsuranceNetwork({ lang = 'en' }: { lang?: string }) {
    const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredGuarantors = useMemo(() => {
        return guarantors.filter((g) => {
            const matchesCategory = activeCategory === 'all' || g.category === activeCategory
            const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [activeCategory, searchTerm])

    const categoryCounts = useMemo(() => {
        return guarantors.reduce(
            (acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1
                return acc
            },
            {} as Record<Category, number>
        )
    }, [])

    return (
        <section className="mt-16">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/20 px-4 py-2 font-semibold text-primary">
                    <Map className="h-5 w-5" />
                    {lang === 'ar' ? 'شبكة الضامنين' : 'Approved Guarantor Network'}
                </div>
                <h2 className="mt-4 text-3xl font-bold text-text-primary">
                    {lang === 'ar' ? 'أفضل شركات التأمين والضامنين' : 'Trusted Insurance & Guarantor Network'}
                </h2>
                <p className="mt-2 text-text-secondary">
                    {lang === 'ar'
                        ? 'شبكة واسعة من شركات التأمين، الصناديق التعاونية، المؤسسات الحكومية والبلديات لضمان راحة مرضانا.'
                        : 'A vibrant network of insurance companies, mutual funds, government bodies, and municipalities ensuring seamless coverage.'}
                </p>
            </div>

            {/* Network Map */}
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-warm-gray/40 bg-gradient-to-br from-cream via-background to-cream p-6">
                <div className="absolute inset-0 opacity-20 pattern-geometric" />
                <div className="relative grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur">
                        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                            {lang === 'ar' ? 'شبكة الضامنين' : 'Network Overview'}
                        </p>
                        <h3 className="mt-2 text-4xl font-bold text-primary">{guarantors.length}</h3>
                        <p className="text-text-secondary">
                            {lang === 'ar' ? 'ضامن معتمد' : 'Approved partners'}
                        </p>
                        <div className="mt-6 space-y-3">
                            {Object.entries(categoryCounts).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between text-sm text-text-secondary">
                                    <div className="flex items-center gap-2">
                                        {categoryMeta[key as Category].icon}
                                        <span>{categoryMeta[key as Category].label}</span>
                                    </div>
                                    <span className="font-semibold text-text-primary">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary-light/10 p-6">
                            <div className="absolute inset-0 opacity-10 pattern-geometric" />
                            <div className="relative grid h-full w-full grid-cols-3 grid-rows-2 gap-4">
                                {categories
                                    .filter((cat) => cat.id !== 'all')
                                    .map((cat, index) => (
                                        <div
                                            key={cat.id}
                                            className={cn(
                                                'group relative flex flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/70 p-4 text-center shadow-md backdrop-blur transition-all hover:scale-105',
                                                index % 2 === 0 ? 'row-span-1' : 'row-span-1 col-span-1'
                                            )}
                                        >
                                            <div className={cn('mb-3 h-12 w-12 rounded-2xl text-white flex items-center justify-center shadow-lg', cat.color)}>
                                                {categoryMeta[(cat.id as Category)]?.icon || <ShieldCheck className="w-5 h-5" />}
                                            </div>
                                            <p className="font-semibold text-text-primary">{cat.label}</p>
                                            <p className="text-sm text-text-secondary">
                                                {categoryCounts[cat.id as Category] || 0} {lang === 'ar' ? 'شريك' : 'partners'}
                                            </p>
                                            <div className="absolute inset-0 -z-10 scale-110 rounded-2xl border-2 border-transparent group-hover:border-primary/40 transition-all" />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={lang === 'ar' ? 'ابحث عن ضامن...' : 'Search a guarantor...'}
                        className="w-full rounded-xl border border-warm-gray bg-white py-3 pl-12 pr-4 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id as Category | 'all')}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                                activeCategory === cat.id
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-primary-light/10 text-text-primary hover:bg-primary-light/20'
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Guarantor Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredGuarantors.map((g) => (
                    <div key={g.name} className="card-warm group relative border border-transparent transition-all hover:-translate-y-1 hover:border-primary/20">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-lg font-semibold text-text-primary">{g.name}</p>
                                <p className="text-sm text-text-secondary">{g.description}</p>
                            </div>
                            <span
                                className={cn(
                                    'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white',
                                    categories.find((c) => c.id === g.category)?.color || 'bg-primary'
                                )}
                            >
                                {categoryMeta[g.category].label}
                            </span>
                        </div>
                    </div>
                ))}
                {filteredGuarantors.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-dashed border-warm-gray/60 bg-white/40 p-8 text-center text-text-secondary">
                        {lang === 'ar' ? 'لم يتم العثور على ضامن مطابق.' : 'No guarantors match your search.'}
                    </div>
                )}
            </div>
        </section>
    )
}

