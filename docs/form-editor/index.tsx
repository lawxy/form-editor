import React, { useRef } from 'react';
import {
  FormEditor,
  Material,
  Settings,
  FormCanvas,
} from '@roddan/form-editor';
import axios from 'axios';
import { customElement } from '../common/customEl';

const Comp = () => {
  const ref = useRef();
  return (
    <FormEditor
      mode="design"
      ref={ref}
      // 预览url和保存回调
      actionProp={{
        previewUrl: `${process.env.PUBLIC_PATH}~demos/docs-preview-demo-demo-preview`,
        onSave(schema) {
          console.log('schema');
          console.log(schema);
        },
        download(schema) {
          // try {
          //   const response = axios({
          //     method: 'post',
          //     url: 'http://localhost:8888/download',
          //     data: schema, // 发送的 schema 数据
          //     // responseType: 'blob',
          //   });
          //   // 创建一个 URL 链接来下载文件
          //   // const blob = new Blob([response.data], { type: 'application/zip' });
          //   // const downloadUrl = window.URL.createObjectURL(blob);
          //   // const link = document.createElement('a');
          //   // link.href = downloadUrl;
          //   // link.download = 'download.zip'; // 你可以指定下载的文件名
          //   // document.body.appendChild(link);
          //   // link.click();
          //   // // 清除链接对象
          //   // window.URL.revokeObjectURL(downloadUrl);
          //   // document.body.removeChild(link);
          // } catch (error) {
          //   console.error('Error downloading the file:', error);
          // }
        },
      }}
      customElements={[customElement]}
    >
      <Material />
      <FormCanvas />
      <Settings />
    </FormEditor>
  );
};

export default Comp;
