import { Request, Response } from "express";
import Scan from "../models/Scan";

// This function handles the search for a scan entry in the database
export const searchScan = async (req: Request, res: Response): Promise<void> => {
  const { serial } = req.query;

  try {
    const scan = await Scan.findOne({ serial: String(serial) });

    if (!scan) {
      res.status(404).json({ error: "未找到该序列号" });
      return;
    }

    res.json(scan);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "服务器错误" });
  }
};



//import SwiftUI
//import AVFoundation
//
//// MARK: - Inline Barcode Scanner
//struct InlineBarcodeScanner: UIViewControllerRepresentable {
//    @Binding var scannedCode: String
//    @Binding var isPresented: Bool
//    
//    class Coordinator: NSObject, UINavigationControllerDelegate, AVCaptureMetadataOutputObjectsDelegate {
//        var parent: InlineBarcodeScanner
//        var captureSession: AVCaptureSession?
//        var previewLayer: AVCaptureVideoPreviewLayer?
//        
//        init(parent: InlineBarcodeScanner) {
//            self.parent = parent
//        }
//        
//        func metadataOutput(_ output: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from connection: AVCaptureConnection) {
//            if let metadataObject = metadataObjects.first {
//                guard let readableObject = metadataObject as? AVMetadataMachineReadableCodeObject else { return }
//                guard let stringValue = readableObject.stringValue else { return }
//                
//                // Ensure this happens on the main thread
//                DispatchQueue.main.async {
//                    self.parent.scannedCode = stringValue.uppercased()
//                    self.parent.isPresented = false
//                    
//                    // Stop the capture session
//                    self.captureSession?.stopRunning()
//                }
//            }
//        }
//    }
//    
//    func makeCoordinator() -> Coordinator {
//        return Coordinator(parent: self)
//    }
//    
//    func makeUIViewController(context: Context) -> UIViewController {
//        let viewController = UIViewController()
//        let previewView = UIView(frame: viewController.view.bounds)
//        viewController.view.addSubview(previewView)
//        
//        let captureSession = AVCaptureSession()
//        context.coordinator.captureSession = captureSession
//        
//        guard let videoCaptureDevice = AVCaptureDevice.default(for: .video) else { return viewController }
//        
//        do {
//            let videoInput = try AVCaptureDeviceInput(device: videoCaptureDevice)
//            
//            if captureSession.canAddInput(videoInput) {
//                captureSession.addInput(videoInput)
//            }
//            
//            let metadataOutput = AVCaptureMetadataOutput()
//            
//            if captureSession.canAddOutput(metadataOutput) {
//                captureSession.addOutput(metadataOutput)
//                
//                metadataOutput.setMetadataObjectsDelegate(context.coordinator, queue: DispatchQueue.main)
//                // Support multiple barcode types
//                metadataOutput.metadataObjectTypes = [
//                    .qr,
//                    .code39,
//                    .code128,
//                    .ean8,
//                    .ean13,
//                    .code93
//                ]
//            }
//            
//            let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
//            previewLayer.frame = previewView.bounds
//            previewLayer.videoGravity = .resizeAspectFill
//            previewView.layer.addSublayer(previewLayer)
//            context.coordinator.previewLayer = previewLayer
//            
//            // Start the capture session
//            DispatchQueue.global(qos: .background).async {
//                captureSession.startRunning()
//            }
//        } catch {
//            // Handle errors
//            print("Error setting up capture session: \(error.localizedDescription)")
//        }
//        
//        return viewController
//    }
//    
//    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
//}
//
//
//// MARK: - Create Entry View
//struct CreateEntryView: View {
//    @Environment(\.dismiss) var dismiss
//    @State private var section = ""
//    @State private var shelfNumber = ""
//    @State private var shelfLevel = ""
//    @State private var productType = ""
//    @State private var manualSerial = ""
//    @State private var showQuickEntry = false
//    @State private var submissionMessage: String? = nil
//    
//    // New state for barcode scanning
//    @State private var showBarcodeScanner = false
//    
//    let productsA = ["GP", "GX", "S300", "pj2v", "A500", "PFT", "JTT", "sprinter s", "sprinter p/xp", "OCSM", "OPXZ", "MFT", "L/XL", "M", "A400FT"]
//    let productsB = ["GF-V", "EPZV", "EPZV BS", "FF", "FT", "ECSM", "EPZB", "EPxs"]
//    
//    var body: some View {
//        ScrollView {
//            VStack(spacing: 20) {
//                if section.isEmpty {
//                    Text("Select Section").font(.headline)
//                    HStack(spacing: 20) {
//                        Button(action: { section = "A" }) {
//                            Text("Section A")
//                                .frame(maxWidth: .infinity)
//                                .padding()
//                                .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                .foregroundColor(.white)
//                                .cornerRadius(10)
//                        }
//                        .contentShape(Rectangle())
//                        .buttonStyle(.plain)
//                        
//                        Button(action: { section = "B" }) {
//                            Text("Section B")
//                                .frame(maxWidth: .infinity)
//                                .padding()
//                                .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                .foregroundColor(.white)
//                                .cornerRadius(10)
//                        }
//                        .contentShape(Rectangle())
//                        .buttonStyle(.plain)
//                    }
//                    HStack(spacing: 20) {
//                        Button(action: { section = "C" }) {
//                            Text("Section C")
//                                .frame(maxWidth: .infinity)
//                                .padding()
//                                .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                .foregroundColor(.white)
//                                .cornerRadius(10)
//                        }
//                        .contentShape(Rectangle())
//                        .buttonStyle(.plain)
//                        
//                        Button(action: { section = "D" }) {
//                            Text("Section D")
//                                .frame(maxWidth: .infinity)
//                                .padding()
//                                .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                .foregroundColor(.white)
//                                .cornerRadius(10)
//                        }
//                        .contentShape(Rectangle())
//                        .buttonStyle(.plain)
//                    }
//                } else if shelfNumber.isEmpty {
//                    Text("Select Shelf Number").font(.headline)
//                    HStack(spacing: 20) {
//                        ForEach(["1", "2", "3"], id: \.self) { number in
//                            Button(action: { shelfNumber = number }) {
//                                Text(number)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                    HStack(spacing: 20) {
//                        ForEach(["4", "5", "6"], id: \.self) { number in
//                            Button(action: { shelfNumber = number }) {
//                                Text(number)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                    HStack(spacing: 20) {
//                        ForEach(["7", "8", "9"], id: \.self) { number in
//                            Button(action: { shelfNumber = number }) {
//                                Text(number)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                } else if shelfLevel.isEmpty {
//                    Text("Select Shelf Level").font(.headline)
//                    HStack(spacing: 20) {
//                        ForEach(["layer1", "layer2"], id: \.self) { level in
//                            Button(action: { shelfLevel = level }) {
//                                Text(level)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                    HStack(spacing: 20) {
//                        ForEach(["layer3", "layer4"], id: \.self) { level in
//                            Button(action: { shelfLevel = level }) {
//                                Text(level)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                    HStack(spacing: 20) {
//                        ForEach(["layer5", "layer6"], id: \.self) { level in
//                            Button(action: { shelfLevel = level }) {
//                                Text(level)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                } else if productType.isEmpty {
//                    Text("Select Product Type").font(.headline)
//                    HStack(spacing: 20) {
//                        ForEach(["Electronics", "Mechanical"], id: \.self) { type in
//                            Button(action: { productType = type }) {
//                                Text(type)
//                                    .frame(maxWidth: .infinity)
//                                    .padding()
//                                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
//                                    .foregroundColor(.white)
//                                    .cornerRadius(10)
//                            }
//                            .contentShape(Rectangle())
//                            .buttonStyle(.plain)
//                        }
//                    }
//                } else {
//                    Text("Ready to scan barcode.")
//                    
//                    Button("Open Camera") {
//                        // Request camera permission before showing scanner
//                        checkCameraPermission()
//                    }
//                    .padding()
//                    .frame(maxWidth: .infinity)
//                    .background(Color.blue)
//                    .foregroundColor(.white)
//                    .cornerRadius(10)
//                    
//                    Button("Quick Enter (Auto Serial)") {
//                        showQuickEntry = true
//                    }
//                    .padding()
//                    .frame(maxWidth: .infinity)
//                    .background(Color.orange)
//                    .foregroundColor(.white)
//                    .cornerRadius(10)
//                    .contentShape(Rectangle())
//                    
//                    Text("And enter serial number manually:")
//                        .font(.subheadline)
//                        .padding(.top)
//                    
//                    TextField("Enter serial number", text: $manualSerial)
//                        .textFieldStyle(RoundedBorderTextFieldStyle())
//                        .textInputAutocapitalization(.characters)
//                        .onChange(of: manualSerial) {
//                            manualSerial = manualSerial.uppercased()
//                        }
//                        .padding(.horizontal)
//                    
//                    Button(action: {
//                        submitToBackend()
//                    }) {
//                        Text("Submit")
//                            .frame(maxWidth: .infinity)
//                            .padding()
//                            .background(Color.green)
//                            .foregroundColor(.white)
//                            .cornerRadius(10)
//                    }
//                    .contentShape(Rectangle())
//
//                    if let message = submissionMessage {
//                        Text(message)
//                            .foregroundColor(message.contains("成功") ? .green : .red)
//                            .font(.subheadline)
//                            .padding(.top, 10)
//                    }
//                }
//            }
//            .padding()
//            .frame(maxHeight: .infinity, alignment: .top)
//        }
//        .sheet(isPresented: $showBarcodeScanner) {
//            InlineBarcodeScanner(
//                scannedCode: $manualSerial,
//                isPresented: $showBarcodeScanner
//            )
//        }
//        // Existing quick entry sheet remains the same
//        .sheet(isPresented: $showQuickEntry) {
//            ScrollView {
//                VStack(alignment: .leading, spacing: 10) {
//                    Text("网络能源 (A)").bold().padding(.top)
//                    
//                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
//                        ForEach(productsA, id: \.self) { product in
//                            Button(product) {
//                                quickEnter(product: product, prefix: "A")
//                                showQuickEntry = false
//                            }
//                            .padding()
//                            .frame(maxWidth: .infinity)
//                            .background(Color.gray.opacity(0.8))
//                            .foregroundColor(.white)
//                            .cornerRadius(8)
//                        }
//                    }
//                    
//                    Text("动力能源 (B)").bold().padding(.top)
//                    
//                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
//                        ForEach(productsB, id: \.self) { product in
//                            Button(product) {
//                                quickEnter(product: product, prefix: "B")
//                                showQuickEntry = false
//                            }
//                            .padding()
//                            .frame(maxWidth: .infinity)
//                            .background(Color.gray.opacity(0.8))
//                            .foregroundColor(.white)
//                            .cornerRadius(8)
//                        }
//                    }
//                }
//                .padding()
//            }
//        }
//    }
//    
//    // Helper methods
//    func shelfLevelToInt(_ level: String) -> Int {
//        let digits = level.filter(\.isNumber)
//        return Int(digits) ?? 0
//    }
//
//    func quickEnter(product: String, prefix: String) {
//        let cleanedName = product.replacingOccurrences(of: " ", with: "")
//        let generatedSerial = "\(prefix)-\(cleanedName)"
//        manualSerial = generatedSerial
//    }
//
//    func showTempMessage(_ message: String, delay: TimeInterval) {
//        submissionMessage = message
//        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
//            submissionMessage = nil
//        }
//    }
//
//    func submitToBackend() {
//        guard !manualSerial.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
//            showTempMessage("❌ 提交失败：序列号不能为空", delay: 2)
//            return
//        }
//
//        guard let url = URL(string: "\(Config.baseURL)/api/scan") else { return }
//
//        let payload: [String: Any] = [
//            "serial": manualSerial,
//            "section": section,
//            "shelfNumber": Int(shelfNumber) ?? 0,
//            "shelfLevel": shelfLevelToInt(shelfLevel),
//            "productType": productType,
//            "timestamp": ISO8601DateFormatter().string(from: Date())
//        ]
//
//        var request = URLRequest(url: url)
//        request.httpMethod = "POST"
//        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
//        
//        do {
//            request.httpBody = try JSONSerialization.data(withJSONObject: payload)
//        } catch {
//            showTempMessage("❌ 提交失败：序列化错误", delay: 2)
//            return
//        }
//
//        URLSession.shared.dataTask(with: request) { data, response, error in
//            DispatchQueue.main.async {
//                if let error = error {
//                    showTempMessage("❌ 提交失败: \(error.localizedDescription)", delay: 2)
//                    return
//                }
//
//                showTempMessage("✅ 已成功提交！", delay: 1.5)
//                DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
//                    dismiss()
//                }
//            }
//        }.resume()
//    }
//    
//    // Camera permission function
//    func checkCameraPermission() {
//        let cameraAuthStatus = AVCaptureDevice.authorizationStatus(for: .video)
//        
//        switch cameraAuthStatus {
//        case .authorized:
//            // Permission already granted, show scanner
//            showBarcodeScanner = true
//        case .notDetermined:
//            // Request permission
//            AVCaptureDevice.requestAccess(for: .video) { granted in
//                DispatchQueue.main.async {
//                    if granted {
//                        showBarcodeScanner = true
//                    } else {
//                        // Show an error or alert about camera access
//                        showTempMessage("❌ 相机访问被拒绝", delay: 2)
//                    }
//                }
//            }
//        case .denied, .restricted:
//            // Show an alert directing user to settings
//            showTempMessage("❌ 请在设置中允许相机访问", delay: 2)
//        @unknown default:
//            showTempMessage("❌ 未知相机权限状态", delay: 2)
//        }
//    }
//}


