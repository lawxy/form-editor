import React from 'react';
import { FormEditor, Material, Settings, FormCanvas } from 'gfpage';
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
