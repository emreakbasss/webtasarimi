import React from 'react'

export default function Siparisler(){
  return (
    <main className="section">
      <div className="container">
        <h1 style={{margin:0,fontSize:28}}>Siparişlerim</h1>
        <p className="muted" style={{marginTop:8}}>Verdiğiniz siparişlerin listesi burada görünecek.</p>
        <div className="card" style={{padding:16,marginTop:16}}>
          <div className="muted">Henüz sipariş bulunmuyor.</div>
        </div>
      </div>
    </main>
  )
}


