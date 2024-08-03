import React, { useEffect, useMemo, useImperativeHandle } from 'react';
import type { PropsWithChildren } from 'react';
import { ConfigProvider, Form } from 'antd';
import type { FormInstance } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'reflect-metadata';
import 'dayjs/locale/zh-cn';
import { ElementsMap } from './elements';
import type { IFormSchema, TDragElement } from './types';
import { prefixCls } from './const';
import store from './store';
import { injectSchema } from '.';
import { EditorContext, type IEditorContext } from './context';
import { wrapObserver } from './utils';

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
  customElements?: TDragElement;
}

const FormEditorContent: React.ForwardRefRenderFunction<
  IEditorInstance,
  PropsWithChildren<IFormProps>
> = ({ mode, defaultValue, onSave, customElements, children }, ref) => {
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
      } catch (e) { }
    }
    injectSchema(schema);
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    form,
    getSchema() {
      return store.getSchema();
    },
  }));

  const contextValue = useMemo(() => {
    Object.assign(wrapObserver(ElementsMap), wrapObserver(customElements || {}, true));

    return {
      mode,
      onSave,
      ElementsMap,
    };
  }, [mode, onSave, customElements, ElementsMap]);

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
