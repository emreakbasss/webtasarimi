import React, { useState } from 'react'

function FallbackImage({base,alt}){
  const ext=['.jpeg','.jpg','.png','.webp']
  const capitalized=base.replace(/([^/]+)$/,(m)=> m.charAt(0).toUpperCase()+m.slice(1))
  const sources=[...ext.map(e=>base+e), ...ext.map(e=>capitalized+e)]
  const [idx,setIdx]=useState(0)
  const src=sources[idx]
  return (
    <img src={src} alt={alt} style={{width:'100%',height:'auto',display:'block',objectFit:'contain',background:'#fff'}} onError={()=>{
      if(idx < sources.length-1){ setIdx(idx+1) }
    }}/>
  )
}

export default function Element32(){
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="card shadow" style={{overflow:'hidden'}}>
            <div style={{padding:12}}>
              <FallbackImage base="/assets/element32/Element32" alt="Element 32"/>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}


