# HERITAGE HUB (Ticket Booking System)

## Overview
Heritage Hub is a robust and scalable web application that allows users to book tickets for museums, enables authors to manage their assigned venues, and provides admins with full control over the platform. It features user authentication, role-based access, secure payments, and insightful analytics.

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
- **Authentication**: OAuth2, Nodemailer (for OTP login)
- **Payments**: Razorpay Integration
- **Frontend**: React.js 
- **Hosting**: Server deployed on AWS
---

## Setup & Installation
### Prerequisites
- Node.js installed
- MongoDB database setup
- Razorpay account for payment integration

### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Piyush-t24/Online_Ticket_Booking.git
   cd HERITAGE_HUB
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   JWT_SECRET=your_jwt_secret
   PORT = port
   CLIENT_ID = frontend_link
   AWS_REGION = aws_region_bucket
   ACCESS_KEY = aws_iam_access_key
   SECRET_KEY = aws_iam_secret_key
   BUCKET_NAME = aws_bucket_s3
   GOOGLE_CLIENT_ID = google_auth_client_id
   GOOGLE_CLIENT_SECRET = google_auth_client_secret
   HH_EMAIL = smtp_email_address
   HH_PASSWORD = password
   ```
4. Start the server:
   ```bash
   npm start
   ```


---

## Contributing
Feel free to contribute by submitting issues or pull requests. Follow the standard guidelines for coding and documentation.

---


## Contact
For any queries or support, contact [piyushweb3@gmail.com](mailto:piyushweb3@gmail.com).
