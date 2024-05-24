import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ConfigProvider, Form } from 'antd';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import Left from './views/left';
import Right from './views/right';
import { EditorDesign, EditorForm } from './views/canvas';
import store from './store';
import './elements'

const StyledDiv = styled.div(() => {
  return `
    display: flex;
    align-items: flex-start;
    background-color: rgb(245, 245, 245);
    height: 100vh;
  `
})

export const FormEditor = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    if(localStorage.getItem('formJson')) {
      //@ts-ignore
      const { formElements = [], fieldValues = {}, formAttrs ={} } = JSON.parse(localStorage.getItem('formJson'))
      store.setFormElements(formElements)
      store.setFieldsValues(fieldValues)
      store.setFormAttrs(formAttrs)
    }
  }, [])

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
}
