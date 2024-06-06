import React from 'react';
import { prefixCls } from '@/const';
import c from 'classnames';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'change',
    label: '值发生变化'
  },
  {
    key: 'focus',
    label: '获取焦点'
  },
  {
    key: 'blur',
    label: '失去焦点'
  }
];

export const SelectComponent: React.FC<{
  className?: string;
  title: string;
}> = ({ className = '', title }) => {
  return (
    <div className={c(prefixCls('event-select-wrap'), className)}>
      <div className={prefixCls('event-select-title')}>
        {title}
      </div>
      <div className={prefixCls('event-list')}>
        <Menu
          // onClick={onClick}
          // style={{ width: 256 }}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  )
}