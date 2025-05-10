# Inventory Management System

A full-stack inventory management application with an iOS frontend and Node.js backend.
Helping workers to put batteries and record them efficiently.
The schemas are saved to MongoDB

# Demo image:
<img src="https://github.com/user-attachments/assets/dddc3a0e-a6cd-44d0-baa6-d077c2b66132" alt="D536F5D1-E6C8-4815-B289-B20715CF736D" width="100">

## Project Structure

This repository contains both the frontend and backend code:

- `/ios_management_app` - SwiftUI iOS application for inventory management
- `/backend` - Node.js/Express API with MongoDB database

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your MongoDB connection details:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   PORT=3000
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### iOS Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/ios_management_app
   ```

2. Set up the configuration file:
   ```bash
   cp ConfigTemplate.swift Config.swift
   ```

3. Edit `Config.swift` with your API endpoint:
   ```swift
   static let baseURL = "http://your-backend-server:3000"
   ```

4. Open the project in Xcode:
   ```bash
   open ios_management_app.xcodeproj
   ```

5. Build and run the application in Xcode

## Features

- Product inventory scanning and tracking
- Section and shelf organization
- Quick entry for common products
- Barcode scanning capability

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

### iOS Frontend
- SwiftUI
- AVFoundation for barcode scanning
- URLSession for API communication

## Development

### Prerequisites
- Node.js v16+
- MongoDB
- Xcode 14+
- iOS 16+ device or simulator

### API Documentation
