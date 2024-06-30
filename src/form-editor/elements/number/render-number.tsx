import React from 'react';
import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useRegisterEvents, useUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element = {}, fieldValue }) => {
  const { id } = element;
  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent =
    (action: EEventAction) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      eventFunctions[action]?.(e.target.value);
    };

  const handleChange = (val: number | null) => {
    store.setFieldValue(id!, val);
  };

  useUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <InputNumber
        value={fieldValue}
        id={id}
        onChange={handleChange}
        onFocus={handleEvent(EEventAction.ON_FOCUS)}
        onBlur={handleEvent(EEventAction.ON_BLUR)}
      />
    </ElementLayout>
  );
};

export const RenderNumber = observer(RenderNumberContent);
