import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import type { FC, PropsWithChildren } from 'react';

import { prefixCls, RequestMethod } from '@/const';
import store from '@/store';
import { TFormSerive } from '@/types';
import { idCreator } from '@/utils';
import { Preview } from './preview';

import { AttributesSetting } from '../attributes-setting';

const defaultInterceptor = `axios.interceptors.request.use(config =>{
  return config
})

const DEFAULT_ERROR_MESSAGE = '请求服务报错';

const HttpStatusCode = { Ok: 200 };

axios.interceptors.response.use(function (res) {
  try {
    const { code } = res.data || {};
    if (HttpStatusCode.Ok === code) {
      return res.data;
    }
    message.error(errMsg || DEFAULT_ERROR_MESSAGE);
  } catch (e) {
    message.error(DEFAULT_ERROR_MESSAGE);
  }
},
function (err) {
  message.error(err?.message || DEFAULT_ERROR_MESSAGE);
  return Promise.reject(err);
})
`;

const ServiceModal: FC<
  PropsWithChildren<{
    service?: TFormSerive;
  }>
> = ({ children, service }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  Form.useWatch('previewData', form);
  Form.useWatch('interceptors', form);

  const methodOptions = RequestMethod.map((item) => ({
    label: item,
    value: item,
  }));

  const getDefaultService = (serv?: TFormSerive) => {
    if (serv?.id) return serv;
    return {
      interceptors: defaultInterceptor,
    };
  };
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        open={open}
        title={`${service ? '编辑' : '新增'}服务`}
        maskClosable={false}
        destroyOnClose
        styles={{
          body: {
            height: 500,
            overflow: 'auto',
          },
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={async () => {
          await form.validateFields();
          const serviceValue = form.getFieldsValue();
          if (service) {
            store.setService(service.id, serviceValue);
          } else {
            serviceValue.id = idCreator('service');
            store.addService(serviceValue);
          }
          setOpen(false);
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Preview form={form}>
              <Button>预览</Button>
            </Preview>
            <OkBtn />
          </>
        )}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={getDefaultService(service)}
        >
          <Form.Item
            name="name"
            label="名称"
            required
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="接口名"
            required
            rules={[
              {
                required: true,
                validator(_, val) {
                  if (
                    val.match(
                      /^https?:\/\/((localhost:\d{1,5})|([\w\-_]+(\.[\w\-_]+)+))([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?$/,
                    )
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject('格式不正确, 请以http或者https开头');
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="method"
            label="请求方法"
            required
            rules={[{ required: true }]}
          >
            <Select options={methodOptions} showSearch />
          </Form.Item>
          <Form.Item
            className={prefixCls('service-modal-form-item')}
            name="interceptors"
            label={
              <Flex style={{ width: '100%' }} justify="space-between">
                <span>拦截器设置</span>
                <AttributesSetting
                  title="拦截器设置"
                  editorType="javascript"
                  value={form.getFieldValue('interceptors')}
                  onChange={(v) => {
                    form.setFieldValue('interceptors', v);
                  }}
                  style={{ height: 600 }}
                >
                  <Button size="small">编辑</Button>
                </AttributesSetting>
              </Flex>
            }
          >
            <Input.TextArea readOnly />
          </Form.Item>

          <Form.Item
            className={prefixCls('service-modal-form-item')}
            name="previewData"
            shouldUpdate
            label={
              <Flex style={{ width: '100%' }} justify="space-between">
                <span>预览参数</span>
                <AttributesSetting
                  title="编辑参数"
                  editorType="javascript"
                  value={
                    form.getFieldValue('previewData') ||
                    'export default {\n\t\n}'
                  }
                  onChange={(v) => {
                    form.setFieldValue('previewData', v);
                  }}
                >
                  <Button size="small">编辑</Button>
                </AttributesSetting>
              </Flex>
            }
          >
            <Input.TextArea readOnly />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default observer(ServiceModal);
