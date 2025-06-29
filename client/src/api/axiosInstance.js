import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const adminInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    successMessage(response);
    return response;
  },
  (error) => errorFunction(error)
);

const successMessage = function (response) {
  const data = response?.data;
  const msg = data?.message;
  if (msg && data?.success) {
    // Only show success messages for certain operations
    if (response.config.method !== 'get') {
      toast.success(msg);
    }
  }
};

const errorFunction = function (error) {
  const message = error?.response?.data?.message;
  if (message) {
    toast.error(message);
    console.error('API Error:', message);
  }
  
  // Handle 401 errors (unauthorized)
  if (error?.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  
  throw error;
};

export default axiosInstance;