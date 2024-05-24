import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite';
import { idCreator } from '@/utils';
import type { ConnectDropTarget } from 'react-dnd'
import styled, { css } from 'styled-components'
import ActionGroup from '../action-group';
import store from '../../store';
import { WrapEl } from './components/wrap-el';
import { ElementsList } from '../../elements/export';
import EditorCanvas from './components/canvas'
import type { IBaseElement } from '../../types';
import { CanvasWrapDiv, CanvasDiv } from './components/styled'

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
