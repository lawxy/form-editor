import React from 'react';
import { Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRegisterEvents, useFormUpdate } from '@/hooks';

import store from '@/store';
import { ElementLayout } from '@/components';
import { EEventAction, type IBaseElement } from '@/types';
import { ELEMENT_SWITCH } from '.';

const RenderSwitchContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element, fieldValue }) => {
  const { id } = element;
  const { eventFunctions } = useRegisterEvents(element);

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <Switch
        value={fieldValue}
        onChange={(checked) => {
          store.setFieldValue(id!, checked);
        }}
      />
    </ElementLayout>
  );
};

export const RenderSwitch = observer(RenderSwitchContent);

export const isSwitch = (id?: string) => {
  return ELEMENT_SWITCH === store.getElement(id)?.type;
};
