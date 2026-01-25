import Foundation
import AVFoundation

class TTSManager {
    static let shared = TTSManager()

    private var audioPlayer: AVAudioPlayer?

    var onGenerationStarted: (() -> Void)?
    var onGenerationComplete: ((String) -> Void)?
    var onError: ((String) -> Void)?

    // MARK: - Custom Voice Generation

    func generateCustomVoice(
        text: String,
        language: String,
        speaker: String,
        instruct: String = "",
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let body: [String: Any] = [
            "text": text,
            "language": language,
            "speaker": speaker,
            "instruct": instruct
        ]

        onGenerationStarted?()

        HTTPClient.shared.post("/generate/custom", body: body) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    self?.handleGenerateResponse(data, completion: completion)
                case .failure(let error):
                    self?.onError?(error.localizedDescription)
                    completion(.failure(error))
                }
            }
        }
    }

    // MARK: - Voice Cloning

    func generateVoiceClone(
        text: String,
        language: String,
        refAudioPath: String,
        refText: String,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let body: [String: Any] = [
            "text": text,
            "language": language,
            "ref_audio_path": refAudioPath,
            "ref_text": refText
        ]

        onGenerationStarted?()

        HTTPClient.shared.post("/generate/clone", body: body) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    self?.handleGenerateResponse(data, completion: completion)
                case .failure(let error):
                    self?.onError?(error.localizedDescription)
                    completion(.failure(error))
                }
            }
        }
    }

    func generateVoiceCloneFromBase64(
        text: String,
        language: String,
        refAudioBase64: String,
        refText: String,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let body: [String: Any] = [
            "text": text,
            "language": language,
            "ref_audio_base64": refAudioBase64,
            "ref_text": refText
        ]

        onGenerationStarted?()

        HTTPClient.shared.post("/generate/clone", body: body) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    self?.handleGenerateResponse(data, completion: completion)
                case .failure(let error):
                    self?.onError?(error.localizedDescription)
                    completion(.failure(error))
                }
            }
        }
    }

    // MARK: - Voice Design

    func generateVoiceDesign(
        text: String,
        language: String,
        voiceDescription: String,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        let body: [String: Any] = [
            "text": text,
            "language": language,
            "instruct": voiceDescription
        ]

        onGenerationStarted?()

        HTTPClient.shared.post("/generate/design", body: body) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    self?.handleGenerateResponse(data, completion: completion)
                case .failure(let error):
                    self?.onError?(error.localizedDescription)
                    completion(.failure(error))
                }
            }
        }
    }

    // MARK: - Response Handling

    private func handleGenerateResponse(_ data: Data, completion: @escaping (Result<String, Error>) -> Void) {
        guard let response = jsonDecode(GenerateResponse.self, from: data) else {
            let error = NSError(domain: "TTSManager", code: -1, userInfo: [NSLocalizedDescriptionKey: "Failed to parse response"])
            onError?("Failed to parse server response")
            completion(.failure(error))
            return
        }

        if let errorMsg = response.error {
            let error = NSError(domain: "TTSManager", code: -1, userInfo: [NSLocalizedDescriptionKey: errorMsg])
            onError?(errorMsg)
            completion(.failure(error))
            return
        }

        if let outputPath = response.output_path {
            onGenerationComplete?(outputPath)
            completion(.success(outputPath))
        } else {
            let error = NSError(domain: "TTSManager", code: -1, userInfo: [NSLocalizedDescriptionKey: "No output path in response"])
            onError?("No output path returned")
            completion(.failure(error))
        }
    }

    // MARK: - Audio Playback

    func playAudio(at path: String) {
        let url = URL(fileURLWithPath: path)

        do {
            audioPlayer = try AVAudioPlayer(contentsOf: url)
            audioPlayer?.play()
        } catch {
            logError("Failed to play audio: \(error)")
            onError?("Failed to play audio: \(error.localizedDescription)")
        }
    }

    func stopAudio() {
        audioPlayer?.stop()
    }

    // MARK: - Data Loading

    func fetchSpeakers(completion: @escaping ([Speaker]) -> Void) {
        HTTPClient.shared.get("/speakers") { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    if let response = jsonDecode(SpeakersResponse.self, from: data) {
                        completion(response.speakers)
                    } else {
                        completion([])
                    }
                case .failure:
                    completion([])
                }
            }
        }
    }

    func fetchLanguages(completion: @escaping ([String]) -> Void) {
        HTTPClient.shared.get("/languages") { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let data):
                    if let response = jsonDecode(LanguagesResponse.self, from: data) {
                        completion(response.languages)
                    } else {
                        completion([])
                    }
                case .failure:
                    completion([])
                }
            }
        }
    }
}
