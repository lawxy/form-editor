import React, { useContext, type FC } from 'react';
import { EditorContext } from '@/context';
import EditorCanvas from './render-canvas';
import ActionGroup from '../action-group';
import { EventContextProvider } from '@/components/event-context';

export const FormCanvas: FC = () => {
  const { mode } = useContext(EditorContext);
  return (
    <EventContextProvider>
      <EditorCanvas mode={mode} actions={mode === 'design' && <ActionGroup />}></EditorCanvas>
    </EventContextProvider>
  )
}
