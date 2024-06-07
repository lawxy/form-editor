import { useMonaco } from '@monaco-editor/react';
import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { AttributesSetting } from '../attributes-setting';

import { prefixCls } from '@/const';
import store from '@/store';
import { idCreator } from '@/utils';

const methodOptions = ['GET', 'POST', 'PUT', 'DELETE'].map((item) => ({
  label: item,
  value: item,
}));

const ServiceModal: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form] = Form.useForm();
  const isParamsValidate = useRef(true);
  const isHeadersValidate = useRef(true);
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false, // 禁用语义错误校验
      noSyntaxValidation: false, // 保留语法错误校验
    });
  }, [monaco]);

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
        title="新增服务"
        maskClosable={false}
        styles={{
          body: {
            height: 500,
            overflow: 'auto'
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={async () => {
          await form.validateFields();
          const serviceValue = form.getFieldsValue()
          serviceValue.id = idCreator('service')
          store.addService(serviceValue);
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
        <Form form={form} layout="vertical">
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
            label="接口"
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
                  editorType="typescript"
                  value="export default {}"
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
            name="data"
            label={
              <Flex style={{ width: '100%' }} justify="space-between">
                <span>预览参数</span>
                <AttributesSetting
                  title="编辑参数"
                  editorType="typescript"
                  value="export default {}"
                  onChange={(v) => {
                    form.setFieldValue('data', v);
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
