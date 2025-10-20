import React, { useEffect, useState } from 'react'

function GalleryItem({src,alt,title,sub}){
  return (
    <div className="card hover-scale">
      <div className="aspect-3-4">
        <img className="img-rect" src={src} alt={alt} />
      </div>
      {(title || sub) && (
        <div style={{padding:12}}>
          {title && <div style={{fontWeight:600}}>{title}</div>}
          {sub && <div className="muted" style={{fontSize:14,marginTop:4}}>{sub}</div>}
        </div>
      )}
    </div>
  )
}

export default function Ikonik(){
  const [images,setImages]=useState([])
  useEffect(()=>{
    fetch('/assets/ikonik/manifest.json').then(r=>r.ok?r.json():[]).then(list=>{
      if(Array.isArray(list)) setImages(list)
    }).catch(()=>setImages([]))
  },[])
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 style={{margin:0,fontSize:36}}>İkonik Stiller</h1>
          <div className="grid grid-4" style={{marginTop:16}}>
            {images.map((it,i)=>{
              const item = typeof it === 'string' ? {src: it} : it
              return <GalleryItem key={i} src={item.src} title={item.title} sub={item.sub} alt={item.title || `Ikonik ${i+1}`}/>
            })}
          </div>
        </div>
      </section>
    </main>
  )
}


