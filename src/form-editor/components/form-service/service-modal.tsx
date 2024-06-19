import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';

import { AttributesSetting } from '../attributes-setting';

import { prefixCls } from '@/const';
import store from '@/store';
import { TFormSerive } from '@/types';
import { idCreator } from '@/utils';

const methodOptions = ['GET', 'POST', 'PUT', 'DELETE'].map((item) => ({
  label: item,
  value: item,
}));

const ServiceModal: FC<
  PropsWithChildren<{
    service?: TFormSerive;
  }>
> = ({ children, service }) => {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form] = Form.useForm();
  // console.log("form.getFieldValue('previewData')");
  // console.log(form.getFieldsValue());
  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        open={previewOpen}
        title="服务预览"
        onCancel={() => {
          setPreviewOpen(false);
        }}
        okButtonProps={{
          style: { display: 'none' },
        }}
        cancelText="关闭"
      ></Modal>
      <Modal
        open={open}
        title={`${service ? '编辑' : '新增'}服务`}
        maskClosable={false}
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
            <Button
              onClick={async () => {
                // await form.validateFields();
                setPreviewOpen(true);
              }}
            >
              预览
            </Button>
            <OkBtn />
          </>
        )}
      >
        <Form form={form} layout="vertical" initialValues={service}>
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
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="method"
            label="请求方法"
            required
            rules={[{ required: true }]}
          >
            <Select options={methodOptions} />
          </Form.Item>
          <Form.Item
            className={prefixCls('service-modal-form-item')}
            name="headers"
            label={
              <Flex style={{ width: '100%' }} justify="space-between">
                <span>headers</span>
                <AttributesSetting
                  title="headers"
                  editorType="javascript"
                  value={`export default (axiosReq) => {\n  return {\n  } \n}`}
                  onChange={(v) => {
                    form.setFieldValue('headers', v);
                  }}
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
            name="callback"
            label={
              <Flex style={{ width: '100%' }} justify="space-between">
                <span>回调函数</span>
                <AttributesSetting
                  title="headers"
                  editorType="javascript"
                  value={`export default {\n  success(res) {\n  }, \n  fail(err) {\n  } \n}`}
                  onChange={(v) => {
                    form.setFieldValue('callback', v);
                  }}
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
                  editorType="typescript"
                  value={form.getFieldValue('previewData')}
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
