import React, { useEffect, useMemo, useImperativeHandle } from 'react';
import type { PropsWithChildren } from 'react';
import { ConfigProvider, Form } from 'antd';
import type { FormInstance } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import type { IFormSchema } from './types';
import { prefixCls, defaultFormAttrs } from './const';
import store from './store';
import { EditorContext, type IEditorContext } from './context';

import './index.less';

export * from './types';
export * from './views';
export * from './const';
export * from './utils';

export interface IEditorInstance {
  form: FormInstance;
  getSchema: () => void;
}
export interface IFormProps extends IEditorContext {
  defaultValue?: IFormSchema;
}

const FormEditorContent: React.ForwardRefRenderFunction<
  IEditorInstance,
  PropsWithChildren<IFormProps>
> = ({ mode, defaultValue, onSave, children }, ref) => {
  const [form] = Form.useForm();

  useEffect(() => {
    store.setForm(form);
  }, [form]);

  useEffect(() => {
    let schema: IFormSchema = {};
    if (defaultValue) {
      schema = defaultValue;
    } else if (localStorage.getItem('schema')) {
      try {
        schema = JSON.parse(localStorage.getItem('schema')!);
      } catch (e) {}
    }
    const {
      formElements = [],
      fieldValues = {},
      formAttrs = defaultFormAttrs,
      formServices = [],
    } = schema;
    store.setFormElements(formElements);
    store.setFieldsValues(fieldValues);
    store.setFormAttrs(formAttrs);
    store.setFormServices(formServices);
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    form,
    getSchema() {
      return store.getSchema();
    },
  }));

  const contextValue = useMemo(() => {
    return { mode, onSave };
  }, [mode, onSave]);

  return (
    <EditorContext.Provider value={contextValue}>
      <ConfigProvider locale={locale}>
        <Form form={form}>
          <div className={prefixCls('form')}>{children}</div>
        </Form>
      </ConfigProvider>
    </EditorContext.Provider>
  );
};

export const FormEditor = React.forwardRef<
  IEditorInstance,
  PropsWithChildren<IFormProps>
>(FormEditorContent);
