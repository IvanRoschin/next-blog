async function uploadToCloudinary(file) {
  if (file === undefined) {
    return; // Handle the case when the image is undefined
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
  console.log('uploadPreset', uploadPreset)
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await uploadResponse.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload image error:", error.message);
    return null; // Handle the error case by returning null or throw an error
  }
}

export default uploadToCloudinary;
