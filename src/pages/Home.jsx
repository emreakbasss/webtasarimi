import React from 'react'
import Hero from '../components/Hero.jsx'
import CategoryBar from '../components/CategoryBar.jsx'
import YouCategories from '../components/YouCategories.jsx'
import Collections from '../components/Collections.jsx'
// StandShowcase kaldırıldı
import SocialHub from '../components/SocialHub.jsx'
import Footer from '../components/Footer.jsx'

export default function Home(){
  return (
    <main>
      <CategoryBar/>
      <Hero/>
      <YouCategories/>
      <Collections/>
      <SocialHub/>
      <Footer/>
    </main>
  )
}


