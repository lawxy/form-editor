import React, { useCallback } from 'react';
import { Popconfirm, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import { PreviewJson } from './preview-json';
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
      window.open(
        `${process.env.PUBLIC_PATH}~demos/docs-preview-demo-demo-preview`,
        'preview',
      );
    }, 200);
  };

  return (
    <div className={prefixCls('action-group')}>
      <ActionItem text="预览" onClick={handlePreview} />
      <PreviewJson>
        <ActionItem text="查看json" />
      </PreviewJson>
      <ActionItem text="保存" onClick={handleSave} />
      <Popconfirm
        title="确定要清空所有组件吗？"
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
    </div>
  );
};

export default observer(ActionGroup);
