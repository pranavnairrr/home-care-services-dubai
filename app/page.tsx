import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import SocialProofBar from '@/components/SocialProofBar'
import WhoIsItFor from '@/components/WhoIsItFor'
import CareServicesGrid from '@/components/CareServicesGrid'
import FloatingButtons from '@/components/FloatingButtons'
import MobileBottomBar from '@/components/MobileBottomBar'

const CaregiverProfiles    = dynamic(() => import('@/components/CaregiverProfiles'))
const StatsBar             = dynamic(() => import('@/components/StatsBar'))
const TestimonialsSection  = dynamic(() => import('@/components/TestimonialsSection'))
const PricingSection       = dynamic(() => import('@/components/PricingSection'))
const HowItWorks           = dynamic(() => import('@/components/HowItWorks'))
const CareQuiz             = dynamic(() => import('@/components/CareQuiz'))
const CoverageAreas        = dynamic(() => import('@/components/CoverageAreas'))
const FAQSection           = dynamic(() => import('@/components/FAQSection'))
const CTASection           = dynamic(() => import('@/components/CTASection'))
const Footer               = dynamic(() => import('@/components/Footer'))

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <SocialProofBar />
      <WhoIsItFor />
      <div id="services"><CareServicesGrid /></div>
      <div id="caregivers"><CaregiverProfiles /></div>
      <StatsBar />
      <TestimonialsSection />
      <div id="pricing"><PricingSection /></div>
      <HowItWorks />
      <CareQuiz />
      <div id="coverage"><CoverageAreas /></div>
      <div id="faq"><FAQSection /></div>
      <CTASection />
      <div className="h-16 lg:hidden" />
      <Footer />
      <MobileBottomBar />
      <FloatingButtons />
    </main>
  )
}
