🚀 Cravio – Full Stack Food Delivery Platform

A production-style food delivery platform inspired by Swiggy, built using the MERN stack.
Cravio supports geo-based restaurant discovery, role-based access control, secure JWT authentication, real-time order lifecycle management, and Razorpay payment integration.

🔗 Live Demo

Frontend: [Add Link]
Backend API: [Add Link]

📌 Features
👤 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin / Restaurant / User)

Protected API routes

Secure middleware validation

🍽 Restaurant & Food Management

Admin can add/manage restaurants

Restaurants can manage menu items

Cloudinary image upload using Multer

Category-based filtering

📍 Geo-Based Restaurant Discovery

Uses latitude & longitude for location detection

Filters restaurants within delivery radius

Distance-based sorting logic

Delivery validation based on geo-coordinates

🛒 Cart System

Persistent cart per user

Stored in database

Quantity management

Auto price calculation

💳 Payment Integration

Razorpay payment gateway integration

Secure order creation before payment

Payment verification API

Prevents duplicate order creation

📦 Order Lifecycle Management

Order statuses:

Placed

Accepted

Preparing

Out for Delivery

Delivered

Role-based order updates (Restaurant/Admin controlled)

🔐 Security & Middleware

JWT validation middleware

Role verification middleware

Centralized error handling middleware

Input validation

📊 Admin Dashboard

Manage users

Manage restaurants

Monitor orders

View payment records

🏗 Tech Stack
Frontend

React.js

Redux Toolkit

Axios

Tailwind / CSS

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

Razorpay SDK

Cloud & Storage

Cloudinary (Image storage)

Multer (File handling)

🧠 System Architecture

Client → REST API → Middleware → Controllers → MongoDB
Payment flow → Razorpay → Payment verification → Order confirmation

Geo filtering handled using:

Latitude/Longitude comparison

Delivery radius validation

📂 Project Structure
/client
  /components
  /pages
  /redux
/server
  /controllers
  /models
  /routes
  /middleware
  /utils

🔄 API Flow Example
Order Creation Flow

User adds items to cart

Cart validated server-side

Razorpay order created

Payment verification endpoint triggered

Order stored in DB

Status initialized to "Placed"

⚡ Key Engineering Decisions

JWT used over sessions for stateless scalability

Role-based middleware for route protection

Cart stored server-side to prevent data loss

Payment verification implemented to prevent fraud

Modular controller-service structure for scalability

🧪 Future Improvements

MongoDB 2dsphere index for optimized geo queries

Redis caching for restaurant listing

Real-time order tracking via WebSockets

Docker deployment

Rate limiting

🚀 Installation
git clone https://github.com/naitik-raj17/Cravio.git
cd Cravio
npm install


Add .env:

MONGO_URI=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=


Run:

npm run dev

📈 Why This Project Matters

Cravio demonstrates:

Full-stack architecture design

Secure authentication & authorization

Payment gateway integration

Geo-based logic implementation

Stateful order lifecycle management

Production-style backend structure

👨‍💻 Author

Naitik Raj
GitHub: https://github.com/naitik-raj17
