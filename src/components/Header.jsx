import React, { useState, useEffect } from 'react'

function MenuGroup({title,items,boxed=false}){
  return (
    <div className="min-w-[220px]">
      <div className="text-neutral-600 text-xs uppercase tracking-wider mb-2">
        <span className={boxed? 'inline-block border border-neutral-300 rounded-md px-3 py-1' : ''}>{title}</span>
      </div>
      <ul className="space-y-1">
        {items.map((it)=> (
          <li key={it.label}>
            <a href={it.href} className={boxed? 'block text-center px-3 py-2 rounded-md border border-neutral-200 hover:border-brand hover:text-brand' : 'block px-3 py-2 rounded-lg hover:bg-neutral-100'}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function IconUser(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c1.5-3.5 5-5 8-5s6.5 1.5 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  )
}

function IconMenu(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  )
}

function IconCart(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h2l2.4 9.6a2 2 0 0 0 2 1.4h6.7a2 2 0 0 0 1.9-1.5L20 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" fill="currentColor"/><circle cx="17" cy="20" r="1.5" fill="currentColor"/></svg>
  )
}

function IconSearch(){
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  )
}

export default function Header(){
  const [open,setOpen]=useState(false)
  const [accountOpen,setAccountOpen]=useState(false)
  const [searchOpen,setSearchOpen]=useState(false)
  const [contactOpen,setContactOpen]=useState(false)
  
  // Menu stays open until manually closed
  // Removed scroll event listener for better UX
  
  const onSearch=(e)=>{
    e.preventDefault()
    const q=new FormData(e.currentTarget).get('q')?.toString().trim() || ''
    window.location.hash = `#/koleksiyon?q=${encodeURIComponent(q)}`
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200 shadow-header">
      {/* Single row header: centered logo */}
      <div className="container grid grid-cols-3 items-center py-2 sm:py-3">
        <div className="justify-self-start relative">
          <button className="text-xs sm:text-sm underline underline-offset-4" onClick={()=>setContactOpen(v=>!v)}>+ Contact Us</button>
          <div className={`${contactOpen?'opacity-100 translate-y-0 pointer-events-auto':'opacity-0 -translate-y-1 pointer-events-none'} transition absolute left-0 mt-2 w-72 bg-white border border-neutral-200 rounded-xl shadow-header p-3`} onMouseLeave={()=>setContactOpen(false)}>
            <div style={{fontSize:12,color:'var(--muted)'}}>Instagram</div>
            <div style={{padding:'6px 0',borderBottom:'1px solid var(--border)'}}>@</div>
            <div style={{fontSize:12,color:'var(--muted)',marginTop:8}}>İletişim Numarası</div>
            <div style={{padding:'6px 0'}}>+90</div>
          </div>
        </div>
        <a href="#/" className="justify-self-center flex items-center">
          <img src="./assets/logo-you1.png" alt="YOU" className="h-8 sm:h-10 md:h-12 lg:h-14" onError={(e)=>{e.currentTarget.style.display='none'}}/>
        </a>
        <div className="justify-self-end flex items-center gap-1 sm:gap-2 md:gap-3">
          <a href="#/sepet" aria-label="Sepetim" className="p-1 sm:p-2 hover:text-brand"><IconCart/></a>
          <div className="relative">
            <button className="p-1 sm:p-2 hover:text-brand" onClick={()=>setAccountOpen(v=>!v)} aria-label="Hesap"><IconUser/></button>
            <div className={`${accountOpen?'opacity-100 translate-y-0 pointer-events-auto':'opacity-0 -translate-y-1 pointer-events-none'} transition absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-header`}
                 onMouseLeave={()=>setAccountOpen(false)}>
              <ul className="py-2 text-sm">
                <li><a className="block px-4 py-2 hover:bg-neutral-100" href="#/giris">Giriş Yap</a></li>
                <li><a className="block px-4 py-2 hover:bg-neutral-100" href="#/siparisler">Siparişlerim</a></li>
                <li><a className="block px-4 py-2 hover:bg-neutral-100" href="#/hesap">Hesap Ayarları</a></li>
                <li><a className="block px-4 py-2 hover:bg-neutral-100" href="#/cuzdan">Cüzdanım</a></li>
                <li><a className="block px-4 py-2 hover:bg-neutral-100" href="#/kayitli">Kayıtlı Listeler</a></li>
              </ul>
            </div>
          </div>
          <button className="p-1 sm:p-2 hover:text-brand" aria-label="Ara" onClick={()=>setSearchOpen(v=>!v)}><IconSearch/></button>
          <button aria-label="Menü" className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-neutral-200 flex items-center gap-1 sm:gap-2" onClick={()=>setOpen(v=>!v)}>
            <IconMenu/> <span className="text-xs sm:text-sm">MENÜ</span>
          </button>
        </div>
      </div>
      {/* Secondary controls row removed per new layout */}
      {/* Mobile search popover */}
      {searchOpen && (
        <div className="border-t border-neutral-200 md:hidden">
          <div className="container py-2">
            <form onSubmit={(e)=>{onSearch(e);setSearchOpen(false)}} className="flex items-center gap-2 border border-neutral-300 rounded-xl px-3 py-2">
              <IconSearch/>
              <input name="q" placeholder="Arama" className="w-full outline-none"/>
              <button className="btn btn-outline" type="submit">Ara</button>
            </form>
          </div>
        </div>
      )}

      {/* Dropdown */}
      <div className={`${open? 'max-h-[900px] py-4 sm:py-6':'max-h-0'} overflow-hidden transition-all border-t border-neutral-200 bg-white/95 backdrop-blur shadow-header relative z-40`}> 
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <MenuGroup boxed title="ELEMENT 32" items={[
            {label:'Element 32', href:'#/element32'},
          ]}/>
          <MenuGroup boxed title="MIRROR KOLEKSİYONU" items={[
            {label:'YOU Gözlükleri', href:'#/koleksiyon'},
            {label:'Clutch & Kılıflar', href:'#/clutch'},
            {label:'İkonik Stiller', href:'#/ikonik'},
          ]}/>
          <MenuGroup boxed title="FUN LAB" items={[
            {label:'Sosyal Challenge', href:'#/funlab?tab=challenges'},
            {label:'Mini Oyunlar', href:'#/funlab?tab=minigames'},
          ]}/>
          <MenuGroup boxed title="YOU CLUB" items={[
            {label:'YOU Deneyimine Katıl', href:'#/giris'},
          ]}/>
        </div>
      </div>
    </header>
  )
}


