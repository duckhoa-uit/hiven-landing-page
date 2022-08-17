import axios from 'axios';

const axiosClient = axios.create({
   baseURL: '/api',
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosClient.interceptors.request.use(
   async (config) => {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

axiosClient.interceptors.response.use(
   (response) => {
      return response.data;
   },
   (error) => {
      if (error.response.data.error?.status === 401) {
         localStorage.setItem('access_token', '');
         localStorage.setItem('user', '{}');

         window.location = '/admin';
      }

      throw error.response.data;
   }
);

export default axiosClient;
