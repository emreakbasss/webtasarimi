import React, { useEffect, useMemo, useState } from 'react'

function useQuery(){
  const [q,setQ]=useState('')
  useEffect(()=>{
    const update=()=>{
      const hash=window.location.hash
      const queryPart=hash.split('?')[1] || ''
      const params=new URLSearchParams(queryPart)
      setQ(params.get('q') || '')
    }
    update()
    window.addEventListener('hashchange',update)
    return ()=>window.removeEventListener('hashchange',update)
  },[])
  return q
}

export default function Koleksiyon(){
  const q=useQuery()
  const [filter,setFilter]=useState('hepsi')
  const items=useMemo(()=>{
    const base=Array.from({length:20}).map((_,i)=>({id:i+1,name:`Model ${i+1}`,color:i%2===0?'bordo':'gri'}))
    const byFilter=filter==='hepsi'?base:base.filter(it=>it.color===filter)
    const byQuery=q?byFilter.filter(it=>it.name.toLowerCase().includes(q.toLowerCase())):byFilter
    return byQuery
  },[filter,q])
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 style={{margin:0,fontSize:36}}>Gözlük Koleksiyonu</h1>
          <p className="muted" style={{marginTop:8}}>Arama ve basit renk filtresi (bordo/gri) eklendi.</p>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12,flexWrap:'wrap'}}>
            <div className="badge">Filtre</div>
            <button className="btn btn-outline" onClick={()=>setFilter('hepsi')}>Hepsi</button>
            <button className="btn btn-outline" onClick={()=>setFilter('bordo')}>Bordo</button>
            <button className="btn btn-outline" onClick={()=>setFilter('gri')}>Gri</button>
            {q && <span className="muted">Arama: "{q}"</span>}
          </div>
          <div className="grid grid-4" style={{marginTop:16}}>
            {items.map((it)=> (
              <div key={it.id} className="card hover-scale">
                <div className="aspect-3-4">
                  <img className="img-rect" src={`https://picsum.photos/seed/you-${it.id}/600/800`} alt={it.name}/>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px'}}>
                  <span>{it.name}</span>
                  <span className="brand-text" style={{textTransform:'capitalize'}}>{it.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}


