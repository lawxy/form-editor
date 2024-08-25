import React, { useEffect, useMemo, useImperativeHandle } from 'react';
import type { PropsWithChildren } from 'react';
import { ConfigProvider, Form } from 'antd';
import type { FormInstance } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'reflect-metadata';
import 'dayjs/locale/zh-cn';
import c from 'classnames';
import { ElementsMap } from './elements';
import type { IFormSchema, TDragElement } from './types';
import { prefixCls } from './const';
import store from './store';
import { injectSchema } from '.';
import { EditorContext, type IEditorContext } from './context';
import { wrapObserver } from './utils';
import { AntdStaticApp } from './components';

import './index.less';

export * from './types';
export * from './views';
export * from './const';
export * from './utils';
export * from './hooks';
export * from './components';

export interface IEditorInstance {
  form: FormInstance;
  getSchema: () => void;
}

export type TFormProps = {
  defaultValue?: IFormSchema;
  customElements?: TDragElement;
} & Pick<IEditorContext, 'mode' | 'actionProp'>;

const FormEditorContent: React.ForwardRefRenderFunction<
  IEditorInstance,
  PropsWithChildren<TFormProps>
> = ({ mode, defaultValue, actionProp, customElements, children }, ref) => {
  const [form] = Form.useForm();

  useEffect(() => {
    store.setForm(form);
  }, [form]);

  useEffect(() => {
    let schema: IFormSchema = {};
    try {
      if (defaultValue) {
        if (typeof defaultValue === 'string') {
          schema = JSON.parse(defaultValue);
        }
      } else if (localStorage.getItem('schema')) {
        schema = JSON.parse(localStorage.getItem('schema')!);
      }
    } catch (e) {
      schema = {};
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
    Object.assign(
      wrapObserver(ElementsMap),
      wrapObserver(customElements || {}, true),
    );

    return {
      mode,
      actionProp,
      ElementsMap,
    };
  }, [mode, actionProp, customElements, ElementsMap]);

  return (
    <EditorContext.Provider value={contextValue}>
      <ConfigProvider locale={locale}>
        <AntdStaticApp>
          <Form form={form}>
            <div
              className={c({
                [prefixCls('form')]: true,
                [prefixCls('form-design')]: mode === 'design',
              })}
            >
              {children}
            </div>
          </Form>
        </AntdStaticApp>
      </ConfigProvider>
    </EditorContext.Provider>
  );
};

export const FormEditor = React.forwardRef<
  IEditorInstance,
  PropsWithChildren<TFormProps>
>(FormEditorContent);
