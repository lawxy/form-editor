import React from 'react'
import { Checkbox, Space } from 'antd';
import { observer } from 'mobx-react-lite';

import ElementLayout from '@/components/element-layout';
import { useRegisterEvents, useUpdate } from '@/hooks';
import { EEventAction, } from '@/types';

import store from '@/store';
import type { IBaseElement, } from '@/types';

const RenderCheckboxContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({ fieldValue, element }) => {
  const { id, valueOptions, alignDirection } = element

  const { eventFunctions } = useRegisterEvents(element);

  const handleChange = (
    val: Array<string | number | boolean>
  ) => {
    store.setFieldValue(id!, val);
  };

  useUpdate(() => {
    eventFunctions[EEventAction.VALUE_CHANGE]?.(fieldValue);
  }, [fieldValue]);

  return (
    <ElementLayout element={element}>
      <Checkbox.Group onChange={handleChange} value={fieldValue}>
        <Space direction={alignDirection}>
          {
            valueOptions?.map(opt => (
              <Checkbox key={opt.id} value={opt.value}>{opt.label}</Checkbox>
            ))
          }
        </Space>
      </Checkbox.Group>
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderCheckbox = observer(RenderCheckboxContent)