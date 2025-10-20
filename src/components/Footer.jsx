import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <img src="./assets/logo-you1.png" alt="YOU" style={{height:20}} onError={(e)=>{e.currentTarget.style.display='none'}}/>
          <span className="muted">© {new Date().getFullYear()} <span className="brand-text">YOU</span></span>
        </div>
        <div className="muted" style={{fontSize:14}}>Gizlilik • Şartlar • İletişim</div>
      </div>
    </footer>
  )
}
