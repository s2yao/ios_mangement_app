import SwiftUI

struct NavigationEntryView: View {
    @State private var serialToSearch = ""
    @State private var scanInfo: ScanEntry? = nil
    @State private var errorMessage: String? = nil
    @State private var isLoading = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Text("Please enter your serial number").font(.headline)

                TextField("Serial Number", text: $serialToSearch)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .textInputAutocapitalization(.characters)
                    .onChange(of: serialToSearch) {
                        serialToSearch = serialToSearch.uppercased()
                    }

                Button("Submit") {
                    fetchScan()
                }
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)

                if isLoading {
                    ProgressView()
                }

                if let info = scanInfo {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("🔍 查询结果：").font(.headline)
                        Text("序列号: \(info.serial)")
                        Text("区域: \(info.section)")
                        Text("货架: \(info.shelfNumber)")
                        Text("层数: \(info.shelfLevel)")
                        Text("类型: \(info.productType)")
                        Text("时间: \(info.timestamp)")

                        HStack {
                            Button("更新") {
                                // 待实现
                            }
                            .padding()
                            .background(Color.orange)
                            .foregroundColor(.white)
                            .cornerRadius(10)

                            Button("删除") {
                                // 待实现
                            }
                            .padding()
                            .background(Color.red)
                            .foregroundColor(.white)
                            .cornerRadius(10)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(12)
                }

                if let error = errorMessage {
                    Text(error)
                        .foregroundColor(.red)
                        .padding(.top)
                }
            }
            .padding()
        }
    }

    func fetchScan() {
        guard !serialToSearch.isEmpty else {
            errorMessage = "请输入序列号"
            return
        }

        isLoading = true
        errorMessage = nil
        scanInfo = nil

        guard let url = URL(string: "\(Config.baseURL)/api/search?serial=\(serialToSearch)") else { return }

        URLSession.shared.dataTask(with: url) { data, response, error in
            DispatchQueue.main.async {
                isLoading = false

                if let error = error {
                    errorMessage = "查询失败：\(error.localizedDescription)"
                    return
                }

                guard let data = data,
                      let decoded = try? JSONDecoder().decode(ScanEntry.self, from: data) else {
                    errorMessage = "未找到该序列号"
                    return
                }

                scanInfo = decoded
            }
        }.resume()
    }
    
    func deleteScan(serial: String) {
        guard let url = URL(string: "\(Config.baseURL)/api/scan/\(serial)") else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"

        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                if let error = error {
                    errorMessage = "❌ 删除失败：\(error.localizedDescription)"
                    return
                }

                // ✅ 删除成功，清除显示内容
                scanInfo = nil
                errorMessage = "✅ 已成功删除"
            }
        }.resume()
    }
}

// 用于接收 Scan 对象的结构体
struct ScanEntry: Codable {
    let serial: String
    let section: String
    let shelfNumber: Int
    let shelfLevel: Int
    let productType: String
    let timestamp: String
}
