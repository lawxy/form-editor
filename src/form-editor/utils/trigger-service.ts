import store from '@/store';
import axios from 'axios';
import { TFormSerive } from '@/types';

export type TServiceParams = Pick<
  TFormSerive,
  'method' | 'url' | 'data' | 'headers' | 'callback'
>;

export const triggerService = async (params: TServiceParams) => {
  const { method, url, data, headers = {}, callback } = params;
  return axios({
    method,
    url,
    data,
    headers,
  });
};
