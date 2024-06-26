import React from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { ElementLayout } from '@/components/element-layout';
import { useRegisterEvents, useUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

const RenderSelectContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element, fieldValue }) => {
  const { id, elementName, valueOptions } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const onChange = (val: any) => {
    store.setFieldValue(id!, val);
  };

  useUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <Select options={valueOptions} onChange={onChange} />
    </ElementLayout>
  );
};

export const RenderSelect = observer(RenderSelectContent);
