import React, { useCallback, useState } from 'react';
import { Popconfirm, Modal, Button, Form, message } from 'antd';
import { observer } from 'mobx-react-lite';
import MonacoEditor from '@/components/monaco-editor';
import { prefixCls } from '@/const';
import store from '@/store';
import { openPage } from '@/utils';
import './style.less';

const ActionItem: React.FC<
  {
    icon?: React.ReactNode;
    text: string;
  } & { [key: string]: any }
> = ({ text, icon, ...rest }) => {
  return (
    <div className={prefixCls('action-item')} {...rest}>
      {text}
    </div>
  );
};

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
    // const hasErrorEl = store.validateSettringAttr()
    // if(hasErrorEl) {
    //   store.setSelectedElement(hasErrorEl)
    //   store.setFormSettingTab('element');
    //   Promise.resolve().then(() => {
    //     form.validateFields()
    //   })
    //   message.error('表单校验失败')
    //   return;
    // }

    localStorage.setItem('formJson', JSON.stringify(store.getFormJson()));
    message.success('保存成功');
  }, []);

  const handlePreview = async () => {
    await handleSave();
    setTimeout(() => {
      window.open('/~demos/docs-preview-demo-demo-demo', 'preview');
    }, 1000);
  };

  return (
    <div className={prefixCls('action-group')}>
      <ActionItem text="预览" onClick={handlePreview} />
      <ActionItem text="查看json" onClick={() => setOpenCode(true)} />
      <ActionItem text="保存" onClick={handleSave} />
      <Popconfirm
        title="确定要清空吗？"
        onConfirm={() => {
          store.clearAllElements();
          store.formServices?.forEach((serv) => {
            if (serv?.linkingElements?.length) {
              store.setService(serv.id, { linkingElements: [] });
            }
          });
        }}
        // @ts-ignore
        getPopupContainer={(n) => n.parentNode}
      >
        <div>
          <ActionItem text="清空" />
        </div>
      </Popconfirm>

      <Modal
        width={600}
        open={openCode}
        onCancel={() => {
          setOpenCode(false);
        }}
        destroyOnClose
        footer={<Button onClick={() => setOpenCode(false)}>关闭</Button>}
      >
        <div style={{ marginTop: 20 }}>
          <MonacoEditor
            language="json"
            value={JSON.stringify(store.getFormJson(), null, 2)}
            style={{
              width: '100%',
              height: 560,
            }}
            options={{
              readOnly: true,
            }}
          />
        </div>
      </Modal>
      {/* 
      <Modal
        open={openForm}
        onCancel={() => {
          setOpenForm(false);
        }}
        footer={<Button onClick={() => setOpenForm(false)}>关闭</Button>}
        width={1200}
        styles={{
          body: {
            height: 400,
            overflow: 'auto',
          },
        }}
      >
        <EditorForm />
      </Modal> */}
    </div>
  );
};

export default observer(ActionGroup);
