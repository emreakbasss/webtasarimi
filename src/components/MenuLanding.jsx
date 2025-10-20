import React from 'react'

function Tile({title,items,accent}){
  return (
    <div className="card hover-scale" style={{overflow:'hidden'}}> 
      <div style={{padding:16,borderBottom:'1px solid var(--border)',background:accent||'transparent'}}>
        <div className="badge" style={{textTransform:'uppercase'}}>{title}</div>
      </div>
      <div style={{padding:16,display:'grid',gap:8}}>
        {items.map((it)=> (
          <a key={it.label} href={it.href} className="btn btn-outline" style={{justifyContent:'center'}}>{it.label}</a>
        ))}
      </div>
    </div>
  )
}

export default function MenuLanding(){
  return (
    <section className="section alt-bg" aria-label="Menu Landing">
      <div className="container">
        <div className="grid grid-4">
          <Tile title="ELEMENT 32" items={[{label:'Element 32',href:'#/koleksiyon?q=element32'}]} accent="rgba(82,16,13,.05)"/>
          <Tile title="MIRROR KOLEKSİYONU" items={[{label:'YOU Gözlükleri',href:'#/koleksiyon'},{label:'Clutch & Kılıflar',href:'#/koleksiyon'},{label:'İkonik Stiller',href:'#/koleksiyon'}]}/>
          <Tile title="FUN LAB" items={[{label:'AR ile Deneyim',href:'#/koleksiyon'},{label:'Stil Testi',href:'#/koleksiyon'},{label:'Ayna Anları',href:'#/koleksiyon'},{label:'Mini Oyunlar',href:'#/koleksiyon'}]} accent="rgba(82,16,13,.05)"/>
          <Tile title="YOU CLUB" items={[{label:'YOU Deneyimine Katıl',href:'#/giris'}]}/>
        </div>
      </div>
    </section>
  )
}


