import React from 'react'
import { observer } from "mobx-react-lite";
import BasicInfo from '@/components/basic-info';

import { ColumnsSetting } from './columns-setting';

const SettingTableContent = () => {
  return (
    <div>
      <BasicInfo />
      <ColumnsSetting />
    </div>
  )
}
export const SettingTable = observer(SettingTableContent)