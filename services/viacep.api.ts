import axios, { AxiosError } from 'axios'

const baseURL = process.env.EXPO_PUBLIC_VIACEP_API_URL

export const viaCepApi = axios.create({
  baseURL: baseURL,
})

viaCepApi.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError) {
    if (error instanceof AxiosError) {
      if (error.request.status === 500) {
        console.log(error)
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log(error)
      }
    }

    return Promise.reject(error)
  }
)
