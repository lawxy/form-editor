import React from 'react';
import {
  OptionSetting,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
  DefaultValueSetting,
} from '@/components';

export const SettingSelect = () => {
  return (
    <>
      <SettingWrap title="元素设置">
        <DefaultValueSetting />
        <PlaceholderSetting />
        <OptionSetting />
      </SettingWrap>
      <RegPattern />
    </>
  );
};
