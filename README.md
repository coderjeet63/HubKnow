# 🤖 AI-Powered Knowledge Hub (MERN Stack)

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to manage and summarize articles using the Google Gemini LLM.

## 📦 Stack
* **Backend:** Node.js, Express, Mongoose
* **Frontend:** React (Vite)
* **Database:** MongoDB
* **Auth:** JWT (JSON Web Tokens) with RBAC
* **LLM:** Google Gemini (@google/generative-ai)
* **Deployment:** Docker, Docker Compose

## 🛠️ Requirements
* Docker & Docker Compose
* Node.js (for local dev)
* A Google Gemini API Key

## 🚀 How to Run with Docker (Recommended)

1.  **Clone the repo:**
    ```bash
    git clone [your-repo-url]
    cd ai-knowledge-hub
    ```

2.  **Configure Environment:**
    * Create a `.env` file in the `/backend` directory.
    * Use `backend/.env.example` as a template.
    * Add your `GEMINI_API_KEY` and a `JWT_SECRET`.
    * The `MONGO_URI` should be `mongodb://mongo:27017/knowledgehub` to connect to the Docker container.

3.  **Build and Run:**
    * From the root directory, run:
    ```bash
    docker-compose up --build
    ```

4.  **Access the App:**
    * **Frontend:** `http://localhost:3000`
    * **Backend API:** `http://localhost:5000`

## ⚙️ How to Run Locally (Without Docker)

1.  **Run Backend:**
    ```bash
    cd backend
    npm install
    # Create .env file with MONGO_URI=mongodb://localhost:27017/knowledgehub
    npm run dev # (if you have a 'dev' script with nodemon)
    ```

2.  **Run Frontend:**
    ```bash
    cd frontend
    npm install
    # Create .env.local with REACT_APP_API_URL=http://localhost:5000
    npm run dev
    ```

3.  **Run MongoDB:**
    * Ensure you have a local MongoDB instance running on `mongodb://localhost:27017`.

## 🤖 LLM Integration
This project uses the `@google/generative-ai` SDK. The LLM logic is abstracted in `backend/services/llmService.js`. To swap providers (e.g., to OpenAI), you would:
1.  Implement the `summarizeWithOpenAI` function.
2.  Change the `LLM_PROVIDER` environment variable to `openai`.