import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    config = {
      ...config,
      baseURL: 'https://newsapi.org/v2/',
      headers: { 'x-api-key': process.env.NEWS_API_KEY },
      params: {
        ...config.params,
        country: 'us'
      }
    }

    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  },
)

export default axios
