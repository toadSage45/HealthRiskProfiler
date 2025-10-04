# Health Risk Profiler

This project is a web application that analyzes health data to provide a risk profile. It consists of a React frontend and a Node.js backend.

## Architecture

### Frontend

The frontend is a single-page application built with React and Vite. It allows users to input their health data and view the risk analysis results.

- **`src/App.jsx`**: The main application component.
- **`src/components/FormComponent.jsx`**: The form for users to input their health data.
- **`src/components/ImageUploadComponent.jsx`**: A component to upload images of health reports.
- **`src/components/ResultsComponent.jsx`**: A component to display the risk analysis results.
- **`src/api.js`**: A module for making API calls to the backend.

### Backend

The backend is a Node.js application using Express.js. It provides a RESTful API for the frontend to consume.

- **`app.js`**: The main application file.
- **`routes.js`**: The API routes.
- **`ai.js`**:  Handles the AI-powered analysis of the health data.
- **`parser.js`**: Parses the health data from the uploaded reports.
- **`risk.js`**: Calculates the health risk based on the parsed data.

## Setup Instructions

### Prerequisites

- Node.js and npm

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

## API Usage

The backend exposes the following API endpoints:

- **`POST /api/analyze`**: Analyzes health data.

**Example Request:**

```json
{
  "age": 45,
  "bloodPressure": {
    "systolic": 140,
    "diastolic": 90
  },
  "cholesterol": {
    "ldl": 160,
    "hdl": 40
  }
}
```

**Example Response:**

```json
{
  "riskScore": 0.75,
  "riskLevel": "High",
  "recommendations": [
    "Consult a doctor",
    "Improve diet",
    "Increase physical activity"
  ]
}
```
