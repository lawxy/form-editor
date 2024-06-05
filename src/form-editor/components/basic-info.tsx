import React from 'react'
import { observer } from 'mobx-react-lite'
import { Input, Slider, Select } from 'antd'
import type { TDirection } from '../types'
import { SettingItem } from './setting-item'
import { DirectionOpions } from '../const'
import store from '../store'

const BasicInfo = () => {
  const { gridSpan, id, gridOffset } = store.selectedElement;
  return (
    <>
      <SettingItem label='元素id'>
        <div>{id}</div>
      </SettingItem>
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

      <SettingItem label='元素偏移'>
        <div style={{width: '90%'}}>
          <Slider 
            value={gridOffset}
            max={24}
            min={0}
            onChange={v => {
              store.setSelectedProp('gridOffset', v)
            }} 
          />
        </div>
      </SettingItem>
    </>
  )
}

export default observer(BasicInfo)