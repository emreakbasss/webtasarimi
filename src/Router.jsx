import React, { useEffect, useMemo, useState } from 'react'

function getPathFromHash(){
  const hash=window.location.hash || '#/'
  const clean=hash.replace(/^#/, '')
  const [path]=clean.split('?')
  // normalize empty to '/'
  return path || '/'
}

export default function Router({ routes, fallback: Fallback }){
  const [path,setPath]=useState(getPathFromHash())

  useEffect(()=>{
    const onHashChange=()=>setPath(getPathFromHash())
    window.addEventListener('hashchange',onHashChange)
    return ()=>window.removeEventListener('hashchange',onHashChange)
  },[])

  const Element=useMemo(()=>{
    return routes[path] || routes[path.replace(/\/$/,'')] || Fallback
  },[routes,path,Fallback])

  return <Element/>
}


