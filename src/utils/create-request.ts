import axios from 'axios';
import { AntdStaticFunctions } from '@/components/antd-static-function';

export function createRequest(interceptors: string) {
  const { message } = AntdStaticFunctions;
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
