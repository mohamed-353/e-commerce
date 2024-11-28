import axios from 'axios';

const url = `https://api.cloudinary.com/v1_1/dwhvg0l5e/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const dataResponse = await axios.post(url, formData);
  return dataResponse.data;
};

export default uploadImage;
