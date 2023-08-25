import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Input, Slider, Form, Select } from 'antd'
import { SettingItem } from './setting-item'
import store from '../store'

const mock = [{label: '选项一', value: '1'}, {label: '选项二', value: '2'}]

const BasicInfo = () => {
  const { gridSpan, bindTable, bindField, id } = store.selectedElement;

  return (
    <>
      <SettingItem label='元素名称'>
        <Input
          value={store.selectedElement.elementName}
          onChange={e => {
            store.setSelectedProp('elementName', e.target.value)
          }}
        />
      </SettingItem>
      <SettingItem label='数据表' required >
        <Form.Item preserve name={`${id}-bindTable`} initialValue={bindTable} rules={[{required: true, message: '请选择数据表'}]}>
          <Select
            options={mock}
            onChange={v => {
              // form.setFieldValue(`${id}-bindTable`, v)
              store.setSelectedProp('bindTable', v)
            }}
          />
        </Form.Item>
      </SettingItem>
      <SettingItem label='绑定字段' required>
      <Form.Item preserve name={`${id}-bindField`} initialValue={bindField} rules={[{required: true, message: '请选择数据字段'}]}>

        <Select
          options={mock}
          onChange={v => {
            store.setSelectedProp('bindField', v)
          }}
        />
      </Form.Item>
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