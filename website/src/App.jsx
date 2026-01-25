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
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'
import './index.css'

function App() {
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd)
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
            <a href="#usage" className="text-slate-300 hover:text-white transition-colors hidden sm:block">Usage Guide</a>
            <a href="#install" className="text-slate-300 hover:text-white transition-colors hidden sm:block">Install</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors hidden sm:block">FAQ</a>
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
            <span className="text-qwen-300 text-sm font-medium">macOS Only - Apple Silicon Optimized</span>
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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            <StatCard icon={<Clock className="w-5 h-5" />} value="3 sec" label="Voice sample needed" />
            <StatCard icon={<Globe className="w-5 h-5" />} value="10" label="Languages supported" />
            <StatCard icon={<Shield className="w-5 h-5" />} value="100%" label="Local & private" />
            <StatCard icon={<Zap className="w-5 h-5" />} value="Free" label="Forever, no limits" />
          </div>

          {/* Workflow Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur">
              <h3 className="text-lg font-semibold mb-6 text-slate-300">How It Works</h3>
              <div className="grid md:grid-cols-5 gap-4 items-center">
                <WorkflowStep
                  number="1"
                  icon={<Volume2 className="w-6 h-6" />}
                  title="Upload Audio"
                  desc="3+ seconds of any voice"
                  color="qwen"
                />
                <ChevronRight className="w-6 h-6 text-slate-600 hidden md:block mx-auto" />
                <WorkflowStep
                  number="2"
                  icon={<FileAudio className="w-6 h-6" />}
                  title="Add Transcript"
                  desc="What the audio says"
                  color="voice"
                />
                <ChevronRight className="w-6 h-6 text-slate-600 hidden md:block mx-auto" />
                <WorkflowStep
                  number="3"
                  icon={<Wand2 className="w-6 h-6" />}
                  title="Generate"
                  desc="Type new text, clone voice"
                  color="green"
                />
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

      {/* Usage Guide Section */}
      <section id="usage" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Complete Usage Guide</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Three powerful modes for generating speech. Choose the one that fits your needs.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <UsageModeCard
              number="01"
              title="Preset Voices"
              subtitle="Fastest - No setup needed"
              description="Use built-in voices immediately. Perfect for quick text-to-speech without any audio samples."
              steps={[
                "Select the 'Preset Voices' tab",
                "Enter the text you want spoken",
                "Choose a language (English, Chinese, etc.)",
                "Pick a speaker (Ryan, Vivian, Aiden, etc.)",
                "Optionally add style: 'Speak happily' or 'Whisper'",
                "Click Generate and wait for audio"
              ]}
              tips={[
                "Ryan and Aiden are English male voices",
                "Vivian and Serena are Chinese female voices",
                "Style instructions modify tone and emotion"
              ]}
            />

            <UsageModeCard
              number="02"
              title="Voice Cloning"
              subtitle="Most powerful - Clone any voice"
              description="Clone someone's voice from just 3 seconds of audio. The cloned voice can say anything you type."
              highlighted
              steps={[
                "Select the 'Voice Clone' tab",
                "Click 'Browse' to select a reference audio file",
                "Enter the exact transcript of the audio",
                "Type the new text you want spoken",
                "Select the language",
                "Click Generate (first run downloads 3GB model)"
              ]}
              tips={[
                "Use clear audio without background noise",
                "3-10 seconds of audio works best",
                "Accurate transcript improves quality significantly",
                "WAV and MP3 formats supported"
              ]}
            />

            <UsageModeCard
              number="03"
              title="Voice Design"
              subtitle="Creative - Design voices from text"
              description="Describe the voice you want in natural language. Great for creating unique character voices."
              steps={[
                "Select the 'Voice Design' tab",
                "Describe the voice in detail",
                "Enter the text to be spoken",
                "Select the language",
                "Click Generate"
              ]}
              tips={[
                "Be specific: 'A deep male voice with a slight Southern US accent'",
                "Include age, gender, accent, and personality",
                "Experiment with emotional descriptions"
              ]}
              examplePrompt="A warm, friendly female voice with a slight British accent. Speaks clearly at a moderate pace with occasional enthusiasm."
            />
          </div>

          {/* App Interface Guide */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-qwen-400" />
              App Interface Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-3 text-qwen-300">Status Bar</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Green icon:</strong> Server running, ready to generate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Red status:</strong> Server stopped, click "Start Server"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Orange:</strong> Server starting or model loading</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-qwen-300">Controls</h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li><strong>Generate:</strong> Creates audio (disabled until server is ready)</li>
                  <li><strong>Play:</strong> Plays the last generated audio</li>
                  <li><strong>Open Folder:</strong> Opens output folder on Desktop</li>
                  <li><strong>Server Log:</strong> Shows Python server output for debugging</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Installation</h2>
          <p className="text-slate-400 text-center mb-12">
            Get up and running in under 5 minutes. Models download automatically on first use.
          </p>

          {/* Requirements */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <RequirementCard icon={<Apple />} title="macOS 12+" subtitle="Apple Silicon (M1/M2/M3)" />
            <RequirementCard icon={<MemoryStick />} title="8GB+ RAM" subtitle="16GB recommended" />
            <RequirementCard icon={<HardDrive />} title="~15GB Disk" subtitle="For models & app" />
          </div>

          {/* Install Steps */}
          <div className="space-y-6">
            <InstallStep
              number="1"
              title="Clone the Repository"
              command="git clone https://github.com/dmhernandez2525/qwen-tts-app.git && cd qwen-tts-app"
              onCopy={copyCommand}
            />

            <InstallStep
              number="2"
              title="Run the Install Script"
              description="This creates a Python virtual environment and installs all dependencies."
              command="./scripts/install.sh"
              onCopy={copyCommand}
            />

            <InstallStep
              number="3"
              title="Build the Mac App"
              command="cd QwenTTS && ./build.sh && cd .."
              onCopy={copyCommand}
            />

            <InstallStep
              number="4"
              title="Launch Everything"
              description="This starts the Python server and opens the app."
              command="./start.sh"
              onCopy={copyCommand}
            />
          </div>

          {/* Important Notes */}
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-300 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" />
              Important Notes
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• <strong>First generation is slow</strong> - models (~3GB each) download automatically</li>
              <li>• <strong>Server must be running</strong> - the app auto-starts it, or click "Start Server"</li>
              <li>• <strong>Python 3.11</strong> is required (3.14 has compatibility issues with some packages)</li>
              <li>• Output files are saved to <code className="bg-slate-700 px-1 rounded">~/Desktop/Qwen-TTS-Output/</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-center mb-12">
            Common questions and troubleshooting tips.
          </p>

          <div className="space-y-4">
            <FaqItem
              question="Why does the first generation take so long?"
              answer="The first time you generate audio, the app downloads the AI model (~3-4GB). This only happens once - subsequent generations are much faster. You can monitor progress in the server log."
              isOpen={openFaq === 0}
              onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
            />
            <FaqItem
              question="The 'Generate' button is disabled. What do I do?"
              answer="The Generate button is disabled when the server isn't running. Click 'Start Server' in the app window, or run './start.sh' from the terminal. Wait for the status to show 'Server: Ready' (green)."
              isOpen={openFaq === 1}
              onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
            />
            <FaqItem
              question="What audio formats are supported for voice cloning?"
              answer="WAV and MP3 formats are supported. For best results, use clear audio without background noise, music, or multiple speakers. 3-10 seconds of speech works best."
              isOpen={openFaq === 2}
              onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
            />
            <FaqItem
              question="How much RAM/disk space do I need?"
              answer="Minimum 8GB RAM (16GB recommended). Models require ~10-15GB disk space total. Only one model loads at a time, so you don't need all that RAM simultaneously."
              isOpen={openFaq === 3}
              onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
            />
            <FaqItem
              question="Can I use this commercially?"
              answer="The Qwen3-TTS model uses the Apache 2.0 license, which allows commercial use. However, always check the specific license terms and be mindful of ethical considerations when cloning voices."
              isOpen={openFaq === 4}
              onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
            />
            <FaqItem
              question="The server crashes or won't start"
              answer="1) Make sure Python 3.11 is installed (not 3.14). 2) Check if port 8765 is available: 'lsof -i :8765'. 3) Try running the server manually: 'source venv/bin/activate && python python-backend/server.py' to see error messages."
              isOpen={openFaq === 5}
              onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
            />
            <FaqItem
              question="How do I get the best voice cloning results?"
              answer="1) Use high-quality audio without noise. 2) Provide an accurate transcript of the reference audio. 3) Keep the reference audio between 3-10 seconds. 4) Match the language setting to the audio."
              isOpen={openFaq === 6}
              onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}
            />
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">API Reference</h2>
          <p className="text-slate-400 text-center mb-12">
            The Python server exposes a REST API for programmatic access.
          </p>

          <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-700">
              <h3 className="font-mono text-sm">Base URL: http://127.0.0.1:8765</h3>
            </div>
            <div className="divide-y divide-slate-700">
              <ApiEndpoint method="GET" path="/health" description="Check server status and loaded models" />
              <ApiEndpoint method="GET" path="/speakers" description="List available preset speakers" />
              <ApiEndpoint method="GET" path="/languages" description="List supported languages" />
              <ApiEndpoint method="POST" path="/load" description="Preload a model (clone, custom, design)" />
              <ApiEndpoint method="POST" path="/generate/custom" description="Generate with preset voice" />
              <ApiEndpoint method="POST" path="/generate/clone" description="Clone voice from reference audio" />
              <ApiEndpoint method="POST" path="/generate/design" description="Generate with designed voice" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="https://github.com/dmhernandez2525/qwen-tts-app#api-endpoints"
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 text-qwen-400 hover:text-qwen-300 transition-colors">
              <BookOpen className="w-4 h-4" />
              View full API documentation on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-qwen-500 to-voice-500 flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Qwen TTS</span>
            </div>
            <p className="text-slate-500 text-sm text-center">
              Powered by <a href="https://github.com/QwenLM/Qwen3-TTS" target="_blank" rel="noopener noreferrer" className="text-qwen-400 hover:underline">Qwen3-TTS</a> from Alibaba Cloud.
              Open source under Apache 2.0 license.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/dmhernandez2525/qwen-tts-app" target="_blank" rel="noopener noreferrer"
                 className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component definitions

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
      <div className="flex justify-center mb-2 text-qwen-400">{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

function WorkflowStep({ number, icon, title, desc, color }) {
  const colors = {
    qwen: 'bg-qwen-500/20 text-qwen-400',
    voice: 'bg-voice-500/20 text-voice-400',
    green: 'bg-green-500/20 text-green-400'
  }
  return (
    <div className="text-center">
      <div className={`w-14 h-14 rounded-xl ${colors[color]} flex items-center justify-center mx-auto mb-3`}>
        {icon}
      </div>
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-slate-400">{desc}</p>
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

function UsageModeCard({ number, title, subtitle, description, steps, tips, examplePrompt, highlighted }) {
  return (
    <div className={`rounded-xl p-6 border transition-all ${
      highlighted
        ? 'bg-gradient-to-b from-qwen-500/10 to-voice-500/10 border-qwen-500/50'
        : 'bg-slate-800/50 border-slate-700/50'
    }`}>
      <span className="text-5xl font-bold text-slate-700/50">{number}</span>
      <h3 className="font-semibold text-xl mt-2">{title}</h3>
      <p className="text-qwen-400 text-sm mb-3">{subtitle}</p>
      <p className="text-slate-400 text-sm mb-4">{description}</p>

      <h4 className="font-medium text-sm mb-2">Steps:</h4>
      <ol className="space-y-1 mb-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-qwen-400 font-mono text-xs mt-0.5">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>

      {tips && (
        <>
          <h4 className="font-medium text-sm mb-2">Tips:</h4>
          <ul className="space-y-1">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-green-400">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </>
      )}

      {examplePrompt && (
        <div className="mt-4 bg-slate-900/50 rounded-lg p-3">
          <p className="text-xs text-slate-500 mb-1">Example description:</p>
          <p className="text-xs text-slate-300 italic">"{examplePrompt}"</p>
        </div>
      )}
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

function InstallStep({ number, title, description, command, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors p-2">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 overflow-x-auto">
        {command}
      </div>
    </div>
  )
}

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/30 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-sm text-slate-300">
          {answer}
        </div>
      )}
    </div>
  )
}

function ApiEndpoint({ method, path, description }) {
  const methodColors = {
    GET: 'bg-green-500/20 text-green-400',
    POST: 'bg-blue-500/20 text-blue-400'
  }

  return (
    <div className="px-6 py-4 flex items-center gap-4">
      <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${methodColors[method]}`}>
        {method}
      </span>
      <code className="font-mono text-sm text-slate-300">{path}</code>
      <span className="text-sm text-slate-400 ml-auto">{description}</span>
    </div>
  )
}

export default App
