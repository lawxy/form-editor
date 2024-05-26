import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite';
import ActionGroup from '../action-group';
import EditorCanvas from './components/canvas'

const EditorDesign = () => {
  return (
    <EditorCanvas
      mode='design'
      actions={<ActionGroup />}
    >
    </EditorCanvas>
  )
}

export default observer(EditorDesign)
