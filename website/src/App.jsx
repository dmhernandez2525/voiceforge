import {
  Mic,
  Download,
  Cpu,
  Shield,
  Globe,
  Zap,
  Play,
  Github,
  Apple,
  ChevronRight,
  Volume2,
  Wand2,
  Copy,
  Check
} from 'lucide-react'
import { useState } from 'react'
import './index.css'

function App() {
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText('git clone https://github.com/dmhernandez2525/qwen-tts-app.git && cd qwen-tts-app && ./scripts/install.sh')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-qwen-500 to-voice-500 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Qwen TTS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors hidden sm:block">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors hidden sm:block">How It Works</a>
            <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-qwen-500/10 border border-qwen-500/30 rounded-full px-4 py-2 mb-8">
            <Apple className="w-4 h-4 text-qwen-400" />
            <span className="text-qwen-300 text-sm font-medium">macOS Only</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-qwen-200 to-voice-300 bg-clip-text text-transparent">
            Clone Any Voice
            <br />
            <span className="text-4xl md:text-6xl">In 3 Seconds</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Open-source text-to-speech with voice cloning. Runs 100% locally on your Mac.
            No cloud. No subscription. No limits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#install"
               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-qwen-500 to-qwen-600 hover:from-qwen-400 hover:to-qwen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all animate-pulse-glow">
              <Download className="w-5 h-5" />
              Download for Mac
            </a>
            <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              <Github className="w-5 h-5" />
              View Source
            </a>
          </div>

          {/* Demo Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-qwen-500/20 flex items-center justify-center mx-auto mb-4">
                    <Volume2 className="w-8 h-8 text-qwen-400" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Record or Upload</h3>
                  <p className="text-sm text-slate-400">Provide 3+ seconds of any voice sample</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-slate-600" />
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-voice-500/20 flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="w-8 h-8 text-voice-400" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Type Your Text</h3>
                  <p className="text-sm text-slate-400">Enter what you want the voice to say</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-slate-600" />
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Generate</h3>
                  <p className="text-sm text-slate-400">Get natural-sounding cloned audio instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Built on Qwen3-TTS from Alibaba Cloud, one of the most advanced open-source TTS models available.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mic className="w-6 h-6" />}
              title="3-Second Voice Cloning"
              description="Clone any voice with just 3 seconds of audio. No training required."
              color="qwen"
            />
            <FeatureCard
              icon={<Cpu className="w-6 h-6" />}
              title="100% Local Processing"
              description="Everything runs on your Mac. Your audio never leaves your device."
              color="voice"
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="10 Languages"
              description="English, Chinese, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian."
              color="green"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="GPU Accelerated"
              description="Runs on Metal (MPS) for Apple Silicon. Fast generation on M1/M2/M3 chips."
              color="yellow"
            />
            <FeatureCard
              icon={<Wand2 className="w-6 h-6" />}
              title="Voice Design"
              description="Create custom voices from natural language descriptions. No samples needed."
              color="purple"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Open Source"
              description="Apache 2.0 license. Free forever. No subscriptions or API limits."
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Three Ways to Generate</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the method that works best for your use case.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <ModeCard
              number="01"
              title="Preset Voices"
              description="Use built-in voices like Ryan, Vivian, or Aiden. Add style instructions like 'speak happily' or 'whisper softly'."
              features={['9 preset voices', 'Style instructions', 'Fastest option']}
            />
            <ModeCard
              number="02"
              title="Voice Cloning"
              description="Clone any voice from a 3+ second audio sample. Provide a transcript for best results."
              features={['3-second samples', 'High accuracy', 'Any voice']}
              highlighted
            />
            <ModeCard
              number="03"
              title="Voice Design"
              description="Describe the voice you want in natural language. Perfect for creating unique voices."
              features={['Natural descriptions', 'Unique voices', 'No samples needed']}
            />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="install" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Get Started in Minutes</h2>
          <p className="text-slate-400 text-center mb-12">
            Clone the repo and run the install script. Models download automatically on first use.
          </p>

          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <button onClick={copyCommand} className="text-slate-400 hover:text-white transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-6 font-mono text-sm">
              <p className="text-slate-500"># Clone and install</p>
              <p className="text-green-400">git clone https://github.com/dmhernandez2525/qwen-tts-app.git</p>
              <p className="text-green-400">cd qwen-tts-app</p>
              <p className="text-green-400">./scripts/install.sh</p>
              <p className="text-slate-500 mt-4"># Build and run</p>
              <p className="text-green-400">cd QwenTTS && ./build.sh</p>
              <p className="text-green-400">./start.sh</p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-qwen-400">~10GB</p>
              <p className="text-sm text-slate-400">Model storage</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-voice-400">8GB+</p>
              <p className="text-sm text-slate-400">RAM required</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">macOS 12+</p>
              <p className="text-sm text-slate-400">Apple Silicon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-qwen-500 to-voice-500 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Qwen TTS</span>
          </div>
          <p className="text-slate-500 text-sm">
            Powered by <a href="https://github.com/QwenLM/Qwen3-TTS" target="_blank" rel="noopener noreferrer" className="text-qwen-400 hover:underline">Qwen3-TTS</a> from Alibaba Cloud
          </p>
          <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
             className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }) {
  const colorClasses = {
    qwen: 'bg-qwen-500/10 text-qwen-400 border-qwen-500/30',
    voice: 'bg-voice-500/10 text-voice-400 border-voice-500/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} border flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  )
}

function ModeCard({ number, title, description, features, highlighted }) {
  return (
    <div className={`rounded-xl p-6 border transition-all ${
      highlighted
        ? 'bg-gradient-to-b from-qwen-500/10 to-voice-500/10 border-qwen-500/50 scale-105'
        : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
    }`}>
      <span className="text-6xl font-bold text-slate-700/50">{number}</span>
      <h3 className="font-semibold text-xl mt-4 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
