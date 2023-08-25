import { Input } from 'antd';
import React from 'react';
import { ModalPromisify } from './modal-promisify';
import { request } from './request';

export const client = 'test-service';

// get user-oauth/getClientInfo/{client}

export const login = async () => {
  let username: string = '',
    password: string = '';
  await ModalPromisify({
    title: '登录',
    maskClosable: true,
    content: (
      <>
        <Input
          style={{ marginBottom: 10 }}
          onChange={(e) => (username = e.target.value)}
        />
        <Input type="password" onChange={(e) => (password = e.target.value)} />
      </>
    ),
    async onOk() {
      const res: Record<string, any> = await request({
        url: `/oauth/token?username=${username}&password=${password}&client_id=order-client&client_secret=order-secret-8888&grant_type=password`,
      });
      // console.log(token)
      if (res.access_token) {
        sessionStorage.setItem('access_token', res.access_token);
        location.reload();
      }
    },
  });
};
