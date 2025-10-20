import React, { useState } from 'react'

function SmartImage({sources,alt}){
  const [idx,setIdx]=useState(0)
  const src=sources[idx]
  return (
    <img src={src} alt={alt} style={{width:'100%',height:'auto',display:'block',objectFit:'contain',background:'#f3f3f3'}} onError={()=>{
      if(idx < sources.length-1){ setIdx(idx+1) }
    }}/>
  )
}

function HeroBlock({sources,alt,heading,sub}){
  return (
    <section className="section">
      <div className="container grid grid-2" style={{alignItems:'center',gap:24}}>
        <div className="card shadow" style={{overflow:'hidden'}}>
          <div style={{padding:12,background:'#fff'}}>
            <SmartImage sources={sources} alt={alt}/>
          </div>
        </div>
        <div>
          <h2 style={{margin:0,fontSize:36}}>{heading}</h2>
          <p className="muted" style={{marginTop:8}}>{sub}</p>
        </div>
      </div>
    </section>
  )
}

export default function Clutch(){
  return (
    <main>
      <HeroBlock sources={["./assets/clutch/fusion-mirage.jpeg","./assets/clutch/fusion-mirage.jpg","./assets/clutch/fusion-mirage.png"]} alt="YOU FUSION MIRAGE" heading="YOU FUSION MIRAGE" sub="Prestiji yanına al"/>
      <HeroBlock sources={["./assets/clutch/mirage-clutch.jpeg","./assets/clutch/mirage-clutch.jpg","./assets/clutch/mirage-clutch.png"]} alt="YOU MIRAGE CLUTCH" heading="YOU MIRAGE CLUTCH" sub="Germanyum'un ışıltısıyla yansıyan prestij"/>
    </main>
  )
}


