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

(Add 2-3 sentences describing your project here. What does it do? Why did you build it?)

* **Example:** "Knowledge Hub is a platform where users can browse technical articles and resources. It features a secure admin panel for content creators to manage (create, read, update, and delete) articles."

---

## ✨ Features

* **User Features:**
    * Browse all published articles
    * Search for specific articles
    * Read full articles
* **Admin Features:**
    * Secure admin login
    * CRUD Operations: Create, Read, Update, and Delete articles
    * Manage article categories

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
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

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
    MONGO_URI=mongodb://localhost:27017/knowledgehub
    
    # Your Server Port
    PORT=5000
    
    # Admin Credentials (as you requested)
    ADMIN_EMAIL=abc@gmail.com
    ADMIN_PASSWORD=abc@gmail.com
    
    # (Add any other secrets, like JWT_SECRET, if you have one)
    ```

> **Security Warning:** The `.env` file contains sensitive passwords and keys. **NEVER** commit this file to GitHub. Make sure you have a `.gitignore` file in your main `Knowledge Hub` folder and that it contains the line:
> `.env`

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
    npm start
    ```
    *The React app will open in your browser at `http://localhost:3000`*

---

## 💻 Usage

* **Public Site:** Open [http://localhost:3000](http://localhost:3000) to browse articles.
* **Admin Panel:** Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) (or your admin route) and log in with the admin credentials.
