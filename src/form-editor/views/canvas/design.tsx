import { observer } from 'mobx-react-lite';
import React from 'react';

import EditorCanvas from './render-canvas';
import ActionGroup from '../action-group';

const EditorDesign = () => {
  return <EditorCanvas mode="design" actions={<ActionGroup />}></EditorCanvas>;
};

export default observer(EditorDesign);
