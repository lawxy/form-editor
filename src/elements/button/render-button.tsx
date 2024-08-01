import React from 'react';
import { Button } from 'antd';
import { useRegisterEvents } from '@/hooks';

import { EEventAction, type IBaseElement } from '@/types';

export const RenderButton: React.FC<{
  element: IBaseElement;
}> = ({ element }) => {
  const { eventFunctions } = useRegisterEvents(element);
  const { btnText, linkLoading } = element;

  return (
    <Button
      onClick={() => {
        eventFunctions[EEventAction.ON_CLICK]?.();
      }}
      loading={linkLoading}
    >
      {btnText}
    </Button>
  );
};
