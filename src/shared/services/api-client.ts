import axios from 'axios';

const apiClient = axios.create({
   
    timeout: 10000, // Timeout after 10 seconds
  });

  // Request interceptor (optional)
// For example, attach an authorization header if needed.
apiClient.interceptors.request.use(
    (config) => {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Response interceptor (optional)
  // Useful for global error handling.
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );
  
  export default apiClient;