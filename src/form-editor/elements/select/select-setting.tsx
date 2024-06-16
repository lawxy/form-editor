import { observer } from "mobx-react-lite";
import React from 'react'

import { CommonTabsSetting } from '@/components/common-tabs-setting';

const SettingSelectContent = () => {
  return (
    <div>
      <CommonTabsSetting />
    </div>
  )
}
export const SettingSelect = observer(SettingSelectContent)