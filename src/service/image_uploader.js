import axios from 'axios';

export const ImageUploader = async (file) => {
  const api_key = process.env.REACT_APP_CLOUDINARY;

  const data = new FormData();
  data.append('file', file);
  data.append('api_key', api_key);
  data.append('folder', 'myfolio');
  data.append('upload_preset', 'myfolio');

  const url = axios.post(
    'https://api.cloudinary.com/v1_1/seongho-c/image/upload',
    data
  );

  return await url;
};
