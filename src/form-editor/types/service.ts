export type TFormSerive = {
  id: string;
  name: string;
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

  /**
  * 关联服务的组件id
  */
  linkingElements?: string[];
};

export type TFormSerives = TFormSerive[];