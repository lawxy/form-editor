import React, { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { FormInstance, Modal, message } from 'antd';
import { type AxiosRequestConfig } from 'axios';
import { QueryMethod, DEFAULT_ERROR_MESSAGE } from '@/const';
import { parseEsmString, createRequest } from '@/utils';

export const Preview: FC<
  PropsWithChildren<{
    form: FormInstance;
  }>
> = ({ children, form }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const handlePreview = async () => {
    setLoading(true);
    try {
      const formData = await form.validateFields();
      const { url, method } = formData;
      let { previewData, interceptors } = formData;
      previewData = parseEsmString(previewData, {}).value;

      const request = createRequest(interceptors);

      const config: AxiosRequestConfig = { url, method };
      const dataKey = QueryMethod.includes(method) ? 'params' : 'data';

      config[dataKey] = previewData;
      setData(await request(config));
      setOpen(true);
    } catch (e) {
      message.error(DEFAULT_ERROR_MESSAGE);
    }
    setLoading(false);
  };

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: handlePreview,
          loading,
        })}
      <Modal
        open={open}
        title="预览结果"
        onCancel={() => {
          setOpen(false);
        }}
        styles={{
          body: {
            height: 500,
            overflow: 'auto',
          },
        }}
        okButtonProps={{
          style: { display: 'none' },
        }}
        cancelText="关闭"
      >
        <pre>
          <code
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </Modal>
    </>
  );
};
