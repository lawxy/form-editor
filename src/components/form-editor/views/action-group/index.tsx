import React, { useCallback, useState, useMemo } from 'react';
import { observer } from "mobx-react-lite";
import { Popconfirm, Modal, Button, Form, message } from 'antd';
import { toJS } from 'mobx';
import { EditorForm } from '../canvas';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

import { ActionGroupWrap, GroupItem } from './styled'
import store from '../../store';

const ActionItem: React.FC<{
  icon?: React.ReactNode,
  text: string;
} & {[key: string]: any}> = ({ text, icon, ...rest }) => {
  return (
    <GroupItem {...rest}>
      {text}
    </GroupItem>
  )
}

const ActionGroup = () => {
  const [openCode, setOpenCode] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const form = Form.useFormInstance();

  const handleSave = useCallback(() => {
    // console.log(form.getFieldsValue())
    // form.validateFields().catch(err => {
    //   console.log(err)
    // })
    // console.log(toJS(store.formElements))
    /**
     * 组件属性校验
    */
    const hasErrorEl = store.validateSettringAttr()
    if(hasErrorEl) {
      store.setSelectedElement(hasErrorEl)
      store.setFormSettingTab('element');
      Promise.resolve().then(() => {
        form.validateFields()
      })
      message.error('表单校验失败')
      return;
    }

    localStorage.setItem('formJson', JSON.stringify(store.getFormJson()))
  }, [])

  return (
    <ActionGroupWrap>
      <ActionItem text='预览' onClick={() => setOpenForm(true)}/>
      <ActionItem text='查看json' onClick={() => setOpenCode(true)}/>
      <ActionItem text='保存' onClick={handleSave}/>
      <Popconfirm
        title="确定要清空吗？"
        onConfirm={() => {
          store.clearAllElements();
        }}
        // @ts-ignore
        getPopupContainer={n => n.parentNode}
      >
        <div>
          <ActionItem text='清空' />
        </div>
      </Popconfirm>

      <Modal
        open={openCode}
        onCancel={() => {
          setOpenCode(false)
        }}
        footer={
          <Button onClick={() => setOpenCode(false)}>关闭</Button>
        }
      >
        <div style={{marginTop: 20}}>
          <AceEditor
            mode="json"
            theme="github"
            value={JSON.stringify(store.getFormJson(), null, 2)}

            width="100%"
            height="560px"
            onChange={() => {}}
            name="code"
            showPrintMargin={false}
            fontSize={14}
            setOptions={{
              readOnly: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </Modal>

      <Modal
        open={openForm}
        onCancel={() => {
          setOpenForm(false)
        }}
        footer={
          <Button onClick={() => setOpenForm(false)}>关闭</Button>
        }
        width={1200}
        bodyStyle={{
          height: 400,
          overflow: 'auto'
        }}
      >
        <EditorForm />
      </Modal>
    </ActionGroupWrap>
  )
}

export default observer(ActionGroup)