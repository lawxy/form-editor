import React from 'react'
import { TimePicker  } from 'antd';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs'
import type { IBaseElement } from '../../types';
import store from '../../store';

const RenderTimeContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props
  return (
    <div>
      <div>
        {elementName}
      </div>
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
    </div>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderTime = observer(RenderTimeContent)