import axios, { AxiosInstance } from 'axios';

const HARDCODED_TOKEN = '';

export const BACKEND_URL = '';
export const LOCAL_URL = 'http://localhost:3000';

export const httpClient = (): AxiosInstance => {
  let authHeader = {};

  if (window.location.origin === LOCAL_URL) {
    authHeader = sessionStorage.getItem('token') ? { Authorization: HARDCODED_TOKEN } : {};
  } else {
    authHeader = sessionStorage.getItem('token')
      ? { Authorization: sessionStorage.getItem('token') }
      : {};
  }

  const httpClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      ...authHeader,
      'Access-Control-Allow-Origin': '*',
    },
  });

  httpClient.interceptors.response.use(
    res => res,
    err => {
      if (!err.response) {
        return Promise.reject({
          message: 'Błąd serwera',
          code: '500',
        });
      }

      switch (err.response.status) {
        case 500:
        case 502:
        case 503:
          return Promise.reject({
            message: 'Błąd serwera',
            code: '500',
          });
        case 404:
          window.location.href = '/not-found';
          return Promise.reject(err);
        case 403: {
          return Promise.reject(err);
        }
        case 409:
          return Promise.reject(err);
        case 400:
          return Promise.reject(err);
        case 401: {
          window.location.href = '/login';
          return Promise.reject(err);
        }
        case undefined: {
          window.location.href = '/not-found';
          return Promise.reject({
            message: 'Błąd serwera',
            code: '500',
          });
        }
        default:
          return Promise.reject({
            message: 'Błąd serwera',
            code: '500',
          });
      }
    }
  );

  return httpClient;
};
