import { observer } from 'mobx-react-lite';
import React from 'react';

import EditorCanvas from './render-canvas';
const EditorForm = () => {
  return <EditorCanvas mode="form" />;
};

export default observer(EditorForm);
