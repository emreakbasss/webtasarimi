import React, { useEffect, useState } from 'react'

function GroupCard({title,item}){
  return (
    <div className="card shadow" style={{overflow:'hidden'}}>
      <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',background:'rgba(192,192,192,.12)'}}>
        <div className="badge" style={{letterSpacing:'.15em'}}>{title}</div>
      </div>
      {item ? (
        <div>
          <div className="aspect-3-4">
            <img 
              className="img-rect" 
              src={item.img} 
              alt={item.name}
              style={{objectFit: 'contain', backgroundColor: '#f8f8f8'}}
            />
          </div>
          <div style={{padding:16}}>
            <div style={{fontWeight:600}}>{item.name}</div>
            {item.sub && <div className="muted" style={{marginTop:6,fontSize:12}}>{item.sub}</div>}
            {item.sub2 && <div className="muted" style={{marginTop:4,fontSize:12}}>{item.sub2}</div>}
          </div>
        </div>
      ) : (
        <div style={{padding:24}} className="muted">Yakında</div>
      )}
    </div>
  )
}

export default function YouCategories(){
  const [list,setList]=useState([])
  useEffect(()=>{
    fetch('/assets/collection/manifest.json')
      .then(r=>r.ok?r.json():[])
      .then(arr=>{ if(Array.isArray(arr)) setList(arr) })
      .catch(()=>setList([]))
  },[])

  const byName=(name)=> list.find(it=>it.name===name)

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-4">
          <GroupCard title="Davet & Özel Gün" item={byName('Aurora GM-01A')}/>
          <GroupCard title="Spor & Günlük" item={byName('Drift GM-09D')}/>
          <GroupCard title="Şehir & Trendy" item={byName('Element32 GM-13E32')}/>
          <GroupCard title="Kozmik & Deneyimsel" item={null}/>
        </div>
      </div>
    </section>
  )
}



