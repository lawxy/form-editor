import { Checkbox, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

const RenderCheckboxContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue, element, mode}) => {
  const { id, valueOptions, alignDirection } = element
  const onChange = (val: Array<string | number | boolean>) => {
    store.setFieldValue(id!, val)
  }
  return (
    <ElementLayout element={element} mode={mode}>
      <Checkbox.Group onChange={onChange} value={fieldValue}>
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