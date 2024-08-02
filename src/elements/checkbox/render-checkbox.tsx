import React from 'react';
import { Checkbox, Space } from 'antd';

import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction, type TElementRender } from '@/types';

import store from '@/store';

export const RenderCheckbox: TElementRender = ({ fieldValue, element, ...props }) => {
  const { id, valueOptions, alignDirection } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleChange = (val: Array<string | number | boolean>) => {
    store.setFieldValue(id!, val);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <Checkbox.Group onChange={handleChange} value={fieldValue} {...props}>
      <Space direction={alignDirection}>
        {valueOptions?.map((opt) => (
          <Checkbox key={opt.id} value={opt.value}>
            {opt.label}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
};
