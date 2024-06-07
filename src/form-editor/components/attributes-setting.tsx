import React, { useEffect, useState, useRef } from 'react'
import type { FC, PropsWithChildren } from 'react';
import { Modal, message } from 'antd'
import { observer } from "mobx-react-lite";
import MonacoEditor from "@monaco-editor/react";

export const AttributesSetting: FC<PropsWithChildren<{
  title: string | React.ReactNode;
  value?: any;
  onChange?: (v: any) => void;
  editorType: string;
}>> = observer(({children, title, value, onChange, editorType}) => {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState<string>('');
  const isJsonValidate = useRef<boolean>(true);

  useEffect(() => {
    setVal(value)
  }, [value])

  return (
    <div>
      {
        React.isValidElement(children) &&
          React.cloneElement<any>(children, {
            onClick: () => setOpen(true),
          })
      }
      <Modal
        width={600}
        open={open}
        title={title}
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => {
          if(isJsonValidate.current) {
            console.log('val')
            console.log(val)
            onChange?.(val)
            setOpen(false)
            return
          }
          message.error('格式不对')
        }}
      >
        <MonacoEditor 
          height='400px'
          defaultLanguage={editorType}
          value={val}
          onChange={setVal}
          onValidate={errors => {
            isJsonValidate.current = errors.length === 0
          }}
          options={{
            tabSize: 2
          }}
        />
      </Modal>
    </div>
  )
})