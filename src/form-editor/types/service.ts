export type TFormSerive = {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Record<string, any>;
  headers?: Record<string, any>;
};

export type TFormSerives = TFormSerive[];