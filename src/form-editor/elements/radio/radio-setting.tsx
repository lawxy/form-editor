import React from 'react'
import { observer } from "mobx-react-lite";
import OptionSetting from '@/components/option-setting'; 
import { CommonTabsSetting } from '@/components/common-tabs-setting';

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