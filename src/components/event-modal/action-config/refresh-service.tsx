import React from 'react';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { prefixCls } from '@/const';
import store from '@/store';
import {
  changeStateActions,
  EChangeStatePayload,
  EEventAction,
  refreshOptions,
  type IEventTarget,
} from '@/types';
import type { IConfig } from '.';

const actions = changeStateActions([
  EChangeStatePayload.SUBMIT,
  EChangeStatePayload.UPDATE,
  EChangeStatePayload.APPEND,
  EChangeStatePayload.CLEAR,
  EChangeStatePayload.NULL,
]);

const generateActionInput = (
  field: string,
  defaultValue?: string,
  onChange?: IConfig['onChange'],
) => {
  return (
    <Input
      className={prefixCls('event-input')}
      defaultValue={defaultValue}
      onChange={(e) => {
        onChange?.({ [field]: e.target.value });
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
      defaultValue={defaultValue ?? EChangeStatePayload.NULL}
      onChange={(v) => {
        onChange?.({ targetPayload: v as EChangeStatePayload });
      }}
    />
  );
};

const RefreshService: React.FC<IConfig> = ({
  onChange,
  eventTarget,
  event,
}) => {
  const {
    targetServiceId,
    targetPayload,
    refreshFlag,
    updateField,
    urlAppended,
  } = eventTarget || {};

  const actionSelect = generateActionSelect(targetPayload, onChange);

  const actionFieldInput = generateActionInput(
    'updateField',
    updateField,
    onChange,
  );

  const actionUrlInput = generateActionInput(
    'urlAppended',
    urlAppended,
    onChange,
  );

  const { eventAction } = event;

  const useNameInChinese =
    eventAction === EEventAction.PAGINATION_CHANGE ? '页码' : '组件表单值';

  const renderAction = () => {
    switch (targetPayload) {
      case EChangeStatePayload.UPDATE:
        return (
          <>
            传入{useNameInChinese}&nbsp;
            {actionSelect}
            &nbsp;
            {actionFieldInput}
            &nbsp;字段
          </>
        );
      case EChangeStatePayload.APPEND:
        return (
          <>
            传入{useNameInChinese}&nbsp;
            {actionSelect}
            &nbsp;
            {actionUrlInput}
            &nbsp;字段到url上
          </>
        );
      case EChangeStatePayload.SUBMIT:
        return (
          <>
            {actionSelect}
            &nbsp;, 将schema赋值于&nbsp;
            {actionFieldInput}
            &nbsp;字段
          </>
        );
      case EChangeStatePayload.CLEAR:
        return (
          <>
            {actionSelect}
            {targetPayload === EChangeStatePayload.CLEAR && (
              <> &nbsp;所有字段，</>
            )}
          </>
        );
      default:
        return <>{actionSelect}</>;
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
            const data: Partial<IEventTarget> = { targetServiceId: v };
            if (!targetPayload) {
              data.targetPayload = EChangeStatePayload.NULL;
            }
            onChange?.(data);
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
