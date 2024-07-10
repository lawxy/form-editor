import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { formatDate } from '@/utils';
import { EEventAction } from '@/types';
import { ElementLayout } from '@/components';
import store from '@/store';
import type { IBaseElement } from '@/types';

const RenderTimeContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element }) => {
  const { id, dateFormat } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent = (action: EEventAction) => (e: any) => {
    eventFunctions[action]?.(e.target.value);
  };

  const handleChange = (date: any) => {
    store.setFieldValue(id!, formatDate(date, dateFormat!));
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <TimePicker
        format={dateFormat}
        value={fieldValue ? dayjs(`2000-01-01 ${fieldValue}`) : undefined}
        getPopupContainer={(n: any) => n.parentElement}
        onChange={handleChange}
        onFocus={handleEvent(EEventAction.ON_FOCUS)}
        onBlur={handleEvent(EEventAction.ON_BLUR)}
      />
    </ElementLayout>
  );
};

export const RenderTime = observer(RenderTimeContent);
