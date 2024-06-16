import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react'

import ElementLayout from '@/components/element-layout';
import store from '@/store';
import type { IBaseElement, TMode } from '@/types';

const RenderDateContent: React.FC<{
  fieldValue: any;
  element: IBaseElement;
  mode: TMode;
}> = ({fieldValue, element, mode}) => {
  const { id, dateFormat } = element;

  const showTime = useMemo(() => {
    const timeFormat = dateFormat?.split(' ')
    if(!timeFormat) return false;
    const res: Record<string, true> = {  }
    if(timeFormat.includes('HH')) res.showHour = true;
    if(timeFormat.includes('mm')) res.showMinute = true;
    if(timeFormat.includes('ss')) res.showSecond = true;
    return res
  }, [dateFormat])
  return (
    <ElementLayout element={element} mode={mode}>
      <DatePicker 
        style={{width: '100%'}}
        format={dateFormat}
        value={fieldValue ? dayjs(fieldValue) : undefined}
        onChange={(e) => {
          const date = dayjs(e).format(dateFormat)
          store.setFieldValue(id as string, date)
        }}
        showTime={showTime}
        // @ts-ignore
        getPopupContainer={n => n.parentElement}
        placement='bottomRight'
      />
    </ElementLayout>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderDate = observer(RenderDateContent)