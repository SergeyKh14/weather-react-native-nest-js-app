# Project Setup

This repository contains two projects:

1. **Client**: A React Native Expo project.
2. **API**: A Nest.js project using TypeORM.

Follow the steps below to set up and run the projects.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (Package manager)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) (for API)

---

### 1. Running the API (Nest.js with TypeORM)

The API is located in the `api` directory.

#### Steps

1. Navigate to the `api` directory:

   ```bash
   cd api
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the API using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Run migration:

   ```bash
   yarn run:migration
   ```

---

### 2. Running the Client (React Native Expo)

The client is located in the `client` directory.

#### Steps

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the Expo development server:

   ```bash
   yarn start
   ```

---

## Used Technologies

### API (Nest.js with TypeORM)

1. Nest.js: A framework for building efficient, scalable Node.js server-side applications.

2. TypeORM: ORM for Node.js and TypeScript, used for interacting with PostgreSQL.

3. PostgreSQL: Relational database used by the API for data storage.

### Client (React Native Expo)

1. Expo: A framework and platform for universal React applications, used to build the React Native client.

### APIs

1. Axios: A promise-based HTTP client for making requests from the client.

2. GeoNames API: A web service for geographical data, used to get cities by their name.

3. OpenWeatherMap API: A service providing weather data, used to fetch weather information based on location.

## Notes

### Environment Variables

Ensure you have the necessary `.env` files set up for both projects:

- For the **client**, create `.env` in the `client` directory based on the provided `.env.example` file.
- For the **api**, create `.env` in the `api` directory based on the provided `.env.example` file.
