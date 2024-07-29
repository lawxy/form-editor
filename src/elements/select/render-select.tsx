import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { ElementLayout } from '@/components';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

const RenderSelectContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element, fieldValue }) => {
  const { id, valueOptions, placeholder, linkLoading } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const onChange = (val: any) => {
    store.setFieldValue(id!, val);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <Select
        placeholder={placeholder}
        options={valueOptions}
        onChange={onChange}
        loading={linkLoading}
      />
    </ElementLayout>
  );
};

export const RenderSelect = observer(RenderSelectContent);
