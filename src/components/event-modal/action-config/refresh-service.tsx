import React from 'react';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import store from '@/store';
import {
  changeStateActions,
  EChangeStatePayload,
  refreshOptions,
  TOption
} from '@/types';
import type { IConfig } from '.';

const actions = changeStateActions([
  EChangeStatePayload.SUBMIT,
  EChangeStatePayload.UPDATE,
  EChangeStatePayload.APPEND,
  EChangeStatePayload.CLEAR,
]);

const RefreshService: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { targetServiceId, targetPayload, refreshFlag, updateField } =
    eventTarget || {};

  const ActionSelect = () => {
    return (
      <Select
        className={prefixCls('event-input')}
        options={actions}
        key="action"
        defaultValue={targetPayload}
        onChange={(v) => {
          onChange?.({ targetPayload: v });
        }}
      />
    )
  }
  const ActionInput = () => {
    return (
      <Input
        className={prefixCls('event-input')}
        defaultValue={updateField}
        onChange={(e) => {
          onChange?.({ updateField: e.target.value });
        }}
      />
    )
  }

  const renderAction = () => {
    switch (targetPayload) {
      case EChangeStatePayload.UPDATE:
        return (
          <>
            传入组件元素值&nbsp;
            <ActionSelect />
            &nbsp;
            <ActionInput />
            &nbsp;字段
          </>
        )
      case EChangeStatePayload.APPEND:
        return (
          <>
            传入组件元素值&nbsp;
            <ActionSelect />
            &nbsp;
            <ActionInput />
            &nbsp;字段到url上
          </>
        )
      case EChangeStatePayload.SUBMIT:
        return (
          <>
            <ActionSelect />
            &nbsp;, 将json传入&nbsp;
            <ActionInput />
            &nbsp;字段
          </>
        );
      default:
        return (
          <>
            <ActionSelect />
            {targetPayload === EChangeStatePayload.CLEAR && <> &nbsp;所有字段，</>}
          </>);
    }
  };

  return (
    <>
      <div>
        目标服务 ={' '}
        <Select
          allowClear
          className={prefixCls('event-select')}
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
