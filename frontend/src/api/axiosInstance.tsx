import axios, { InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
  withCredentials: true, // set to true, otherwise client doesn't send cookie along
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
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

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // config.url returns the path
  // new URL(path, baseURL) return `baseURL/path`
  // So, we remove the `/` at the start of path, just in case it's redundant
  if (!config.url) return config

  // new URL return config.url if it's absolute URL.
  const url = new URL(config.url.replace(/^\/+/, ''), import.meta.env.VITE_BASE_URL).toString()
  if (!url.startsWith(import.meta.env.VITE_BASE_URL)) return config

  return config
})

export default axiosInstance
