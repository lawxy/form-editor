import React, { useEffect } from 'react';
import { ConfigProvider, Form } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { prefixCls } from './const';
import store from './store';
import { EditorDesign } from './views/canvas';
import Left from './views/left';
import Right from './views/right';
import './index.less';

export const FormEditor = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (localStorage.getItem('formJson')) {
      const {
        formElements = [],
        fieldValues = {},
        formAttrs = {},
        formServices = [],
      } = JSON.parse(localStorage.getItem('formJson')!);
      store.setFormElements(formElements);
      store.setFieldsValues(fieldValues);
      store.setFormAttrs(formAttrs);
      store.setFormServices(formServices);
    }
  }, []);

  return (
    <ConfigProvider locale={locale}>
      <Form form={form}>
        <div className={prefixCls('form')}>
          <Left />
          <EditorDesign />
          <Right />
        </div>
      </Form>
    </ConfigProvider>
  );
};
