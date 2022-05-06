import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIRoute } from '../const';
import { getToken, saveToken } from './token';

const BACKEND_URL = process.env.REACT_APP_BASE_URL;
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (config.headers !== undefined) {
          config.headers.authorization = `Bearer ${token}`
        }
      }
      return config;
    },
  );

  api.interceptors.response.use((config: AxiosRequestConfig) => {
    return config
  }, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get('https://limitless-mountain-87015.herokuapp.com' + APIRoute.Refresh, { withCredentials: true });
        saveToken(response.data.accessToken)
        return api.request(originalRequest)
      } catch (error) {
        console.log('Не авторизован');
      }
    }
    throw error
  })
  return api;
};
