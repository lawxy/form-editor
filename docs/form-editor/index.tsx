import React, { useRef } from 'react';
import {
  FormEditor,
  Material,
  Settings,
  FormCanvas,
} from '@roddan/form-editor';
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
    >
      <Material />
      <FormCanvas />
      <Settings />
    </FormEditor>
  );
};

export default Comp;
