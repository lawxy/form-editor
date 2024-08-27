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
        download() {
          try {
            const link = document.createElement('a');
            link.href = 'https://roddan.cn/editor-assets/page.zip';
            link.download = 'page'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
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
