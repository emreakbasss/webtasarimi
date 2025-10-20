import React from 'react'

export default function Giris(){
  return (
    <main className="section">
      <div className="container" style={{maxWidth:440}}>
        <h1 style={{margin:0,fontSize:28}}>Giriş Yap</h1>
        <p className="muted" style={{marginTop:8}}>E-posta ile giriş yapın.</p>
        <form style={{marginTop:16,display:'grid',gap:12}} onSubmit={(e)=>{e.preventDefault();alert('Giriş akışı eklenecek')}}>
          <label>
            <div className="muted" style={{fontSize:12,marginBottom:6}}>E‑posta</div>
            <input type="email" required style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',borderRadius:12}}/>
          </label>
          <label>
            <div className="muted" style={{fontSize:12,marginBottom:6}}>Şifre</div>
            <input type="password" required style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border)',borderRadius:12}}/>
          </label>
          <button className="btn" type="submit">Giriş Yap</button>
        </form>
      </div>
    </main>
  )
}


