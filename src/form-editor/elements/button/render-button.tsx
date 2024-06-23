import React, { useMemo } from 'react'
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useElementCommon } from '@/hooks'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

const RenderButtonContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue, element, mode}) => {
  const { id } = element;
  const { elCss, contaninerCss } = useElementCommon(element);
 
  return (
    <ElementLayout element={element} mode={mode} contaninerCss={contaninerCss}>
      <Button 
        style={elCss}
        onClick={(e) => {
        }}
      >button</Button>
    </ElementLayout>
  )
}

export const RenderButton = observer(RenderButtonContent)