import Cocoa
import AVFoundation

class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private var mainWindow: MainWindowController?
    private var serverStatusTimer: Timer?

    private var serverRunning = false

    // MARK: - Lifecycle

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Create output directory
        try? FileManager.default.createDirectory(atPath: Paths.outputBase, withIntermediateDirectories: true)
        try? FileManager.default.createDirectory(atPath: Paths.appSupport, withIntermediateDirectories: true)

        // Setup status bar
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        statusItem.autosaveName = "QwenTTSStatusItem"
        updateStatusIcon()
        setupMenu()

        // Setup callbacks
        setupServerCallbacks()
        setupTTSCallbacks()

        // Check server status periodically
        startServerStatusMonitor()

        // Auto-start server on launch
        autoStartServer()

        // Show main window
        showMainWindow()
    }

    private func autoStartServer() {
        // Check if server is already running, if not start it
        ServerManager.shared.checkServerStatus { [weak self] running in
            if !running {
                DispatchQueue.main.async {
                    self?.mainWindow?.showServerStarting()
                    ServerManager.shared.startServer { success, message in
                        DispatchQueue.main.async {
                            if success {
                                self?.mainWindow?.updateServerStatus(true)
                            } else {
                                self?.mainWindow?.showServerError(message)
                            }
                        }
                    }
                }
            }
        }
    }

    func applicationWillTerminate(_ notification: Notification) {
        serverStatusTimer?.invalidate()
    }

    // MARK: - Callbacks

    private func setupServerCallbacks() {
        ServerManager.shared.onStatusChanged = { [weak self] running in
            DispatchQueue.main.async {
                self?.serverRunning = running
                self?.updateStatusIcon()
                self?.setupMenu()
                self?.mainWindow?.updateServerStatus(running)
            }
        }

        ServerManager.shared.onLog = { [weak self] log in
            self?.mainWindow?.appendLog(log)
        }
    }

    private func setupTTSCallbacks() {
        TTSManager.shared.onGenerationStarted = { [weak self] in
            self?.mainWindow?.showGenerating(true)
        }

        TTSManager.shared.onGenerationComplete = { [weak self] path in
            self?.mainWindow?.showGenerating(false)
            self?.mainWindow?.setOutputPath(path)
            showSystemNotification(title: "Generation Complete", body: "Audio saved to output folder")
        }

        TTSManager.shared.onError = { [weak self] error in
            self?.mainWindow?.showGenerating(false)
            self?.mainWindow?.showError(error)
        }
    }

    // MARK: - Server Status Monitor

    private func startServerStatusMonitor() {
        serverStatusTimer = Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { [weak self] _ in
            ServerManager.shared.checkServerStatus { running in
                DispatchQueue.main.async {
                    if self?.serverRunning != running {
                        self?.serverRunning = running
                        self?.updateStatusIcon()
                        self?.setupMenu()
                        self?.mainWindow?.updateServerStatus(running)
                    }
                }
            }
        }
    }

    // MARK: - Status Icon

    private func updateStatusIcon() {
        guard let button = statusItem.button else { return }

        if serverRunning {
            if let image = NSImage(systemSymbolName: "waveform.circle.fill", accessibilityDescription: "TTS Ready") {
                let config = NSImage.SymbolConfiguration(paletteColors: [.systemGreen])
                button.image = image.withSymbolConfiguration(config)
            }
        } else {
            button.image = NSImage(systemSymbolName: "waveform.circle", accessibilityDescription: "VoiceForge")
            button.image?.isTemplate = true
        }
    }

    // MARK: - Menu

    private func setupMenu() {
        let menu = NSMenu()

        // Status
        let statusItem = NSMenuItem(title: serverRunning ? "Server: Running" : "Server: Stopped", action: nil, keyEquivalent: "")
        statusItem.isEnabled = false
        if let icon = NSImage(systemSymbolName: serverRunning ? "checkmark.circle.fill" : "xmark.circle", accessibilityDescription: nil) {
            let config = NSImage.SymbolConfiguration(paletteColors: [serverRunning ? .systemGreen : .systemRed])
            statusItem.image = icon.withSymbolConfiguration(config)
        }
        menu.addItem(statusItem)

        menu.addItem(NSMenuItem.separator())

        // Server controls
        if serverRunning {
            menu.addItem(NSMenuItem(title: "Stop Server", action: #selector(stopServer), keyEquivalent: ""))
        } else {
            menu.addItem(NSMenuItem(title: "Start Server", action: #selector(startServer), keyEquivalent: ""))
        }

        menu.addItem(NSMenuItem.separator())

        // Main actions
        menu.addItem(NSMenuItem(title: "Open TTS Window...", action: #selector(showMainWindow), keyEquivalent: "t"))
        menu.addItem(NSMenuItem(title: "Open Output Folder", action: #selector(openOutputFolder), keyEquivalent: ""))

        menu.addItem(NSMenuItem.separator())

        // Preload models
        let modelsMenu = NSMenu()
        modelsMenu.addItem(NSMenuItem(title: "Load Clone Model", action: #selector(preloadClone), keyEquivalent: ""))
        modelsMenu.addItem(NSMenuItem(title: "Load Custom Voice Model", action: #selector(preloadCustom), keyEquivalent: ""))
        modelsMenu.addItem(NSMenuItem(title: "Load Voice Design Model", action: #selector(preloadDesign), keyEquivalent: ""))

        let modelsItem = NSMenuItem(title: "Preload Models", action: nil, keyEquivalent: "")
        modelsItem.submenu = modelsMenu
        menu.addItem(modelsItem)

        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Quit", action: #selector(quitApp), keyEquivalent: "q"))

        self.statusItem.menu = menu
    }

    // MARK: - Actions

    @objc private func startServer() {
        ServerManager.shared.startServer { success, message in
            if !success {
                showSystemNotification(title: "Server Error", body: message)
            }
        }
    }

    @objc private func stopServer() {
        ServerManager.shared.stopServer()
    }

    @objc private func showMainWindow() {
        if mainWindow == nil {
            mainWindow = MainWindowController()
        }
        mainWindow?.showWindow(nil)
        mainWindow?.window?.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    @objc private func openOutputFolder() {
        try? FileManager.default.createDirectory(atPath: Paths.outputBase, withIntermediateDirectories: true)
        NSWorkspace.shared.open(URL(fileURLWithPath: Paths.outputBase))
    }

    @objc private func preloadClone() {
        ServerManager.shared.preloadModel("clone") { success, message in
            showSystemNotification(title: success ? "Model Loaded" : "Load Failed", body: message)
        }
    }

    @objc private func preloadCustom() {
        ServerManager.shared.preloadModel("custom") { success, message in
            showSystemNotification(title: success ? "Model Loaded" : "Load Failed", body: message)
        }
    }

    @objc private func preloadDesign() {
        ServerManager.shared.preloadModel("design") { success, message in
            showSystemNotification(title: success ? "Model Loaded" : "Load Failed", body: message)
        }
    }

    @objc private func quitApp() {
        ServerManager.shared.stopServer()
        NSApp.terminate(nil)
    }
}
