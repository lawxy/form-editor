import React, { useMemo } from 'react'
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRegisterEvents } from '@/hooks'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import { EEventAction, type IBaseElement } from '@/types';

const RenderButtonContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element }) => {

  const { eventFunctions } = useRegisterEvents(element);

  return (
    <ElementLayout element={element} >
      <Button
        onClick={() => {
          eventFunctions[EEventAction.ON_CLICK]?.();
        }}
      >button</Button>
    </ElementLayout>
  )
}

export const RenderButton = observer(RenderButtonContent)