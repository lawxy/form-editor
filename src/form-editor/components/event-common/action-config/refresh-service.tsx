import { prefixCls } from '@/const';
import store from '@/store';
import type { IEventTarget } from '@/types';
import {
  changeStatePayloadInChinese,
  EChangeStatePayload,
  refreshOptions,
} from '@/types';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

const actions = Object.entries(changeStatePayloadInChinese).map(
  ([value, label]) => ({ label, value }),
);

const RefreshService: React.FC<{
  onChange: (v: IEventTarget) => void;
  eventTarget: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const [actionVal, setActionVal] = useState(EChangeStatePayload.UPDATE);
  const [refreshVal, setRefreshVal] = useState(1);
  return (
    <div style={{ lineHeight: '40px' }}>
      <div>
        目标服务 ={' '}
        <Select
          allowClear
          className={prefixCls('event-input')}
          options={store.getFormServices()}
          fieldNames={{ label: 'name', value: 'id' }}
          style={{ width: 200 }}
          onChange={(v) => {
            onChange({ targetServiceId: v });
          }}
        />
      </div>
      <div>
        {actionVal === EChangeStatePayload.UPDATE ? (
          <>
            传入组件元素值&nbsp;
            <Select
              className={prefixCls('event-input')}
              options={actions}
              key="action"
              onChange={(v) => {
                onChange({ targetPayload: v });
              }}
            />
            &nbsp;
            <Input className={prefixCls('event-input')} />
            &nbsp;字段，
          </>
        ) : (
          <>
            <Select
              className={prefixCls('event-input')}
              options={actions}
              key="action"
              onChange={(v) => {
                onChange({ targetPayload: v });
              }}
            />
            &nbsp;所有字段，
          </>
        )}
      </div>
      并{' '}
      <Select
        value={refreshVal}
        className={prefixCls('event-input')}
        options={refreshOptions}
        onChange={(v) => {
          onChange({ refreshFlag: v });
        }}
      />{' '}
      服务
    </div>
  );
};

export default observer(RefreshService);
