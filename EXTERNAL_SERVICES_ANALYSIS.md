# External Services & Dependencies Analysis - MuseoPass

## Overview

This document provides a comprehensive analysis of all external services, APIs, and dependencies required to run the MuseoPass ticket booking system.

---

## 1. MongoDB Database

### Purpose

- **Primary database** for storing all application data
- Stores: Users, Authors, Admins, Venues, Orders, Slots, OTP records, Blacklisted tokens

### Setup Required

1. Create a MongoDB account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud) or install MongoDB locally
2. Create a database cluster
3. Get the connection string (URI)
4. **Note**: The code uses `DB_CONNECT` environment variable, but `.env.example` shows `MONGO_URI` - you may need to use `DB_CONNECT` in your `.env` file

### Connection String Format

```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### Files Using MongoDB

- `server/db/db.js` - Database connection
- All model files in `server/db/models/`

---

## 2. Razorpay Payment Gateway

### Purpose

- **Payment processing** for ticket bookings
- Handles secure online transactions
- Supports Indian Rupees (INR) currency

### Setup Required

1. Create account at [Razorpay](https://razorpay.com/)
2. Get your **Key ID** and **Key Secret** from the dashboard
3. Enable test mode for development or production mode for live payments

### How It's Used

- **Order Creation**: Creates Razorpay orders when users book tickets (`server/controller/orderController.js`)
- **Payment Verification**: Verifies payment signatures after successful payment
- **Free Orders**: Orders with ₹0 amount bypass Razorpay (marked as "free")

### Files Using Razorpay

- `server/controller/razorpay.js` - Razorpay instance initialization
- `server/controller/orderController.js` - Order creation and payment verification

### Payment Flow

1. User selects tickets → Backend creates Razorpay order
2. Frontend redirects to Razorpay payment page
3. User completes payment → Razorpay sends webhook/callback
4. Backend verifies payment signature
5. Order status updated to "paid || confirmed"

---

## 3. Google OAuth 2.0

### Purpose

- **Social authentication** - Users can sign in with their Google account
- Alternative to email/password registration
- Automatically verifies email addresses

### Setup Required

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API** or **Google Identity API**
4. Create **OAuth 2.0 Client ID** credentials
5. Configure authorized redirect URIs:
   - For development: `http://localhost:PORT`
   - For production: Your frontend domain
6. Get **Client ID** and **Client Secret**

### How It's Used

- **Frontend**: Uses `@react-oauth/google` library (`client/src/App.jsx`)
- **Backend**: Verifies Google tokens and creates/authenticates users (`server/controller/authController.js`)
- **Auto-registration**: If user doesn't exist, automatically creates account with Google profile data

### Files Using Google OAuth

- `server/utils/googleConfig.js` - OAuth2 client configuration
- `server/controller/authController.js` - Google login handler
- `client/src/App.jsx` - GoogleOAuthProvider wrapper
- `client/src/features/auth/Googlebtn.jsx` - Google login button

---

## 4. Email Service (Gmail SMTP via Nodemailer)

### Purpose

- **OTP (One-Time Password) verification** for:
  - User registration
  - Password-less login
- Sends OTP emails to users for authentication

### Setup Required

1. Use a Gmail account (or any SMTP service)
2. Enable **"Less secure app access"** OR better:
3. Use **App Passwords** (recommended):
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Generate an app password for "Mail"
   - Use this password in `HH_PASSWORD`

### Configuration

- **SMTP Host**: `smtp.gmail.com`
- **Port**: `465` (SSL)
- **Email**: Your Gmail address (`HH_EMAIL`)
- **Password**: Gmail password or App Password (`HH_PASSWORD`)

### How It's Used

- **OTP Generation**: Creates 6-digit numeric OTP
- **OTP Storage**: Hashed and stored in MongoDB with 10-minute expiry
- **Email Sending**: Sends formatted HTML email with OTP
- **OTP Verification**: Validates OTP and deletes after successful verification

### Files Using Email Service

- `server/services/otpService.js` - OTP generation, sending, and verification
- Used in registration and login flows

### Alternative Email Services

You can replace Gmail SMTP with:

- SendGrid
- Mailgun
- AWS SES
- Outlook/Hotmail SMTP

---

## 5. AWS (Amazon Web Services)

### Purpose

AWS is used for **two main purposes**:

#### A. AWS S3 (Simple Storage Service) - **File Storage**

- **Stores venue images** uploaded by admins
- **Stores gallery images** (if implemented for museums)
- Provides CDN-like access to images via public URLs
- Better than local storage because:
  - Scalable storage
  - Fast global access
  - No server storage limitations
  - Automatic backup and redundancy

#### B. AWS Secrets Manager (Production Only)

- **Stores sensitive environment variables** securely
- Used in production environment (`ENV=production`)
- Prevents exposing secrets in code or environment files

### Setup Required

#### For S3:

1. Create AWS account at [AWS Console](https://aws.amazon.com/)
2. Go to **S3** service
3. Create a new bucket:
   - Choose a unique bucket name
   - Select region (e.g., `us-east-1`, `ap-south-1`)
   - Configure permissions (public read for images)
4. Create **IAM User** with S3 access:
   - Go to IAM → Users → Create User
   - Attach policy: `AmazonS3FullAccess` (or custom policy)
   - Create **Access Key ID** and **Secret Access Key**
5. Configure bucket CORS (if needed for frontend access)

#### For Secrets Manager (Optional - Production):

1. Go to **AWS Secrets Manager**
2. Create secret named `my-app-secrets`
3. Store all environment variables as JSON

### Environment Variables Needed

- `AWS_REGION` - Your S3 bucket region (e.g., `us-east-1`)
- `ACCESS_KEY` - IAM user access key ID
- `SECRET_KEY` - IAM user secret access key
- `BUCKET_NAME` - Your S3 bucket name

### How It's Used

- **Image Upload**: When admin adds a venue, image is uploaded to S3
- **Image URL**: S3 returns a public URL stored in database
- **File Path**: Images stored in `uploads/{uuid}` format

### Files Using AWS

- `server/services/s3service.js` - S3 upload service
- `server/controller/venueControllers.js` - Uses S3 for venue image uploads
- `server/utils/awsSecrets.js` - Secrets Manager integration (production)

### Why AWS Instead of Local Storage?

1. **Scalability**: Can handle millions of images
2. **Performance**: CDN-like fast access globally
3. **Reliability**: 99.999999999% durability
4. **Cost-effective**: Pay only for what you use
5. **No server burden**: Images don't consume server disk space
6. **Easy deployment**: Works seamlessly with cloud deployments

---

## 6. Frontend Deployment (CLIENT_ID)

### Purpose

- `CLIENT_ID` environment variable stores the **frontend application URL**
- Used for:
  - CORS configuration
  - Redirect URLs after authentication
  - Cross-origin request handling

### Setup Required

1. Deploy frontend to a hosting service:
   - **Vercel** (recommended for React apps)
   - **Netlify**
   - **AWS Amplify**
   - **GitHub Pages**
   - **Firebase Hosting**
2. Get the deployed URL (e.g., `https://museopass.vercel.app`)
3. Set `CLIENT_ID` to this URL

### Current Frontend Structure

- **Client App**: `client/` folder (React + Vite)
- **Author App**: `author/` folder (React + Vite)
- **Admin App**: `admin/` folder (React + Vite)

### Deploying All Three Frontends on Vercel

You have **3 separate frontend applications** that need to be deployed. Here's the recommended approach:

#### **Single Vercel Project with Path-Based Routing (Recommended)**

Deploy all three apps in **one Vercel project** on the **same domain** with different routes. This gives you:

- ✅ **Single deployment URL** (e.g., `https://museopass.vercel.app`)
- ✅ **Path-based routing**:
  - `/` or `/client` → Client App
  - `/author` → Author App
  - `/admin` → Admin App
- ✅ **Seamless navigation** - Users stay on the same domain when switching between apps
- ✅ Single project to manage
- ✅ Shared environment variables
- ✅ Easier CORS configuration (only one origin)

**How It Works:**

- All three apps are built and deployed together
- Vercel routes requests based on the path
- Each app knows its base path (`/client`, `/author`, `/admin`)
- React Router is configured with the correct basename

**Files Already Configured:**

- ✅ `vercel.json` - Root configuration with routing rules
- ✅ `package.json` - Build script that builds all three apps
- ✅ `scripts/copy-builds.js` - Copies all builds to public directory
- ✅ `client/vite.config.js` - Base path set to `/client/`
- ✅ `author/vite.config.js` - Base path set to `/author/`
- ✅ `admin/vite.config.js` - Base path set to `/admin/`
- ✅ `client/src/App.jsx` - BrowserRouter basename set to `/client`
- ✅ `author/src/App.jsx` - BrowserRouter basename set to `/author`

**Deployment Steps:**

1. **Deploy via Vercel CLI:**

   ```bash
   # From project root
   vercel
   ```

2. **Or via Vercel Dashboard:**

   - Go to vercel.com → New Project
   - Import your Git repository
   - **Root Directory**: Leave empty (project root)
   - Framework Preset: Other
   - Build Command: `npm run build:all` (auto-detected from vercel.json)
   - Output Directory: `public` (auto-detected from vercel.json)

3. **Set Environment Variables** (in single Vercel project):
   ```env
   VITE_HOST=https://your-backend-api.com
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

**Result:**

- Single URL: `https://museopass.vercel.app`
- Client: `https://museopass.vercel.app/` (or `/client`)
- Author: `https://museopass.vercel.app/author`
- Admin: `https://museopass.vercel.app/admin`

**Backend CORS Update:**

```javascript
app.use(
  cors({
    origin: [
      "https://museopass.vercel.app", // Single origin!
    ],
    credentials: true,
  })
);
```

**Navigation Example:**

- User on Client app: `https://museopass.vercel.app/`
- Navigate to Admin: `https://museopass.vercel.app/admin` (same domain!)
- Navigate to Author: `https://museopass.vercel.app/author` (same domain!)

**How to Navigate Between Apps in Your Code:**

To navigate from one app to another, use absolute paths:

```javascript
// From Client app to Admin
window.location.href = "/admin";

// From Client app to Author
window.location.href = "/author";

// From Admin/Author back to Client
window.location.href = "/";
```

Or use React Router's `Navigate` component:

```javascript
import { Navigate } from "react-router-dom";

// Navigate to admin
<Navigate to="/admin" replace />;
```

---

#### **Alternative: Separate Vercel Projects (Not Recommended)**

Deploy each frontend as a **separate Vercel project**. This gives you:

- Independent deployments
- Separate URLs for each app
- Easy to manage and scale
- Different environment variables per app

**Steps:**

1. **Deploy Client App:**

   ```bash
   # Option A: Via Vercel CLI
   cd client
   vercel

   # Option B: Via Vercel Dashboard
   # 1. Go to vercel.com → New Project
   # 2. Import your Git repository
   # 3. Set Root Directory: client
   # 4. Framework Preset: Vite
   # 5. Build Command: npm run build
   # 6. Output Directory: dist
   # 7. Install Command: npm install
   ```

2. **Deploy Author App:**

   ```bash
   cd author
   vercel

   # Or via Dashboard:
   # Root Directory: author
   # Framework Preset: Vite
   ```

3. **Deploy Admin App:**

   ```bash
   cd admin
   vercel

   # Or via Dashboard:
   # Root Directory: admin
   # Framework Preset: Vite
   ```

**Vercel Configuration Files:**

Create `vercel.json` in each frontend folder:

**`client/vercel.json`:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**`author/vercel.json`:** (same structure)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**`admin/vercel.json`:** (same structure)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Environment Variables for Each App:**

Set these in Vercel Dashboard → Project Settings → Environment Variables:

**Client App:**

```env
VITE_HOST=https://your-backend-api.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

**Author App:**

```env
VITE_HOST=https://your-backend-api.com
```

**Admin App:**

```env
VITE_HOST=https://your-backend-api.com
```

**Result:**

- Client: `https://heritage-hub-client.vercel.app`
- Author: `https://heritage-hub-author.vercel.app`
- Admin: `https://heritage-hub-admin.vercel.app`

---

#### **Method 2: Custom Domain Setup (Optional)**

After deployment, you can add custom domains:

- `app.museopass.com` → Client App
- `author.museopass.com` → Author App
- `admin.museopass.com` → Admin App

**Steps:**

1. Go to Vercel Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

---

#### **Updating Backend CORS Configuration**

After deploying, update your backend to allow all three frontend URLs:

**`server/app.js`:**

```javascript
app.use(
  cors({
    origin: [
      "https://heritage-hub-client.vercel.app",
      "https://heritage-hub-author.vercel.app",
      "https://heritage-hub-admin.vercel.app",
      // Add custom domains if used
      "https://app.museopass.com",
      "https://author.museopass.com",
      "https://admin.museopass.com",
    ],
    credentials: true,
  })
);
```

**Or use environment variable:**

```javascript
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
```

**In `.env`:**

```env
ALLOWED_ORIGINS=https://heritage-hub-client.vercel.app,https://heritage-hub-author.vercel.app,https://heritage-hub-admin.vercel.app
```

---

#### **Quick Deployment Checklist**

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy Client: `cd client && vercel`
- [ ] Deploy Author: `cd author && vercel`
- [ ] Deploy Admin: `cd admin && vercel`
- [ ] Set environment variables in each Vercel project
- [ ] Update backend CORS with frontend URLs
- [ ] Test all three deployments
- [ ] (Optional) Add custom domains

### Files Using CLIENT_ID

- `server/utils/awsSecrets.js` - Loads from secrets in production
- `server/app.js` - CORS configuration (currently allows all origins)

---

## 7. Backend/Server Deployment

### Current Setup

- Backend is deployed on **AWS** (as mentioned in main README)
- Uses Node.js with Express.js
- Likely deployed on:
  - **AWS EC2** (Elastic Compute Cloud)
  - **AWS Elastic Beanstalk**
  - **AWS Lambda** (serverless)
  - **AWS ECS** (Container service)

### Environment Variables for Deployment

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (`development` or `production`)
- In production, uses AWS Secrets Manager instead of `.env` file

### Files Related to Deployment

- `server/server.js` - HTTP server setup
- `server/app.js` - Express app configuration
- `server/utils/awsSecrets.js` - Production secrets loader

---

## Summary of External Dependencies

| Service                 | Purpose         | Required For         | Cost                |
| ----------------------- | --------------- | -------------------- | ------------------- |
| **MongoDB**             | Database        | All data storage     | Free tier available |
| **Razorpay**            | Payments        | Ticket purchases     | Transaction fees    |
| **Google OAuth**        | Authentication  | Social login         | Free                |
| **Gmail SMTP**          | Email/OTP       | User verification    | Free (with limits)  |
| **AWS S3**              | File storage    | Venue/gallery images | Pay-per-use (cheap) |
| **AWS Secrets Manager** | Secrets storage | Production security  | Pay-per-use         |
| **AWS (Server)**        | Backend hosting | API server           | Pay-per-use         |
| **Frontend Hosting**    | Client apps     | User interface       | Free tier available |

---

## Environment Variables Checklist

### Required for Development

```env
# Database
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server
PORT=3000
JWT_SECRET=your_random_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Gmail SMTP)
HH_EMAIL=your_email@gmail.com
HH_PASSWORD=your_app_password

# AWS S3
AWS_REGION=us-east-1
ACCESS_KEY=your_aws_access_key
SECRET_KEY=your_aws_secret_key
BUCKET_NAME=your_bucket_name

# Frontend
CLIENT_ID=http://localhost:5173  # or your deployed frontend URL
```

### Production Notes

- In production (`ENV=production`), secrets are loaded from AWS Secrets Manager
- Never commit `.env` files to version control
- Use environment-specific configurations

---

## Setup Steps Summary

1. **MongoDB**: Create cluster → Get connection string
2. **Razorpay**: Sign up → Get API keys
3. **Google OAuth**: Create project → Enable API → Get credentials
4. **Gmail**: Enable App Passwords → Use for SMTP
5. **AWS S3**: Create bucket → Create IAM user → Get keys
6. **Deploy Frontend**: Choose platform → Deploy → Get URL
7. **Deploy Backend**: Deploy to AWS → Configure secrets

---

## Additional Notes

- **OTP Expiry**: 10 minutes (configurable in `otpService.js`)
- **Image Storage**: All images go to S3, URLs stored in MongoDB
- **Payment Currency**: Currently set to INR (Indian Rupees)
- **CORS**: Currently allows all origins (should be restricted in production)
- **JWT Tokens**: Used for authentication, stored in HTTP-only cookies

---

## Questions & Answers

**Q: Why AWS for images instead of local storage?**
A: Scalability, performance, reliability, and no server disk space usage.

**Q: Can I use a different email service?**
A: Yes, modify `otpService.js` to use any SMTP service (SendGrid, Mailgun, etc.)

**Q: Is Razorpay required?**
A: Only for paid tickets. Free tickets (₹0) bypass payment.

**Q: Where is the frontend deployed?**
A: Not specified in code, but `CLIENT_ID` should point to deployed frontend URL.

**Q: Can I use MongoDB locally?**
A: Yes, use `mongodb://localhost:27017/database_name` as connection string.

---

_Last Updated: Based on codebase analysis_
