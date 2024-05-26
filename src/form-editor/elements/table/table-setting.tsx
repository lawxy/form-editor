import React from 'react'
import { observer } from "mobx-react-lite";
import BasicInfo from '@/components/basic-info';

const SettingTableContent = () => {
  return (
    <div>
      <BasicInfo />
    </div>
  )
}
export const SettingTable = observer(SettingTableContent)