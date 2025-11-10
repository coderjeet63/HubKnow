# 🚀 Knowledge Hub

Welcome to Knowledge Hub, a full-stack application for sharing and managing articles and information. This project is built with a separate frontend and backend, using the MERN stack.

---

## 📋 Table of Contents

* [Project Description](#-project-description)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
* [Running the Application](#-running-the-application)
* [Usage](#-usage)

---

## 📖 Project Description

"Knowledge Hub is a platform where users can browse and add articles. By using the Gemini API, it can generate summarized articles and resources. It features a secure admin panel for content creators to manage articles (CRUD) and users."

---

## ✨ Features

* **User Features:**
    * Browse all published articles
    * Search for specific articles
    * Read full articles
    * Summarize articles using the Gemini API
* **Admin Features:**
    * Secure admin login
    * CRUD Operations: Create, Read, Update, and Delete articles
    * Manage article categories
    * Manage users

---

## 🛠️ Tech Stack

* **Frontend:**
    * React.js
    * (Add any others like: `react-router-dom`, `axios`, `Tailwind CSS`, etc.)
* **Backend:**
    * Node.js
    * Express.js
* **Database:**
    * MongoDB (with Mongoose)

---

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites

You must have the following software installed:
* [Node.js](https://nodejs.org/) (which includes `npm`)

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/coderjeet63/HubKnow.git](https://github.com/coderjeet63/HubKnow.git)
    cd Knowledge Hub
    ```

2.  **Install Backend Dependencies:**
    (Navigate into the `backend` folder and install packages)
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    (From the `backend` folder, go back up and into the `frontend` folder)
    ```bash
    cd ../frontend
    npm install
    ```

### 3. Environment Variables (.env)

This is a critical step for setting up the backend.

1.  In the `backend` folder, create a new file named `.env`
2.  Open the `.env` file and add the following variables. Replace the values with your own.

    ```env
    # Your MongoDB Connection String (local or Atlas)
    MONGO_URI=your_mongodb_connection_string_here
    
    # Your Server Port
    PORT=5000
    
    # Admin Credentials (as you requested)
    ADMIN_EMAIL=abc@gmail.com
    ADMIN_PASSWORD=abc@gmail.com
    # You can make anyone an admin, just change the user's role in MongoDB
    
    # (Add any other secrets, like JWT_SECRET or GEMINI_API_KEY, if you have one)
    ```

---

## 🚀 Running the Application

You will need two separate terminals to run the frontend and backend simultaneously.

1.  **Run the Backend Server:**
    (In your terminal, from the `backend` folder)
    ```bash
    npm start
    ```
    *The server should now be running on `http://localhost:5000` (or your chosen PORT)*

2.  **Run the Frontend App:**
    (In your second terminal, from the `frontend` folder)
    ```bash
    npm run dev
    ```
    *The React app will open in your browser at `http://localhost:5173` (or a similar port)*

---

## 💻 Usage

* **Public Site:** Open [http://localhost:5173](http://localhost:5173) to browse articles.
