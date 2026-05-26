import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProperties } from '@/components/sections/FeaturedProperties'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <WhyChooseUs />
    </>
  )
}
