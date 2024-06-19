import store from '@/store';
import axios from 'axios';
import { TFormSerive } from '@/types';

export interface IServiceParams {
  url?: TFormSerive['url'],
  data?: TFormSerive['data'],
}

export const triggerService = async (id: string, params: IServiceParams) => {
  const service = store.servicesMap.get(id);
  const { method, url: originUrl, data: originData, headers = {}, callback } = service!

  const { url, data = {} } = params;
  return axios({
    method,
    url: url || originUrl,
    data: data || originData,
    headers,
  });
};
