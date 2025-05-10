import SwiftUI


struct ContentView: View {
    var body: some View {
        NavigationStack {
            ZStack {
                Color(red: 251/255, green: 194/255, blue: 61/255)
                    .ignoresSafeArea()
                
                VStack(spacing: 20) {
                    Image("app_logo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 300, height: 50)
                    
                    Text("力安库存管理系统")
                        .font(.largeTitle)
                        .bold()
                    
                    NavigationLink(destination: CreateEntryView()) {
                        Text("新建")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(red: 32/255, green: 33/255, blue: 33/255))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    
                    NavigationLink(destination: NavigationEntryView()) {
                        Text("检索/更新/删除")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color(red: 32/255, green: 33/255, blue: 33/255))
                            .foregroundColor(.white)
                            .cornerRadius(10)
                            .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    
                    
                    NavigationLink("导出") {
                        // 待实现
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    
                    NavigationLink("历史记录") {
                        // 待实现
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(red: 32/255, green: 33/255, blue: 33/255))
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                .padding()
            }
        }
    }
}

#Preview {
    ContentView()
}
