import React from 'react'
import { Button } from 'antd';
import { prefixCls } from '@/const';
import { EventModal } from './event-modal';
import './style.less'

export const EventCommon = () => {
  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal>
        <Button type="dashed" className={prefixCls('event-button-add')}>+ 新增事件</Button>
      </EventModal>
    </div>
  )
}