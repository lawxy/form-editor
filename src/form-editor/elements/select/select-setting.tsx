import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  OptionSetting,
  SettingWrap,
  PlaceholderSetting,
  RegPattern,
} from '@/components';

const SettingSelectContent = () => {
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
export const SettingSelect = observer(SettingSelectContent);
