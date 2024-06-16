import { observer } from "mobx-react-lite";
import React from 'react'

import { CommonTabsSetting } from '@/components/common-tabs-setting';
import OptionSetting from '@/components/option-setting'; 

const SettingRadioContent = () => {
  return (
    <div>
      <CommonTabsSetting 
        attributes={
          <OptionSetting/>
        }
      />
    </div>
  )
}
export const SettingRadio = observer(SettingRadioContent)