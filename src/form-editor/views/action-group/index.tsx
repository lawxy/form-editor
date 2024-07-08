import React, { useCallback, useState } from 'react';
import { Popconfirm, Modal, Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { MonacoEditor } from '@/components';
import { prefixCls } from '@/const';
import store from '@/store';
import './style.less';

const ActionItem: React.FC<
  {
    text: string;
  } & { [key: string]: any }
> = ({ text, ...rest }) => {
  return (
    <div className={prefixCls('action-item')} {...rest}>
      {text}
    </div>
  );
};

const ActionGroup = () => {
  const [openCode, setOpenCode] = useState(false);

  const handleSave = useCallback(() => {
    /**
     * todo 组件属性校验(暂时没这个需求)
     * const form = Form.useFormInstance();
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

    localStorage.setItem('schema', JSON.stringify(store.getFormJson()));
    message.success('保存成功');
  }, []);

  const handlePreview = async () => {
    await handleSave();
    setTimeout(() => {
      window.open('/~demos/docs-preview-demo-demo-demo', 'preview');
    }, 200);
  };

  return (
    <div className={prefixCls('action-group')}>
      <ActionItem text="预览" onClick={handlePreview} />
      <ActionItem text="查看json" onClick={() => setOpenCode(true)} />
      <ActionItem text="保存" onClick={handleSave} />
      <Popconfirm
        title="确定要清空所有组件吗？"
        onConfirm={() => {
          store.clearAllElements();
          // store.formServices?.forEach((serv) => {
          //   if (serv?.linkingElements?.length) {
          //     store.setService(serv.id, { linkingElements: [] });
          //   }
          // });
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
    </div>
  );
};

export default observer(ActionGroup);
