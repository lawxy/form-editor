import React from 'react'
import { observer } from 'mobx-react-lite'
import { Input } from 'antd'
import { SettingItem } from './setting-item'
import store from '../store'

const PlaceholderSetting = () => {
  return (
    <SettingItem label='暗文本提示'>
      <Input
        value={store.selectedElement.placeholder}
        onChange={e => {
          store.setSelectedProp('placeholder', e.target.value)
        }}
      />
    </SettingItem>
  )
}

export default observer(PlaceholderSetting)