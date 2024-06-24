import { observer } from 'mobx-react-lite';
import React from 'react';

import OptionSetting from '@/components/option-setting';

const SettingRadioContent = () => {
  return (
    <div>
      <OptionSetting />
    </div>
  );
};
export const SettingRadio = observer(SettingRadioContent);
