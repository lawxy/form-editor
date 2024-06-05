import React from 'react';
import { prefixCls } from '@/const';
import c from 'classnames';

export const SelectComponent: React.FC<{
  className?: string;
  title: string;
}> = ({ className = '', title }) => {
  return (
    <div className={c(prefixCls('event-select-wrap'), className)}>
      <div className={prefixCls('event-select-title')}>
        {title}
      </div>
    </div>
  )
}