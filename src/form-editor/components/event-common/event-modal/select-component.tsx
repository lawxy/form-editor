import React from 'react';
import { prefixCls } from '@/const';
import c from 'classnames';
import { Menu } from 'antd';
import type { MenuItem } from './event-modal'

export const SelectComponent: React.FC<{
  className?: string;
  title: string;
  menuItems: MenuItem[];
  onChange: (key: any) => void; 
}> = ({ className = '', title, menuItems, onChange }) => {
  return (
    <div className={c(prefixCls('event-select-wrap'), className)}>
      <div className={prefixCls('event-select-title')}>
        {title}
      </div>
      <div className={prefixCls('event-list')}>
        <Menu
          onClick={({key}) => {
            onChange(key)
          }}
          mode="inline"
          items={menuItems}
        />
      </div>
    </div>
  )
}