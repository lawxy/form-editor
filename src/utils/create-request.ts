import { message } from 'antd';
import axios from 'axios';
export function createRequest(interceptors: string) {
  try {
    const request = axios.create({});
    const func = new Function('message', 'axios', `${interceptors}`);
    func(message, request);
    return request;
  } catch (e) {
    console.log('createRequest error');
    console.log(e);
    return axios;
  }
}
