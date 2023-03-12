import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  withCredentials: true, // set to true, otherwise client doesn't send cookie along
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response.data.data, // Response format is {success: boolean, data: data} so we extract data from object already here
  async (error) => {
    const originalRequest = error.config
    if (error?.response?.status === 403 && !originalRequest._retry) {
      try {
        // We only retry one time, in case the originalRequest fail again that leads to infinite loop
        originalRequest._retry = true
        await axiosInstance.post('/auth/refreshToken')
        return axiosInstance(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
