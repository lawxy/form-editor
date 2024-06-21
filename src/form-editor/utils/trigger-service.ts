import axios from 'axios';
import { message } from 'antd';
import { AxiosResponse, HttpStatusCode, AxiosError } from 'axios';
import store from '@/store';
import { TFormSerive } from '@/types';
import { parseEsmString } from './parse-esm-string';

export interface IServiceParams {
  url?: TFormSerive['url'];
  data?: TFormSerive['data'];
}

export interface IServiceResponse {
  code: HttpStatusCode;
  data: any;
  errMsg?: string;
}

const DEFAULT_ERROR_MESSAGE = '请求服务出错';

export const toSearchString = (params: Record<string, any>): string => {
  return new URLSearchParams(params).toString();
};

export const toFormData = (params: Record<string, any>): FormData => {
  return Object.entries(params).reduce((form, [key, value]) => {
    form.append(key, value);
    return form;
  }, new FormData());
};

export const appendUrl = (baseUrl: string, params: Record<string, any>) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.append(key, params[key]);
    } else {
      // 如果参数已存在，可以选择覆盖或者保持原有的值，这里选择覆盖
      url.searchParams.set(key, params[key]);
    }
  });
  return url.toString();
};

axios.interceptors.response.use(
  function (res: AxiosResponse) {
    try {
      if (res.status !== HttpStatusCode.Ok) {
        message.error(DEFAULT_ERROR_MESSAGE);
        return {};
      }
      const { data, errMsg, code } = res.data as IServiceResponse;
      if (HttpStatusCode.Ok === code) {
        return data;
      }
      message.error(errMsg || DEFAULT_ERROR_MESSAGE);
    } catch (e) {
      message.error(DEFAULT_ERROR_MESSAGE);
    }
  },
  function (err: AxiosError) {
    console.log(err);
    message.error(err?.message || DEFAULT_ERROR_MESSAGE);
    return Promise.reject(err);
  },
);

export const triggerService = async (id: string) => {
  const service = store.getService(id);
  const {
    method,
    url,
    data,
    headers: originHeaders,
    callback: originCallback,
  } = service!;

  const { value: headers } = parseEsmString(originHeaders as string, {});
  // const { value: callback } =  parseEsmString(originCallback as string, {})
  // console.log('headers')
  // console.log(headers)
  // console.log(callback)

  try {
    return axios({
      method,
      url,
      data,
      headers,
    });
  } catch (e) {}
};
