import React, { useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import EditorCanvas from './components/canvas'

const EditorForm = () => {
  return (
    <EditorCanvas mode='form'/>
  )
}

export default observer(EditorForm)
