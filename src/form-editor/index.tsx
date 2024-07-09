import React, { useEffect, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { ConfigProvider, Form } from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { EventContextProvider, HotKeysContextProvider } from '@/components';
import type { TMode, IFormSchema } from './types';
import { prefixCls } from './const';
import store from './store';
import { EditorContext } from './context';

import './index.less';

export * from './views';

export interface IForm {
  mode: TMode;
  defaultValue?: IFormSchema;
}

export const FormEditor: FC<PropsWithChildren<IForm>> = ({
  mode,
  defaultValue,
  children,
}) => {
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
      formAttrs = { verticalGap: 8, horizontalGap: 8 },
      formServices = [],
    } = schema;
    store.setFormElements(formElements);
    store.setFieldsValues(fieldValues);
    store.setFormAttrs(formAttrs);
    store.setFormServices(formServices);
  }, [defaultValue]);

  const contextValue = useMemo(() => {
    return { mode };
  }, [mode]);

  return (
    <HotKeysContextProvider>
      <EventContextProvider>
        <EditorContext.Provider value={contextValue}>
          <ConfigProvider locale={locale}>
            <Form form={form}>
              <div className={prefixCls('form')}>{children}</div>
            </Form>
          </ConfigProvider>
        </EditorContext.Provider>
      </EventContextProvider>
    </HotKeysContextProvider>
  );
};
