import React from 'react'
import { observer } from "mobx-react-lite";
import { Select, Switch, InputNumber } from 'antd';
import { SettingItem } from '@/components/setting-item';
import PlaceholderSetting from '@/components/placeholder-setting'
import store from '@/store';
import { CommonTabsSetting } from '@/components/common-tabs-setting';
import { EventCommon } from '@/components/event-common';

const typeOptions = [{label: '单行文本', value: 'single'}, {label: '多行文本', value: 'multiple'}]
const SettingInputContent = () => {
  const { textType, minRows, maxRows, autoSize } = store.selectedElement
  return (
    <div>
      <CommonTabsSetting
        attributes={
          <>
            <PlaceholderSetting />
            <SettingItem label='文本类型'>
              <Select 
                value={textType} 
                style={{width: '100%'}} 
                options={typeOptions}
                onChange={(val) => {
                  store.setSelectedProp('textType', val)
                }}
              />
            </SettingItem>
            {
              textType === 'multiple' && (
                <>
                <SettingItem label='自适应行数'>
                  <Switch 
                    checked={autoSize} 
                    onChange={(val) => {
                      store.setSelectedProp('autoSize', val)
                    }}
                  />
                </SettingItem>
                {
                  !autoSize && (
                    <>
                      <SettingItem label='最小行数'>
                        <InputNumber 
                          value={minRows} 
                          style={{width: '100%'}} 
                          onChange={(val) => {
                            store.setSelectedProp('minRows', Number(val))
                          }}
                        />
                      </SettingItem>
                      <SettingItem label='最大行数'>
                        <InputNumber 
                          value={maxRows} 
                          min={minRows}
                          style={{width: '100%'}} 
                          onChange={(val) => {
                            store.setSelectedProp('maxRows', Number(val))
                          }}
                        />
                      </SettingItem>
                    </>
                  )
                }
                </>
              )
            }
          </>
        }
        events={
          <EventCommon />
        }
      />
    </div>
  )
}
export const SettingInput = observer(SettingInputContent)