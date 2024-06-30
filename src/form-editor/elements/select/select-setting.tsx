import { observer } from 'mobx-react-lite';
import React from 'react';
import { OptionSetting, SettingWrap } from '@/components';

const SettingSelectContent = () => {
  return (
    <SettingWrap title="元素设置">
      <OptionSetting />
    </SettingWrap>
  );
};
export const SettingSelect = observer(SettingSelectContent);
