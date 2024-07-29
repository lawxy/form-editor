import React from 'react';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRegisterEvents } from '@/hooks';

import { ElementLayout } from '@/components';
import { EEventAction, type IBaseElement } from '@/types';

const RenderButtonContent: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { eventFunctions } = useRegisterEvents(element);
  const { btnText, linkLoading } = element;

  return (
    <ElementLayout element={element}>
      <Button
        onClick={() => {
          eventFunctions[EEventAction.ON_CLICK]?.();
        }}
        loading={linkLoading}
      >
        {btnText}
      </Button>
    </ElementLayout>
  );
};

export const RenderButton = observer(RenderButtonContent);
