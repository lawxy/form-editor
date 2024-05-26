import React from 'react'
import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { id, elementName, dateFormat } = element;
  return (
    <ElementLayout element={element}>
      <InputNumber 
        style={{width: '100%'}}
      />
    </ElementLayout>
  )
}

export const RenderNumber = observer(RenderNumberContent)