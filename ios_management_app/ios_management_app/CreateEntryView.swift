import SwiftUI
// Removed AVFoundation import to reduce resource usage

// Custom Button Style for Full-Area Tap
struct FullWidthButtonStyle: ButtonStyle {
    var backgroundColor: Color
    var foregroundColor: Color = .white
    var isDisabled: Bool = false
    
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .frame(maxWidth: .infinity)
            .padding()
            .background(isDisabled ? backgroundColor.opacity(0.6) : backgroundColor.opacity(configuration.isPressed ? 0.8 : 1.0))
            .foregroundColor(foregroundColor)
            .cornerRadius(10)
            .scaleEffect(isDisabled ? 1.0 : (configuration.isPressed ? 0.98 : 1.0))
    }
}


struct CreateEntryView: View {
    @Environment(\.dismiss) var dismiss
    @State private var section = ""
    @State private var shelfNumber = ""
    @State private var shelfLevel = ""
    @State private var productType = ""
    @State private var manualSerial = ""
    @State private var showQuickEntry = false
    @State private var submissionMessage: String? = nil
    
    let productsA = ["GP", "GX", "S300", "pj2v", "A500", "PFT", "JTT", "sprinter s", "sprinter p/xp", "OCSM", "OPXZ", "MFT", "L/XL", "M", "A400FT"]
    let productsB = ["GF-V", "EPZV", "EPZV BS", "FF", "FT", "ECSM", "EPZB", "EPxs"]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                if section.isEmpty {
                    Text("Select Section").font(.headline)
                    HStack(spacing: 20) {
                        Button(action: { section = "A" }) {
                            Text("Section A")
                        }
                        .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        
                        Button(action: { section = "B" }) {
                            Text("Section B")
                        }
                        .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                    }
                    HStack(spacing: 20) {
                        Button(action: { section = "C" }) {
                            Text("Section C")
                        }
                        .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        
                        Button(action: { section = "D" }) {
                            Text("Section D")
                        }
                        .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                    }
                } else if shelfNumber.isEmpty {
                    Text("Select Shelf Number").font(.headline)
                    HStack(spacing: 20) {
                        ForEach(["1", "2", "3"], id: \.self) { number in
                            Button(action: { shelfNumber = number }) {
                                Text(number)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                    HStack(spacing: 20) {
                        ForEach(["4", "5", "6"], id: \.self) { number in
                            Button(action: { shelfNumber = number }) {
                                Text(number)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                    HStack(spacing: 20) {
                        ForEach(["7", "8", "9"], id: \.self) { number in
                            Button(action: { shelfNumber = number }) {
                                Text(number)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                } else if shelfLevel.isEmpty {
                    Text("Select Shelf Level").font(.headline)
                    HStack(spacing: 20) {
                        ForEach(["layer1", "layer2"], id: \.self) { level in
                            Button(action: { shelfLevel = level }) {
                                Text(level)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                    HStack(spacing: 20) {
                        ForEach(["layer3", "layer4"], id: \.self) { level in
                            Button(action: { shelfLevel = level }) {
                                Text(level)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                    HStack(spacing: 20) {
                        ForEach(["layer5", "layer6"], id: \.self) { level in
                            Button(action: { shelfLevel = level }) {
                                Text(level)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                } else if productType.isEmpty {
                    Text("Select Product Type").font(.headline)
                    HStack(spacing: 20) {
                        ForEach(["Electronics", "Mechanical"], id: \.self) { type in
                            Button(action: { productType = type }) {
                                Text(type)
                            }
                            .buttonStyle(FullWidthButtonStyle(backgroundColor: Color(red: 32/255, green: 33/255, blue: 33/255)))
                        }
                    }
                } else {
                    Text("Enter Product Information")
                        .font(.headline)
                    
                    // Disabled camera button with proper styling
                    Button(action: {
                        showTempMessage("Camera scanning is temporarily disabled", delay: 2)
                    }) {
                        Text("Camera Scanning (Disabled)")
                    }
                    .buttonStyle(FullWidthButtonStyle(backgroundColor: Color.gray, isDisabled: true))
                    .disabled(true)
                    
                    Button(action: {
                        showQuickEntry = true
                    }) {
                        Text("Quick Enter (Auto Serial)")
                    }
                    .buttonStyle(FullWidthButtonStyle(backgroundColor: Color.orange))
                    
                    Text("Enter serial number manually:")
                        .font(.subheadline)
                        .padding(.top)
                    
                    TextField("Enter serial number", text: $manualSerial)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .textInputAutocapitalization(.characters)
                        .onChange(of: manualSerial) {
                            manualSerial = manualSerial.uppercased()
                        }
                        .padding(.horizontal)
                    
                    Button(action: {
                        submitToBackend()
                    }) {
                        Text("Submit")
                    }
                    .buttonStyle(FullWidthButtonStyle(backgroundColor: Color.green))

                    if let message = submissionMessage {
                        Text(message)
                            .foregroundColor(message.contains("成功") ? .green : .red)
                            .font(.subheadline)
                            .padding(.top, 10)
                    }
                }
            }
            .padding()
            .frame(maxHeight: .infinity, alignment: .top)
        }        // Existing quick entry sheet remains the same
        .sheet(isPresented: $showQuickEntry) {
            ScrollView {
                VStack(alignment: .leading, spacing: 10) {
                    Text("网络能源 (A)").bold().padding(.top)
                    
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                        ForEach(productsA, id: \.self) { product in
                            Button(action: {
                                quickEnter(product: product, prefix: "A")
                                showQuickEntry = false
                            }) {
                                Text(product)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color.gray.opacity(0.8))
                                    .foregroundColor(.white)
                                    .cornerRadius(8)
                            }
                            .buttonStyle(QuickEntryButtonStyle())
                        }
                    }
                    
                    Text("动力能源 (B)").bold().padding(.top)
                    
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                        ForEach(productsB, id: \.self) { product in
                            Button(action: {
                                quickEnter(product: product, prefix: "B")
                                showQuickEntry = false
                            }) {
                                Text(product)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color.gray.opacity(0.8))
                                    .foregroundColor(.white)
                                    .cornerRadius(8)
                            }
                            .buttonStyle(QuickEntryButtonStyle())
                        }
                    }
                }
                .padding()
            }
        }

    }
    
    // Helper methods
    func shelfLevelToInt(_ level: String) -> Int {
        let digits = level.filter(\.isNumber)
        return Int(digits) ?? 0
    }

    func quickEnter(product: String, prefix: String) {
        let cleanedName = product.replacingOccurrences(of: " ", with: "")
        let generatedSerial = "\(prefix)-\(cleanedName)"
        manualSerial = generatedSerial
    }

    func showTempMessage(_ message: String, delay: TimeInterval) {
        submissionMessage = message
        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
            submissionMessage = nil
        }
    }

    func submitToBackend() {
        guard !manualSerial.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            showTempMessage("❌ 提交失败：序列号不能为空", delay: 2)
            return
        }

        guard let url = URL(string: "\(Config.baseURL)/api/scan") else { return }

        let payload: [String: Any] = [
            "serial": manualSerial,
            "section": section,
            "shelfNumber": Int(shelfNumber) ?? 0,
            "shelfLevel": shelfLevelToInt(shelfLevel),
            "productType": productType,
            "timestamp": ISO8601DateFormatter().string(from: Date())
        ]

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: payload)
        } catch {
            showTempMessage("❌ 提交失败：序列化错误", delay: 2)
            return
        }

        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                if let error = error {
                    showTempMessage("❌ 提交失败: \(error.localizedDescription)", delay: 2)
                    return
                }

                showTempMessage("✅ 已成功提交！", delay: 1.5)
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                    dismiss()
                }
            }
        }.resume()
    }
}

