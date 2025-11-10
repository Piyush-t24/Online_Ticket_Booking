# 🚀 EC2 Server Deployment Guide for MuseoPass

This guide will help you deploy the MuseoPass backend server on AWS EC2.

---

## 📋 Prerequisites

1. **AWS EC2 Instance** running Ubuntu (20.04 or 22.04 LTS recommended)
2. **SSH Access** to your EC2 instance
3. **GitHub Repository** access
4. **GitHub Secrets** configured (see below)

---

## 🔧 Step 1: Initial EC2 Setup

### 1.1 Connect to EC2 Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 1.2 Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18 or higher)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally (Process Manager)
sudo npm install -g pm2

# Install Git (if not already installed)
sudo apt install git -y

# Install Nginx (optional, for reverse proxy)
sudo apt install nginx -y
```

### 1.3 Verify Installations

```bash
node --version    # Should show v18.x or higher
npm --version
pm2 --version
git --version
```

---

## 📦 Step 2: Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/Piyush-t24/Online_Ticket_Booking.git

# Navigate to server directory
cd Online_Ticket_Booking/server
```

---

## 🔐 Step 3: Setup Environment Variables

### Option A: Using .env file (Development/Testing)

```bash
# Create .env file
nano .env
```

Add all required environment variables:

```env
# Database
DB_CONNECT=your_mongodb_connection_string

# Server
PORT=3000
ENV=production

# JWT
JWT_SECRET=your_jwt_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (Gmail SMTP)
HH_EMAIL=your_email@gmail.com
HH_PASSWORD=your_app_password

# AWS
AWS_REGION=your_aws_region
ACCESS_KEY=your_aws_access_key
SECRET_KEY=your_aws_secret_key
BUCKET_NAME=your_s3_bucket_name

# Frontend URL (for CORS)
CLIENT_ID=https://your-vercel-domain.vercel.app
```

### Option B: Using AWS Secrets Manager (Production - Recommended)

The server automatically fetches secrets from AWS Secrets Manager when `ENV=production`.

1. Create a secret in AWS Secrets Manager with name: `museopass-secrets`
2. Store all environment variables as JSON:

```json
{
  "DB_CONNECT": "your_mongodb_connection_string",
  "PORT": "3000",
  "JWT_SECRET": "your_jwt_secret",
  "RAZORPAY_KEY_ID": "your_razorpay_key_id",
  "RAZORPAY_KEY_SECRET": "your_razorpay_key_secret",
  "GOOGLE_CLIENT_ID": "your_google_client_id",
  "GOOGLE_CLIENT_SECRET": "your_google_client_secret",
  "HH_EMAIL": "your_email@gmail.com",
  "HH_PASSWORD": "your_app_password",
  "AWS_REGION": "your_aws_region",
  "ACCESS_KEY": "your_aws_access_key",
  "SECRET_KEY": "your_aws_secret_key",
  "BUCKET_NAME": "your_s3_bucket_name",
  "CLIENT_ID": "https://your-vercel-domain.vercel.app"
}
```

3. Ensure your EC2 instance has IAM role with `SecretsManagerReadWrite` permission.

---

## 🚀 Step 4: Install Dependencies and Start Server

```bash
# Install dependencies
npm install --production

# Start server with PM2
pm2 start server.js --name museopass-backend

# Save PM2 configuration (auto-start on reboot)
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it outputs (usually: sudo env PATH=... pm2 startup systemd -u ubuntu --hp /home/ubuntu)
```

### PM2 Useful Commands

```bash
pm2 list                    # List all processes
pm2 logs museopass-backend  # View logs
pm2 restart museopass-backend  # Restart server
pm2 stop museopass-backend     # Stop server
pm2 delete museopass-backend   # Remove from PM2
pm2 monit                     # Monitor resources
```

---

## 🔒 Step 5: Configure Security Groups

In AWS EC2 Console:

1. Go to **Security Groups** → Select your instance's security group
2. Add **Inbound Rules**:
   - **Type**: Custom TCP
   - **Port**: 3000 (or your PORT)
   - **Source**: 0.0.0.0/0 (or specific IPs for better security)
   - **Description**: MuseoPass Backend API

---

## 🌐 Step 6: Setup Nginx Reverse Proxy (Optional but Recommended)

### 6.1 Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/museopass
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # or your EC2 public IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6.2 Enable and Start Nginx

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/museopass /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## 🔄 Step 7: Setup GitHub Actions (Automatic Deployment)

### 7.1 Generate SSH Key for GitHub Actions

On your **local machine**:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/ec2_deploy_key

# This creates:
# - ~/.ssh/ec2_deploy_key (private key - keep secret!)
# - ~/.ssh/ec2_deploy_key.pub (public key)
```

### 7.2 Add Public Key to EC2

```bash
# Copy public key to EC2
ssh-copy-id -i ~/.ssh/ec2_deploy_key.pub ubuntu@your-ec2-ip

# Or manually add to ~/.ssh/authorized_keys on EC2
cat ~/.ssh/ec2_deploy_key.pub | ssh ubuntu@your-ec2-ip "cat >> ~/.ssh/authorized_keys"
```

### 7.3 Add GitHub Secrets

Go to your GitHub repository:
1. **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `EC2_SSH_KEY` | Contents of `~/.ssh/ec2_deploy_key` (private key) | SSH private key for EC2 access |
| `EC2_HOST` | Your EC2 public IP or domain | EC2 instance address |
| `EC2_USERNAME` | `ubuntu` (usually) | SSH username |

**Example:**
- `EC2_SSH_KEY`: Copy entire content of `~/.ssh/ec2_deploy_key` including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`
- `EC2_HOST`: `54.123.45.67` or `api.museopass.com`
- `EC2_USERNAME`: `ubuntu`

---

## ✅ Step 8: Test Deployment

### 8.1 Test Server Locally on EC2

```bash
# Check if server is running
pm2 status

# Check logs
pm2 logs museopass-backend

# Test API endpoint
curl http://localhost:3000
```

### 8.2 Test from Outside

```bash
# From your local machine
curl http://your-ec2-ip:3000

# Or if using Nginx
curl http://your-domain.com
```

---

## 🔍 Troubleshooting

### Server Not Starting

```bash
# Check PM2 logs
pm2 logs museopass-backend --lines 100

# Check if port is in use
sudo lsof -i :3000

# Check environment variables
pm2 env museopass-backend
```

### GitHub Actions Deployment Failing

1. **Check SSH Connection:**
   ```bash
   ssh -i ~/.ssh/ec2_deploy_key ubuntu@your-ec2-ip
   ```

2. **Verify GitHub Secrets:**
   - Ensure `EC2_SSH_KEY` includes full private key
   - Check `EC2_HOST` is correct
   - Verify `EC2_USERNAME` is correct

3. **Check EC2 Directory:**
   - Ensure repository is cloned at `/home/ubuntu/Online_Ticket_Booking`
   - Or update workflow file with correct path

### MongoDB Connection Issues

```bash
# Test MongoDB connection from EC2
mongosh "your_mongodb_connection_string"

# Check if MongoDB allows EC2 IP
# Add EC2 IP to MongoDB Atlas Network Access list
```

### CORS Issues

Update `CLIENT_ID` in environment variables to match your Vercel frontend URL.

---

## 📝 Update Frontend Environment Variables

After deploying backend, update your frontend `.env` files:

**Client App (`client/.env`):**
```env
VITE_HOST=http://your-ec2-ip:3000
# Or if using domain:
VITE_HOST=https://api.museopass.com
```

**Author App (`author/.env`):**
```env
VITE_HOST=http://your-ec2-ip:3000
```

**Admin App (`admin/.env`):**
```env
VITE_HOST=http://your-ec2-ip:3000
```

---

## 🎯 Quick Deployment Checklist

- [ ] EC2 instance running Ubuntu
- [ ] Node.js v18+ installed
- [ ] PM2 installed globally
- [ ] Repository cloned on EC2
- [ ] Environment variables configured (.env or AWS Secrets Manager)
- [ ] Dependencies installed (`npm install --production`)
- [ ] Server running with PM2
- [ ] PM2 configured for auto-start
- [ ] Security group allows port 3000
- [ ] Nginx configured (optional)
- [ ] GitHub Secrets configured
- [ ] GitHub Actions workflow tested
- [ ] Frontend environment variables updated

---

## 📞 Support

For issues or questions:
- Check PM2 logs: `pm2 logs museopass-backend`
- Check GitHub Actions logs in repository
- Verify all environment variables are set correctly

---

**Note**: After deploying the server, the Vercel frontend build should work correctly as it will be able to connect to the backend API.

