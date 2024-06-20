import { InputNumber, Select, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { CommonTabsSetting } from '@/components/common-tabs-setting';
import EventSettingCommon from '@/components/event-setting-common';
import PlaceholderSetting from '@/components/placeholder-setting';
import { SettingItem } from '@/components/setting-item';
import store from '@/store';
import { EEventAction } from '@/types';

const typeOptions = [
  { label: '单行文本', value: 'single' },
  { label: '多行文本', value: 'multiple' },
];
const eventActions = [
  EEventAction.ON_LOADED,
  EEventAction.VALUE_CHANGE,
  EEventAction.ON_FOCUS,
  EEventAction.ON_BLUR,
];
const SettingInputContent = () => {
  const { textType, minRows, maxRows, autoSize } = store.selectedElement;
  return (
    <CommonTabsSetting
      attributes={
        <>
          <PlaceholderSetting />
          <SettingItem label="文本类型">
            <Select
              value={textType}
              style={{ width: '100%' }}
              options={typeOptions}
              onChange={(val) => {
                store.setSelectedProp('textType', val);
              }}
            />
          </SettingItem>
          {textType === 'multiple' && (
            <>
              <SettingItem label="自适应行数">
                <Switch
                  checked={autoSize}
                  onChange={(val) => {
                    store.setSelectedProp('autoSize', val);
                  }}
                />
              </SettingItem>
              {!autoSize && (
                <>
                  <SettingItem label="最小行数">
                    <InputNumber
                      value={minRows}
                      style={{ width: '100%' }}
                      onChange={(val) => {
                        store.setSelectedProp('minRows', Number(val));
                      }}
                    />
                  </SettingItem>
                  <SettingItem label="最大行数">
                    <InputNumber
                      value={maxRows}
                      min={minRows}
                      style={{ width: '100%' }}
                      onChange={(val) => {
                        store.setSelectedProp('maxRows', Number(val));
                      }}
                    />
                  </SettingItem>
                </>
              )}
            </>
          )}
        </>
      }
      events={<EventSettingCommon eventActions={eventActions} />}
    />
  );
};
export const SettingInput = observer(SettingInputContent);
