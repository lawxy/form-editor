import React from 'react'
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement, TMode } from '@/types';
import { ELEMENT_SELECT } from './const';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderSelectContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({mode, element}) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element} mode={mode}>
      <Select style={{width: '100%'}}/>
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderSelect = observer(RenderSelectContent)