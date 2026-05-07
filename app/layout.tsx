import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  title: 'Home Care Services in Dubai | DHA-Licensed Nurses & Caregivers',
  description:
    'Expert home care in Dubai — DHA-licensed nurses, physiotherapists & doctors at your door. Elderly care, post-surgery recovery, newborn care. Same-day booking. 500+ families served.',
  keywords:
    'home care Dubai, home nursing Dubai, DHA nurse Dubai, elderly care Dubai, post surgery care Dubai, newborn care Dubai, physiotherapy home Dubai, caregiver Dubai',
  authors: [{ name: 'AM Health Hub' }],
  robots: 'index, follow',
  other: {
    'geo.region': 'AE',
    'geo.placename': 'Dubai',
  },
  openGraph: {
    type: 'website',
    siteName: 'AM Health Hub',
    title: 'Home Care Services in Dubai | DHA-Licensed Nurses & Caregivers',
    description:
      'DHA-licensed nurses, physiotherapists & doctors at your door across Dubai. Elderly care, post-surgery recovery, newborn care. 500+ families served.',
    locale: 'en_US',
    images: [{ url: '/images/am-health-hub-logo.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Care Services Dubai | DHA-Licensed Caregivers',
    description: 'Expert home care in Dubai. DHA-licensed nurses & caregivers. Same-day booking.',
  },
  icons: {
    icon: '/images/am-health-hub-logo.png',
    apple: '/images/am-health-hub-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#004d40',
}

const GTM_ID = 'GTM-NHNKKJ3N'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AM Health Hub — Home Care Services Dubai',
  description: 'DHA-licensed home care services in Dubai — nurses, physiotherapists, and doctors at your door.',
  url: 'https://www.amhealthhub.com/',
  telephone: '+971565367442',
  areaServed: { '@type': 'City', name: 'Dubai' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are your caregivers DHA licensed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every nurse, physiotherapist, and doctor we provide holds an active DHA or MOH license. We verify credentials before every placement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can a caregiver arrive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For urgent requests, we aim to have a caregiver at your door the same day — often within 4–6 hours of booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve all areas of Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. We cover all major Dubai communities. WhatsApp us with your area and we'll confirm immediately.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request a female caregiver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We accommodate all gender preferences and will confirm availability when you book.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between a nurse and a caregiver?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A nurse is a licensed medical professional who handles clinical tasks — medication, wound care, injections. A caregiver provides non-medical support — companionship, daily routines, mobility assistance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I hire on an hourly basis or only full-day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both. We offer hourly, 8-hour, 12-hour, and 24-hour arrangements — built around your schedule, not ours.',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
