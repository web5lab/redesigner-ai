import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.VITE_SERVER_URL || 'http://localhost:5000',
})

axiosInstance.interceptors.response.use(
  function (response) {
    successMessage(response)
    return response
  },
  (error) => errorFunction(error)
)

const successMessage = function (response: any) {
  const data = response?.data
  const msg = data?.message
  if (msg && data?.success) {
    console.log(msg)
  }
}

const errorFunction = function (error: any) {
  const status = error?.response?.status
  const message = error?.response?.data?.message

  if (message) {
    console.log(message)
  }

  if (status === 403) {
    localStorage.clear()
    window.location.reload()
  }

  throw error
}

export default axiosInstance