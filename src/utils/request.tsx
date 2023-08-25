import { message } from 'antd';
import axios from 'axios';
import { login } from './login';

export function getInstance() {
  const instance = axios.create({});

  instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  });

  instance.interceptors.response.use(
    async (response) => {
      const { data } = response;
      switch (data?.code) {
        case 200:
          return data?.data;
        case 10003:
        case 401:
          login();
          return null;
        default:
          message.error(data?.msg);
          return null;
      }
    },
    (error) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      return Promise.reject(error?.response?.data || error);
    },
  );

  return instance;
}

const request = getInstance();
export { request };
