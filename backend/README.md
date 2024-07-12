# Warehouse Backend Application

Welcome to the backend part of the Warehouse application. This document outlines the setup, architecture, and how to run the application locally.

## Overview

The Warehouse backend is a TypeScript-based Express application designed to manage warehouse operations, including products, shipments, and statuses. It provides a REST API for creating, reading, updating, and deleting (CRUD) these resources.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- MySQL database

### Installation

1. Clone the repository to your local machine.
2. Navigate to the `backend/` directory.
3. Copy the `.env.example` file to a new file named `.env` and update the environment variables to match your local setup, especially the `DATABASE_URL`.
4. Run `npm install` to install the dependencies.

### Database Setup
Ensure your MySQL database is running and accessible via the DATABASE_URL specified in your .env file.

#### Prisma Migrations and Seeding
The database is managed with Prisma, so you'll need to run migrations and generate the Prisma client before starting the application:

1. Run `npm run prisma:migrate` deploy to apply the database migrations.
2. Generate the Prisma client by running `npm run prisma:generate`.

Optionally, to seed the database with initial data, run:

```sh
npm run prisma:seed
```

This will execute the seed script defined in application Prisma setup.

For more detailed information on Prisma ORM, see official documantation [Prisma](https://www.prisma.io/docs) 

### Development Server

Run `npm run dev` for a dev server. Application will start at http://localhost: \<PORT> (replace \<PORT> with the port number specified in your .env file). The application will automatically reload if you change any of the source files.

### Building the Application

Since the application is written in TypeScript, it needs to be compiled to JavaScript before it can be run. To build the application, run:

```sh
npm run build
```

This command compiles the TypeScript files into JavaScript in the dist/ directory.

### Running the Application
To start the application, first ensure that you have built the application using the instructions above. Then, run the following command in the backend/ directory:

```sh
npm start
```

### API Documentation
The REST API supports the following operations:

- **Products**: List, create, update, and delete products.
- **Shipments**: List, create, update, and delete shipments.
- **Statuses**: List, create, update, and delete statuses.

For detailed API endpoints and their specifications, please refer to the OpenAPI documentation available at http://localhost: \<PORT>/api/docs/ (replace \<PORT> with the port number specified in your .env file). Or you can download API specification in json at http://localhost: \<PORT>/api/docs.json.

### Testing

Before running the unit tests, it is necessary to create a .env.test file with the configuration of the testing database. This ensures that tests run against a separate database environment.

To run the unit ans e2e tests, execute the following command:

```sh
npm test
```

This will run the tests defined in the jest.config.ts and jest.setup.ts files, and output the results.

## License
This project is licensed under the MIT License - see the LICENSE file for details.