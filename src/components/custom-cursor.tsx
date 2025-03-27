"use client"

import { useEffect } from "react"

export function CustomCursor() {
  useEffect(() => {
    document.body.classList.add('windows-cursor')
    return () => document.body.classList.remove('windows-cursor')
  }, [])
  
  return null
} 