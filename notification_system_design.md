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
