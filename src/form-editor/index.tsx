import { ConfigProvider, Form } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import './index.less';
import store from './store';
import { EditorDesign } from './views/canvas';
import Left from './views/left';
import Right from './views/right';

const StyledDiv = styled.div(() => {
  return `
    display: flex;
    align-items: flex-start;
    background-color: rgb(245, 245, 245);
    height: 100vh;
  `;
});

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
        <StyledDiv>
          <Left />
          <EditorDesign />
          <Right />
        </StyledDiv>
      </Form>
    </ConfigProvider>
  );
};
