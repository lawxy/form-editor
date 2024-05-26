import React from 'react'
import { observer } from "mobx-react-lite";
import BasicInfo from '@/components/basic-info';

const SettingSelectContent = () => {
  return (
    <div>
      <BasicInfo />
    </div>
  )
}
export const SettingSelect = observer(SettingSelectContent)