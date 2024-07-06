import React, { type FC, type PropsWithChildren } from 'react';
import { prefixCls } from '@/const';
import './style.less';

export const SettingItem: FC<
  PropsWithChildren<{
    label: React.ReactNode | string;
    children: React.ReactNode;
    style?: React.CSSProperties;
  }>
> = ({ label, children, style }) => {
  return (
    <div style={style || {}} className={prefixCls('setting-item')}>
      <div className={prefixCls('setting-item-label')}>{label}</div>
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
