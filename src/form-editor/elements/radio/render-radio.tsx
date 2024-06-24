import { Radio, Space, type RadioChangeEvent } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementLayout from '@/components/element-layout';
import { useRegisterEvents, useUpdate } from '@/hooks';
import { EEventAction, } from '@/types';
import store from '@/store';
import type { IBaseElement, } from '@/types';

const RenderRadioContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element, }) => {
  const { id, valueOptions, alignDirection } = element;
  
  const { eventFunctions } = useRegisterEvents(element);
  
  const onChange = (e: RadioChangeEvent) => {
    store.setFieldValue(id!, e.target.value)
  }
  
  useUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <Radio.Group onChange={onChange} value={fieldValue}>
        <Space direction={alignDirection}>
          {
            valueOptions?.map(opt => (
              <Radio key={opt.id} value={opt.value}>{opt.label}</Radio>
            ))
          }
        </Space>
      </Radio.Group>
    </ElementLayout>
  )
}

export const RenderRadio = observer(RenderRadioContent)