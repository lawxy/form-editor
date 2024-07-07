import store from '@/store';
import { TFormSerive } from '@/types';
import { DEFAULT_ERROR_MESSAGE } from '@/const';
import { createRequest } from '.';

export interface IServiceParams {
  url?: TFormSerive['url'];
  data?: TFormSerive['data'];
}

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

export const triggerService = async (id: string) => {
  const service = store.getService(id);
  const { method, url, data, interceptors = '' } = service!;

  const request = createRequest(interceptors);

  try {
    return request({
      method,
      url,
      data,
    });
  } catch (e) {
    return { msg: DEFAULT_ERROR_MESSAGE };
  }
};
