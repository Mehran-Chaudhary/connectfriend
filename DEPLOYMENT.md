# ConnecFriend - Vercel Deployment Guide

## Prerequisites
- A GitHub account
- A Vercel account (free tier works perfectly)
- Git installed on your computer

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Create a GitHub Repository**
   ```bash
   # Initialize git if not already done
   git init
   
   # Add all files
   git add .
   
   # Commit files
   git commit -m "Initial commit - ConnecFriend Social Network"
   
   # Create a new repository on GitHub (via website)
   # Then push your code
   git remote add origin https://github.com/YOUR_USERNAME/connecfriend.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `connecfriend` repository
   - Vercel will auto-detect it's a static site
   - Click "Deploy"
   - Done! Your site will be live at `https://your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Run this command in your project directory
   vercel
   
   # For production deployment
   vercel --prod
   ```

## Project Configuration

This project is already configured with:
- ✅ `vercel.json` - Vercel configuration file
- ✅ `.vercelignore` - Files to ignore during deployment
- ✅ Static HTML/CSS/JavaScript - No build step needed
- ✅ Client-side routing handled
- ✅ localStorage for data persistence

## Important Notes

⚠️ **Data Persistence**
- This project uses localStorage for data storage
- Data is stored in the user's browser only
- Each user will have their own separate data
- No backend database (data won't persist across devices)

## After Deployment

Your ConnecFriend app will be live at:
- Production: `https://your-project-name.vercel.app`
- Auto-generated previews for each git push

## Demo Accounts

Share these test accounts with users:
- Username: `mehran_akhtar` | Password: `password123`
- Username: `fatima_zahra` | Password: `password123`
- Username: `abdullah_rahman` | Password: `password123`

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Updates

To update your deployed site:
```bash
# Make your changes
git add .
git commit -m "Your update message"
git push

# Vercel will automatically deploy the changes
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Built with ❤️ using Tailwind CSS and Vanilla JavaScript**

