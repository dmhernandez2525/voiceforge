import { Routes, Route, Link, useLocation } from 'react-router-dom'
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
  ChevronDown,
  Volume2,
  Wand2,
  Copy,
  Check,
  Terminal,
  FileAudio,
  Settings,
  HelpCircle,
  AlertTriangle,
  Clock,
  HardDrive,
  MemoryStick,
  Layers,
  BookOpen,
  ExternalLink,
  Cloud,
  CreditCard,
  Server,
  Users,
  Headphones,
  Video,
  Podcast,
  Gamepad2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Menu as MenuIcon,
  ArrowDown,
  PlayCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/install" element={<InstallPage />} />
      <Route path="/cloud" element={<CloudPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  )
}

// ============================================================================
// SHARED NAVIGATION
// ============================================================================

function Navigation({ transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !transparent
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-qwen-500 to-voice-500 flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white">VoiceForge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/features" className={`transition-colors ${isActive('/features') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            Features
          </Link>
          <Link to="/use-cases" className={`transition-colors ${isActive('/use-cases') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            Use Cases
          </Link>
          <Link to="/install" className={`transition-colors ${isActive('/install') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            Install
          </Link>
          <Link to="/docs" className={`transition-colors ${isActive('/docs') ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
            Docs
          </Link>
          <Link to="/cloud" className="text-qwen-400 hover:text-qwen-300 transition-colors flex items-center gap-1">
            <Cloud className="w-4 h-4" />
            Cloud
          </Link>
          <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors text-white">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-700/50 px-4 py-4 space-y-3">
          <Link to="/features" className="block text-slate-300 hover:text-white">Features</Link>
          <Link to="/use-cases" className="block text-slate-300 hover:text-white">Use Cases</Link>
          <Link to="/install" className="block text-slate-300 hover:text-white">Install</Link>
          <Link to="/docs" className="block text-slate-300 hover:text-white">Docs</Link>
          <Link to="/cloud" className="block text-qwen-400">Cloud API</Link>
        </div>
      )}
    </nav>
  )
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-qwen-500 to-voice-500 flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">VoiceForge</span>
            </Link>
            <p className="text-sm text-slate-400">
              Open-source voice cloning for macOS. Clone any voice in 3 seconds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/use-cases" className="hover:text-white">Use Cases</Link></li>
              <li><Link to="/install" className="hover:text-white">Installation</Link></li>
              <li><Link to="/cloud" className="hover:text-white">Cloud API</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/docs" className="hover:text-white">API Documentation</Link></li>
              <li><a href="https://github.com/dmhernandez2525/qwen-tts-app" className="hover:text-white">GitHub</a></li>
              <li><a href="https://github.com/QwenLM/Qwen3-TTS" className="hover:text-white">Qwen3-TTS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-slate-500">Apache 2.0 License</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Powered by <a href="https://github.com/QwenLM/Qwen3-TTS" target="_blank" rel="noopener noreferrer" className="text-qwen-400 hover:underline">Qwen3-TTS</a> from Alibaba Cloud.
          </p>
          <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
             className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// HOME PAGE - Clean landing page with hero and key highlights
// ============================================================================

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation transparent />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-qwen-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-voice-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-qwen-500/10 border border-qwen-500/30 rounded-full px-4 py-2 mb-8">
            <Apple className="w-4 h-4 text-qwen-400" />
            <span className="text-qwen-300 text-sm font-medium">macOS App - 100% Local & Private</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-qwen-200 to-voice-300 bg-clip-text text-transparent leading-tight">
            Clone Any Voice
            <br />
            <span className="text-4xl md:text-6xl">In 3 Seconds</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Open-source AI text-to-speech with instant voice cloning.
            Runs 100% locally on your Mac. No cloud. No subscription. No limits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/install"
               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-qwen-500 to-qwen-600 hover:from-qwen-400 hover:to-qwen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-qwen-500/25">
              <Download className="w-5 h-5" />
              Download for Mac
            </Link>
            <Link to="/cloud"
               className="inline-flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-slate-600">
              <Cloud className="w-5 h-5" />
              Try Cloud API
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <StatCard icon={<Clock className="w-5 h-5" />} value="3 sec" label="Voice sample needed" />
            <StatCard icon={<Globe className="w-5 h-5" />} value="10" label="Languages supported" />
            <StatCard icon={<Shield className="w-5 h-5" />} value="100%" label="Local & private" />
            <StatCard icon={<Zap className="w-5 h-5" />} value="Free" label="Forever, no limits" />
          </div>
        </div>
      </section>

      {/* How It Works - Improved Design */}
      <section className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto">
            Clone any voice in three simple steps. No machine learning expertise required.
          </p>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-qwen-500 via-voice-500 to-green-500 transform -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <HowItWorksStep
                number="01"
                icon={<Volume2 className="w-8 h-8" />}
                title="Upload Reference Audio"
                description="Provide 3+ seconds of clear audio from the voice you want to clone. WAV or MP3 format."
                color="qwen"
              />
              <HowItWorksStep
                number="02"
                icon={<FileAudio className="w-8 h-8" />}
                title="Add the Transcript"
                description="Enter the exact words spoken in your reference audio. This helps the model understand the voice."
                color="voice"
              />
              <HowItWorksStep
                number="03"
                icon={<Wand2 className="w-8 h-8" />}
                title="Generate New Speech"
                description="Type any text and generate speech in the cloned voice. Export as WAV audio file."
                color="green"
              />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/features" className="inline-flex items-center gap-2 text-qwen-400 hover:text-qwen-300 font-medium transition-colors">
              Explore all features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Three Modes Preview */}
      <section className="py-24 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Three Powerful Modes</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Choose the right approach for your needs
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <ModePreviewCard
              icon={<Users className="w-6 h-6" />}
              title="Preset Voices"
              description="Use built-in voices like Ryan, Aiden, and Vivian with style instructions. No setup needed."
              tag="Fastest"
              color="blue"
            />
            <ModePreviewCard
              icon={<Mic className="w-6 h-6" />}
              title="Voice Cloning"
              description="Clone any voice from just 3 seconds of audio. The most powerful mode."
              tag="Most Popular"
              color="qwen"
              highlighted
            />
            <ModePreviewCard
              icon={<Wand2 className="w-6 h-6" />}
              title="Voice Design"
              description="Describe a voice in natural language and let AI create it. 'A warm British female voice.'"
              tag="Creative"
              color="purple"
            />
          </div>

          <div className="mt-12 text-center">
            <Link to="/features" className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Learn more about each mode
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Highlight */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-3xl border border-slate-700 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why VoiceForge?</h2>
                <p className="text-slate-400 mb-6">
                  Unlike cloud services like ElevenLabs or Play.ht, VoiceForge runs entirely on your Mac. Your audio never leaves your device.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>No subscription or usage limits</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>100% private - data stays on your device</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Open source - Apache 2.0 license</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Works offline after initial setup</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                  <span className="text-slate-400">ElevenLabs</span>
                  <span className="text-slate-400">$22/month</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                  <span className="text-slate-400">Play.ht</span>
                  <span className="text-slate-400">$39/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <Mic className="w-4 h-4 text-qwen-400" />
                    VoiceForge
                  </span>
                  <span className="text-green-400 font-bold">Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-qwen-600/20 to-voice-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Clone Voices?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Download VoiceForge and start creating professional voiceovers in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/install"
               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-qwen-500 to-qwen-600 hover:from-qwen-400 hover:to-qwen-500 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              <Download className="w-5 h-5" />
              Download for Mac
            </Link>
            <Link to="/use-cases"
               className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-white/20">
              See Use Cases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ============================================================================
// FEATURES PAGE
// ============================================================================

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
          <p className="text-xl text-slate-400">
            Everything you need for professional voice synthesis, all running locally on your Mac.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mic className="w-6 h-6" />}
              title="3-Second Voice Cloning"
              description="Clone any voice with just 3 seconds of audio. No training required - just provide a sample and transcript."
              color="qwen"
            />
            <FeatureCard
              icon={<Cpu className="w-6 h-6" />}
              title="100% Local Processing"
              description="Everything runs on your Mac using Metal GPU acceleration. Your audio never leaves your device."
              color="voice"
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="10 Languages"
              description="English, Chinese, Japanese, Korean, German, French, Russian, Portuguese, Spanish, and Italian."
              color="green"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="GPU Accelerated"
              description="Optimized for Apple Silicon (M1/M2/M3/M4). Uses Metal Performance Shaders for fast generation."
              color="yellow"
            />
            <FeatureCard
              icon={<Wand2 className="w-6 h-6" />}
              title="Voice Design Mode"
              description="Create custom voices from text descriptions like 'A warm British female voice' - no audio sample needed."
              color="purple"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Open Source"
              description="Apache 2.0 license. Free forever. No subscriptions, API limits, or usage tracking."
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* Three Modes Detail */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Three Generation Modes</h2>

          <div className="space-y-12">
            <ModeDetailCard
              number="01"
              title="Preset Voices"
              subtitle="Quick & Easy"
              description="Use built-in voices for immediate text-to-speech without any audio samples. Perfect for quick projects."
              features={[
                "6 built-in voices (Ryan, Aiden, Vivian, Serena, Lucas, Ava)",
                "Style instructions support ('Speak happily', 'Whisper')",
                "No setup required - works instantly",
                "Great for prototyping and quick tasks"
              ]}
              code={`// Example API call
POST /generate/custom
{
  "text": "Hello, welcome to VoiceForge!",
  "speaker": "Ryan",
  "language": "English",
  "instruction": "Speak with enthusiasm"
}`}
            />

            <ModeDetailCard
              number="02"
              title="Voice Cloning"
              subtitle="Most Powerful"
              description="Clone any voice from just 3 seconds of audio. The cloned voice can say anything you type."
              features={[
                "Clone from 3-10 seconds of audio",
                "WAV and MP3 input supported",
                "Requires transcript of reference audio",
                "Best quality with clear, noise-free audio"
              ]}
              code={`// Example API call
POST /generate/clone
{
  "text": "New text in cloned voice",
  "reference_audio": "/path/to/sample.wav",
  "reference_text": "Transcript of audio",
  "language": "English"
}`}
              highlighted
            />

            <ModeDetailCard
              number="03"
              title="Voice Design"
              subtitle="Creative Freedom"
              description="Describe the voice you want in natural language. Great for creating unique character voices."
              features={[
                "Natural language voice descriptions",
                "Create unique voices from scratch",
                "No reference audio needed",
                "Perfect for character creation"
              ]}
              code={`// Example API call
POST /generate/design
{
  "text": "Hello from my custom voice!",
  "voice_description": "A warm, friendly female voice with a slight British accent",
  "language": "English"
}`}
            />
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Specifications</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-lg mb-4">Output Format</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Format: WAV</li>
                <li>Sample Rate: 24kHz</li>
                <li>Channels: Mono</li>
                <li>Bit Depth: 16-bit</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-lg mb-4">Model Information</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Base: Qwen3-TTS 1.7B</li>
                <li>Model size: ~3.5GB each</li>
                <li>Inference: PyTorch + Metal</li>
                <li>Smaller 0.6B variants available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/install" className="inline-flex items-center justify-center gap-2 bg-qwen-500 hover:bg-qwen-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <Download className="w-5 h-5" />
              Install VoiceForge
            </Link>
            <Link to="/docs" className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ============================================================================
// USE CASES PAGE
// ============================================================================

function UseCasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Use Cases</h1>
          <p className="text-xl text-slate-400">
            See how creators, developers, and businesses use VoiceForge
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <UseCaseDetailCard
              icon={<Video className="w-10 h-10" />}
              title="Video Production"
              description="Create professional voiceovers for your video content without hiring voice actors."
              examples={[
                "YouTube video narration",
                "Tutorial and explainer videos",
                "Documentary narration",
                "Ad reads and promos",
                "Social media content"
              ]}
            />
            <UseCaseDetailCard
              icon={<Podcast className="w-10 h-10" />}
              title="Podcasts & Audio"
              description="Generate intro music narration, character voices, or entire audiobook chapters."
              examples={[
                "Podcast intro/outro",
                "Audiobook production",
                "Audio drama characters",
                "Radio ads",
                "ASMR content"
              ]}
            />
            <UseCaseDetailCard
              icon={<Gamepad2 className="w-10 h-10" />}
              title="Game Development"
              description="Prototype NPC dialogue and character voices before hiring professional actors."
              examples={[
                "NPC dialogue prototyping",
                "Character voice mockups",
                "Narrator lines",
                "In-game announcements",
                "Indie game production"
              ]}
            />
            <UseCaseDetailCard
              icon={<Headphones className="w-10 h-10" />}
              title="Accessibility"
              description="Make content accessible with natural-sounding text-to-speech."
              examples={[
                "Screen reader alternatives",
                "Document narration",
                "E-learning materials",
                "Multi-language accessibility",
                "Visual impairment support"
              ]}
            />
            <UseCaseDetailCard
              icon={<Server className="w-10 h-10" />}
              title="Business Applications"
              description="Create consistent voice branding across all customer touchpoints."
              examples={[
                "IVR/phone system voices",
                "Product demo narration",
                "Internal training videos",
                "Presentation voiceovers",
                "Customer onboarding"
              ]}
            />
            <UseCaseDetailCard
              icon={<Sparkles className="w-10 h-10" />}
              title="Creative Projects"
              description="Bring creative projects to life with unique character voices."
              examples={[
                "Animation dubbing",
                "Interactive storytelling",
                "Art installations",
                "Music production",
                "Experimental media"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Start creating today</h2>
          <Link to="/install" className="inline-flex items-center justify-center gap-2 bg-qwen-500 hover:bg-qwen-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            <Download className="w-5 h-5" />
            Download VoiceForge
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ============================================================================
// INSTALL PAGE
// ============================================================================

function InstallPage() {
  const [copied, setCopied] = useState(null)

  const copyCommand = (cmd, id) => {
    navigator.clipboard.writeText(cmd)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Installation</h1>
          <p className="text-xl text-slate-400">
            Get up and running in under 5 minutes
          </p>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Requirements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <RequirementCard icon={<Apple />} title="macOS 12+" subtitle="Apple Silicon (M1/M2/M3/M4)" />
            <RequirementCard icon={<MemoryStick />} title="8GB+ RAM" subtitle="16GB recommended" />
            <RequirementCard icon={<HardDrive />} title="~15GB Disk" subtitle="For models & app" />
          </div>
        </div>
      </section>

      {/* Install Steps */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Installation Steps</h2>
          <div className="space-y-6">
            <InstallStep
              number="1"
              title="Clone the Repository"
              command="git clone https://github.com/dmhernandez2525/qwen-tts-app.git && cd qwen-tts-app"
              copied={copied === 1}
              onCopy={() => copyCommand("git clone https://github.com/dmhernandez2525/qwen-tts-app.git && cd qwen-tts-app", 1)}
            />

            <InstallStep
              number="2"
              title="Run the Install Script"
              description="Creates Python virtual environment and installs dependencies."
              command="./scripts/install.sh"
              copied={copied === 2}
              onCopy={() => copyCommand("./scripts/install.sh", 2)}
            />

            <InstallStep
              number="3"
              title="Build the Mac App"
              command="cd QwenTTS && ./build.sh && cd .."
              copied={copied === 3}
              onCopy={() => copyCommand("cd QwenTTS && ./build.sh && cd ..", 3)}
            />

            <InstallStep
              number="4"
              title="Launch Everything"
              description="Starts the Python server and opens the app."
              command="./start.sh"
              copied={copied === 4}
              onCopy={() => copyCommand("./start.sh", 4)}
            />
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-300 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" />
              Important Notes
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>First generation is slow - models (~3GB each) download automatically</li>
              <li>Server must be running - the app auto-starts it, or click "Start Server"</li>
              <li>Python 3.11 is required (3.14 has compatibility issues)</li>
              <li>Output files are saved to <code className="bg-slate-700 px-1 rounded">~/Desktop/VoiceForge-Output/</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            <TroubleshootItem
              problem="Server won't start"
              solutions={[
                "Check Python version: python3 --version (must be 3.11 or 3.12)",
                "Check if port is in use: lsof -i :8765",
                "Check package installation: pip show qwen-tts"
              ]}
            />
            <TroubleshootItem
              problem="Generate button is disabled"
              solutions={[
                "Wait for server to start (green status indicator)",
                "Click 'Start Server' in the app",
                "Check server logs for errors"
              ]}
            />
            <TroubleshootItem
              problem="Out of memory errors"
              solutions={[
                "Close other applications",
                "Use the 0.6B model variants for lower memory usage",
                "Only one model loads at a time"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Installation complete?</h2>
          <p className="text-slate-400 mb-6">Check out the features and API documentation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/features" className="inline-flex items-center justify-center gap-2 bg-qwen-500 hover:bg-qwen-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Explore Features
            </Link>
            <Link to="/docs" className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              API Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ============================================================================
// CLOUD PAGE
// ============================================================================

function CloudPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white">
      {/* Custom Navigation for Cloud */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-950/80 backdrop-blur-md border-b border-indigo-800/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">VoiceForge Cloud</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">
              Desktop App
            </Link>
            <Link to="/docs" className="text-slate-300 hover:text-white transition-colors">
              API Docs
            </Link>
            <a href="#pricing" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-8">
            <Server className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm font-medium">Cloud API - No Setup Required</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            Voice Cloning API
            <br />
            <span className="text-4xl md:text-6xl">For Developers</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            The same powerful voice cloning technology, now available as a simple REST API.
            Clone voices, generate speech, and scale your application.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing"
               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              <Sparkles className="w-5 h-5" />
              Start Free Trial
            </a>
            <Link to="/docs"
               className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              <BookOpen className="w-5 h-5" />
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 px-4 bg-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">API Features</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Simple REST API</h3>
              <p className="text-slate-400 text-sm">Single endpoint for voice generation. POST your text and audio, get WAV back.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure & Reliable</h3>
              <p className="text-slate-400 text-sm">Enterprise-grade security. Audio processed and deleted immediately after generation.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Scale On Demand</h3>
              <p className="text-slate-400 text-sm">From prototype to production. Pay only for what you use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Integration</h2>
          <p className="text-slate-400 text-center mb-12">Get started with a single API call</p>

          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">curl</span>
            </div>
            <pre className="p-6 text-sm text-green-400 overflow-x-auto">
{`curl -X POST https://api.voiceforge.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, this is a cloned voice!",
    "reference_audio": "base64_encoded_audio",
    "reference_text": "Original audio transcript",
    "language": "English"
  }' \\
  --output voice.wav`}
            </pre>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-slate-400 text-center mb-12">Start free, scale as you grow</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free Trial"
              price="$0"
              period="forever"
              description="Perfect for testing"
              features={[
                "1,000 characters/month",
                "All 3 voice modes",
                "10 languages",
                "Community support"
              ]}
              limitations={[
                "Watermarked audio",
                "Rate limited"
              ]}
              cta="Start Free"
              highlighted={false}
            />
            <PricingCard
              name="Starter"
              price="$29"
              period="/month"
              description="For indie developers"
              features={[
                "100,000 characters/month",
                "All 3 voice modes",
                "10 languages",
                "No watermark",
                "Email support",
                "API key management"
              ]}
              cta="Get Started"
              highlighted={true}
            />
            <PricingCard
              name="Pro"
              price="$99"
              period="/month"
              description="For growing teams"
              features={[
                "500,000 characters/month",
                "All 3 voice modes",
                "10 languages",
                "Priority support",
                "Custom voice storage",
                "Webhook notifications",
                "Usage analytics"
              ]}
              cta="Contact Sales"
              highlighted={false}
            />
          </div>

          <p className="text-center text-slate-500 mt-8 text-sm">
            Need more? Enterprise plans with custom limits available.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Integrate?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Get your API key and start building in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing"
               className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              Get API Key
            </a>
            <Link to="/"
               className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              <Download className="w-5 h-5" />
              Or Download Free App
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">VoiceForge Cloud</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Desktop App</Link>
            <Link to="/docs" className="hover:text-white">API Docs</Link>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============================================================================
// DOCS PAGE
// ============================================================================

function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
          <p className="text-slate-400 mb-12">Complete reference for the VoiceForge REST API</p>

          {/* Base URL */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
            <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm">
              <span className="text-slate-400">Local:</span> http://127.0.0.1:8765<br/>
              <span className="text-slate-400">Cloud:</span> https://api.voiceforge.com/v1
            </div>
          </section>

          {/* Endpoints */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Endpoints</h2>

            <div className="space-y-8">
              <ApiDocEndpoint
                method="GET"
                path="/health"
                description="Check server status and loaded models"
                response={`{
  "status": "ok",
  "models_loaded": {
    "clone": true,
    "custom": false,
    "design": false
  }
}`}
              />

              <ApiDocEndpoint
                method="GET"
                path="/speakers"
                description="List available preset speakers"
                response={`{
  "speakers": [
    {"id": "Ryan", "lang": "en", "desc": "English male"},
    {"id": "Vivian", "lang": "zh", "desc": "Chinese female"}
  ]
}`}
              />

              <ApiDocEndpoint
                method="POST"
                path="/generate/clone"
                description="Clone voice from reference audio"
                request={`{
  "text": "Text to speak in cloned voice",
  "reference_audio": "/path/to/audio.wav",
  "reference_text": "Transcript of reference audio",
  "language": "English"
}`}
                response={`{
  "status": "success",
  "output_path": "/path/to/output.wav",
  "sample_rate": 24000
}`}
              />

              <ApiDocEndpoint
                method="POST"
                path="/generate/custom"
                description="Generate with preset voice"
                request={`{
  "text": "Hello world!",
  "speaker": "Ryan",
  "language": "English",
  "instruction": "Speak clearly"
}`}
                response={`{
  "status": "success",
  "output_path": "/path/to/output.wav",
  "sample_rate": 24000
}`}
              />

              <ApiDocEndpoint
                method="POST"
                path="/generate/design"
                description="Generate with designed voice"
                request={`{
  "text": "Hello world!",
  "voice_description": "A warm female voice with a British accent",
  "language": "English"
}`}
                response={`{
  "status": "success",
  "output_path": "/path/to/output.wav",
  "sample_rate": 24000
}`}
              />
            </div>
          </section>

          {/* Languages */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Supported Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {["English", "Chinese", "Japanese", "Korean", "German", "French", "Russian", "Portuguese", "Spanish", "Italian"].map(lang => (
                <div key={lang} className="bg-slate-800 rounded-lg px-3 py-2 text-sm text-center">
                  {lang}
                </div>
              ))}
            </div>
          </section>

          {/* Error Codes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Error Codes</h2>
            <div className="bg-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="text-left px-4 py-3">Code</th>
                    <th className="text-left px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr><td className="px-4 py-3 font-mono">400</td><td className="px-4 py-3">Invalid request parameters</td></tr>
                  <tr><td className="px-4 py-3 font-mono">404</td><td className="px-4 py-3">Endpoint not found</td></tr>
                  <tr><td className="px-4 py-3 font-mono">500</td><td className="px-4 py-3">Server error / model loading failed</td></tr>
                  <tr><td className="px-4 py-3 font-mono">503</td><td className="px-4 py-3">Server busy / model loading</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center backdrop-blur-sm">
      <div className="flex justify-center mb-2 text-qwen-400">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

function HowItWorksStep({ number, icon, title, description, color }) {
  const colors = {
    qwen: 'from-qwen-500 to-qwen-600',
    voice: 'from-voice-500 to-voice-600',
    green: 'from-green-500 to-green-600'
  }
  const bgColors = {
    qwen: 'bg-qwen-500/10 border-qwen-500/30',
    voice: 'bg-voice-500/10 border-voice-500/30',
    green: 'bg-green-500/10 border-green-500/30'
  }
  const textColors = {
    qwen: 'text-qwen-400',
    voice: 'text-voice-400',
    green: 'text-green-400'
  }

  return (
    <div className="relative">
      <div className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center relative`}>
        {/* Number badge */}
        <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${colors[color]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {number}
        </div>

        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl ${bgColors[color]} border flex items-center justify-center mx-auto mb-4 mt-2`}>
          <div className={textColors[color]}>{icon}</div>
        </div>

        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

function ModePreviewCard({ icon, title, description, tag, color, highlighted }) {
  const colorClasses = {
    qwen: 'border-qwen-500/50 bg-qwen-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5'
  }
  const tagColors = {
    qwen: 'bg-qwen-500 text-white',
    blue: 'bg-blue-500/20 text-blue-300',
    purple: 'bg-purple-500/20 text-purple-300'
  }

  return (
    <div className={`rounded-xl p-6 border transition-all ${highlighted ? colorClasses[color] : 'border-slate-700 bg-slate-800/50'} ${highlighted ? 'ring-2 ring-qwen-500/20' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-400">{icon}</div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${tagColors[color]}`}>{tag}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
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

function ModeDetailCard({ number, title, subtitle, description, features, code, highlighted }) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${highlighted ? 'border-qwen-500/50 bg-gradient-to-b from-qwen-500/5 to-transparent' : 'border-slate-700 bg-slate-800/30'}`}>
      <div className="p-8">
        <div className="flex items-start gap-4 mb-6">
          <span className={`text-4xl font-bold ${highlighted ? 'text-qwen-400' : 'text-slate-600'}`}>{number}</span>
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className={`text-sm ${highlighted ? 'text-qwen-400' : 'text-slate-500'}`}>{subtitle}</p>
          </div>
        </div>
        <p className="text-slate-400 mb-6">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-slate-900/50 border-t border-slate-700/50 p-4">
        <pre className="text-xs text-slate-400 overflow-x-auto">{code}</pre>
      </div>
    </div>
  )
}

function UseCaseDetailCard({ icon, title, description, examples }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
      <div className="text-qwen-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {examples.map((e, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
            <ChevronRight className="w-4 h-4 text-qwen-500" />
            {e}
          </li>
        ))}
      </ul>
    </div>
  )
}

function RequirementCard({ icon, title, subtitle }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center gap-4">
      <div className="text-qwen-400">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
  )
}

function InstallStep({ number, title, description, command, copied, onCopy }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-qwen-500 text-white text-sm font-bold flex items-center justify-center">
            {number}
          </span>
          <div>
            <p className="font-medium">{title}</p>
            {description && <p className="text-xs text-slate-400">{description}</p>}
          </div>
        </div>
        <button onClick={onCopy} className="text-slate-400 hover:text-white transition-colors p-2">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 overflow-x-auto">
        {command}
      </div>
    </div>
  )
}

function TroubleshootItem({ problem, solutions }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
      >
        <span className="font-medium">{problem}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-4">
          <ul className="space-y-2">
            {solutions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="text-qwen-400">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function PricingCard({ name, price, period, description, features, limitations, cta, highlighted }) {
  return (
    <div className={`rounded-2xl p-8 border ${
      highlighted
        ? 'bg-gradient-to-b from-indigo-600/20 to-purple-600/20 border-indigo-500/50 ring-2 ring-indigo-500/30'
        : 'bg-slate-800/50 border-slate-700/50'
    }`}>
      {highlighted && (
        <span className="inline-block bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          MOST POPULAR
        </span>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-slate-400">{period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            {f}
          </li>
        ))}
        {limitations?.map((l, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
            <X className="w-4 h-4 flex-shrink-0" />
            {l}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
        highlighted
          ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
          : 'bg-slate-700 hover:bg-slate-600 text-white'
      }`}>
        {cta}
      </button>
    </div>
  )
}

function ApiDocEndpoint({ method, path, description, request, response }) {
  const methodColors = {
    GET: 'bg-green-500/20 text-green-400',
    POST: 'bg-blue-500/20 text-blue-400'
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700 flex items-center gap-4">
        <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${methodColors[method]}`}>
          {method}
        </span>
        <code className="font-mono text-sm">{path}</code>
      </div>
      <div className="p-6">
        <p className="text-slate-300 mb-4">{description}</p>
        {request && (
          <div className="mb-4">
            <p className="text-xs text-slate-500 mb-2">Request Body:</p>
            <pre className="bg-slate-900 rounded-lg p-4 text-xs text-slate-300 overflow-x-auto">{request}</pre>
          </div>
        )}
        {response && (
          <div>
            <p className="text-xs text-slate-500 mb-2">Response:</p>
            <pre className="bg-slate-900 rounded-lg p-4 text-xs text-green-400 overflow-x-auto">{response}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
