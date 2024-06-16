import { Button } from 'antd';
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

const RenderButtonContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue, element, mode}) => {
  const { id } = element;
 
  return (
    <ElementLayout element={element} mode={mode}>
      <Button 
        style={{width: '100%'}}
        onClick={(e) => {
        }}
      >button</Button>
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderButton = observer(RenderButtonContent)