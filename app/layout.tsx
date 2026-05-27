import type { Metadata, Viewport } from 'next';
import './globals.css';

const BASE_URL = 'https://yoga-studio.templates.seojack.website';

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: 'Serenity Yoga',
    description: 'Calming yoga-studio site with class schedule, instructor profiles, a new-student offer, workshops, and retreats.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Serenity Yoga',
        description: 'Calming yoga-studio site with class schedule, instructor profiles, a new-student offer, workshops, and retreats.',
        url: BASE_URL,
        siteName: 'Serenity Yoga',
        type: 'website',
        locale: 'en_GB',
        images: [{ url: 'https://cdn.seojack.website/templates/tpl_yoga_studio.avif', width: 1600, height: 1000 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Serenity Yoga',
        description: 'Calming yoga-studio site with class schedule, instructor profiles, a new-student offer, workshops, and retreats.',
        images: ['https://cdn.seojack.website/templates/tpl_yoga_studio.avif'],
    },
    robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#102a30' };

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'Serenity Yoga',
    description: 'Calming yoga-studio site with class schedule, instructor profiles, a new-student offer, workshops, and retreats.',
    url: BASE_URL,
    image: 'https://cdn.seojack.website/templates/tpl_yoga_studio.avif',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-GB">
            <body>
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </body>
        </html>
    );
}