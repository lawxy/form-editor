import React from 'react';
import { Select } from 'antd';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import type { TElementRender } from '@/types';

export const RenderSelect: TElementRender = ({
  element,
  fieldValue,
  customStyle,
  setFieldValue,
}) => {
  const { multiple, valueOptions, placeholder, linkLoading, allowClear } =
    element;

  const { eventFunctions } = useRegisterEvents(element);

  const onChange = (val: any) => {
    console.log(val);
    setFieldValue(val);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <Select
      placeholder={placeholder}
      options={valueOptions}
      onChange={onChange}
      loading={linkLoading}
      style={customStyle}
      mode={multiple ? 'multiple' : undefined}
      allowClear={allowClear}
      value={fieldValue}
    />
  );
};
