import React from 'react'
import { observer } from "mobx-react-lite";
import OptionSetting from '@/components/option-setting'; 
import { CommonTabsSetting } from '@/components/common-tabs-setting';

const SettingCheckboxContent = () => {
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
export const SettingCheckbox = observer(SettingCheckboxContent)