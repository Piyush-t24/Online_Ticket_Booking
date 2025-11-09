# MUSEOPASS (Ticket Booking System)

## Overview

MuseoPass is a robust and scalable web application that allows users to book tickets for museums, enables authors to manage their assigned venues, and provides admins with full control over the platform. It features user authentication, role-based access, secure payments, and insightful analytics.

---

## Features

### User Features

- **Authentication**:
  - Users can sign up and log in using Gmail/Google authentication (OAuth2).
  - OTP-based login and password-based login using Nodemailer.
- **Ticket Management**:
  - Book tickets for museum visits.
  - View booked tickets and their details.
  - Cancel booked tickets if needed.
- **Payment Integration**:
  - Seamlessly integrated **Razorpay** payment gateway for secure transactions.

### Author Features

Authors are assigned to specific museums with different levels of permissions.

- **Museum Management**:
  - Edit museum details such as name, description, and contact info.
  - Add and update the museum gallery with images.
- **Ticket & Slot Management**:
  - Add ticket slots by date, time, and capacity.
  - View all ticket bookings and details related to their assigned museum.

### Admin Features

Admins have complete control over the platform.

- **User & Author Management**:
  - Manage all users and authors.
  - Assign authors to specific museum venues with different permission levels.
- **Venue & Ticket Management**:
  - Add and edit museum venues.
  - Oversee ticket bookings and availability.
- **Insights & Analytics**:
  - View booking statistics and insights for better decision-making.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: OAuth2 (Google), JWT, Nodemailer (for OTP login)
- **Payments**: Razorpay Integration
- **Frontend**: React.js, Vite, Redux Toolkit, Tailwind CSS
- **File Storage**: AWS S3
- **Hosting**: Backend on AWS, Frontend on Vercel

---

## Project Structure

```
Online_Ticket_Booking/
├── server/              # Backend API (Node.js + Express)
├── client/              # User-facing frontend (React + Vite)
├── author/              # Author dashboard frontend (React + Vite)
├── admin/               # Admin panel frontend (React + Vite)
├── scripts/             # Build scripts for deployment
├── package.json         # Root package.json for monorepo builds
└── vercel.json          # Vercel deployment configuration
```

---

## Setup & Installation

### Prerequisites

- **Node.js** (v16 or higher) installed
- **MongoDB** database (local or MongoDB Atlas)
- **Razorpay** account for payment integration
- **Google Cloud Console** account for OAuth
- **AWS Account** (for S3 storage and backend hosting)
- **Gmail Account** (for SMTP/OTP emails)

### Steps to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Piyush-t24/Online_Ticket_Booking.git
   cd Online_Ticket_Booking
   ```

2. **Install dependencies for each app:**

   Install backend dependencies:

   ```bash
   cd server
   npm install
   cd ..
   ```

   Install frontend dependencies:

   ```bash
   # Client app
   cd client
   npm install
   cd ..

   # Author app
   cd author
   npm install
   cd ..

   # Admin app
   cd admin
   npm install
   cd ..
   ```

3. Set up environment variables:

   **Backend (Server):**

   Create `.env` file in `server/` directory:

   ```env
   DB_CONNECT=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   JWT_SECRET=your_jwt_secret
   PORT=3000
   CLIENT_ID=http://localhost:5173
   AWS_REGION=aws_region_bucket
   ACCESS_KEY=aws_iam_access_key
   SECRET_KEY=aws_iam_secret_key
   BUCKET_NAME=aws_bucket_s3
   GOOGLE_CLIENT_ID=google_auth_client_id
   GOOGLE_CLIENT_SECRET=google_auth_client_secret
   HH_EMAIL=smtp_email_address
   HH_PASSWORD=password
   ```

   **Note:** Use `DB_CONNECT` (not `MONGO_URI`) as the variable name.

   **Frontend (Client App):**

   Create `.env` file in `client/` directory:

   ```env
   VITE_HOST=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

   **Frontend (Author App):**

   Create `.env` file in `author/` directory:

   ```env
   VITE_HOST=http://localhost:3000
   ```

   **Frontend (Admin App):**

   No environment variables needed currently.

   **Note:**

   - Copy `.env.example` to `.env` in each directory and fill in your values
   - `.env` files are gitignored and should NOT be committed
   - For production, set these in your hosting platform (Vercel, etc.)

4. **Start the development servers:**

   **Start Backend Server:**

   ```bash
   cd server
   npm start
   # Server will run on http://localhost:3000
   ```

   **Start Frontend Apps (in separate terminals):**

   Client App:

   ```bash
   cd client
   npm run dev
   # Client app will run on http://localhost:5173
   ```

   Author App:

   ```bash
   cd author
   npm run dev
   # Author app will run on http://localhost:5174 (or next available port)
   ```

   Admin App:

   ```bash
   cd admin
   npm run dev
   # Admin app will run on http://localhost:5175 (or next available port)
   ```

---

## Deployment

### Frontend Deployment (Vercel)

All three frontend apps are deployed together on a single Vercel project with path-based routing:

- **Client App**: `https://your-domain.vercel.app/` or `/client`
- **Author App**: `https://your-domain.vercel.app/author`
- **Admin App**: `https://your-domain.vercel.app/admin`

See `EXTERNAL_SERVICES_ANALYSIS.md` for detailed deployment instructions.

### Backend Deployment (AWS)

The backend server is deployed on AWS. Set environment variables in AWS Secrets Manager for production.

---

## Available Scripts

### Root Level

- `npm run build:all` - Build all three frontend apps
- `npm run build:client` - Build client app only
- `npm run build:author` - Build author app only
- `npm run build:admin` - Build admin app only

### Server

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Apps (Client/Author/Admin)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## Additional Documentation

- **External Services Setup**: See `EXTERNAL_SERVICES_ANALYSIS.md` for detailed setup instructions for MongoDB, Razorpay, Google OAuth, AWS S3, and email services.
- **API Documentation**: See `server/README.md` for backend API endpoints documentation.

---

## Contributing

Feel free to contribute by submitting issues or pull requests. Follow the standard guidelines for coding and documentation.

**Before contributing:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is private and proprietary.

---

## Contact

For any queries or support, contact [piyushweb3@gmail.com](mailto:piyushweb3@gmail.com).
