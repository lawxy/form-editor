import React from 'react';
import { Input } from 'antd';
import { useRegisterEvents, useFormUpdate } from '@/hooks';
import store from '@/store';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

export const RenderInput: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element = {} }) => {
  const { textType, minRows, maxRows, id, autoSize, placeholder } = element;

  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent =
    (action: EEventAction) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      eventFunctions[action]?.(e.target.value);
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    store.setFieldValue(id!, e.target.value);
  };

  useFormUpdate(() => {
    eventFunctions[EEventAction.ON_LOADED]?.();
  }, [eventFunctions[EEventAction.ON_LOADED]]);

  useFormUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <>
      {textType === 'multiple' ? (
        <Input.TextArea
          autoSize={
            autoSize
              ? true
              : {
                  minRows,
                  maxRows,
                }
          }
          value={fieldValue}
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          onFocus={handleEvent(EEventAction.ON_FOCUS)}
          onBlur={handleEvent(EEventAction.ON_BLUR)}
        />
      ) : (
        <Input
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          onFocus={handleEvent(EEventAction.ON_FOCUS)}
          onBlur={handleEvent(EEventAction.ON_BLUR)}
          value={fieldValue}
          type={textType === 'single' ? 'text' : 'password'}
          autoComplete="new-password"
        />
      )}
    </>
  );
};
