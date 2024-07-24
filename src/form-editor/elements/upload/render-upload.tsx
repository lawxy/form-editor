import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
// import { useRegisterEvents } from '@/hooks';

import { ElementLayout } from '@/components';
import { type IBaseElement } from '@/types';

const RenderUploadContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  // const { eventFunctions } = useRegisterEvents(element);
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
    <ElementLayout element={element}>
      <Upload onChange={handleChange} action={defaultImgSrc}>
        <Button icon={<UploadOutlined />}>{btnText}</Button>
      </Upload>
    </ElementLayout>
  );
};

export const RenderUpload = observer(RenderUploadContent);
