export type TFormSerive = {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  previewData?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, any>;
  /**
   * 回调函数
   *  {
   *    success?: (res: any) => Promise<any> | any;
   *    fail?: (error: any) => any;
   *  }
  */
  callback?: string;
};

export type TFormSerives = TFormSerive[];