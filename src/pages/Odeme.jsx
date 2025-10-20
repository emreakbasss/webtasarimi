import React, { useState, useEffect } from 'react'

export default function Odeme() {
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    
    // Adres Bilgileri
    adres: '',
    sehir: '',
    ilce: '',
    postaKodu: '',
    
    // Kart Bilgileri
    kartNumarasi: '',
    kartAdi: '',
    sonKullanmaAy: '',
    sonKullanmaYil: '',
    cvv: '',
    
    // Ödeme Seçenekleri
    odemeYontemi: 'krediKarti',
    taksitSayisi: '1'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  // Sepet verilerini yükle
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const itemsWithQuantity = savedItems.map(item => ({ ...item, quantity: item.quantity || 1 }))
    const total = itemsWithQuantity.reduce((sum, item) => sum + ((item.quantity || 1) * parseInt(item.price?.replace('.', '') || '2999')), 0)
    
    setCartItems(itemsWithQuantity)
    setTotalPrice(total)
  }, [])

  // URL'den ürün bilgilerini al
  useEffect(() => {
    const hash = window.location.hash
    const queryPart = hash.split('?')[1] || ''
    const params = new URLSearchParams(queryPart)
    const productName = params.get('urun') || 'Ürün'
    
    // Sayfa başlığını güncelle
    document.title = `${productName} - Ödeme | YOU Eyewear`
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Hata temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Sepet yönetimi fonksiyonları
  const removeItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index)
    const totalCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    const total = newItems.reduce((sum, item) => sum + ((item.quantity || 1) * parseInt(item.price?.replace('.', '') || '2999')), 0)
    
    setCartItems(newItems)
    setTotalPrice(total)
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
    const totalCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    const total = newItems.reduce((sum, item) => sum + ((item.quantity || 1) * parseInt(item.price?.replace('.', '') || '2999')), 0)
    
    setCartItems(newItems)
    setTotalPrice(total)
    localStorage.setItem('cartItems', JSON.stringify(newItems))
    localStorage.setItem('cartCount', totalCount.toString())
    
    // Dispatch cart update event
    window.dispatchEvent(new CustomEvent('cartUpdate', {
      detail: { count: totalCount }
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Kişisel bilgiler
    if (!formData.ad.trim()) newErrors.ad = 'Ad gereklidir'
    if (!formData.soyad.trim()) newErrors.soyad = 'Soyad gereklidir'
    if (!formData.email.trim()) newErrors.email = 'E-posta gereklidir'
    if (!formData.telefon.trim()) newErrors.telefon = 'Telefon gereklidir'
    
    // Adres bilgileri
    if (!formData.adres.trim()) newErrors.adres = 'Adres gereklidir'
    if (!formData.sehir.trim()) newErrors.sehir = 'Şehir gereklidir'
    if (!formData.ilce.trim()) newErrors.ilce = 'İlçe gereklidir'
    
    // Kart bilgileri
    if (!formData.kartNumarasi.trim()) newErrors.kartNumarasi = 'Kart numarası gereklidir'
    if (!formData.kartAdi.trim()) newErrors.kartAdi = 'Kart üzerindeki ad gereklidir'
    if (!formData.sonKullanmaAy) newErrors.sonKullanmaAy = 'Son kullanma ayı gereklidir'
    if (!formData.sonKullanmaYil) newErrors.sonKullanmaYil = 'Son kullanma yılı gereklidir'
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV gereklidir'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Ödeme başarıyla tamamlandı! Siparişiniz alındı.')
      // Sepeti temizle
      localStorage.removeItem('cartItems')
      localStorage.removeItem('cartCount')
      window.dispatchEvent(new CustomEvent('cartUpdate', {
        detail: { count: 0 }
      }))
      // Ana sayfaya yönlendir
      window.location.hash = '#/'
    }, 2000)
  }

  const aylar = Array.from({ length: 12 }, (_, i) => i + 1)
  const yillar = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)

  return (
    <main className="section">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ödeme</h1>
          <p className="text-gray-600">Siparişinizi tamamlamak için bilgilerinizi girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Kişisel Bilgiler */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                <input
                  type="text"
                  name="ad"
                  value={formData.ad}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.ad ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Adınız"
                />
                {errors.ad && <p className="text-red-500 text-sm mt-1">{errors.ad}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                <input
                  type="text"
                  name="soyad"
                  value={formData.soyad}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.soyad ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Soyadınız"
                />
                {errors.soyad && <p className="text-red-500 text-sm mt-1">{errors.soyad}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ornek@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                <input
                  type="tel"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.telefon ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0555 123 45 67"
                />
                {errors.telefon && <p className="text-red-500 text-sm mt-1">{errors.telefon}</p>}
              </div>
            </div>
          </div>

          {/* Adres Bilgileri */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Adresi</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                <textarea
                  name="adres"
                  value={formData.adres}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    errors.adres ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mahalle, sokak, bina no, daire no"
                />
                {errors.adres && <p className="text-red-500 text-sm mt-1">{errors.adres}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                  <input
                    type="text"
                    name="sehir"
                    value={formData.sehir}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.sehir ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="İstanbul"
                  />
                  {errors.sehir && <p className="text-red-500 text-sm mt-1">{errors.sehir}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlçe *</label>
                  <input
                    type="text"
                    name="ilce"
                    value={formData.ilce}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      errors.ilce ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Kadıköy"
                  />
                  {errors.ilce && <p className="text-red-500 text-sm mt-1">{errors.ilce}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                  <input
                    type="text"
                    name="postaKodu"
                    value={formData.postaKodu}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="34000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Ödeme Bilgileri */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Bilgileri</h2>
            
            {/* Ödeme Yöntemi */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Ödeme Yöntemi</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="odemeYontemi"
                    value="krediKarti"
                    checked={formData.odemeYontemi === 'krediKarti'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span>Kredi/Banka Kartı</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="odemeYontemi"
                    value="havale"
                    checked={formData.odemeYontemi === 'havale'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <span>Havale/EFT</span>
                </label>
              </div>
            </div>

            {formData.odemeYontemi === 'krediKarti' && (
              <>
                {/* Kart Bilgileri */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                    <input
                      type="text"
                      name="kartNumarasi"
                      value={formData.kartNumarasi}
                      onChange={handleInputChange}
                      maxLength="19"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.kartNumarasi ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.kartNumarasi && <p className="text-red-500 text-sm mt-1">{errors.kartNumarasi}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kart Üzerindeki Ad *</label>
                    <input
                      type="text"
                      name="kartAdi"
                      value={formData.kartAdi}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        errors.kartAdi ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="AD SOYAD"
                    />
                    {errors.kartAdi && <p className="text-red-500 text-sm mt-1">{errors.kartAdi}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma Tarihi *</label>
                      <div className="flex gap-2">
                        <select
                          name="sonKullanmaAy"
                          value={formData.sonKullanmaAy}
                          onChange={handleInputChange}
                          className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                            errors.sonKullanmaAy ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Ay</option>
                          {aylar.map(ay => (
                            <option key={ay} value={ay.toString().padStart(2, '0')}>
                              {ay.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select
                          name="sonKullanmaYil"
                          value={formData.sonKullanmaYil}
                          onChange={handleInputChange}
                          className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                            errors.sonKullanmaYil ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Yıl</option>
                          {yillar.map(yil => (
                            <option key={yil} value={yil}>{yil}</option>
                          ))}
                        </select>
                      </div>
                      {(errors.sonKullanmaAy || errors.sonKullanmaYil) && (
                        <p className="text-red-500 text-sm mt-1">Son kullanma tarihi gereklidir</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  
                  {/* Taksit Seçenekleri */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taksit Sayısı</label>
                    <select
                      name="taksitSayisi"
                      value={formData.taksitSayisi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="1">Tek Çekim</option>
                      <option value="2">2 Taksit</option>
                      <option value="3">3 Taksit</option>
                      <option value="6">6 Taksit</option>
                      <option value="9">9 Taksit</option>
                      <option value="12">12 Taksit</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {formData.odemeYontemi === 'havale' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Havale/EFT Bilgileri</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Banka:</strong> Türkiye İş Bankası</p>
                  <p><strong>Hesap Adı:</strong> YOU Eyewear Ltd. Şti.</p>
                  <p><strong>IBAN:</strong> TR12 0006 4000 0011 2345 6789 01</p>
                  <p className="mt-2 text-blue-600">Sipariş numaranızı açıklama kısmına yazmayı unutmayın.</p>
                </div>
              </div>
            )}
          </div>

          {/* Sipariş Özeti */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h3>
            
            {/* Sepetteki ürünler */}
            <div className="space-y-3 mb-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg">
                  <div className="text-4xl mb-2">🛒</div>
                  <div className="text-gray-600">Sepetiniz boş</div>
                  <a href="#/koleksiyon" className="text-red-600 hover:text-red-700 underline mt-2 inline-block">
                    Alışverişe devam et
                  </a>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Adet: {item.quantity || 1}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Miktar kontrolü */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Kaldır butonu */}
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm px-2 py-1 rounded hover:bg-red-50"
                      >
                        ✕ Kaldır
                      </button>
                      
                      {/* Fiyat */}
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ₺{((item.quantity || 1) * parseInt(item.price?.replace('.', '') || '2999')).toLocaleString('tr-TR')}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₺{parseInt(item.price?.replace('.', '') || '2999').toLocaleString('tr-TR')} x {item.quantity || 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Ara Toplam ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} ürün)</span>
                <span>₺{totalPrice.toLocaleString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Toplam</span>
                  <span>₺{totalPrice.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gönder Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white`}
            >
              {isSubmitting ? 'İşleniyor...' : 'Siparişi Tamamla'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
