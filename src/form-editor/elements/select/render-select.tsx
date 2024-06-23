import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementLayout from '@/components/element-layout';
import type { IBaseElement, } from '@/types';

const RenderSelectContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element }) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element}>
      <Select style={{ width: '100%' }} />
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderSelect = observer(RenderSelectContent)