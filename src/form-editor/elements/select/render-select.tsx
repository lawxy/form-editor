import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'


import { ELEMENT_SELECT } from './const';

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

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