import React, { type FC, type PropsWithChildren } from 'react';
import { Switch, Popover, Select, InputNumber } from 'antd';
import { prefixCls } from '@/const';
import type { IConfig } from '.';
import { delayOptions, EEventAction, type TCustomEvent } from '@/types';
import { QuestionPopover } from '@/components';

export const WithCommon: FC<
  PropsWithChildren<
    IConfig & {
      event: TCustomEvent;
    }
  >
> = ({ children, onChange, eventTarget, event }) => {
  const { series, delayTime, delayType } = eventTarget || {};

  const needDelay = [EEventAction.ON_CLICK, EEventAction.VALUE_CHANGE].includes(
    event.eventAction!,
  );

  return (
    <div className={prefixCls('with-series')}>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onChange,
          eventTarget,
        })}
      <div>
        串联
        <QuestionPopover content="若设置为true, 后续事件将等待此事件执行完成。若此事件抛错，将终止后续事件。" />
        &nbsp;: &nbsp;
        <Switch
          checked={!!series}
          size="small"
          onChange={(c) => onChange?.({ series: c })}
        />
      </div>
      {needDelay && (
        <div>
          事件防重
          <QuestionPopover
            content={
              <>
                1. 设置防抖: 防重时间内多次触发事件只会执行最后一次。
                <br />
                2. 设置节流: 防重时间间隔内只允许事件执行一次。
              </>
            }
          />
          &nbsp;: &nbsp;
          {/* 开启事件防重后，防重时间内多次触发事件只会执行最后一次 */}
          <Select
            allowClear
            className={prefixCls('event-input')}
            options={delayOptions}
            onChange={(v) => onChange?.({ delayType: v })}
            value={delayType}
          />
          &nbsp;
          <InputNumber
            min={1}
            className={prefixCls('event-input')}
            onChange={(v) => onChange?.({ delayTime: v ? +v : 1 })}
            value={delayTime}
          />
          ms
        </div>
      )}
    </div>
  );
};
