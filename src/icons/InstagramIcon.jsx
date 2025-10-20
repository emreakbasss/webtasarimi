import React from 'react'
export default function InstagramIcon({ size=16, className='', style }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor"/>
      <circle cx="12" cy="12" r="4" fill="#fff"/>
      <circle cx="17" cy="7" r="1.5" fill="#fff"/>
    </svg>
  )
}
