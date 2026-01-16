# Storage Management System - Backend

A modular RESTful API built with **Node.js**, **Express**, and **TypeScript**.

## 🚀 Live Links
- **API URL:** [https://file-storage-backend-eta.vercel.app](https://file-storage-backend-eta.vercel.app)
- **Repository:** [https://github.com/pmppiyas/file_storage_managment](https://github.com/pmppiyas/file_storage_managment)
- **Postman:** [Api Collection](https://www.postman.com/altimetry-observer-2783100/sperktech/folder/40648991-94e99113-61e0-4d37-a7cd-8473c582fd08)

## 🔐 Test Credentials
For testing the protected routes, you can use the following pre-created user account:

- **Email:** `pmppiyas@gmail.com`
- **Password:** `Password123!`

## ✨ Key Features
- **Cloud Storage:** **Cloudinary** integration via **Multer** for file handling.
- **Automated Emails:** **Nodemailer** for system notifications.
- **Advanced Auth:** **Passport.js** (JWT & Local) for secure access.
- **Recent Tracking:** Activity-based file tracking via `lastViewedAt`.
- **Database:** **Mongoose (MongoDB)** for structured data modeling.
- **Error Handling:** Centralized global middleware for consistent responses.
- **Architecture:** Clean **Modular Pattern** (Route-Controller-Service).

## 🛠️ Tech Stack
- **Core:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** Passport.js, JWT, Bcrypt
- **Services:** Cloudinary, Nodemailer
- **Validation:** Zod

## 📂 Project Structure
```text
src/
├── app/
│   ├── config/         # Passport, Cloudinary & Email configs
│   ├── middleware/     # Error handler & Auth guards
│   ├── modules/        # Domain-driven modules (Auth, File, User)
│   ├── routes/         # Centralized routing
│   └── utils/          # Helpers (Email, Response)
├── app.ts              # App setup
└── server.ts           # DB connection & Entry point
```



### 1. Clone the Repository
```bash
git clone https://github.com/pmppiyas/file_storage_managment.git
cd file_storage_managment
pnpm install
```

### 🌳 Happy Coding 🎋
