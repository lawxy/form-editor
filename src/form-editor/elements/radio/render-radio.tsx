import React from 'react'
import { Radio, Space, type RadioChangeEvent } from 'antd';
import { observer } from 'mobx-react-lite';
import type { IBaseElement } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderRadioContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { id, valueOptions, alignDirection } = element;
  const onChange = (e: RadioChangeEvent) => {
    store.setFieldValue(id!, e.target.value)
  }
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