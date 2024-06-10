import React from 'react'
import c from 'classnames';
import { prefixCls } from '@/const';

export const ActionConfig: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div className={c(prefixCls('event-select-wrap'), className)}>
      <div className={prefixCls('event-select-title')}>
        {title}
      </div>
      <div className={prefixCls('event-list')}>
       123
      </div>
    </div>
  )
}