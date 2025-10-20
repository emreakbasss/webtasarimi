import React, { useState, useEffect } from 'react'

export default function Toast({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // 3 saniye sonra otomatik kapanır
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px]">
        <div className="flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold">Harika!</div>
          <div className="text-sm opacity-90">{message}</div>
        </div>
        <button 
          onClick={onClose}
          className="flex-shrink-0 hover:bg-green-600 rounded-full p-1 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
