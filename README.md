# 📚 BookWise
![image](https://github.com/user-attachments/assets/46feac58-0d69-48f8-a4ab-86159066e8cc)

BookWise is a **capstone-level fullstack web application** developed as the final project of the **React specialization bootcamp by Rocketseat University of Technology**, a program with over 50 hours of intensive training. While the original version was a simple serverless challenge, this expanded edition transforms it into a **fully integrated e-commerce and book review platform**, with a custom backend, external services, and modern frontend.

The objective is to showcase solid experience as a **fullstack software developer**, capable of building scalable, secure, and production-ready applications with modern tools and best practices.

---

## 🚀 Tech Stack

### Frontend
- **Next.js** – React framework for SSR and SSG
- **React** – Component-based architecture
- **Stitches** – For styling
- **TypeScript** – Type-safe development
- **NextAuth** – Secure Google OAuth login
- **Stripe.js** – Client-side payment integration

### Backend
- **Ruby on Rails (API-only)** – Robust API backend
- **PostgreSQL** – Relational database
- **Active Record** – ORM for database management
- **Cloudinary** – Cloud-based image hosting and optimization

---

## 🧠 What Users Can Do

### 👤 Authentication
- Sign in with **Google OAuth**
- Sessions handled securely with **NextAuth**
- GDPR-compliant data management (only email is stored)

### 📚 Explore Books
- View an organized bookshelf with filters and categories
- View detailed information for each book (cover, description, reviews)

### ⭐ Review System
- Add personal **ratings and reviews**
- View public reviews from other users
- Update or delete your own reviews
- Visual feedback with stars and timestamps

### 🛍️ Buy Books
- Add books to cart and proceed to **secure checkout**
- Payments processed through **Stripe**
- Receive confirmation of purchase
- Admin can define book prices, inventory, and availability

### 💾 User Account
- View your **personal bookshelf**
- Check purchased books
- Track your favorite or reviewed titles
- All private data managed securely and limited to essential info

---

## 🔐 GDPR & Data Privacy

BookWise follows strict privacy protocols and aligns with the **General Data Protection Regulation (GDPR)**.

- ✅ Only the user’s **email** is stored for identification.
- ✅ Authentication is handled by **Google**, with no passwords stored.
- ✅ All payment data is securely handled by **Stripe** — no credit card information is stored.
- ✅ All images are stored via **Cloudinary**, using secure and optimized uploads.
- ✅ No sensitive personal data is collected or retained by the system.

---
## 🧪 Local Development

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- Ruby (v3.2+)
- Rails (7+)
- PostgreSQL
- Stripe + Google Developer account for credentials

---

### 1. Clone the project

```bash
git clone git@github.com:thiagohrcosta/BookWise.git
cd bookwise```
```

### 2. Setup Frontend

```
cd frontend
npm install
touch .env.local # Add Google, Stripe, Cloudinary credentials yarn install
npm run dev
```

### 3. Setup Backend (link to the API will be added later)

```
cd backend
touch .env  # Fill with Cloudinary API Kei
bundle install
rails db:create db:migrate
rails s
```

### Certificate
![image](https://github.com/user-attachments/assets/bfa17895-d7c9-4d80-a60a-7ac7dc265017)

