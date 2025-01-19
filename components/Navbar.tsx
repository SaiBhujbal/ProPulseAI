'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Brain } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">ProPulse.AI</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-cyan-400">About</Link>
            <Link href="/chat" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-700">
              Start Chat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}