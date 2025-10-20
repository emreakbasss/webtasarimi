import React from 'react'
import BagIcon from '../icons/BagIcon.jsx'

export default function TopNav(){
  const onSearch=(e)=>{
    e.preventDefault()
    const q=new FormData(e.currentTarget).get('q')?.toString().trim() || ''
    const hash=window.location.hash
    const base=hash.startsWith('#/koleksiyon')?'#/koleksiyon':'#/'
    window.location.hash=`${base}?q=${encodeURIComponent(q)}`
  }

  return (
    <div className="nav">
      <div className="container nav-row">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src="./assets/anasayfa-logo.jpg" alt="YOU" style={{height:32}} onError={(e)=>{e.currentTarget.style.display='none'}}/>
          <strong className="brand-text">YOU</strong>
        </div>
        <nav className="nav-links">
          <a className="brand-text" href="#/">Anasayfa</a>
          <a className="brand-text" href="#/koleksiyon">Koleksiyon</a>
          <a className="brand-text" href="#/hesap">Hesap</a>
          <a className="brand-text" href="#/siparisler">Siparişler</a>
          <a className="brand-text" href="#/cuzdan">Cüzdan</a>
          <a className="brand-text" href="#/kayitli">Kayıtlı</a>
        </nav>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <form onSubmit={onSearch} style={{display:'flex',alignItems:'center',gap:8}}>
            <input name="q" placeholder="Ara" aria-label="Ara" style={{padding:'8px 10px',border:'1px solid var(--border)',borderRadius:12,width:180}}/>
            <button className="btn btn-outline" type="submit">Ara</button>
          </form>
          <button className="btn" onClick={()=>alert('Satın alma akışına bağlayın')}>
            <BagIcon/> <span>Satın Al</span>
          </button>
        </div>
      </div>
    </div>
  )
}
