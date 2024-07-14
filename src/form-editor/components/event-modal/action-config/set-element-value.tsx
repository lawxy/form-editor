import React from 'react';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';

import store from '@/store';
import { prefixCls } from '@/const';
import {
  changeStateActions,
  EChangeStatePayload,
  EChecked,
  type IEventTarget,
} from '@/types';
import { isSwitch } from '@/elements/switch';

const checkedOptions = [
  {
    label: '选中',
    value: EChecked.CHECKED,
  },
  {
    label: '不选中',
    value: EChecked.NOT_CHECKED,
  },
];

const SetElementValue: React.FC<{
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
}> = ({ onChange, eventTarget }) => {
  const { targetElementId, targetPayload, setValue, checked } =
    eventTarget || {};

  const componentsOptions = store.formElements.map((el) => ({
    label: (
      <div
        dangerouslySetInnerHTML={{
          __html: el?.elementName || (el.id as string),
        }}
      />
    ),
    value: el.id,
    disabled: store.selectedElement.id === el.id,
  }));

  const renderChangeVal = () => {
    if (isSwitch(targetElementId)) {
      return (
        <>
          设置组件{' '}
          <Select
            className={prefixCls('event-input')}
            defaultValue={checked}
            options={checkedOptions}
            onChange={(v) => onChange({ checked: v })}
          />
        </>
      );
    } else {
      return (
        <>
          <Select
            className={prefixCls('event-input')}
            options={changeStateActions([
              EChangeStatePayload.SYNC,
              EChangeStatePayload.CUSTOM,
            ])}
            key="action"
            defaultValue={targetPayload}
            onChange={(v) => {
              const prop: Partial<IEventTarget> = { targetPayload: v };
              onChange(prop);
            }}
          />
          &nbsp;目标组件值为&nbsp;
          {targetPayload === EChangeStatePayload.SYNC ? (
            <>事件源组件值</>
          ) : (
            <>
              <Input
                className={prefixCls('event-input')}
                defaultValue={setValue}
                onChange={(e) => {
                  onChange({ setValue: e.target.value });
                }}
              />
            </>
          )}
        </>
      );
    }
  };

  return (
    <div style={{ lineHeight: '40px' }}>
      <div>
        目标组件 ={' '}
        <Select
          allowClear
          className={prefixCls('event-input')}
          options={componentsOptions}
          style={{ width: 200 }}
          defaultValue={targetElementId}
          onChange={(v) => {
            onChange({ targetElementId: v });
          }}
        />
      </div>
      <div>事件发生时,&nbsp;{renderChangeVal()}</div>
    </div>
  );
};

export default observer(SetElementValue);
