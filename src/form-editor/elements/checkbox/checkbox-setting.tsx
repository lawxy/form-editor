import { observer } from "mobx-react-lite";
import React from 'react'

import { CommonTabsSetting } from '@/components/common-tabs-setting';
import OptionSetting from '@/components/option-setting'; 

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