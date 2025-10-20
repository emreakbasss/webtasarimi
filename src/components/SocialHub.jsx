import React from 'react'
import InstagramIcon from '../icons/InstagramIcon.jsx'
import TikTokIcon from '../icons/TikTokIcon.jsx'
import ChevronRightIcon from '../icons/ChevronRightIcon.jsx'

function SocialButton({href,label,Icon}){
  return <a href={href} target="_blank" rel="noreferrer" className="btn btn-outline" style={{gap:8}}><Icon/> {label}</a>
}

function SocialCard({platform,handle,cover,href,cta}){
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card hover-scale">
      <div className="aspect-16-9"><img src={cover} alt={platform} className="img-rect"/></div>
      <div style={{padding:16}}>
        <div className="badge">{platform}</div>
        <div style={{fontSize:18,fontWeight:600}}>{handle}</div>
        <div style={{marginTop:8,textDecoration:'underline',display:'inline-flex',alignItems:'center',gap:8}}>{cta} <ChevronRightIcon/></div>
      </div>
    </a>
  )
}

export default function SocialHub(){
  return (
    <section id="social" className="section">
      <div className="container">
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:16}}>
          <h3 style={{fontSize:32,margin:0}}>Instagram & TikTok</h3>
          <div style={{display:'flex',gap:8}}>
            <SocialButton href="https://instagram.com/" label="Instagram" Icon={InstagramIcon}/>
            <SocialButton href="https://www.tiktok.com/" label="TikTok" Icon={TikTokIcon}/>
          </div>
        </div>
        <div className="grid grid-2">
          <SocialCard platform="Instagram" handle="@you.brand" cover="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1400&auto=format&fit=crop" href="https://instagram.com/" cta="Instagram'da Gör"/>
          <SocialCard platform="TikTok" handle="@you.brand" cover="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop" href="https://www.tiktok.com/" cta="TikTok'ta Gör"/>
        </div>
      </div>
    </section>
  )
}
