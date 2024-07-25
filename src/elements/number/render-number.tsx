import React, { useMemo } from 'react';
import { InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import { EEventAction } from '@/types';
import { ElementLayout } from '@/components';
import type { IBaseElement } from '@/types';
import { EValueType } from './const';

const RenderNumberContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ element = {}, fieldValue }) => {
  const { id, minNum, maxNum, valueType } = element;
  const { eventFunctions } = useRegisterEvents(element);

  const [precision, step] = useMemo(() => {
    switch (valueType) {
      case EValueType.INT:
        return [0, 1];
      case EValueType.ONE_DECIMAL:
        return [1, 0.1];
      // case EValueType.TWO_DECIMAL:
      default:
        return [2, 0.01];
    }
  }, [valueType]);

  const handleEvent =
    (action: EEventAction) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      eventFunctions[action]?.(e.target.value);
    };

  const handleChange = (val: number | null) => {
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
      <InputNumber
        value={fieldValue}
        id={id}
        onChange={handleChange}
        onFocus={handleEvent(EEventAction.ON_FOCUS)}
        onBlur={handleEvent(EEventAction.ON_BLUR)}
        min={minNum}
        max={maxNum}
        precision={precision}
        step={step}
      />
    </ElementLayout>
  );
};

export const RenderNumber = observer(RenderNumberContent);
