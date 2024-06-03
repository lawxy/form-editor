import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'
import { SettingItem } from './setting-item'
import store from '../store'
import { AttributesSetting } from './attributes-setting'

const CustomCssSetting = () => {
  const defaultValue = useMemo(() => {
    return `#${store.selectedElement.id}{
  ${JSON.stringify(store.selectedElement.customCss, null, 2) || ''}
}`
  }, [store.selectedElement.customCss])
  return (
    <SettingItem label='自定义CSS'>
      <AttributesSetting
        editorType='less'
        defaultValue={defaultValue}
        title='CSS设置'
        onOk={(val) => {
          store.setSelectedProp('customCss', JSON.parse(val))
        }}
      >
        <Button style={{position: 'absolute', right: 8, top: 3}} size='small'>编辑</Button>
      </AttributesSetting>
    </SettingItem>
  )
}

export default observer(CustomCssSetting)