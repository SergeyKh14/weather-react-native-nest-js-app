# Client Project Setup

This directory contains the Client project, built with **React Native Expo**.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) (Package manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for managing Expo projects)

---

## Setup and Running the Client

Follow these steps to set up and run the client:

### 1. Install Dependencies

Navigate to the `client` directory and install the necessary dependencies:

```bash
cd client
yarn install
```

### 2. Start the Expo Development Server

Start the development server to preview the React Native application:

```bash
yarn start
```

You can then use the Expo Go app or an emulator to preview the application.

---

## Used Technologies

- **Expo**: A framework and platform for universal React applications, used to build the React Native client.
- **Axios**: A promise-based HTTP client for making requests to the API.
- **GeoNames API**: A web service for geographical data, used to get cities by their name.
- **OpenWeatherMap API**: A service providing weather data, used to fetch weather information based on location.

---

## Environment Variables

Make sure to create a `.env` file in the `client` directory based on the provided `.env.example` file. This file should contain all the necessary environment variables, such as API keys and base URLs.

---

## Notes

- Ensure the API is running and accessible before using the client.
