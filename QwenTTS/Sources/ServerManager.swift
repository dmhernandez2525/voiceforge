import Foundation

class ServerManager {
    static let shared = ServerManager()

    private var serverProcess: Process?
    private var isRunning = false

    var onStatusChanged: ((Bool) -> Void)?
    var onLog: ((String) -> Void)?

    private let pythonPath: String
    private let serverScriptPath: String

    init() {
        // Find Python in common locations - prioritize project venv
        let pythonPaths = [
            NSHomeDirectory() + "/Desktop/Projects/PersonalProjects/qwen-tts-app/venv/bin/python",
            NSHomeDirectory() + "/miniconda3/envs/qwen3-tts/bin/python",
            NSHomeDirectory() + "/anaconda3/envs/qwen3-tts/bin/python",
            "/opt/homebrew/opt/python@3.11/bin/python3.11",
            "/opt/homebrew/bin/python3",
            "/usr/local/bin/python3",
            "/usr/bin/python3"
        ]

        pythonPath = pythonPaths.first { FileManager.default.fileExists(atPath: $0) } ?? "python3"

        // Server script location
        let appBundle = Bundle.main.bundlePath
        let possiblePaths = [
            appBundle + "/Contents/Resources/python-backend/server.py",
            NSHomeDirectory() + "/Desktop/Projects/PersonalProjects/qwen-tts-app/python-backend/server.py"
        ]

        serverScriptPath = possiblePaths.first { FileManager.default.fileExists(atPath: $0) }
            ?? possiblePaths.last!
    }

    func checkServerStatus(completion: @escaping (Bool) -> Void) {
        HTTPClient.shared.get("/health") { result in
            switch result {
            case .success(let data):
                if let response = jsonDecode(HealthResponse.self, from: data) {
                    completion(response.status == "ok")
                } else {
                    completion(false)
                }
            case .failure:
                completion(false)
            }
        }
    }

    func startServer(completion: @escaping (Bool, String) -> Void) {
        // Check if already running
        checkServerStatus { [weak self] running in
            if running {
                DispatchQueue.main.async {
                    self?.isRunning = true
                    self?.onStatusChanged?(true)
                    completion(true, "Server already running")
                }
                return
            }

            self?.launchServer(completion: completion)
        }
    }

    private func launchServer(completion: @escaping (Bool, String) -> Void) {
        guard FileManager.default.fileExists(atPath: serverScriptPath) else {
            completion(false, "Server script not found at: \(serverScriptPath)")
            return
        }

        let process = Process()
        process.executableURL = URL(fileURLWithPath: pythonPath)
        process.arguments = [serverScriptPath]

        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe

        pipe.fileHandleForReading.readabilityHandler = { [weak self] handle in
            let data = handle.availableData
            if !data.isEmpty, let output = String(data: data, encoding: .utf8) {
                DispatchQueue.main.async {
                    self?.onLog?(output)
                }
            }
        }

        do {
            try process.run()
            serverProcess = process
            isRunning = true

            // Wait a moment for server to start, then verify
            DispatchQueue.global().asyncAfter(deadline: .now() + 2) { [weak self] in
                self?.checkServerStatus { success in
                    DispatchQueue.main.async {
                        self?.isRunning = success
                        self?.onStatusChanged?(success)
                        completion(success, success ? "Server started" : "Server failed to respond")
                    }
                }
            }

        } catch {
            completion(false, "Failed to start server: \(error.localizedDescription)")
        }
    }

    func stopServer() {
        serverProcess?.terminate()
        serverProcess = nil
        isRunning = false
        onStatusChanged?(false)
    }

    func preloadModel(_ modelType: String, completion: @escaping (Bool, String) -> Void) {
        HTTPClient.shared.post("/load", body: ["model": modelType]) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    if let response = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                       let status = response["status"] as? String {
                        completion(status == "loaded", "Model loaded: \(modelType)")
                    } else {
                        completion(false, "Failed to parse response")
                    }
                case .failure(let error):
                    completion(false, "Failed to load model: \(error.localizedDescription)")
                }
            }
        }
    }
}
