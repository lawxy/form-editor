import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Radio, Input, Switch, InputNumber, Space, Col } from 'antd';
import type { IFormAttributesProps } from '../../types';
import { SettingWrap } from './styled'
import { SettingItem } from '../../components/setting-item'
import store from '../../store';

const FormSetting = () => {
  const { isProcessForm, formId, formName, status, horizontalGap, verticalGap } = store.formAttrs

  const handleChange = useCallback((field: keyof IFormAttributesProps, value: any) => {
    return () => {
      store.setFormAttr(field, value)
    }
  }, [])

  return (
    <SettingWrap>
      <SettingItem label='表单id'>
        <Input value={formId} readOnly />
      </SettingItem>
      <SettingItem label='表单名称'>
        <Input value={formName} onChange={e => {
            store.setFormAttr<'formName'>('formName', e.target.value)
          }}/>
      </SettingItem>
      
      <SettingItem label='表单类型'>
        <Radio.Group 
          value={isProcessForm} 
          onChange={e => {
            store.setFormAttr<'isProcessForm'>('isProcessForm', e.target.value)
          }}
        >
          <Radio value={false}>普通表单</Radio>
          <Radio value={true}>流程表单</Radio>
        </Radio.Group>
      </SettingItem>

        <SettingItem label='水平间隔'>
          <InputNumber 
            value={horizontalGap} 
            min={0}
            onChange={val => {
              store.setFormAttr<'horizontalGap'>('horizontalGap', Number(val))
            }}
          />
        </SettingItem>
        <SettingItem label='垂直间隔'>
          <InputNumber 
            value={verticalGap} 
            min={0}
            onChange={val => {
              store.setFormAttr<'verticalGap'>('verticalGap', Number(val))
            }}
          />
        </SettingItem>
      <SettingItem label='禁用表单'>
        <Switch checked={status} onChange={(val) => {
          store.setFormAttr<'status'>('status', val)
        }}/>
      </SettingItem>
    </SettingWrap>
  )
}

export default observer(FormSetting)
