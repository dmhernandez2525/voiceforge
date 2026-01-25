import Cocoa
import AVFoundation

class MainWindowController: NSWindowController {
    private var tabView: NSTabView!
    private var serverStatusLabel: NSTextField!
    private var generateButton: NSButton!
    private var playButton: NSButton!
    private var progressIndicator: NSProgressIndicator!
    private var outputPathLabel: NSTextField!
    private var logTextView: NSTextView!

    // Custom Voice tab
    private var customTextView: NSTextView!
    private var customLanguagePopup: NSPopUpButton!
    private var customSpeakerPopup: NSPopUpButton!
    private var customInstructField: NSTextField!

    // Voice Clone tab
    private var cloneTextView: NSTextView!
    private var cloneLanguagePopup: NSPopUpButton!
    private var cloneRefAudioPath: NSTextField!
    private var cloneRefTextView: NSTextView!

    // Voice Design tab
    private var designTextView: NSTextView!
    private var designLanguagePopup: NSPopUpButton!
    private var designDescriptionView: NSTextView!

    private var currentOutputPath: String?

    init() {
        let window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 700, height: 600),
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )
        window.title = "Qwen3-TTS Voice Generator"
        window.center()
        window.minSize = NSSize(width: 600, height: 500)

        super.init(window: window)

        setupUI()
        loadData()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) not implemented")
    }

    // MARK: - UI Setup

    private func setupUI() {
        guard let contentView = window?.contentView else { return }
        contentView.wantsLayer = true

        let mainStack = NSStackView()
        mainStack.orientation = .vertical
        mainStack.spacing = 12
        mainStack.edgeInsets = NSEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)
        mainStack.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(mainStack)

        NSLayoutConstraint.activate([
            mainStack.topAnchor.constraint(equalTo: contentView.topAnchor),
            mainStack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            mainStack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            mainStack.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),
        ])

        // Server status bar
        let statusBar = createStatusBar()
        mainStack.addArrangedSubview(statusBar)

        // Tab view
        tabView = NSTabView()
        tabView.tabViewType = .topTabsBezelBorder

        let customTab = NSTabViewItem(identifier: "custom")
        customTab.label = "Preset Voices"
        customTab.view = createCustomVoiceTab()
        tabView.addTabViewItem(customTab)

        let cloneTab = NSTabViewItem(identifier: "clone")
        cloneTab.label = "Voice Clone"
        cloneTab.view = createVoiceCloneTab()
        tabView.addTabViewItem(cloneTab)

        let designTab = NSTabViewItem(identifier: "design")
        designTab.label = "Voice Design"
        designTab.view = createVoiceDesignTab()
        tabView.addTabViewItem(designTab)

        mainStack.addArrangedSubview(tabView)

        // Bottom controls
        let bottomControls = createBottomControls()
        mainStack.addArrangedSubview(bottomControls)

        // Log view (collapsible)
        let logContainer = createLogView()
        mainStack.addArrangedSubview(logContainer)
    }

    private func createStatusBar() -> NSView {
        let container = NSStackView()
        container.orientation = .horizontal
        container.spacing = 8

        serverStatusLabel = NSTextField(labelWithString: "Server: Starting...")
        serverStatusLabel.font = .systemFont(ofSize: 12, weight: .medium)

        let helpLabel = NSTextField(labelWithString: "First generation downloads ~3GB model")
        helpLabel.font = .systemFont(ofSize: 10)
        helpLabel.textColor = .secondaryLabelColor

        let startButton = NSButton(title: "Start Server", target: self, action: #selector(startServerAction))
        startButton.bezelStyle = .rounded
        startButton.controlSize = .small

        container.addArrangedSubview(serverStatusLabel)
        container.addArrangedSubview(helpLabel)
        container.addArrangedSubview(NSView()) // Spacer
        container.addArrangedSubview(startButton)

        return container
    }

    private func createCustomVoiceTab() -> NSView {
        let container = NSView()

        let stack = NSStackView()
        stack.orientation = .vertical
        stack.spacing = 12
        stack.alignment = .leading
        stack.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(stack)

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: container.topAnchor, constant: 12),
            stack.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 12),
            stack.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -12),
            stack.bottomAnchor.constraint(lessThanOrEqualTo: container.bottomAnchor, constant: -12),
        ])

        // Text input
        let textLabel = NSTextField(labelWithString: "Text to speak:")
        stack.addArrangedSubview(textLabel)

        let textScroll = NSScrollView()
        textScroll.hasVerticalScroller = true
        textScroll.borderType = .bezelBorder
        customTextView = NSTextView()
        customTextView.isRichText = false
        customTextView.font = .systemFont(ofSize: 13)
        customTextView.string = "Hello, this is a test of the Qwen text-to-speech system."
        textScroll.documentView = customTextView
        textScroll.translatesAutoresizingMaskIntoConstraints = false
        textScroll.heightAnchor.constraint(equalToConstant: 100).isActive = true
        stack.addArrangedSubview(textScroll)

        // Language and Speaker row
        let optionsRow = NSStackView()
        optionsRow.orientation = .horizontal
        optionsRow.spacing = 16

        let langLabel = NSTextField(labelWithString: "Language:")
        customLanguagePopup = NSPopUpButton()
        customLanguagePopup.addItems(withTitles: ["English", "Chinese", "Japanese", "Korean", "Auto"])

        let speakerLabel = NSTextField(labelWithString: "Speaker:")
        customSpeakerPopup = NSPopUpButton()
        customSpeakerPopup.addItems(withTitles: ["Ryan", "Aiden", "Vivian", "Serena", "Dylan", "Eric"])

        optionsRow.addArrangedSubview(langLabel)
        optionsRow.addArrangedSubview(customLanguagePopup)
        optionsRow.addArrangedSubview(speakerLabel)
        optionsRow.addArrangedSubview(customSpeakerPopup)
        optionsRow.addArrangedSubview(NSView()) // Spacer

        stack.addArrangedSubview(optionsRow)

        // Instruction field
        let instructLabel = NSTextField(labelWithString: "Style instruction (optional):")
        stack.addArrangedSubview(instructLabel)

        customInstructField = NSTextField()
        customInstructField.placeholderString = "e.g., Speak happily, Whisper softly, Read slowly..."
        customInstructField.translatesAutoresizingMaskIntoConstraints = false
        customInstructField.widthAnchor.constraint(greaterThanOrEqualToConstant: 400).isActive = true
        stack.addArrangedSubview(customInstructField)

        return container
    }

    private func createVoiceCloneTab() -> NSView {
        let container = NSView()

        let stack = NSStackView()
        stack.orientation = .vertical
        stack.spacing = 12
        stack.alignment = .leading
        stack.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(stack)

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: container.topAnchor, constant: 12),
            stack.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 12),
            stack.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -12),
            stack.bottomAnchor.constraint(lessThanOrEqualTo: container.bottomAnchor, constant: -12),
        ])

        // Reference audio
        let refLabel = NSTextField(labelWithString: "Reference Audio (3+ seconds):")
        stack.addArrangedSubview(refLabel)

        let refRow = NSStackView()
        refRow.orientation = .horizontal
        refRow.spacing = 8

        cloneRefAudioPath = NSTextField()
        cloneRefAudioPath.isEditable = false
        cloneRefAudioPath.placeholderString = "Select audio file..."
        cloneRefAudioPath.translatesAutoresizingMaskIntoConstraints = false
        cloneRefAudioPath.widthAnchor.constraint(greaterThanOrEqualToConstant: 350).isActive = true

        let browseButton = NSButton(title: "Browse...", target: self, action: #selector(browseRefAudio))
        browseButton.bezelStyle = .rounded

        refRow.addArrangedSubview(cloneRefAudioPath)
        refRow.addArrangedSubview(browseButton)
        stack.addArrangedSubview(refRow)

        // Reference text
        let refTextLabel = NSTextField(labelWithString: "Transcript of reference audio:")
        stack.addArrangedSubview(refTextLabel)

        let refTextScroll = NSScrollView()
        refTextScroll.hasVerticalScroller = true
        refTextScroll.borderType = .bezelBorder
        cloneRefTextView = NSTextView()
        cloneRefTextView.isRichText = false
        cloneRefTextView.font = .systemFont(ofSize: 13)
        cloneRefTextView.string = ""
        refTextScroll.documentView = cloneRefTextView
        refTextScroll.translatesAutoresizingMaskIntoConstraints = false
        refTextScroll.heightAnchor.constraint(equalToConstant: 60).isActive = true
        stack.addArrangedSubview(refTextScroll)

        // Text to generate
        let textLabel = NSTextField(labelWithString: "Text to speak (in cloned voice):")
        stack.addArrangedSubview(textLabel)

        let textScroll = NSScrollView()
        textScroll.hasVerticalScroller = true
        textScroll.borderType = .bezelBorder
        cloneTextView = NSTextView()
        cloneTextView.isRichText = false
        cloneTextView.font = .systemFont(ofSize: 13)
        cloneTextView.string = "This is the cloned voice speaking new text."
        textScroll.documentView = cloneTextView
        textScroll.translatesAutoresizingMaskIntoConstraints = false
        textScroll.heightAnchor.constraint(equalToConstant: 80).isActive = true
        stack.addArrangedSubview(textScroll)

        // Language
        let langRow = NSStackView()
        langRow.orientation = .horizontal
        langRow.spacing = 8

        let langLabel = NSTextField(labelWithString: "Language:")
        cloneLanguagePopup = NSPopUpButton()
        cloneLanguagePopup.addItems(withTitles: ["English", "Chinese", "Japanese", "Korean", "Auto"])

        langRow.addArrangedSubview(langLabel)
        langRow.addArrangedSubview(cloneLanguagePopup)
        langRow.addArrangedSubview(NSView())
        stack.addArrangedSubview(langRow)

        return container
    }

    private func createVoiceDesignTab() -> NSView {
        let container = NSView()

        let stack = NSStackView()
        stack.orientation = .vertical
        stack.spacing = 12
        stack.alignment = .leading
        stack.translatesAutoresizingMaskIntoConstraints = false
        container.addSubview(stack)

        NSLayoutConstraint.activate([
            stack.topAnchor.constraint(equalTo: container.topAnchor, constant: 12),
            stack.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 12),
            stack.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -12),
            stack.bottomAnchor.constraint(lessThanOrEqualTo: container.bottomAnchor, constant: -12),
        ])

        // Voice description
        let descLabel = NSTextField(labelWithString: "Describe the voice you want:")
        stack.addArrangedSubview(descLabel)

        let descScroll = NSScrollView()
        descScroll.hasVerticalScroller = true
        descScroll.borderType = .bezelBorder
        designDescriptionView = NSTextView()
        designDescriptionView.isRichText = false
        designDescriptionView.font = .systemFont(ofSize: 13)
        designDescriptionView.string = "A warm, friendly female voice with a slight British accent. Speaks clearly and at a moderate pace."
        descScroll.documentView = designDescriptionView
        descScroll.translatesAutoresizingMaskIntoConstraints = false
        descScroll.heightAnchor.constraint(equalToConstant: 80).isActive = true
        stack.addArrangedSubview(descScroll)

        // Text to generate
        let textLabel = NSTextField(labelWithString: "Text to speak:")
        stack.addArrangedSubview(textLabel)

        let textScroll = NSScrollView()
        textScroll.hasVerticalScroller = true
        textScroll.borderType = .bezelBorder
        designTextView = NSTextView()
        designTextView.isRichText = false
        designTextView.font = .systemFont(ofSize: 13)
        designTextView.string = "Hello! Welcome to Qwen text-to-speech. I hope you're having a wonderful day."
        textScroll.documentView = designTextView
        textScroll.translatesAutoresizingMaskIntoConstraints = false
        textScroll.heightAnchor.constraint(equalToConstant: 80).isActive = true
        stack.addArrangedSubview(textScroll)

        // Language
        let langRow = NSStackView()
        langRow.orientation = .horizontal
        langRow.spacing = 8

        let langLabel = NSTextField(labelWithString: "Language:")
        designLanguagePopup = NSPopUpButton()
        designLanguagePopup.addItems(withTitles: ["English", "Chinese", "Japanese", "Korean", "Auto"])

        langRow.addArrangedSubview(langLabel)
        langRow.addArrangedSubview(designLanguagePopup)
        langRow.addArrangedSubview(NSView())
        stack.addArrangedSubview(langRow)

        return container
    }

    private func createBottomControls() -> NSView {
        let container = NSStackView()
        container.orientation = .horizontal
        container.spacing = 12

        // Progress indicator
        progressIndicator = NSProgressIndicator()
        progressIndicator.style = .spinning
        progressIndicator.isHidden = true

        // Output path
        outputPathLabel = NSTextField(labelWithString: "")
        outputPathLabel.font = .systemFont(ofSize: 11)
        outputPathLabel.textColor = .secondaryLabelColor
        outputPathLabel.lineBreakMode = .byTruncatingMiddle

        // Buttons
        generateButton = NSButton(title: "Generate", target: self, action: #selector(generateAction))
        generateButton.bezelStyle = .rounded
        generateButton.keyEquivalent = "\r"

        playButton = NSButton(title: "Play", target: self, action: #selector(playAction))
        playButton.bezelStyle = .rounded
        playButton.isEnabled = false

        let openFolderButton = NSButton(title: "Open Folder", target: self, action: #selector(openFolderAction))
        openFolderButton.bezelStyle = .rounded

        container.addArrangedSubview(progressIndicator)
        container.addArrangedSubview(outputPathLabel)
        container.addArrangedSubview(NSView()) // Spacer
        container.addArrangedSubview(openFolderButton)
        container.addArrangedSubview(playButton)
        container.addArrangedSubview(generateButton)

        return container
    }

    private func createLogView() -> NSView {
        let disclosure = NSButton(title: "Show Server Log", target: self, action: #selector(toggleLog))
        disclosure.bezelStyle = .disclosure
        disclosure.setButtonType(.pushOnPushOff)

        let logScroll = NSScrollView()
        logScroll.hasVerticalScroller = true
        logScroll.borderType = .bezelBorder
        logScroll.isHidden = true
        logScroll.identifier = NSUserInterfaceItemIdentifier("logScroll")

        logTextView = NSTextView()
        logTextView.isEditable = false
        logTextView.font = .monospacedSystemFont(ofSize: 10, weight: .regular)
        logTextView.backgroundColor = NSColor(white: 0.1, alpha: 1)
        logTextView.textColor = .systemGreen
        logScroll.documentView = logTextView

        logScroll.translatesAutoresizingMaskIntoConstraints = false
        logScroll.heightAnchor.constraint(equalToConstant: 120).isActive = true

        let stack = NSStackView()
        stack.orientation = .vertical
        stack.spacing = 4
        stack.addArrangedSubview(disclosure)
        stack.addArrangedSubview(logScroll)

        return stack
    }

    // MARK: - Data Loading

    private func loadData() {
        ServerManager.shared.checkServerStatus { [weak self] running in
            DispatchQueue.main.async {
                self?.updateServerStatus(running)
            }
        }
    }

    // MARK: - Actions

    @objc private func startServerAction() {
        ServerManager.shared.startServer { success, message in
            if !success {
                DispatchQueue.main.async { [weak self] in
                    self?.showError(message)
                }
            }
        }
    }

    @objc private func browseRefAudio() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.audio, .wav, .mp3]
        panel.allowsMultipleSelection = false

        if panel.runModal() == .OK, let url = panel.url {
            cloneRefAudioPath.stringValue = url.path
        }
    }

    @objc private func generateAction() {
        guard let selectedTab = tabView.selectedTabViewItem?.identifier as? String else { return }

        switch selectedTab {
        case "custom":
            generateCustomVoice()
        case "clone":
            generateVoiceClone()
        case "design":
            generateVoiceDesign()
        default:
            break
        }
    }

    private func generateCustomVoice() {
        let text = customTextView.string.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else {
            showError("Please enter text to speak")
            return
        }

        let language = customLanguagePopup.titleOfSelectedItem ?? "English"
        let speaker = customSpeakerPopup.titleOfSelectedItem ?? "Ryan"
        let instruct = customInstructField.stringValue

        TTSManager.shared.generateCustomVoice(
            text: text,
            language: language,
            speaker: speaker,
            instruct: instruct
        ) { _ in }
    }

    private func generateVoiceClone() {
        let text = cloneTextView.string.trimmingCharacters(in: .whitespacesAndNewlines)
        let refPath = cloneRefAudioPath.stringValue
        let refText = cloneRefTextView.string.trimmingCharacters(in: .whitespacesAndNewlines)

        guard !text.isEmpty else {
            showError("Please enter text to speak")
            return
        }

        guard !refPath.isEmpty else {
            showError("Please select a reference audio file")
            return
        }

        let language = cloneLanguagePopup.titleOfSelectedItem ?? "English"

        TTSManager.shared.generateVoiceClone(
            text: text,
            language: language,
            refAudioPath: refPath,
            refText: refText
        ) { _ in }
    }

    private func generateVoiceDesign() {
        let text = designTextView.string.trimmingCharacters(in: .whitespacesAndNewlines)
        let description = designDescriptionView.string.trimmingCharacters(in: .whitespacesAndNewlines)

        guard !text.isEmpty else {
            showError("Please enter text to speak")
            return
        }

        guard !description.isEmpty else {
            showError("Please describe the voice you want")
            return
        }

        let language = designLanguagePopup.titleOfSelectedItem ?? "English"

        TTSManager.shared.generateVoiceDesign(
            text: text,
            language: language,
            voiceDescription: description
        ) { _ in }
    }

    @objc private func playAction() {
        guard let path = currentOutputPath else { return }
        TTSManager.shared.playAudio(at: path)
    }

    @objc private func openFolderAction() {
        NSWorkspace.shared.open(URL(fileURLWithPath: Paths.outputBase))
    }

    @objc private func toggleLog(_ sender: NSButton) {
        guard let stack = sender.superview as? NSStackView,
              let logScroll = stack.arrangedSubviews.last else { return }

        logScroll.isHidden = sender.state == .off
        sender.title = sender.state == .on ? "Hide Server Log" : "Show Server Log"
    }

    // MARK: - Public Interface

    func updateServerStatus(_ running: Bool) {
        serverStatusLabel.stringValue = running ? "Server: Ready" : "Server: Stopped"
        serverStatusLabel.textColor = running ? .systemGreen : .systemRed
        generateButton.isEnabled = running
        if running {
            outputPathLabel.stringValue = "Ready to generate. First run downloads model (~3GB)."
        }
    }

    func showServerStarting() {
        serverStatusLabel.stringValue = "Server: Starting..."
        serverStatusLabel.textColor = .systemOrange
        generateButton.isEnabled = false
        outputPathLabel.stringValue = "Starting Python server..."
    }

    func showServerError(_ message: String) {
        serverStatusLabel.stringValue = "Server: Error"
        serverStatusLabel.textColor = .systemRed
        generateButton.isEnabled = false
        outputPathLabel.stringValue = "Error: \(message)"
    }

    func showGenerating(_ generating: Bool) {
        progressIndicator.isHidden = !generating
        if generating {
            progressIndicator.startAnimation(nil)
            outputPathLabel.stringValue = "Generating audio (first run downloads model)..."
        } else {
            progressIndicator.stopAnimation(nil)
        }
        generateButton.isEnabled = !generating
    }

    func setOutputPath(_ path: String) {
        currentOutputPath = path
        outputPathLabel.stringValue = "Done! Output: " + URL(fileURLWithPath: path).lastPathComponent
        playButton.isEnabled = true
    }

    func showError(_ message: String) {
        outputPathLabel.stringValue = "Error: \(message)"
        let alert = NSAlert()
        alert.messageText = "Error"
        alert.informativeText = message
        alert.alertStyle = .warning
        alert.runModal()
    }

    func appendLog(_ text: String) {
        logTextView.string += text
        logTextView.scrollToEndOfDocument(nil)
    }
}
