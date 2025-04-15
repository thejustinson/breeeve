'use client'

import Hero from '@/components/LandingPage'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      
      <div className="flex-grow">
        <Hero />
        {/* Other sections will be added here */}
      </div>
      <Footer />
    </main>
  )
}