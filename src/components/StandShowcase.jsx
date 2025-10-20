import React, { useEffect, useRef } from 'react'

export default function StandShowcase(){
  const ref=useRef(null)
  useEffect(()=>{
    const el=ref.current
    const onScroll=()=>{
      const rect=el.getBoundingClientRect()
      const vh=window.innerHeight
      if(rect.top<vh && rect.bottom>0){ el.classList.add('scrolled') } else { el.classList.remove('scrolled') }
    }
    onScroll()
    window.addEventListener('scroll',onScroll,{passive:true})
    return ()=>window.removeEventListener('scroll',onScroll)
  },[])

  return (
    <section id="stand" className="section">
      <div className="container grid grid-2" style={{alignItems:'center'}}>
        <div>
          <div className="badge">Perakende Deneyimi</div>
          <h3 style={{fontSize:40,margin:'8px 0'}}>Mağaza Standı <span style={{fontWeight:300}}>→ Web</span> Geçişi</h3>
          <p className="muted">Fiziksel standınız, sayfada kaydırma ile <em>yumuşak bir maske animasyonu</em> eşliğinde görünür olur. Stand fotoğrafı ya da kısa bir tanıtım videosu ekleyebilirsiniz.</p>
          <ul className="muted" style={{marginTop:12}}>
            <li>• Scroll bazlı maske → dikkat çekici giriş efekti</li>
            <li>• Video/Foto destekli vitrin alanı</li>
            <li>• Ürün kartlarına hızlı bağlantı</li>
          </ul>
          <div style={{display:'flex',gap:12,marginTop:16}}>
            <a className="btn" href="#stand-video">Stand Tanıtımını İzle</a>
            <a className="btn btn-outline" href="#collections">Koleksiyona Git</a>
          </div>
        </div>
        <div>
          <div ref={ref} className="stand-wrap shadow" id="stand-video">
            <img src="/assets/stand.jpg" alt="YOU mağaza standı" className="img-rect" style={{height:520, width:'100%', display:'block', objectFit:'cover'}} onError={(e)=>{e.currentTarget.src='https://images.unsplash.com/photo-1512467657813-16c9f88b3f19?q=80&w=1600&auto=format&fit=crop'}}/>
            <div className="mask-layer"></div>
            <div style={{position:'absolute',left:16,bottom:16,display:'flex',alignItems:'center',gap:10}}>
              <img src="/assets/logo-you1.png" alt="YOU" style={{height:28,filter:'drop-shadow(0 2px 6px rgba(0,0,0,.2))'}} onError={(e)=>{e.currentTarget.style.display='none'}}/>
              <span style={{color:'#fff',background:'rgba(80,12,12,.75)',padding:'6px 10px',borderRadius:12,backdropFilter:'blur(6px)'}}>Mağaza vitrini</span>
            </div>
          </div>
          <p className="muted" style={{fontSize:12,marginTop:8}}>Yeni eklenen <em>stand.jpg</em> görseli markalı etiket ile gösteriliyor.</p>
        </div>
      </div>
    </section>
  )
}
