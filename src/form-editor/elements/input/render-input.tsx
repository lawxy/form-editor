import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import ElementLayout from '@/components/element-layout';
import { useElementCommon, useRegisterEvents } from '@/hooks';
import store from '@/store';
import { EEventAction } from '@/types';
import type { IBaseElement, TMode } from '@/types';
import { TEventFunction } from '@/hooks';

const RenderInputContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({ fieldValue, element = {}, mode }) => {
  const { textType, minRows, maxRows, id, autoSize, placeholder } = element;

  const { elCss, contaninerCss } = useElementCommon(element);

  const { eventFunctions } = useRegisterEvents(element);

  const handleEvent =
    (action: EEventAction) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store.setFieldValue(id as string, e.target.value);
      eventFunctions[action]?.(e.target.value);
    };

  return (
    <ElementLayout element={element} mode={mode} contaninerCss={contaninerCss}>
      {textType === 'single' ? (
        <Input
          value={fieldValue}
          style={{ ...elCss }}
          placeholder={placeholder}
          id={id}
          onChange={handleEvent(EEventAction.ON_CHANGE)}
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
          style={{ ...elCss }}
          value={fieldValue}
          placeholder={placeholder}
          id={id}
          onChange={handleEvent(EEventAction.ON_CHANGE)}
          onFocus={handleEvent(EEventAction.ON_FOCUS)}
          onBlur={handleEvent(EEventAction.ON_BLUR)}
        />
      )}
    </ElementLayout>
  );
};

export const RenderInput = observer(RenderInputContent);
