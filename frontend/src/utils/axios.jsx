import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Server not responding');
    } else {
      const { status } = error.response;

      if (status === 400) {
        console.warn('Invalid request: Check Parameters');
      } else if (status === 500) {
        console.warn('Server error: Third-party API might be down');
      } else {
        console.warn(`Unexpected error: ${status}`);
      }
    }

    return Promise.reject(error); // still allow individual .catch() to run
  }
);

export default api;
