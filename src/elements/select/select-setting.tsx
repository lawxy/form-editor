import React from 'react';
import { Select } from 'antd';
import {
  OptionSetting,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
  DefaultValueSetting,
  SettingItem,
  AllowClear,
} from '@/components';
import type { TElementSetting } from '@/types';

const options = [
  { label: '单选', value: false },
  { label: '多选', value: true },
];

export const SettingSelect: TElementSetting = ({
  element,
  setElementProp,
  setFieldValue,
}) => {
  const { multiple, valueOptions, placeholder, linkLoading, allowClear } =
    element;
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting>
          {(value) => (
            <Select
              options={valueOptions}
              mode={multiple ? 'multiple' : undefined}
              value={value}
              onChange={(v) => {
                setFieldValue(v);
              }}
              placeholder="默认值选择"
              allowClear
            />
          )}
        </DefaultValueSetting>
        <PlaceholderSetting />
        <SettingItem label="模式">
          <Select
            options={options}
            value={!!element.multiple}
            onChange={(v) => setElementProp('multiple', v)}
          />
        </SettingItem>
        <AllowClear />
        <OptionSetting />
      </SettingWrap>
      <RegPattern />
    </>
  );
};
