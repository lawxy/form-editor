import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { type IBaseElement } from '@/types';

export const RenderUpload: React.FC<{
  element: IBaseElement;
}> = ({ element, ...props }) => {
  const { btnText, defaultImgSrc } = element;

  const handleChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  return (
    <Upload onChange={handleChange} action={defaultImgSrc} {...props}>
      <Button icon={<UploadOutlined />}>{btnText}</Button>
    </Upload>
  );
};
