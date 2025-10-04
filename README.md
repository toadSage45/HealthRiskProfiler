# SDE Intern Assignment: AI-Powered Health Risk Profiler

## Problem Statement

Develop a service that analyzes lifestyle survey responses (typed or scanned forms) and generates a structured health risk profile. The intern must handle noisy inputs, missing answers, and provide guardrails for incomplete data. Output must include factors, risk level, and actionable recommendations.

### Focus Area: OCR -> Factor Extraction -> Risk and Recommendations

---

## Submission Instructions (Backend)

*   Submit a working backend demo (local with ngrok or simple cloud instance).
*   Provide a GitHub repository containing your code.
*   Include a README.md with setup instructions, architecture, and API usage examples.
*   Provide sample curl/Postman requests to test your endpoints.
*   Submit a short screen recording showing your endpoints working with sample inputs.

---

## Evaluation Criteria (Backend)

*   Correctness of API responses and adherence to JSON schemas.
*   Handling of both text and image inputs with OCR.
*   Implementation of guardrails and error handling.
*   Code organization, clarity, and reusability.
*   Effective use of AI for chaining and validation.

---

## Architecture

### Frontend

The frontend is a single-page application built with React and Vite. It allows users to input their health data and view the risk analysis results.

-   **`src/App.jsx`**: The main application component.
-   **`src/components/FormComponent.jsx`**: The form for users to input their health data.
-   **`src/components/ImageUploadComponent.jsx`**: A component to upload images of health reports.
-   **`src/components/ResultsComponent.jsx`**: A component to display the risk analysis results.
-   **`src/api.js`**: A module for making API calls to the backend.

### Backend

The backend is a Node.js application using Express.js. It provides a RESTful API for the frontend to consume.

-   **`app.js`**: The main application file.
-   **`routes.js`**: The API routes.
-   **`ai.js`**: Handles the AI-powered analysis of the health data.
-   **`parser.js`**: Parses the health data from the uploaded reports.
-   **`risk.js`**: Calculates the health risk based on the parsed data.

---

## Setup Instructions

### Prerequisites

-   Node.js and npm

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

---

## API Usage

The backend exposes the following API endpoint:

-   **`POST /api/analyze`**: Analyzes health data from a survey form (text or image).

### Step 1: OCR/Text Parsing

**Input (Text):**

```bash
curl -X POST http://localhost:3000/api/analyze \
-H "Content-Type: application/json" \
-d '{"age":42,"smoker":true,"exercise":"rarely","diet":"high sugar"}'
```

**Input (Image):**

```bash
curl -X POST http://localhost:3000/api/analyze \
-F "image=@/path/to/your/survey_image.png"
```

**Expected Output (JSON):**

```json
{
  "answers": {
    "age": 42,
    "smoker": true,
    "exercise": "rarely",
    "diet": "high sugar"
  },
  "missing_fields": [],
  "confidence": 0.92
}
```

**Guardrail / Exit Condition (JSON):**

```json
{
  "status": "incomplete_profile",
  "reason": ">50% fields missing"
}
```

### Step 2: Factor Extraction

**Expected Output (JSON):**

```json
{
  "factors": ["smoking", "poor diet", "low exercise"],
  "confidence": 0.88
}
```

### Step 3: Risk Classification

**Expected Output (JSON):**

```json
{
  "risk_level": "high",
  "score": 78,
  "rationale": ["smoking", "high sugar diet", "low activity"]
}
```

### Step 4: Recommendations

**Expected Output (JSON):**

```json
{
  "risk_level": "high",
  "factors": ["smoking", "poor diet", "low exercise"],
  "recommendations": [
    "Quit smoking",
    "Reduce sugar",
    "Walk 30 mins daily"
  ],
  "status": "ok"
}
```