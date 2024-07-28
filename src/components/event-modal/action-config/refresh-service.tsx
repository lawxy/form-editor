import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { prefixCls } from '@/const';
import store from '@/store';
import {
  changeStateActions,
  EChangeStatePayload,
  refreshOptions,
} from '@/types';
import type { IConfig } from '.';

const actions = changeStateActions([
  EChangeStatePayload.UPDATE,
  EChangeStatePayload.CLEAR,
  EChangeStatePayload.APPEND,
]);
const RefreshService: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { targetServiceId, targetPayload, refreshFlag, updateField } =
    eventTarget || {};

  const renderAction = () => {
    if (
      targetPayload === EChangeStatePayload.UPDATE ||
      targetPayload === EChangeStatePayload.APPEND
    ) {
      return (
        <>
          传入组件元素值&nbsp;
          <Select
            className={prefixCls('event-input')}
            options={actions}
            key="action"
            defaultValue={targetPayload}
            onChange={(v) => {
              onChange?.({ targetPayload: v });
            }}
          />
          &nbsp;
          <Input
            className={prefixCls('event-input')}
            defaultValue={updateField}
            onChange={(e) => {
              onChange?.({ updateField: e.target.value });
            }}
          />
          &nbsp;字段
          {targetPayload === EChangeStatePayload.APPEND && <>到url上</>}
        </>
      );
    }

    return (
      <>
        <Select
          className={prefixCls('event-input')}
          options={actions}
          key="action"
          defaultValue={targetPayload}
          onChange={(v) => {
            onChange?.({ targetPayload: v });
          }}
        />
        &nbsp;所有字段，
      </>
    );
  };

  return (
    <>
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
            onChange?.({ targetServiceId: v });
          }}
        />
      </div>
      <div>{renderAction()}</div>并{' '}
      <Select
        className={prefixCls('event-input')}
        options={refreshOptions}
        defaultValue={refreshFlag}
        onChange={(v) => {
          onChange?.({ refreshFlag: v });
        }}
      />{' '}
      服务
    </>
  );
};

export default observer(RefreshService);
