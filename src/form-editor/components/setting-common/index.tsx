import React, { type FC, type PropsWithChildren } from 'react';
import { Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { prefixCls } from '@/const';
import './style.less';

export const SettingItem: FC<
  PropsWithChildren<{
    label: React.ReactNode | string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    tips?: React.ReactNode | string;
  }>
> = ({ label, children, style, tips }) => {
  return (
    <div style={style || {}} className={prefixCls('setting-item')}>
      <div className={prefixCls('setting-item-label')}>
        {label}&nbsp;
        {tips && (
          <Popover content={tips}>
            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
          </Popover>
        )}
      </div>
      <div className={prefixCls('setting-item-value')}>{children}</div>
    </div>
  );
};

export const SettingWrap: FC<
  PropsWithChildren<{
    title: React.ReactNode | string;
    children: React.ReactNode;
    style?: React.CSSProperties;
  }>
> = ({ title, children, style }) => {
  return (
    <div style={style || {}} className={prefixCls('setting-wrap')}>
      <div className={prefixCls('setting-title')}>{title}</div>
      {children}
    </div>
  );
};
