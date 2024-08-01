# Warehouse Frontend Application

Welcome to the frontend part of the Warehouse application. This Angular-based application serves as the user interface for managing warehouse operations, including viewing product availability, managing shipments, and tracking shipment statuses.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- Angular CLI (version 14.2.9 or higher)

### Installation

1. Clone the repository to your local machine.
2. Navigate to the `frontend/` directory.
3. Run `npm install` to install the dependencies.

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Development Proxy Configuration

For local development, the Angular application is configured to use a proxy for API requests to avoid CORS issues. The proxy configuration is defined in the [`proxy.conf.json`](frontend/proxy.conf.json) file. This setup redirects API calls from the Angular development server to the backend server.

To modify or extend the proxy settings, edit the `proxy.conf.json` file located in the `frontend/` directory. This is particularly useful when the backend API is running on a different port or host during development.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Features

- **Warehouse Status**: View a table of available products, including quantity and unit price.
- **Shipments**: Create, edit, and view shipments, including company name, shipment ID, scheduled shipment date, items, and status.