import React, { useMemo, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, message } from 'antd'
import MonacoEditor from "@monaco-editor/react";
import { SettingItem } from './setting-item'
import store from '../store'

const CustomCssSetting = () => {
  const value = useMemo(() => {
    if (!store.selectedElement.customCss) {
      return `#${store.selectedElement.id}{}`
    }
    return store.selectedElement.customCss
  }, [store.selectedElement.customCss])

  const [canSave, setCanSave] = useState(false);
  const isJsonValidate = useRef<boolean>(true);
  const tempVal = useRef('');

  const handleSave = () => {
    if (isJsonValidate.current) {
      store.setSelectedProp('customCss', tempVal.current);
      setCanSave(false);
      return;
    }
    message.error('格式不对')
  }

  return (
    <>
      <SettingItem label='自定义CSS'>
        <Button
          disabled={!canSave}
          onClick={handleSave}
          className='fm-attr-setting-btn'
          size='small'
          type='primary'
        >
          保存
        </Button>
      </SettingItem>
      <MonacoEditor
        height='400px'
        defaultLanguage='css'
        value={value}
        onChange={(v) => {
          setCanSave(true);
          tempVal.current = v as string;
        }}
        onValidate={errors => {
          isJsonValidate.current = errors.length === 0
        }}
        options={{
          tabSize: 2
        }}
      />
    </>

  )
}

export default observer(CustomCssSetting)