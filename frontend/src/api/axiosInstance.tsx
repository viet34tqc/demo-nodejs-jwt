import axios, { InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (responseError) => {
    // TODO: should redirect to login if status is 401
    return Promise.reject(responseError)
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
