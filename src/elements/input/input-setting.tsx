import React from 'react';
import { InputNumber, Select, Switch } from 'antd';

import {
  PlaceholderSetting,
  RegPattern,
  SettingItem,
  SettingWrap,
  DefaultValueSetting
} from '@/components';
import type { TElementSetting } from '@/types';

const typeOptions = [
  { label: '单行文本', value: 'single' },
  { label: '多行文本', value: 'multiple' },
  { label: '密码框', value: 'password' },
];

export const SettingInput: TElementSetting = ({ element, setElementProp }) => {
  const { textType, minRows, maxRows, autoSize } = element;
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting />
        <PlaceholderSetting />
        <SettingItem label="文本类型">
          <Select
            value={textType}
            style={{ width: '100%' }}
            options={typeOptions}
            onChange={(val) => {
              setElementProp('textType', val);
            }}
          />
        </SettingItem>
        {textType === 'multiple' && (
          <>
            <SettingItem label="自适应行数">
              <Switch
                checked={autoSize}
                onChange={(val) => {
                  setElementProp('autoSize', val);
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
                      setElementProp('minRows', Number(val));
                    }}
                  />
                </SettingItem>
                <SettingItem label="最大行数">
                  <InputNumber
                    value={maxRows}
                    min={minRows}
                    style={{ width: '100%' }}
                    onChange={(val) => {
                      setElementProp('maxRows', Number(val));
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
