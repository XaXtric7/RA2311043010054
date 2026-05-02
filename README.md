# Campus Notifications Platform

A responsive React-based dashboard for managing and viewing campus notifications with a priority-based inbox.

## 🚀 Features

- **Priority Inbox**: Surfaces the most important notifications first based on weight (`Placement > Result > Event`) and recency.
- **Advanced Filtering**: Filter notifications by type (Placement, Result, Event) using server-side query parameters.
- **Read/Unread Tracking**: Visual indicators for new vs. viewed notifications (persisted locally).
- **Centralized Logging**: Extensive integration with a reusable logging middleware for production-grade observability.
- **Modern UI**: Built with Material UI for a clean and professional user experience.

## 🛠️ Project Structure

- `/notification_app_fe`: React + TypeScript frontend application.
- `/logging_middleware`: Reusable TypeScript library for centralized logging.
- `/notification_app_be`: Required structure for backend services.
- `notification_system_design.md`: Detailed architecture and implementation strategy.

## 🏃 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running

1. **Install Dependencies**:
   ```bash
   cd notification_app_fe
   npm install
   ```

2. **Run the App**:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## 📡 API Integration
The application integrates with the centralized test server for:
- Fetching notifications (`GET /notifications`)
- Sending logs (`POST /logs`)
- Registration & Authentication

## 📝 Evaluation Note
This submission follows the **Frontend Track**. All mandatory deliverables including the Priority Inbox logic (Stage 1) and Multi-Page UI (Stage 2) have been implemented and documented.
