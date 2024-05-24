import React, { useMemo } from 'react'
import { DatePicker } from 'antd';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs'
import type { IBaseElement } from '../../types';
import store from '../../store';

const RenderDateContent: React.FC<{
  fieldValue: any;
  props: IBaseElement;
}> = ({fieldValue, props = {}}) => {
  const { id, elementName, dateFormat } = props;

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
    <div>
      <div>
        {elementName}
      </div>
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
    </div>
  )
}

// store.setAllElementsList(ELEMENT_INPUT, 'render', RenderInput)
export const RenderDate = observer(RenderDateContent)