import { Menu } from 'antd';
import c from 'classnames';
import React from 'react';

import type { MenuItem } from './event-modal';

import { prefixCls } from '@/const';

export const SelectComponent: React.FC<{
  className?: string;
  title: string;
  menuItems: MenuItem[];
  onChange: (key: any) => void;
  value?: string;
}> = ({ className = '', title, menuItems, onChange, value }) => {
  return (
    <div className={c(prefixCls('event-modal-column'), className)}>
      <div className={prefixCls('event-modal-title')}>{title}</div>
      <div className={prefixCls('event-list')}>
        <Menu
          selectedKeys={value ? [value] : []}
          onClick={({ key }) => {
            onChange(key);
          }}
          mode="inline"
          items={menuItems}
        />
      </div>
    </div>
  );
};
