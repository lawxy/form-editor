import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementLayout from '@/components/element-layout';
import type { IBaseElement, } from '@/types';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element = {} }) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element}>
      <InputNumber
        style={{ width: '100%' }}
      />
    </ElementLayout>
  )
}

export const RenderNumber = observer(RenderNumberContent)