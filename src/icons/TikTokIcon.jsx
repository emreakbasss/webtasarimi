import React from 'react'
export default function TikTokIcon({ size=16, className='', style }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3v9.5a3.5 3.5 0 11-2-3.146V5h2c1.1 2.2 3.2 3.5 6 3.5V11c-2.3 0-4.3-1-6-2.6V16a5.5 5.5 0 11-3.5-5.14V3h3.5z" fill="currentColor"/>
    </svg>
  )
}
