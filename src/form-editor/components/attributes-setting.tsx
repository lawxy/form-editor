import React, { useEffect, useState, useRef } from 'react'
import type { FC, PropsWithChildren } from 'react';
import { Modal, message } from 'antd'
import { observer } from "mobx-react-lite";
import MonacoEditor from "@monaco-editor/react";

export const AttributesSetting: FC<PropsWithChildren<{
  title: string | React.ReactNode;
  defaultValue: any;
  onOk: (v: any) => void;
  editorType: string;
}>> = observer(({children, title, defaultValue, onOk, editorType}) => {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState<string>('');
  const isJsonValidate = useRef<boolean>(true);

  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])

  return (
    <>
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
            onOk(val)
            setOpen(false)
            return
          }
          message.error('格式不对')
        }}
      >
        <MonacoEditor 
          height='400px'
          defaultLanguage={editorType}
          defaultValue={val}
          onChange={setVal}
          onValidate={errors => {
            // console.log('errors')
            // console.log(errors)
            isJsonValidate.current = errors.length === 0
          }}
          options={{
            tabSize: 2
          }}
        />
      </Modal>
    </>
  )
})