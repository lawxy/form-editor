import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import ElementLayout from '@/components/element-layout';
import { useElementCommon, useRegisterEvents } from '@/hooks';
import store from '@/store';
import { EEventAction } from '@/types';
import type { IBaseElement, TMode } from '@/types';

const RenderInputContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({ fieldValue, element = {}, mode }) => {
  const { textType, minRows, maxRows, id, autoSize, placeholder } = element;
 
  const { elCss, contaninerCss } = useElementCommon(element);

  const { eventFunctions } = useRegisterEvents(element);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store.setFieldValue(id as string, e.target.value);
      const changeEvents = eventFunctions[EEventAction.ON_CHANGE] || []
      changeEvents.forEach(fn => fn(e.target.value))
    },
    [id, eventFunctions[EEventAction.ON_CHANGE]],
  );

  return (
    <ElementLayout element={element} mode={mode} contaninerCss={contaninerCss}>
      {textType === 'single' ? (
        <Input
          value={fieldValue}
          style={{ ...elCss }}
          onChange={handleChange}
          placeholder={placeholder}
          id={id}
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
          onChange={handleChange}
          value={fieldValue}
          placeholder={placeholder}
          id={id}
        />
      )}
    </ElementLayout>
  );
};

export const RenderInput = observer(RenderInputContent);
