# AI Chatbot Application

## Project Description

This project is an AI-powered chatbot application consisting of a frontend and a backend. The frontend is built with React and TypeScript, while the backend is built with Express.js. The application allows users to interact with an AI chatbot through a user-friendly interface.

## Installation

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Steps

1. Clone the repository:

    ```sh
    git clone git@github.com:machirajusandy/ai-chat-GetFocus.git
    cd ai-chat-GetFocus
    ```

2. Install dependencies for both frontend and backend:

    ```sh
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

## Running the Application

### Using Docker Compose

1. Build and start the containers:

    ```sh
    docker-compose up --build
    ```

2. Access the application:
    - Frontend: `http://localhost:8080`
    - Backend: `http://localhost:4005`

### Running Locally

1. Start the backend server:

    ```sh
    cd backend
    npm start
    ```

2. Start the frontend development server:

    ```sh
    cd frontend
    npm run dev
    ```

3. Access the application:
    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:4005`

## Running Tests

### Unit Tests

To run unit tests for the frontend:

```sh
cd frontend
npm test
```

### End-to-End Tests

To run End-to-End Tests for the frontend, you need to start the application first. You can either run the frontend and backend locally or use Docker Compose.

#### Running Locally

1. Start the backend server:

    ```sh
    cd backend
    npm start
    ```
    

2. Start the frontend development server:

    ```sh
    cd frontend
    npm run dev
    ```
3. Run the test:

   ```sh
   cd frontend
   npm test:e2e:dev
   ```

#### Using Docker Compose

1. Build and start the containers:

    ```sh
    docker-compose up --build
    ```
2. Run the test

    ```sh
    cd frontend
    npm test:e2e:prod
    ```



## Project Details

### Frontend

- **Framework**: React, TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest, Rect Testing Library, Playwright

### Backend

- **Framework**: Express.js
- **Dependencies**: Axios, CORS

## Environment Variables

The following environment variables are used in the project:

- `VITE_READ_EVENT_URL`: URL for the read event stream (defined in `frontend/.env`)