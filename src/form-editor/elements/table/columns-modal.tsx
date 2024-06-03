import React, { useEffect, useState, useRef } from 'react'
import type { FC, PropsWithChildren } from 'react';
import { Table, Button, Modal, Input, message } from 'antd'
import { observer } from "mobx-react-lite";
import store from '@/store';
import serialize from 'serialize-javascript';
import { deserialize, ModalPromisify } from '@/utils';
// import Editor from '@/components/monaco-editor';
import MonacoEditor from "@monaco-editor/react";

export const ColumnsModal: FC<PropsWithChildren> = observer(({children}) => {
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState<string>('');
  const isJsonValidate = useRef<boolean>(true);

  useEffect(() => {
    setVal(store.selectedElement.tableColumns || '[]')
  }, [store.selectedElement.tableColumns])

  return (
    <>
      {
        React.isValidElement(children) &&
          React.cloneElement<any>(children, {
            onClick: () => setOpen(true),
          })
      }
      <Modal
        open={open}
        title='列表项设置'
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => {
      
         

          if(isJsonValidate.current) {
            store.setSelectedProp('tableColumns', val)
            setOpen(false)
            return
          }
          message.error('json格式不对')
        }}
      >
        <MonacoEditor 
          height='400px'
          defaultLanguage="javascript"
          defaultValue={val}
          onChange={setVal}
          onValidate={errors => {
            console.log('errors')
            console.log(errors)
            isJsonValidate.current = errors.length === 0
          }}
          options={{
            tabSize: 2
          }}
        />
          {/* <AceEditor
            mode="json"
            // theme="github"
            value={val}
            width="100%"
            height="560px"
            onChange={setVal}
            name="code"
            showPrintMargin={false}
            fontSize={14}
          /> */}

      </Modal>
    </>
  )
})