import React from 'react';
import { Radio, Space, type RadioChangeEvent } from 'antd';

import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import store from '@/store';
import type { IBaseElement } from '@/types';

export const RenderRadio: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element }) => {
  const { id, valueOptions, alignDirection } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const onChange = (e: RadioChangeEvent) => {
    store.setFieldValue(id!, e.target.value);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <Radio.Group onChange={onChange} value={fieldValue}>
      <Space direction={alignDirection}>
        {valueOptions?.map((opt) => (
          <Radio key={opt.id} value={opt.value}>
            {opt.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
