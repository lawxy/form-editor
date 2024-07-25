import React, { type FC } from 'react';
import { useEditorContext } from '@/context';
import EditorCanvas from './render-canvas';
import ActionGroup from '../action-group';

export const FormCanvas: FC = () => {
  const { mode } = useEditorContext();
  return (
    <EditorCanvas mode={mode} actions={mode === 'design' && <ActionGroup />} />
  );
};
