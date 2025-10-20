import React from 'react'

export default function Kayitli(){
  return (
    <main className="section">
      <div className="container">
        <h1 style={{margin:0,fontSize:28}}>Kayıtlı Ürünler</h1>
        <p className="muted" style={{marginTop:8}}>Favori ürün listeniz burada görünecek.</p>
        <div className="card" style={{padding:16,marginTop:16}}>
          <div className="muted">Henüz favori yok.</div>
        </div>
      </div>
    </main>
  )
}


