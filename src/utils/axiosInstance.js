import axios from 'axios';

export const getAxiosInstance = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  try {
    const headers = {
      'Content-Type': 'application/json'
    };
    return axios.create({
      baseURL,
      headers
    });
  } catch (error) {
    console.error('Axios instance creation failed:', error);
  }
};
