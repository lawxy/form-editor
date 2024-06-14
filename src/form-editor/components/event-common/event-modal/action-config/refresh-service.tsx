import React, { useState, useEffect } from 'react';
import { prefixCls } from '@/const';
import store from '@/store';
import type { IEventTarget } from '@/types';
import {
  changeStatePayloadInChinese,
  EChangeStatePayload,
  refreshOptions,
  EServiceRefesh
} from '@/types';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

const actions = Object.entries(changeStatePayloadInChinese).map(
  ([value, label]) => ({ label, value }),
);

const RefreshService: React.FC<{
  onChange: (v: IEventTarget) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { 
    targetServiceId, 
    targetPayload, 
    refreshFlag,
    updateField
  } = eventTarget || {}

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
          defaultValue={targetServiceId}
          onChange={(v) => {
            onChange({ targetServiceId: v });
          }}
        />
      </div>
      <div>
        {targetPayload === EChangeStatePayload.UPDATE ? (
          <>
            传入组件元素值&nbsp;
            <Select
              className={prefixCls('event-input')}
              options={actions}
              key="action"
              defaultValue={targetPayload}
              onChange={(v) => {
                onChange({ targetPayload: v });
              }}
            />
            &nbsp;
            <Input 
              className={prefixCls('event-input')}
              defaultValue={updateField} 
              onChange={e => {
                onChange({ updateField: e.target.value });
              }}
            />
            &nbsp;字段，
          </>
        ) : (
          <>
            <Select
              className={prefixCls('event-input')}
              options={actions}
              key="action"
              defaultValue={targetPayload}
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
        className={prefixCls('event-input')}
        options={refreshOptions}
        defaultValue={refreshFlag}
        onChange={(v) => {
          onChange({ refreshFlag: v });
        }}
      />{' '}
      服务
    </div>
  );
};

export default observer(RefreshService);
