import React, { type FC, type PropsWithChildren } from 'react';
import c from 'classnames'
import { QuestionPopover } from '../question-popover';
import { prefixCls } from '@/const';
import './style.less';

export const SettingItem: FC<
  PropsWithChildren<{
    label: React.ReactNode | string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    tips?: React.ReactNode | string;
    vertical?: boolean;
  }>
> = ({ label, children, style, tips, vertical }) => {
  return (
    <div
      style={style || {}}
      // className={prefixCls('setting-item')}
      className={c({
        [prefixCls('setting-item')]: true,
        [prefixCls('setting-item-vertical')]: !!vertical,
      })}
      // vertical={vertical}
    >
      <div className={prefixCls('setting-item-label')}>
        {label}&nbsp;
        {tips && <QuestionPopover content={tips} />}
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
