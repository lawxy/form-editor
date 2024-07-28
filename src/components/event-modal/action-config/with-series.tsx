import React, { type FC, type PropsWithChildren } from 'react';
import { Switch, Popover } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { prefixCls } from '@/const';
import type { IConfig } from '.';

export const WithSeries: FC<PropsWithChildren<IConfig>> = ({
  children,
  onChange,
  eventTarget,
}) => {
  const { series } = eventTarget || {};
  return (
    <div className={prefixCls('with-series')}>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onChange,
          eventTarget,
        })}
      <div>
        串联
        <Popover content="若设置为true, 后续事件将等待此事件执行完成。若此事件抛错，将终止后续事件, 请做好事件排序">
          <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
        </Popover>
        &nbsp;: &nbsp;
        <Switch
          checked={!!series}
          size="small"
          onChange={(c) => onChange?.({ series: c })}
        />
      </div>
    </div>
  );
};
