import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Patients | Sahel General Hospital',
}

export default async function PatientsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    redirect(`/${lang}/insurance`)
}
