import Foundation
import Cocoa

// MARK: - Paths

struct Paths {
    static let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        .appendingPathComponent("QwenTTS").path
    static let outputBase = NSHomeDirectory() + "/Desktop/Qwen-TTS-Output"
    static let configFile = appSupport + "/config.json"
}

// MARK: - Logging

func logInfo(_ message: String) {
    print("[INFO] \(message)")
}

func logError(_ message: String) {
    print("[ERROR] \(message)")
}

func logSuccess(_ message: String) {
    print("[SUCCESS] \(message)")
}

// MARK: - Notifications

func showSystemNotification(title: String, body: String) {
    let notification = NSUserNotification()
    notification.title = title
    notification.informativeText = body
    notification.soundName = NSUserNotificationDefaultSoundName
    NSUserNotificationCenter.default.deliver(notification)
}

// MARK: - JSON Helpers

func jsonEncode<T: Encodable>(_ value: T) -> Data? {
    try? JSONEncoder().encode(value)
}

func jsonDecode<T: Decodable>(_ type: T.Type, from data: Data) -> T? {
    try? JSONDecoder().decode(type, from: data)
}

// MARK: - HTTP Client

class HTTPClient {
    static let shared = HTTPClient()
    private let baseURL = "http://127.0.0.1:8765"

    func get(_ path: String, completion: @escaping (Result<Data, Error>) -> Void) {
        guard let url = URL(string: baseURL + path) else {
            completion(.failure(NSError(domain: "HTTPClient", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            if let data = data {
                completion(.success(data))
            }
        }.resume()
    }

    func post(_ path: String, body: [String: Any], completion: @escaping (Result<Data, Error>) -> Void) {
        guard let url = URL(string: baseURL + path) else {
            completion(.failure(NSError(domain: "HTTPClient", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            if let data = data {
                completion(.success(data))
            }
        }.resume()
    }
}

// MARK: - Server Response Types

struct HealthResponse: Codable {
    let status: String
    let models_loaded: [String: Bool]
}

struct Speaker: Codable {
    let id: String
    let lang: String
    let desc: String
}

struct SpeakersResponse: Codable {
    let speakers: [Speaker]
}

struct LanguagesResponse: Codable {
    let languages: [String]
}

struct GenerateResponse: Codable {
    let status: String?
    let output_path: String?
    let sample_rate: Int?
    let error: String?
}
