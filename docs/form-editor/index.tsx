import React from 'react';
import { FormEditor, Material, Settings, FormCanvas } from 'form-editor';
const Comp = () => {
  return (
    <FormEditor mode="design">
      <Material />
      <FormCanvas />
      <Settings />
    </FormEditor>
  );
};

export default Comp;
