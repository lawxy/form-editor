import React from 'react';
import { Input } from 'antd';
import { observer } from 'mobx-react-lite';

import ElementLayout from '@/components/element-layout';
import { useRegisterEvents, useUpdate } from '@/hooks';
import store from '@/store';
import { EEventAction } from '@/types';
import type { IBaseElement } from '@/types';

const RenderInputContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element = {}, }) => {
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

  useUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element} >
      {textType === 'single' ? (
        <Input
          value={fieldValue}
          placeholder={placeholder}
          id={id}
          onChange={handleChange}
          onFocus={handleEvent(EEventAction.ON_FOCUS)}
          onBlur={handleEvent(EEventAction.ON_BLUR)}
        />
      ) : (
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
      )}
    </ElementLayout>
  );
};

export const RenderInput = observer(RenderInputContent);
