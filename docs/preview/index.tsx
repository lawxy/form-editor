import React from 'react';
import { FormEditor, FormCanvas } from '@roddan/form-editor';
import { customElement, type } from '../common/customEl';

const Comp = () => {
  return (
    <FormEditor
      mode="form"
      customElements={{
        [type]: customElement,
      }}
    >
      <FormCanvas />
    </FormEditor>
  );
};

export default Comp;
