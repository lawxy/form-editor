import React, { type FC, type PropsWithChildren } from 'react';
import { Popover } from 'antd';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { prefixCls } from '@/const';
import './style.less';

const Flex = styled.div<{ vertical?: boolean }>(({ vertical }) => {
  if (!vertical) return '';
  return `
      flex-direction: column;
      align-items: start;
      .${prefixCls('setting-item-label')} {
        margin-bottom: 8px;
      }
    `;
});

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
    <Flex
      style={style || {}}
      className={prefixCls('setting-item')}
      vertical={vertical}
    >
      <div className={prefixCls('setting-item-label')}>
        {label}&nbsp;
        {tips && (
          <Popover content={tips}>
            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
          </Popover>
        )}
      </div>
      <div className={prefixCls('setting-item-value')}>{children}</div>
    </Flex>
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
