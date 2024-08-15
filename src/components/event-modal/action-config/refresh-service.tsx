import React from 'react';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import store from '@/store';
import {
  changeStateActions,
  EChangeStatePayload,
  refreshOptions,
} from '@/types';
import type { IConfig } from '.';

const actions = changeStateActions([
  EChangeStatePayload.SUBMIT,
  EChangeStatePayload.UPDATE,
  EChangeStatePayload.APPEND,
  EChangeStatePayload.CLEAR,
]);

const generateActionInput = (
  defaultValue?: string,
  onChange?: IConfig['onChange'],
) => {
  return (
    <Input
      className={prefixCls('event-input')}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange?.({ updateField: e.target.value });
      }}
    />
  );
};

const generateActionSelect = (
  defaultValue?: string,
  onChange?: IConfig['onChange'],
) => {
  return (
    <Select
      className={prefixCls('event-input')}
      options={actions}
      defaultValue={defaultValue}
      onChange={(v) => {
        onChange?.({ targetPayload: v as EChangeStatePayload });
      }}
    />
  );
};

const RefreshService: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { targetServiceId, targetPayload, refreshFlag, updateField } =
    eventTarget || {};

  const actionSelect = generateActionSelect(targetPayload, onChange);
  const actionInput = generateActionInput(updateField, onChange);
  const renderAction = () => {
    switch (targetPayload) {
      case EChangeStatePayload.UPDATE:
        return (
          <>
            传入组件元素值&nbsp;
            {actionSelect}
            &nbsp;
            {actionInput}
            &nbsp;字段
          </>
        );
      case EChangeStatePayload.APPEND:
        return (
          <>
            传入组件元素值&nbsp;
            {actionSelect}
            &nbsp;
            {actionInput}
            &nbsp;字段到url上
          </>
        );
      case EChangeStatePayload.SUBMIT:
        return (
          <>
            {actionSelect}
            &nbsp;, 将schema赋值于&nbsp;
            {actionInput}
            &nbsp;字段
          </>
        );
      default:
        return (
          <>
            {actionSelect}
            {targetPayload === EChangeStatePayload.CLEAR && (
              <> &nbsp;所有字段，</>
            )}
          </>
        );
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
