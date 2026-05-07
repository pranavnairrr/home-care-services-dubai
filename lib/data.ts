export const WHATSAPP_NUMBER = '971565367442'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const PHONE_NUMBER = '+971 56 536 7442'

export const COUNTRIES = [
  'Afghanistan', 'Australia', 'Bahrain', 'Bangladesh', 'Canada',
  'Egypt', 'Ethiopia', 'Fiji', 'Ghana', 'India', 'Iraq', 'Jordan',
  'Kenya', 'Kuwait', 'Maldives', 'Mauritius', 'Mozambique', 'Myanmar',
  'Nepal', 'New Zealand', 'Nigeria', 'Oman', 'Pakistan', 'Qatar',
  'Rwanda', 'Saudi Arabia', 'Somalia', 'South Africa', 'Sri Lanka',
  'Sudan', 'Tanzania', 'Uganda', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Yemen', 'Zambia', 'Zimbabwe',
]

export const COUNTRY_ISO_CODES: Record<string, string> = {
  AF: 'Afghanistan',   AU: 'Australia',             BH: 'Bahrain',
  BD: 'Bangladesh',    CA: 'Canada',                EG: 'Egypt',
  ET: 'Ethiopia',      FJ: 'Fiji',                  GH: 'Ghana',
  IN: 'India',         IQ: 'Iraq',                  JO: 'Jordan',
  KE: 'Kenya',         KW: 'Kuwait',                MV: 'Maldives',
  MU: 'Mauritius',     MZ: 'Mozambique',            MM: 'Myanmar',
  NP: 'Nepal',         NZ: 'New Zealand',           NG: 'Nigeria',
  OM: 'Oman',          PK: 'Pakistan',              QA: 'Qatar',
  RW: 'Rwanda',        SA: 'Saudi Arabia',          SO: 'Somalia',
  ZA: 'South Africa',  LK: 'Sri Lanka',             SD: 'Sudan',
  TZ: 'Tanzania',      UG: 'Uganda',                AE: 'United Arab Emirates',
  GB: 'United Kingdom', US: 'United States',        YE: 'Yemen',
  ZM: 'Zambia',        ZW: 'Zimbabwe',
}

export const COUNTRY_DIAL_CODES: Record<string, string> = {
  Afghanistan:          '+93',  Australia:     '+61',   Bahrain:      '+973',
  Bangladesh:           '+880', Canada:        '+1',    Egypt:        '+20',
  Ethiopia:             '+251', Fiji:          '+679',  Ghana:        '+233',
  India:                '+91',  Iraq:          '+964',  Jordan:       '+962',
  Kenya:                '+254', Kuwait:        '+965',  Maldives:     '+960',
  Mauritius:            '+230', Mozambique:    '+258',  Myanmar:      '+95',
  Nepal:                '+977', 'New Zealand': '+64',   Nigeria:      '+234',
  Oman:                 '+968', Pakistan:      '+92',   Qatar:        '+974',
  Rwanda:               '+250', 'Saudi Arabia':'+966',  Somalia:      '+252',
  'South Africa':       '+27',  'Sri Lanka':   '+94',   Sudan:        '+249',
  Tanzania:             '+255', Uganda:        '+256',  'United Arab Emirates': '+971',
  'United Kingdom':     '+44',  'United States':'+1',   Yemen:        '+967',
  Zambia:               '+260', Zimbabwe:      '+263',
}

export interface CareService {
  iconKey: string
  name: string
  description: string
}

export const CARE_SERVICES: CareService[] = [
  {
    iconKey: 'elderly',
    name: 'Elderly Care',
    description: 'Daily support, companionship & medical monitoring for aging parents',
  },
  {
    iconKey: 'surgery',
    name: 'Post-Surgery Recovery',
    description: 'Wound care, medication management & physiotherapy after discharge',
  },
  {
    iconKey: 'maternity',
    name: 'Newborn & Maternity Care',
    description: 'Expert postnatal support and newborn care from day one',
  },
  {
    iconKey: 'physio',
    name: 'Physiotherapy at Home',
    description: 'Personalised recovery plans — no clinic visits needed',
  },
  {
    iconKey: 'doctor',
    name: 'Doctor on Call',
    description: 'DHA-certified physicians at your doorstep, day or night',
  },
  {
    iconKey: 'lab',
    name: 'Lab Tests at Home',
    description: 'Certified sample collection with fast, accurate results',
  },
]

export interface Caregiver {
  name: string
  role: string
  credentials: string
  experience: string
  specialty: string
  quote: string
  author: string
  area: string
  image: string
}

export const CAREGIVERS: Caregiver[] = [
  {
    name: 'Nurse Jelyn R.',
    role: 'Registered Nurse',
    credentials: 'DHA Licensed',
    experience: '8 years experience',
    specialty: 'Specialises in elderly care and post-surgical recovery',
    quote: 'Jelyn made us feel comfortable from day one.',
    author: 'Sarah M.',
    area: 'Downtown Dubai',
    image: '/images/caregivers/nurse-jelyn.jpg',
  },
  {
    name: 'Physio Rahul K.',
    role: 'Licensed Physiotherapist',
    credentials: 'MOH Certified',
    experience: '6 years experience',
    specialty: 'Specialises in stroke rehab and mobility recovery',
    quote: 'Rahul helped my father walk again in 6 weeks.',
    author: 'Ahmed A.',
    area: 'Mirdif',
    image: '/images/caregivers/physio-rahul.jpg',
  },
  {
    name: 'Nurse Ana P.',
    role: 'Maternity & Newborn Nurse',
    credentials: 'DHA Licensed',
    experience: '10 years experience',
    specialty: 'Specialises in postnatal care and newborn feeding support',
    quote: "Ana was a godsend. We didn't know what we were doing.",
    author: 'Priya N.',
    area: 'JLT',
    image: '/images/caregivers/nurse-ana.jpg',
  },
]

export interface Testimonial {
  text: string
  author: string
  area: string
  careType: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "My mother had a stroke and we were completely lost. The nurse arrived the same afternoon we called. Within two weeks, mum was mobile again. I genuinely don't know what we'd have done without them.",
    author: 'Fatima Al Rashidi',
    area: 'Jumeirah',
    careType: 'Elderly & Stroke Recovery Care',
  },
  {
    text: "As a first-time mum and expat with no family here, having a postnatal nurse at home for the first two weeks was the best decision we made. She was warm, patient, and incredibly knowledgeable.",
    author: 'Sophie Marchand',
    area: 'Marina',
    careType: 'Newborn & Maternity Care',
  },
  {
    text: 'My father came home after a hip replacement and we needed wound care and physio. The team coordinated everything and kept me updated daily. Exceptional service.',
    author: 'Rajan Nair',
    area: 'Mirdif',
    careType: 'Post-Surgery Recovery',
  },
]

export interface FAQ {
  question: string
  answer: string
}

export const FAQS: FAQ[] = [
  {
    question: 'Are your caregivers DHA licensed?',
    answer: 'Yes. Every nurse, physiotherapist, and doctor we provide holds an active DHA or MOH license. We verify credentials before every placement.',
  },
  {
    question: 'How quickly can a caregiver arrive?',
    answer: 'For urgent requests, we aim to have a caregiver at your door the same day — often within 4–6 hours of booking.',
  },
  {
    question: 'Do you serve all areas of Dubai?',
    answer: "Yes. We cover all major Dubai communities. WhatsApp us with your area and we'll confirm immediately.",
  },
  {
    question: 'Can I request a female caregiver?',
    answer: 'Absolutely. We accommodate all gender preferences and will confirm availability when you book.',
  },
  {
    question: "What's the difference between a nurse and a caregiver?",
    answer: 'A nurse is a licensed medical professional who handles clinical tasks — medication, wound care, injections. A caregiver provides non-medical support — companionship, daily routines, mobility assistance.',
  },
  {
    question: 'Can I hire on an hourly basis or only full-day?',
    answer: 'Both. We offer hourly, 8-hour, 12-hour, and 24-hour arrangements — built around your schedule, not ours.',
  },
]

export interface PricingTier {
  name: string
  detail: string
  price: string
  highlight?: boolean
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Hourly Care',
    detail: 'Flexible, on-demand · min. 4 hrs',
    price: 'AED 75 / hr',
  },
  {
    name: 'Daily Package',
    detail: '12-hour caregiver visit',
    price: 'AED 550 / day',
    highlight: true,
  },
  {
    name: 'Monthly Care Plan',
    detail: 'Dedicated caregiver, ongoing',
    price: 'Custom Quote',
  },
]

export const COVERAGE_AREAS = [
  'Downtown Dubai',
  'Dubai Marina',
  'JBR',
  'JLT',
  'Jumeirah',
  'Business Bay',
  'Al Barsha',
  'Mirdif',
  'Deira',
  'Bur Dubai',
  'Karama',
  'Silicon Oasis',
  'Arabian Ranches',
  'Palm Jumeirah',
  'DIFC',
  'Motor City',
  'Nad Al Sheba',
  'Discovery Gardens',
]

export const STATS = [
  { value: '500+', label: 'Families Served', icon: 'users' },
  { value: '4.9★', label: 'Google Rating', icon: 'star' },
  { value: '24/7', label: 'Availability', icon: 'clock' },
  { value: 'Same Day', label: 'Booking', icon: 'calendar' },
]

export const HOW_IT_WORKS_STEPS = [
  {
    num: '01',
    title: 'Tell Us What You Need',
    desc: 'Fill our short form or WhatsApp us directly. Takes under 2 minutes.',
  },
  {
    num: '02',
    title: 'We Match Your Caregiver',
    desc: 'We find the right licensed professional based on care type, language preference, and availability — same day.',
  },
  {
    num: '03',
    title: 'Care Begins at Home',
    desc: 'Your caregiver arrives, follows a personalised plan, and reports back to you. You stay in control.',
  },
]

export const DIFFERENTIATORS = [
  {
    icon: '⏱',
    title: 'Same-Day Booking',
    desc: 'Request care in the morning, have a caregiver at your door by afternoon. We confirm within 2 hours.',
  },
  {
    icon: '🌍',
    title: 'Multilingual Caregivers',
    desc: 'Our team speaks Arabic, English, Filipino, Hindi, and Malayalam — care that feels personal, not foreign.',
  },
  {
    icon: '📋',
    title: 'Personalised Care Plans',
    desc: "Every patient is different. We assess first, then build a care plan specific to your loved one's needs and schedule.",
  },
  {
    icon: '🛡',
    title: 'Fully DHA-Licensed & Insured',
    desc: "Every caregiver is government-licensed, background-checked, and covered — zero compromise on your family's safety.",
  },
]
