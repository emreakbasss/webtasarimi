import React, { useMemo, useState } from 'react'

const TABS=[
  {key:'challenges', label:'Sosyal Challenge'},
  {key:'minigames', label:'Mini Oyunlar'},
]

function TabNav({active,onChange}){
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {TABS.map(t=> (
        <button key={t.key} className={`btn ${active===t.key?'':'btn-outline'}`} onClick={()=>onChange(t.key)}>{t.label}</button>
      ))}
    </div>
  )
}

function Challenges(){
  return (
    <div className="card" style={{padding:12}}>
      <img src="/assets/promo/you-model.jpg" alt="YOU Modeli" style={{width:'100%',height:'auto',borderRadius:12}}/>
    </div>
  )
}

function MiniGames(){
  return (
    <>
      <div className="grid grid-2">
        <div className="card" style={{padding:16}}>
          <h3 style={{marginTop:0}}>Electric‑Free Hair</h3>
          <p className="muted">Saçı elektriklenmeden düzeltmeye çalış – germanyum teması.</p>
          <button className="btn">Oyna</button>
        </div>
        <div className="card" style={{padding:16}}>
          <h3 style={{marginTop:0}}>Clutch Catch</h3>
          <p className="muted">Sanal clutch'ı yakala – ödül kazan.</p>
          <button className="btn">Oyna</button>
        </div>
      </div>
      <div className="card" style={{padding:12,marginTop:16}}>
        <img src="/assets/promo/before-after.jpg" alt="Before After Germanyum" style={{width:'100%',height:'auto',borderRadius:12}}/>
      </div>
    </>
  )
}

export default function FunLab(){
  const initialTab=(()=>{
    const qs=new URLSearchParams(window.location.hash.split('?')[1]||'')
    return qs.get('tab')||'challenges'
  })()
  const [tab,setTab]=useState(initialTab)
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 style={{margin:0,fontSize:36}}>FUN LAB</h1>
          <p className="muted" style={{marginTop:8}}>Challenge'lar ve mini oyunlar.</p>
          <div style={{marginTop:16}}><TabNav active={tab} onChange={setTab}/></div>
          <div style={{marginTop:16}}>
            {tab==='challenges' && <Challenges/>}
            {tab==='minigames' && <MiniGames/>}
          </div>
        </div>
      </section>
    </main>
  )
}


