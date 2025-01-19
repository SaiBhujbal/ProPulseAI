import Link from 'next/link'
import { 
  Brain, 
  Rocket, 
  Target, 
  BarChart3 
} from 'lucide-react'

export default function Home() {
  return (
    <main>
      <section className="container mx-auto px-4 pt-32 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 mb-6">
            Transform Your Brand with AI-Powered Marketing
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            Leverage advanced AI algorithms to optimize your marketing campaigns
          </p>
          <Link 
            href="/chat"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full hover:from-cyan-600 hover:to-blue-700 transition"
          >
            Start Chat Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
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
    </main>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
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