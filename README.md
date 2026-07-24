# Children of Capital

A modern, premium editorial platform for **Children of Capital**, built with **React, Vite, Express, and MongoDB**. The website delivers a clean magazine-style reading experience with dynamic articles, newsletter subscriptions, contributor submissions, and a production-ready backend.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

### 📖 Editorial Experience

- Premium magazine-inspired homepage
- Dynamic article pages
- Category-based article filtering
- Featured and Editor's Pick articles
- Responsive design
- Smooth animations
- Search functionality
- Author profiles

---

### ✍️ Contributor System

Visitors can submit articles through a contributor form.

Each submission:

- Stores securely in MongoDB
- Uploads cover images to Cloudinary
- Is marked as **Pending**
- Sends an email notification to the owner

No submission is published automatically.

---

### 📬 Newsletter

- Newsletter subscription
- Duplicate email prevention
- MongoDB storage

---

### 📩 Contact Form

Visitors can contact the publication directly.

The backend sends emails using Nodemailer.

---

### ☁️ Cloudinary Integration

- Article cover images
- Contributor uploads

---

### 🔒 Production Features

- Helmet security headers
- CORS protection
- Request rate limiting
- Compression
- Morgan request logging
- Environment variable support
- Error handling
- MongoDB Atlas ready

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- CSS3
- Lucide React

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- Cloudinary
- Nodemailer
- Helmet
- Morgan
- Compression
- Express Rate Limit
- dotenv

---

# 📂 Project Structure

```
Children-of-Capital/

│
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── assets/
│   └── styles.css
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── public/
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/children-of-capital.git

cd children-of-capital
```

---

## 2. Install Frontend Dependencies

```bash
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd backend

npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000

NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

OWNER_EMAIL=owner@example.com
```

---

# ▶️ Running the Project

## Backend

```bash
cd backend

npm run dev
```
---

## Frontend

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

# 🗄 MongoDB

The backend uses **MongoDB Atlas**.

Create a free Atlas cluster and update:

```
MONGODB_URI
```

inside `.env`.

---

# ☁️ Cloudinary Setup

Create a Cloudinary account.

Copy:

- Cloud Name
- API Key
- API Secret

into your `.env`.

---

# 📧 Email Setup

The project uses **Nodemailer**.

For Gmail:

1. Enable Two-Factor Authentication.
2. Generate an App Password.
3. Use:

```
EMAIL_USER

EMAIL_PASS
```

inside `.env`.

---

# 📡 API Endpoints

## Articles

```
GET /api/articles

GET /api/articles/:slug

GET /api/articles/category/:category
```

---

## Newsletter

```
POST /api/newsletter
```

---

## Contact

```
POST /api/contact
```

---

## Contributor Submission

```
POST /api/submit-article
```

---

# 🚀 Deployment

## Frontend

Deploy on:

- Vercel


## Backend

Deploy on:

- Render

Environment variables should match your local `.env`.

---

## Database

MongoDB Atlas

---

## Images

Cloudinary

---

# 🧪 Build

Frontend

```bash
npm run build
```

Backend

```bash
cd backend

npm start
```

---

# 👨‍💻 Author

Developed by **Sidhant Kaushik**

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and build upon it.
