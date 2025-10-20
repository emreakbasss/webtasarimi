import React, { useState, useEffect } from 'react'

export default function Sepet() {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Load cart items from localStorage
    const savedItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    // Ensure all items have quantity
    const itemsWithQuantity = savedItems.map(item => ({ ...item, quantity: item.quantity || 1 }))
    const totalCount = itemsWithQuantity.reduce((sum, item) => sum + item.quantity, 0)
    
    setCartItems(itemsWithQuantity)
    setCartCount(totalCount)

    // Listen for cart updates
    const handleCartUpdate = (event) => {
      setCartCount(event.detail.count)
      if (event.detail.item) {
        setCartItems(prev => [...prev, event.detail.item])
        localStorage.setItem('cartItems', JSON.stringify([...savedItems, event.detail.item]))
      }
    }

    window.addEventListener('cartUpdate', handleCartUpdate)
    return () => window.removeEventListener('cartUpdate', handleCartUpdate)
  }, [])

  const removeItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index)
    const totalCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    
    setCartItems(newItems)
    setCartCount(totalCount)
    localStorage.setItem('cartItems', JSON.stringify(newItems))
    localStorage.setItem('cartCount', totalCount.toString())
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdate', {
      detail: { count: totalCount }
    }))
  }

  const updateQuantity = (index, change) => {
    const newItems = [...cartItems]
    if (change === -1 && newItems[index].quantity <= 1) {
      removeItem(index)
      return
    }
    
    newItems[index].quantity = (newItems[index].quantity || 1) + change
    setCartItems(newItems)
    
    const totalCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    setCartCount(totalCount)
    
    localStorage.setItem('cartItems', JSON.stringify(newItems))
    localStorage.setItem('cartCount', totalCount.toString())
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdate', {
      detail: { count: totalCount }
    }))
  }

  const clearCart = () => {
    setCartItems([])
    setCartCount(0)
    localStorage.removeItem('cartItems')
    localStorage.setItem('cartCount', '0')
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdate', {
      detail: { count: 0 }
    }))
  }

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 style={{margin:0,fontSize:36}}>Sepetim</h1>
          <p className="muted" style={{marginTop:8}}>
            {cartCount > 0 ? `${cartCount} ürün sepetinizde` : 'Sepetiniz boş'}
          </p>

          {cartItems.length > 0 ? (
            <div className="mt-8">
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-6">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-2">Premium gözlük koleksiyonu</p>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-red-600">₺2.999</span>
                          <span className="text-sm text-gray-500">Stokta mevcut</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button 
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          ✕ Kaldır
                        </button>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(index, -1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(index, 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Sipariş Özeti</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Ara Toplam ({cartCount} ürün)</span>
                    <span>₺{cartItems.reduce((sum, item) => sum + ((item.quantity || 1) * 2999), 0).toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kargo</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Toplam</span>
                      <span>₺{cartItems.reduce((sum, item) => sum + ((item.quantity || 1) * 2999), 0).toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
                
                   <div className="mt-6 space-y-3">
                     <button 
                       className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold text-lg"
                       onClick={() => {
                         window.location.hash = '#/odeme'
                       }}
                     >
                       🛒 Sepeti Onayla
                     </button>
                  <button 
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Sepetiniz Boş</h2>
              <p className="text-gray-500 mb-6">Henüz sepetinize ürün eklemediniz</p>
              <a 
                href="#/koleksiyon"
                className="inline-block bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-semibold"
              >
                Alışverişe Başla
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
