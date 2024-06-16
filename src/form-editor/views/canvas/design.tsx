import { observer } from 'mobx-react-lite';
import React from 'react';
import ActionGroup from '../action-group';
import EditorCanvas from './render-canvas';

const EditorDesign = () => {
  return <EditorCanvas mode="design" actions={<ActionGroup />}></EditorCanvas>;
};

export default observer(EditorDesign);
