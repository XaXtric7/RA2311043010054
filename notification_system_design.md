# Notification System Design

## Overview
A scalable and reliable notification system designed to deliver messages across multiple channels (Email, Push, SMS) while maintaining high availability and low latency.

## Architecture
- **API Gateway**: Entry point for all client requests.
- **Notification Service**: Orchestrates the notification flow, handles rate limiting, and manages user preferences.
- **Message Queue**: Decouples the service from the providers, ensuring durability and scalability (e.g., Kafka or RabbitMQ).
- **Workers**: Consume messages from the queue and interact with third-party providers.
- **Third-Party Providers**: SendGrid (Email), Twilio (SMS), FCM (Push).
- **Database**: Stores user settings, notification logs, and message templates (e.g., PostgreSQL for relational data, MongoDB for logs).

## Key Features
- **Scalability**: Horizontal scaling of services and workers.
- **Reliability**: Retry mechanisms with exponential backoff for failed deliveries.
- **Observability**: Centralized logging via the Logging Middleware.
- **Flexibility**: Support for multiple channels and template-based messaging.

## Logging Strategy
Integrated with a centralized logging server via a reusable logging middleware to capture:
- Event lifecycle (received, queued, sent, failed).
- Error details for debugging.
- Performance metrics (latency, throughput).

## Stage 1: Priority Inbox Implementation
### Approach
The Priority Inbox is designed to help users manage high volumes of notifications by surfacing the most critical information first.

- **Weightage System**: Notifications are weighted based on their type: `Placement` > `Result` > `Event`.
- **Sorting Logic**: Notifications are sorted primarily by their weight and secondarily by their recency (Timestamp).
- **Efficiency**: To maintain the top 'n' notifications efficiently without repeated full sorts, we can use a min-priority queue (min-heap) of size 'n'. This ensures that adding a new notification and keeping only the top 'n' remains an O(log n) operation.

## Stage 2: Multi-Page Frontend & Advanced Filtering
### Approach
The frontend is built as a responsive React application that distinguishes between general notifications and the Priority Inbox.

- **Routing**: Implemented using a simple state-based view switcher or a router to navigate between "All Notifications" and "Priority Inbox".
- **Filtering**: Leverages expanded API query parameters (`limit`, `page`, `notification_type`) to perform server-side filtering.
- **Read State**: Frontend tracks "viewed" vs "new" notifications using local storage or local state management to provide visual cues to the user.
- **User Experience**: Focused on highlighting key elements (Type, Message, Time) while ensuring robust error handling and high-quality UI using Material UI.
