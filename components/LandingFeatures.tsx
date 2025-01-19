import { Rocket, Target, BarChart3 } from 'lucide-react'

export function LandingFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-black/30 to-blue-900/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-cyan-400" />}
            title="Understanding Brand Presence"
            description="Analyze your brand against industry standards for actionable insights."
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-cyan-400" />}
            title="Smart Audience Targeting"
            description="AI-driven demographic and behavioral targeting."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-cyan-400" />}
            title="Advanced Analytics"
            description="Real-time insights and optimization suggestions."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
      <div className="inline-block p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </div>
  )
}