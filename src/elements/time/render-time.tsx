import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { formatDate } from '@/utils';
import { EEventAction } from '@/types';
import store from '@/store';
import type { IBaseElement } from '@/types';

export const RenderTime: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element, ...props }) => {
  const { id, dateFormat, placeholder } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent = (action: EEventAction) => (e: any) => {
    eventFunctions[action]?.(e.target.value);
  };

  const handleChange = (date: any) => {
    store.setFieldValue(id!, date ? formatDate(date, dateFormat!) : undefined);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <TimePicker
      format={dateFormat}
      value={fieldValue ? dayjs(`2000-01-01 ${fieldValue}`) : undefined}
      getPopupContainer={(n: any) => n.parentElement}
      onChange={handleChange}
      onFocus={handleEvent(EEventAction.ON_FOCUS)}
      onBlur={handleEvent(EEventAction.ON_BLUR)}
      placeholder={placeholder}
      {...props}
    />
  );
};
