import { Select } from 'antd';
import { observer } from "mobx-react-lite";
import React from 'react'

import { CommonTabsSetting } from '@/components/common-tabs-setting';
import { SettingItem } from '@/components/setting-item';
import store from '@/store';

const dateOptions = ['HH:mm:ss', 'HH:mm'].map(per => ({label: per, value: per}))

const SettingTimeContent = () => {
  const { dateFormat } = store.selectedElement;
  return (
    <div>
      <CommonTabsSetting 
        attributes={
          <SettingItem label='时间格式'>
            <Select 
              value={dateFormat}
              style={{width: '100%'}} options={dateOptions}
              onChange={val => {
                // console.log(e)
                store.setSelectedProp('dateFormat', val)
              }}
            />
          </SettingItem>
        }
      />
    </div>
  )
}
export const SettingTime = observer(SettingTimeContent)