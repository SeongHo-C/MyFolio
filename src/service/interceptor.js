import axios from 'axios';

const url = process.env.REACT_APP_URL;

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
