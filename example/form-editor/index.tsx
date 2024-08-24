import React, { useRef } from 'react';
import {
  FormEditor,
  Material,
  Settings,
  FormCanvas,
} from '@roddan/form-editor';
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
          console.log('onSave');
          console.log(schema);
        },
        download(schema) {
          console.log('download');
          console.log(schema);
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
