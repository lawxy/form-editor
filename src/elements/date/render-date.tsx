import React, { useMemo } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { formatDate } from '@/utils';
import { EEventAction } from '@/types';
import store from '@/store';
import type { IBaseElement } from '@/types';

export const RenderDate: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element }) => {
  const { id, dateFormat, placeholder } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent = (action: EEventAction) => (e: any) => {
    eventFunctions[action]?.(e.target.value);
  };

  const handleChange = (date: Date) => {
    store.setFieldValue(id!, date ? formatDate(date, dateFormat!) : undefined);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  const showTime = useMemo(() => {
    const timeFormat = dateFormat?.split(' ');
    if (!timeFormat) return false;
    const res: Record<string, true> = {};
    if (timeFormat.includes('HH')) res.showHour = true;
    if (timeFormat.includes('mm')) res.showMinute = true;
    if (timeFormat.includes('ss')) res.showSecond = true;
    return res;
  }, [dateFormat]);
  return (
    <DatePicker
      format={dateFormat}
      // @ts-ignore
      value={fieldValue ? dayjs(fieldValue) : undefined}
      showTime={showTime}
      getPopupContainer={(n: any) => n.parentElement}
      placement="bottomRight"
      onChange={handleChange}
      onFocus={handleEvent(EEventAction.ON_FOCUS)}
      onBlur={handleEvent(EEventAction.ON_BLUR)}
      placeholder={placeholder}
    />
  );
};
