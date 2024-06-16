import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({mode, element = {}}) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element} mode={mode}>
      <InputNumber 
        style={{width: '100%'}}
      />
    </ElementLayout>
  )
}

export const RenderNumber = observer(RenderNumberContent)