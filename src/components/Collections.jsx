import React, { useEffect, useState } from 'react'
import ChevronRightIcon from '../icons/ChevronRightIcon.jsx'

export default function Collections(){
  const [items,setItems]=useState([])
  useEffect(()=>{
    fetch('/assets/collection/manifest.json')
      .then(r=>r.ok?r.json():[])
      .then(list=>{ if(Array.isArray(list)) setItems(list) })
      .catch(()=>setItems([]))
  },[])

  return (
    <section id="collections" className="section">
      <div className="container">
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:16}}>
          <h2 style={{fontSize:32,margin:0}}>Gözlük Koleksiyonu</h2>
          <a className="muted" href="#">Tümünü gör</a>
        </div>
        <div className="grid grid-4">
          {items.map((it,i)=>(
            <a key={it.id||i} className="card hover-scale" href="#" aria-label={it.name}>
              <div className="aspect-3-4">
                <img className="img-rect" src={it.img} alt={it.name} onError={(e)=>{e.currentTarget.src='https://picsum.photos/600/800?grayscale&random='+(it.id||i)}}/>
              </div>
              <div style={{padding:'12px 14px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span>{it.name}</span>
                  <ChevronRightIcon/>
                </div>
                {it.sub && <div className="muted" style={{marginTop:6,fontSize:12}}>{it.sub}</div>}
                {it.sub2 && <div className="muted" style={{marginTop:4,fontSize:12}}>{it.sub2}</div>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
