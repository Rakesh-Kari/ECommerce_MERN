import axios from "axios";

const URL = `https://api.cloudinary.com/v1_1/doxvmfqjd/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ECommerce_product");

  try {
    const response = await axios.post(URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
