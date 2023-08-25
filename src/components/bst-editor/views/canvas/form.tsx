import React, { useMemo, useEffect } from 'react'
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { idCreator } from '@/utils';
import styled, { css } from 'styled-components'
import ActionGroup from '../action-group';
import store from '../../store';
import { WrapEl } from './components/wrap-el';
import { DesignWrapDiv } from './components/styled'
import { ElementsList } from '../../elements/export';
import type { IBaseElement } from '../../types';
import { CanvasWrapDiv, CanvasDiv } from './components/styled'
import EditorCanvas from './components/canvas'

const EditorForm = () => {
  return (
    <EditorCanvas mode='form'/>
  )
}

export default observer(EditorForm)
