import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const respone = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file is successfully uploaded on cloudinary
        console.log("file is successfully uploaded on cloudinary", respone.url)
        return respone
    } catch (error) {
        fs.unlink(localFilePath) // removing file locally
        return null
    }
}

export {uploadOnCloudinary}