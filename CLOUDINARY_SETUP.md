# Cloudinary Setup Guide

## Step 1: Create a Cloudinary Account
1. Go to https://cloudinary.com
2. Click "Sign Up Free"
3. Complete the registration process

## Step 2: Get Your API Credentials
1. Log in to your Cloudinary dashboard
2. You'll see your credentials on the main dashboard:
   - **Cloud Name** (e.g., `dxxxxx`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abc123def456...`) - Click "Reveal" to see it

## Step 3: Update .env File
Open the `.env` file in your project root and replace the placeholder values:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your_actual_cloud_name_here"
CLOUDINARY_API_KEY="your_actual_api_key_here"
CLOUDINARY_API_SECRET="your_actual_api_secret_here"
CLOUDINARY_UPLOAD_FOLDER="dr-kumar-profiles"
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME="dkf123"
CLOUDINARY_API_KEY="987654321012345"
CLOUDINARY_API_SECRET="aBcDeFgHiJkLmNoPqRsTuVwXyZ"
CLOUDINARY_UPLOAD_FOLDER="dr-kumar-profiles"
```

## Step 4: Restart Development Server
After updating the `.env` file:
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again

## Step 5: Test Avatar Upload
1. Log in to your account
2. Go to Profile page
3. Click on the avatar circle
4. Select an image (max 5MB)
5. The image should upload and display

## Troubleshooting

### Error: "Cloudinary not configured"
- Check that all three environment variables are set in `.env`
- Make sure there are no extra spaces or quotes issues
- Restart the dev server after changing `.env`

### Error: "Upload failed"
- Check your internet connection
- Verify your Cloudinary credentials are correct
- Check the browser console and terminal for detailed error messages

### Error: "File too large"
- Images must be under 5MB
- Compress your image or use a smaller file

## Cloudinary Dashboard Features
- View all uploaded images
- Manage transformations
- Monitor usage and bandwidth
- Set up additional security rules

Visit: https://cloudinary.com/console
