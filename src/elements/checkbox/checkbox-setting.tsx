import React from 'react';
import { Select } from 'antd';
import {
  OptionSetting,
  SettingWrap,
  SettingItem,
  RegPattern,
  DefaultValueSetting,
} from '@/components';
import { DirectionOpions } from '@/const';
import type { TElementSetting } from '@/types';

export const SettingCheckbox: TElementSetting = ({
  element,
  setElementProp,
}) => {
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting />
        <SettingItem label="排列方式">
          <Select
            options={DirectionOpions}
            value={element.alignDirection}
            onChange={(val) => {
              setElementProp('alignDirection', val);
            }}
          />
        </SettingItem>
        <OptionSetting />
      </SettingWrap>
      <RegPattern />
    </>
  );
};
