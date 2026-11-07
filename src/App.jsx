import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import TechStackSection from './components/TechStackSection'
import WhyUsSection from './components/WhyUsSection'
import FooterSection from './components/FooterSection'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <WhyUsSection />
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  )
}
