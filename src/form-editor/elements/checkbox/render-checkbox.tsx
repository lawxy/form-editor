import React from 'react'
import { Checkbox, Space, type CheckboxValueType } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement, TMode } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

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