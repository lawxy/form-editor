import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  OptionSetting,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
} from '@/components';

export const SettingSelect = () => {
  return (
    <>
      <SettingWrap title="元素设置">
        <PlaceholderSetting />
        <OptionSetting />
      </SettingWrap>
      <RegPattern />
    </>
  );
};
