'use client'

import { useState, useEffect } from 'react'
import { Search, LineChart, Users, Lightbulb, BarChart2, Zap } from 'lucide-react'

const phases = [
  {
    icon: <Search className="h-12 w-12 text-cyan-400" />,
    title: "Brand Identification",
    description: "AI-powered analysis to discover your brand's unique voice"
  },
  {
    icon: <LineChart className="h-12 w-12 text-cyan-400" />,
    title: "Ideal Metrics",
    description: "Define and track key performance indicators"
  },
  // Add other phases...
]

export function AIPhases() {
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
          Our AI-Driven Approach
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20">
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6">
                {phases[currentPhase].icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {phases[currentPhase].title}
              </h3>
              <p className="text-blue-200 text-lg">
                {phases[currentPhase].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}