# Warehouse Application

Welcome to the Warehouse application! This project is a full-stack application designed to manage warehouse operations, including products, shipments, and statuses. It consists of a backend Express application, a frontend Angular application, and a MySQL database.

## Overview

The Warehouse application is divided into three main parts:

- **Backend**: An Express application providing a REST API for managing warehouse operations.
- **Frontend**: An Angular application for a client-facing interface to interact with the warehouse data.
- **Database**: A MySQL database to store all application data.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- MySQL database
- Docker (optional, for running the database in a container)

### Setup

#### Backend

1. Navigate to the `backend/` directory.
2. Copy the `.env.example` file to `.env` and update the environment variables, especially `DATABASE_URL`.
3. Run `npm install` to install dependencies.
4. Run `npm run prisma:migrate` to create database schema. (If necessary, when DB is running)
5. Run `npm run prisma:generate` to generate Prisma client.
6. Build the application with `npm run build`.
7. Start the application with `npm start`.

For detailed instructions, refer to the backend README: [backend/README.md](backend/README.md).

#### Frontend

1. Navigate to the `frontend/` directory.
2. Run `npm install` to install dependencies.
3. Start the application with `ng serve`.

For detailed instructions, refer to the frontend README: [frontend/README.md](frontend/README.md).

#### Database

1. Ensure MySQL is installed and running.
2. Navigate to the `database/` directory.
3. Copy the .env.example file to .env and update the environment variables.
4. Run `docker-compose up -d` to start the database in a Docker container (optional).
5. Apply migrations and seed the database as described in the backend setup.

For detailed instructions, refer to the database README: [database/README.md](database/README.md).

## Running the Application

After setting up the backend, frontend, and database, you can start the backend and frontend applications as described in their respective sections. Ensure the database is running and accessible.

## Testing

- Backend tests can be run with `npm test` in the `backend/` directory.
- Frontend tests can be run with `ng test` in the `frontend/` directory.

## API Documentation

The backend REST API documentation is available at `http://localhost:<PORT>/api-docs` (replace `<PORT>` with your configured port).

## License

This project is licensed under the MIT License - see the LICENSE file in the backend directory for details.