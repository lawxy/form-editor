import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Input, Slider, Form, Select } from 'antd'
import type { TDirection } from '../types'
import { SettingItem } from './setting-item'
import { DirectionOpions } from '../const'
import store from '../store'

const mock = [{label: '选项一', value: '1'}, {label: '选项二', value: '2'}]

const BasicInfo = () => {
  const { gridSpan, id } = store.selectedElement;
  return (
    <>
      <SettingItem label='元素名称'>
        <Input
          value={store.selectedElement.elementName?.replace(/&nbsp;/g, ' ')}
          onChange={e => {
            store.setSelectedProp('elementName', e.target.value.replace(/\s/g, '&nbsp;'))
          }}
        />
      </SettingItem>
      <SettingItem label='标签对齐'>
        <Select
          options={DirectionOpions}
          value={store.selectedElement.elementNameDisplay || 'vertical'}
          onChange={(val: TDirection) => {
            store.setSelectedProp('elementNameDisplay', val)
          }}
        />
      </SettingItem>
     
      <SettingItem label='元素栅格'>
        <div style={{width: '90%'}}>
          <Slider 
            value={gridSpan}
            max={24}
            min={1}
            onChange={v => {
              store.setSelectedProp('gridSpan', v)
            }} 
          />
        </div>

      </SettingItem>
    </>
  )
}

export default observer(BasicInfo)