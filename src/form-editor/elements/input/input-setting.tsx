import React from 'react';
import { InputNumber, Select, Switch } from 'antd';
import { observer } from 'mobx-react-lite';

import {
  PlaceholderSetting,
  RegPattern,
  SettingItem,
  SettingWrap,
} from '@/components';
import store from '@/store';

const typeOptions = [
  { label: '单行文本', value: 'single' },
  { label: '多行文本', value: 'multiple' },
  { label: '密码框', value: 'password' },
];

const SettingInputContent = () => {
  const { textType, minRows, maxRows, autoSize } = store.selectedElement;
  return (
    <>
      <SettingWrap title="元素设置">
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
      </SettingWrap>
      <RegPattern />
    </>
  );
};
export const SettingInput = observer(SettingInputContent);
