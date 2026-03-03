import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Validate configuration
if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Cloudinary configuration missing!');
  console.error('Please set the following environment variables:');
  console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImageToCloudinary(
  file: Buffer,
  filename: string,
  folder: string = 'dr-kumar-profiles'
): Promise<UploadResult> {
  try {
    // Check if Cloudinary is configured
    if (!cloudName || !apiKey || !apiSecret) {
      return {
        success: false,
        error: 'Cloudinary not configured. Please contact administrator.',
      };
    }

    // Convert buffer to base64
    const base64Image = file.toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    // Upload to Cloudinary using promise-based approach
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      public_id: `${filename}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto:good' },
      ],
      resource_type: 'image',
    }) as UploadApiResponse;

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

export default cloudinary;
