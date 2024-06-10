import React from 'react'
import { Button } from 'antd';
import { prefixCls } from '@/const';
import { EEventAction, eventActionInChinese, CustomEvents } from '@/types';
import { EventModal } from './event-modal';
import './style.less'

export const EventCommon: React.FC<{
  events?: CustomEvents;
  eventActions: EEventAction[];
}> = ({eventActions, events}) => {
  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal eventActions={eventActions} >
        <Button type="dashed" className={prefixCls('event-button-add')}>+ 新增事件</Button>
      </EventModal>
    </div>
  )
}