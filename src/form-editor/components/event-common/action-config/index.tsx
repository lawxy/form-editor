import React from 'react'
import c from 'classnames';
import { Input } from 'antd';
import { prefixCls } from '@/const';
import { EEventType, EEventAction } from '@/types';
import RefreshService from './refresh-service'

const ActionItem: React.FC<{
  type: EEventType;
  action: EEventAction;
}> = ({ type, action }) => {

  return (
    <div className={prefixCls('event-action-config')}>
      <RefreshService />
    </div>
  )
}

export const ActionConfig: React.FC<{
  title: string;
  className?: string;
  type?: EEventType;
  action?: EEventAction;
}> = ({ title, className, type, action }) => {
  return (
    <div className={c(prefixCls('event-modal-title'), className)}>
      <div className={prefixCls('event-modal-title-text')} style={{borderRight: 'none'}}>
        {title}
      </div>
      {
        action && type  && (
          <ActionItem
            type={type}
            action={action}
          />
        )
      }
    </div>
  )
}