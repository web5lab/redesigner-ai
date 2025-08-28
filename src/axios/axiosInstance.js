import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

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
    console.log(msg);
  }
};

const errorFunction = function (error) {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (message) {
    console.log(message);
  }

  if (status === 403) {
    // Clear localStorage or sessionStorage
    localStorage.clear();
    // Optionally, force reload
    window.location.reload();
  }

  throw error;
};

export default axiosInstance;
