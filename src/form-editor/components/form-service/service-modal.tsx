import React, { useState, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { prefixCls } from '@/const';
import { SelectComponent } from './select-component';
import MonacoEditor, { useMonaco } from "@monaco-editor/react";

const methodOptions = ['GET', 'POST', 'PUT', 'DELETE'].map((item) => ({label: item, value: item}))

export const ServiceModal: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [form] = Form.useForm();

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        open={open}
        title='新增服务'
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={async () => {
          await form.validateFields()
        }}
      >
        <Form form={form} layout='vertical' >
          <Form.Item name='name' label='名称' required rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item name='url' label='接口' required rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item name='method' label='请求方法' required rules={[{required: true}]}>
            <Select options={methodOptions}/>
          </Form.Item>
          <Form.Item label='参数'>
            <MonacoEditor
              defaultLanguage="javascript"
              defaultValue="{}"
              width="100%"
              height="50px"
              options={{
                lineNumbers: 'off', // 隐藏行号
              }}
            />
          </Form.Item>
          <Form.Item label='headers'>
              <MonacoEditor
                defaultLanguage="json"
                defaultValue="{}"
                width="100%"
              />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
