import React from 'react'
import { observer } from "mobx-react-lite";
import { Input } from 'antd';
import { SettingItem } from '../../components/setting-item';
import BasicInfo from '../../components/basic-info';
import store from '../../store'

const SettingCheckboxContent = () => {
  // console.log(store.selectedElement)
  return (
    <div>
      <BasicInfo />
    </div>
  )
}
export const SettingCheckbox = observer(SettingCheckboxContent)