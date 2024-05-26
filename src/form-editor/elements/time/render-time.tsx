import React from 'react'
import { TimePicker  } from 'antd';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs'
import type { IBaseElement } from '@/types';
import store from '@/store';
import ElementLayout from '@/components/element-layout';

const RenderTimeContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
}> = ({fieldValue, element = {}}) => {
  const { id, dateFormat } = element
  return (
    <ElementLayout element={element}>
      <TimePicker  
        style={{width: '100%'}}
        format={dateFormat}
        value={fieldValue ? dayjs(`2000-01-01 ${fieldValue}`) : undefined}
        onChange={(e) => {
          const date = dayjs(e).format(dateFormat)

          store.setFieldValue(id as string, date)
        }}
        // @ts-ignore
        getPopupContainer={n => n.parentElement}
      />
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderTime = observer(RenderTimeContent)