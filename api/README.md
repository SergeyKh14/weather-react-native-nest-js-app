# API Project Setup

This directory contains the API project, built with **Nest.js** and **TypeORM**.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (Package manager)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup and Running the API

Follow these steps to set up and run the API:

### 1. Install Dependencies

Navigate to the `api` directory and install the necessary dependencies:

```bash
cd api
yarn install
```

### 2. Start the API with Docker Compose

Start the API by running the following command:

```bash
docker-compose up -d
```

### 3. Run Database Migrations

Run the migrations to set up the database schema:

```bash
yarn run:migration
```

---

## Used Technologies

- **Nest.js**: A framework for building efficient, scalable Node.js server-side applications.
- **TypeORM**: ORM for Node.js and TypeScript, used for interacting with PostgreSQL.
- **PostgreSQL**: Relational database used by the API for data storage.

---

## Environment Variables

Make sure to create a `.env` file in the `api` directory based on the provided `.env.example` file. This file should contain all the necessary environment variables, such as database credentials and API keys.

---

## Notes

- The API uses Docker for deployment. Ensure Docker is running on your system before starting the API.
