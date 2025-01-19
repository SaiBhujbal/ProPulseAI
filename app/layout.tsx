import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Brain } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProPulse.AI - AI-Powered Marketing',
  description: 'Transform your brand with AI-powered marketing strategies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {/* Background with overlay */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-indigo-900/70 to-purple-900/70 backdrop-blur-sm"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">ProPulse.AI</span>
              </Link>
              <Link 
                href="/chat" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-700 transition"
              >
                Start Chat
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}