export type TFormSerive = {
  id: string;
  name: string;
  originalUrl: string; // 初始状态的url
  url: string;  // 真实请求的url，可能因为事件更改
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  previewData?: Record<string, any>;
  data?: Record<string, any>;
  // headers?: Record<string, any>;
  headers?: string;
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