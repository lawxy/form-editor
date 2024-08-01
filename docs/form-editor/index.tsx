import React, { useRef } from 'react';
import {
  FormEditor,
  Material,
  Settings,
  FormCanvas,
} from '@roddan/form-editor';
import { customElement, type } from '../common/customEl';

const Comp = () => {
  const ref = useRef();
  return (
    <FormEditor
      mode="design"
      ref={ref}
      onSave={(schema) => {
        console.log('schema');
        console.log(schema);
      }}
      customElements={{
        [type]: customElement,
      }}
    >
      <Material />
      <FormCanvas />
      <Settings />
    </FormEditor>
  );
};

export default Comp;
