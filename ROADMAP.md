# VoiceForge Roadmap

## Current Version: 1.0

VoiceForge currently offers:
- 3-second voice cloning
- 6 preset voices with style instructions
- Voice design from text descriptions
- 10 language support
- 100% local processing on Apple Silicon
- macOS menu bar app
- REST API for automation

---

## Phase 2: Enhanced Voice Quality (Q1 2026)

### Goals
- Improved voice cloning accuracy
- Better emotion/prosody control
- Longer audio generation support

### Features
- [ ] Extended audio generation (up to 5 minutes)
- [ ] Emotion presets (happy, sad, excited, calm)
- [ ] Fine-grained prosody control
- [ ] Audio post-processing options
- [ ] Batch generation mode

---

## Phase 3: Conversational Voice Design - PersonaPlex Integration (Q2 2026)

### Overview

Integrate NVIDIA's PersonaPlex to enable natural, conversational voice design. Instead of filling forms and tweaking parameters, users will simply describe what they want in a conversation.

### What is PersonaPlex?

PersonaPlex is NVIDIA's open-source **full duplex** conversational AI model:
- **Full Duplex**: Listens and speaks simultaneously
- **Back-channeling**: Says "uh-huh", "got it" while you speak
- **Near-zero latency**: <500ms response time
- **7B parameters**: Based on Moshi architecture
- **Open source**: Apache 2.0 license

### Feature: Voice Design Conversation

**Current Workflow:**
```
1. Open Voice Design tab
2. Type description: "warm British female voice"
3. Click Generate
4. Listen to result
5. Adjust description
6. Repeat until satisfied
```

**With PersonaPlex:**
```
You: "I need a voice for my podcast intro"
VoiceForge: "Sure! What style are you going for?"
You: "Professional but friendly, like a news anchor"
VoiceForge: "Male or female?"
You: "Female"
VoiceForge: "Here's what I'm thinking..." [plays sample]
You: "Good, but make it warmer"
VoiceForge: "How's this?" [plays adjusted sample]
You: "Perfect, save that"
VoiceForge: "Saved as 'Podcast Intro Voice'. Anything else?"
```

### Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VoiceForge + PersonaPlex                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PersonaPlex Server                       │   │
│  │              (Port 8998, Full Duplex)                 │   │
│  │                                                       │   │
│  │  ┌─────────────┐       ┌─────────────────────────┐   │   │
│  │  │   User      │◄─────►│   Conversation Engine   │   │   │
│  │  │   Audio     │       │   (Voice Design Agent)  │   │   │
│  │  └─────────────┘       └─────────────────────────┘   │   │
│  │                                 │                     │   │
│  │                                 │ Voice parameters    │   │
│  │                                 ▼                     │   │
│  │                        ┌─────────────────────────┐   │   │
│  │                        │   Qwen3-TTS Server      │   │   │
│  │                        │   (Port 8765)           │   │   │
│  │                        └─────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Milestones

| Milestone | Description | Duration |
|-----------|-------------|----------|
| M1 | PersonaPlex server setup | 1 week |
| M2 | Voice Design Agent prompt engineering | 1 week |
| M3 | Audio stream integration | 1 week |
| M4 | Swift app UI for conversation mode | 1 week |
| M5 | Qwen3-TTS parameter mapping | 1 week |
| M6 | Testing and refinement | 2 weeks |

### Voice Design Agent Capabilities

The PersonaPlex-powered agent will understand:
- **Gender**: male, female, androgynous
- **Age**: child, young adult, middle-aged, elderly
- **Accent**: British, American, Australian, etc.
- **Tone**: warm, professional, energetic, calm
- **Speed**: fast, slow, natural
- **Pitch**: high, low, natural
- **Emotion**: happy, sad, excited, neutral

### Example Conversations

**Podcast Intro:**
```
User: "I need an intro voice for my tech podcast"
Agent: "Cool, tech podcast! What vibe - casual like a friend, or polished like NPR?"
User: "Casual but smart"
Agent: "Got it. Male or female voice?"
User: "Male"
Agent: "How about this?" [plays sample]
User: "Good energy, but a bit younger sounding"
Agent: "Like this?" [adjusts, plays]
User: "Yes! Save it"
```

**Audiobook Character:**
```
User: "I'm creating an audiobook and need a villain voice"
Agent: "Ooh, villain! Classic evil or more subtle and cunning?"
User: "Subtle, like they're always one step ahead"
Agent: "British accent might work well for that..."
User: "Yeah, try that"
Agent: "Something like this?" [plays sample]
User: "More sinister"
Agent: "How's this version?" [darker tone]
User: "Perfect"
```

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| VRAM | 24GB | 32GB+ |
| RAM | 32GB | 64GB |
| Storage | 65GB | 100GB |
| GPU | Apple M2 Pro | Apple M2 Max/Ultra |

**Note:** Mac M2 Max with 96GB unified memory is fully compatible.

### Success Metrics

- [ ] Voice design conversation feels natural
- [ ] <3 iterations to achieve desired voice (vs 5+ today)
- [ ] User satisfaction >4/5 rating
- [ ] Works offline after initial setup

---

## Phase 4: Cross-Platform Support (Q3 2026)

### Goals
- Bring VoiceForge to more platforms
- Web-based interface option

### Features
- [ ] Windows support (WSL2 + GPU passthrough)
- [ ] Linux support
- [ ] Web interface for remote access
- [ ] Mobile companion app (iOS/Android)

---

## Phase 5: Multi-Voice Projects (Q4 2026)

### Goals
- Support for complex audio productions
- Multiple voices in single project

### Features
- [ ] Voice project files (save multiple voices)
- [ ] Scene/chapter organization
- [ ] Timeline-based editing
- [ ] Export presets (podcast, audiobook, video)
- [ ] Collaboration features

---

## Contributing

Want to help build VoiceForge? Here's how:

1. Check the roadmap for upcoming features
2. Open an issue to discuss your idea
3. Submit a PR with tests
4. Update documentation

Priority areas:
- PersonaPlex integration
- Voice quality improvements
- Cross-platform support

---

## License

Apache License 2.0
