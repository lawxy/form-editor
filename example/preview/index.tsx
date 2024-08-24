import React from 'react';
import { FormEditor, FormCanvas } from '@roddan/form-editor';
import { customElement } from '../common/customEl';

const Comp = () => {
  return (
    <FormEditor
      mode="form"
      customElements={[customElement]}
    >
      <FormCanvas />
    </FormEditor>
  );
};

export default Comp;
