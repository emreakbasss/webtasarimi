import React from 'react'

export default function Cuzdan(){
  return (
    <main className="section">
      <div className="container">
        <h1 style={{margin:0,fontSize:28}}>Cüzdan</h1>
        <p className="muted" style={{marginTop:8}}>Bakiye ve kuponlarınızı burada yönetin.</p>
        <div className="grid grid-2" style={{marginTop:16}}>
          <div className="card" style={{padding:16}}>
            <div className="muted">Bakiye</div>
            <div style={{fontSize:28,marginTop:8}}><strong className="brand-text">₺0,00</strong></div>
          </div>
          <div className="card" style={{padding:16}}>
            <div className="muted">Kuponlar</div>
            <div style={{marginTop:8}}>Aktif kupon bulunmuyor.</div>
          </div>
        </div>
      </div>
    </main>
  )
}


