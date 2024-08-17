import React from 'react';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

import { QuestionPopover } from '@/components';
import store from '@/store';
import { prefixCls } from '@/const';
import {
  changeStateActions,
  EChangeStatePayload,
  type IEventTarget,
} from '@/types';
import type { IConfig } from '.';

const getComponentsOptions = () => {
  const options = [];
  // @ts-ignore
  for (const el of store.formElementMap.values()) {
    options.push({
      label: (
        <div
          dangerouslySetInnerHTML={{
            __html: el?.elementName || (el.id as string),
          }}
        />
      ),
      value: el.id,
      disabled: store.selectedElement.id === el.id,
    });
  }
  return options;
};

const SetElementValue: React.FC<IConfig> = ({ onChange, eventTarget }) => {
  const { targetElementId, targetPayload, setValue } = eventTarget || {};

  return (
    <>
      <div>
        目标组件 ={' '}
        <Select
          allowClear
          className={prefixCls('event-input')}
          options={getComponentsOptions()}
          style={{ width: 200 }}
          value={targetElementId}
          onChange={(v) => {
            onChange?.({ targetElementId: v });
          }}
        />
      </div>
      <div>
        事件发生时,&nbsp;
        <Select
          className={prefixCls('event-input')}
          options={changeStateActions(
            // @ts-ignore
            [
              EChangeStatePayload.SYNC,
              EChangeStatePayload.CUSTOM,
              EChangeStatePayload.RESET_PAGE,
            ].filter(Boolean),
          )}
          key="action"
          value={targetPayload}
          onChange={(v) => {
            const prop: Partial<IEventTarget> = { targetPayload: v };
            onChange?.(prop);
          }}
        />
        {targetPayload && targetPayload !== EChangeStatePayload.RESET_PAGE && (
          <>
            &nbsp;目标表单值为
            {targetPayload === EChangeStatePayload.SYNC ? (
              <> &nbsp;事件源表单值</>
            ) : (
              <>
                &nbsp;
                <QuestionPopover content="按照基本数据类型填写, 比如 true 或 1 或 '1'" />
                &nbsp;
                <Input
                  className={prefixCls('event-input')}
                  defaultValue={setValue}
                  onChange={(e) => {
                    onChange?.({ setValue: e.target.value });
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default observer(SetElementValue);
