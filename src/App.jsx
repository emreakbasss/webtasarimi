import React from 'react'
import Router from './Router.jsx'
import Home from './pages/Home.jsx'
import Koleksiyon from './pages/Koleksiyon.jsx'
import Giris from './pages/Giris.jsx'
import Hesap from './pages/Hesap.jsx'
import Cuzdan from './pages/Cuzdan.jsx'
import Kayitli from './pages/Kayitli.jsx'
import Siparisler from './pages/Siparisler.jsx'
import Header from './components/Header.jsx'
import Clutch from './pages/Clutch.jsx'
import Ikonik from './pages/Ikonik.jsx'
import FunLab from './pages/FunLab.jsx'
import Element32 from './pages/Element32.jsx'

export default function App(){
  const routes={
    '/': Home,
    '/koleksiyon': Koleksiyon,
    '/giris': Giris,
    '/hesap': Hesap,
    '/cuzdan': Cuzdan,
    '/kayitli': Kayitli,
    '/siparisler': Siparisler,
    '/clutch': Clutch,
    '/ikonik': Ikonik,
    '/funlab': FunLab,
    '/element32': Element32,
  }
  const NotFound=()=> <main className="section"><div className="container"><h1>Sayfa bulunamadı</h1></div></main>
  return (
    <div>
      <Header/>
      <Router routes={routes} fallback={NotFound}/>
    </div>
  )
}
