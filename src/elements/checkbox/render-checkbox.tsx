import React from 'react';
import { Checkbox, Space } from 'antd';

import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction, type TElementRender } from '@/types';

export const RenderCheckbox: TElementRender = ({
  fieldValue,
  element,
  customStyle,
  setFieldValue,
}) => {
  const { valueOptions, alignDirection } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleChange = (val: Array<string | number | boolean>) => {
    setFieldValue(val);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <Checkbox.Group
      onChange={handleChange}
      value={fieldValue}
      style={customStyle}
    >
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
