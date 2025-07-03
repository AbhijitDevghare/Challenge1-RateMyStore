require("dotenv").config();
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;

    // Check file size
    const fileSize = fs.statSync(localFilePath).size;
    const extension = path.extname(localFilePath).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif','.avif','.webp'];
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
    const MAX_IMAGE_SIZE_MB = 20;
    const MAX_VIDEO_SIZE_MB = 50;

    if (imageExtensions.includes(extension)) {
      if (fileSize > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        console.error(`Image file size exceeds ${MAX_IMAGE_SIZE_MB} MB limit.`);
        return null;
      }
    } else if (videoExtensions.includes(extension)) {
      if (fileSize > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
        console.error(`Video file size exceeds ${MAX_VIDEO_SIZE_MB} MB limit.`);
        return null;
      }
    } else {
      console.error('Unsupported file type.');
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folder,
      allowed_formats: imageExtensions.concat(videoExtensions).map(ext => ext.slice(1)) // Remove the dot
    });

    console.log("File is uploaded on Cloudinary:", response.url);
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  } finally {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Remove the locally saved file
    }
  }
};

module.exports = { uploadOnCloudinary };
