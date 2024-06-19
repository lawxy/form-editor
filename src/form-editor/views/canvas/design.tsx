import React from 'react';
import { observer } from 'mobx-react-lite';

import EditorCanvas from './render-canvas';
import ActionGroup from '../action-group';
import { EventContextProvider } from '@/components/event-context';

const EditorDesign = () => {
  
  return (
    <EventContextProvider>
      <EditorCanvas mode="design" actions={<ActionGroup />}></EditorCanvas>;
    </EventContextProvider>
  )
};

export default observer(EditorDesign);
