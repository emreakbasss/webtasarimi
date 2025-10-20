import React, { useEffect, useState } from 'react'
import ChevronRightIcon from '../icons/ChevronRightIcon.jsx'
import Toast from './Toast.jsx'

function Modal({isOpen, onClose, image, title, setToastMessage, setShowToast}){
  if (!isOpen) return null
  
  const getProductInfo = (title) => {
    const products = {
      'Aurora GM-01A': {
        price: '2.999',
        originalPrice: '3.499',
        discount: '14%',
        description: 'Şehir ışıkları gibi parlayan, davetlerin yıldızı.',
        features: ['Anti-stres teknoloji', 'Elektriklenmeyen saçlar', 'Premium malzeme'],
        colors: ['Bordo', 'Siyah', 'Kahverengi'],
        sizes: ['S (50)', 'M (54)']
      },
      'Drift GM-09D': {
        price: '2.799',
        originalPrice: '3.199',
        discount: '12%',
        description: 'Hafif ve özgür, hareketli günler için ideal.',
        features: ['Germanyum teknoloji', 'Hafif tasarım', 'Dayanıklı çerçeve'],
        colors: ['Gri', 'Siyah', 'Mavi'],
        sizes: ['S (50)', 'M (54)']
      },
      'Element32 GM-13E32': {
        price: '3.299',
        originalPrice: '3.799',
        discount: '13%',
        description: 'Germanyum gücüyle şehirde fark yarat.',
        features: ['Element 32 teknoloji', 'Gün boyu rahatlık', 'Stres azaltıcı'],
        colors: ['Bordo', 'Siyah', 'Altın'],
        sizes: ['S (50)', 'M (54)']
      }
    }
    return products[title] || {
      price: '2.999',
      originalPrice: '3.499',
      discount: '14%',
      description: 'Premium gözlük koleksiyonu',
      features: ['Premium malzeme', 'Kaliteli işçilik', 'Modern tasarım'],
      colors: ['Bordo', 'Siyah'],
      sizes: ['S (50)', 'M (54)']
    }
  }
  
  const product = getProductInfo(title)
  
  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
             <div
               className="relative w-full max-w-5xl max-h-[98vh] bg-white rounded-2xl shadow-2xl overflow-y-auto flex flex-col lg:flex-row modal-responsive"
               onClick={(e) => e.stopPropagation()}
             >
        <button 
          className="absolute top-6 right-6 z-20 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-colors"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
               {/* Sol taraf - Ürün bilgileri */}
               <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16,6 12,2 8,6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-sm text-green-600 font-semibold">Orijinal Lisanslı Ürün</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">₺{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₺{product.originalPrice}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">{product.discount} İndirim</span>
              </div>
              <div className="text-sm text-gray-600">Peşin Fiyatına 6 x ₺{Math.round(parseInt(product.price.replace('.', '')) / 6).toLocaleString('tr-TR')}</div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Renk Seçenekleri</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button 
                    key={index}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                      index === 0 ? 'border-red-600 text-red-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Beden Seçenekleri</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <button 
                    key={index}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${
                      index === 0 ? 'border-black text-black' : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
                 <div className="space-y-4">
                   <div className="flex gap-3">
                     <button
                       className="flex-1 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg min-zoom-safe"
                       onClick={(e) => {
                         e.stopPropagation()

                         // Get current cart count from localStorage
                         const currentCount = parseInt(localStorage.getItem('cartCount') || '0')

                         // Save cart items to localStorage
                         const currentItems = JSON.parse(localStorage.getItem('cartItems') || '[]')

                         // Check if item already exists
                         const existingItemIndex = currentItems.findIndex(item => item.name === title)

                         let updatedItems
                         if (existingItemIndex !== -1) {
                           // Item exists, increase quantity
                           updatedItems = [...currentItems]
                           updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity || 1) + 1
                         } else {
                           // New item, add to cart
                           const newItem = { name: title, image: image, quantity: 1, price: product.price }
                           updatedItems = [...currentItems, newItem]
                         }

                         localStorage.setItem('cartItems', JSON.stringify(updatedItems))

                         // Calculate total count for dispatch
                         const totalCount = updatedItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
                         localStorage.setItem('cartCount', totalCount.toString())

                         // Dispatch cart update event
                         window.dispatchEvent(new CustomEvent('cartUpdate', {
                           detail: { count: totalCount }
                         }))

                         // Show toast notification
                         setToastMessage(`${title} sepete eklendi!`)
                         setShowToast(true)
                       }}
                     >
                       🛒 Sepete Ekle
                     </button>
                     <button
                       className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg min-zoom-safe"
                       onClick={(e) => {
                         e.stopPropagation()
                         window.location.hash = `#/odeme?urun=${encodeURIComponent(title)}`
                       }}
                     >
                       💳 Hemen Al
                     </button>
                   </div>
            
            <div className="text-center">
              <button className="text-sm text-gray-600 hover:text-gray-800 underline">
                📍 Mağaza stok durumunu görüntüle
              </button>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Kargo Bilgisi</h4>
              <p className="text-sm text-gray-600">Standart Teslimat</p>
            </div>
          </div>
        </div>
        
               {/* Sağ taraf - Fotoğraf */}
               <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-8">
          <img 
            src={image} 
            alt={title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            style={title === 'Aurora GM-01A' ? {
              objectPosition: '20% center',
              transform: 'scale(1.1)',
              transformOrigin: 'left center'
            } : {}}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  )
}

export default function Collections(){
  const [items,setItems]=useState([])
  const [modalImage, setModalImage] = useState(null)
  const [modalTitle, setModalTitle] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  
  useEffect(()=>{
    fetch('./assets/collection/manifest.json')
      .then(r=>r.ok?r.json():[])
      .then(list=>{ if(Array.isArray(list)) setItems(list) })
      .catch(()=>setItems([]))
  },[])

  const handleChevronClick = (item, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.img) {
      setModalImage(item.img)
      setModalTitle(item.name)
    }
  }

  return (
    <>
      <section id="collections" className="section">
        <div className="container">
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:16}}>
            <h2 style={{fontSize:32,margin:0}}>Gözlük Koleksiyonu</h2>
            <a className="muted" href="#/koleksiyon">Tümünü gör</a>
          </div>
          <div className="grid grid-4">
            {items.map((it,i)=>(
              <div key={it.id||i} className="card hover-scale">
                <div className="aspect-3-4">
                  <img className="img-rect" src={it.img} alt={it.name} onError={(e)=>{e.currentTarget.src='https://picsum.photos/600/800?grayscale&random='+(it.id||i)}}/>
                </div>
                <div style={{padding:'12px 14px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span>{it.name}</span>
                    <button 
                      onClick={(e) => handleChevronClick(it, e)}
                      className="hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                      <ChevronRightIcon/>
                    </button>
                  </div>
                  {it.sub && <div className="muted" style={{marginTop:6,fontSize:12}}>{it.sub}</div>}
                  {it.sub2 && <div className="muted" style={{marginTop:4,fontSize:12}}>{it.sub2}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Modal
        isOpen={!!modalImage}
        onClose={() => {
          setModalImage(null)
          setModalTitle('')
        }}
        image={modalImage}
        title={modalTitle}
        setToastMessage={setToastMessage}
        setShowToast={setShowToast}
      />
      
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}
