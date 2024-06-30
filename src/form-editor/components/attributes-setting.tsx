import React, { useEffect, useState, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { MonacoEditor, useMonaco } from '@/components';

export const AttributesSetting: FC<
  PropsWithChildren<{
    title: string | React.ReactNode;
    value?: any;
    onChange?: (v: any) => void;
    editorType: string;
  }>
> = observer(({ children, title, value, onChange, editorType }) => {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<string>('');
  const isJsonValidate = useRef<boolean>(true);
  const monaco = useMonaco();

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        width={600}
        open={open}
        title={title}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          if (isJsonValidate.current) {
            onChange?.(val);
            setOpen(false);
            return;
          }
          message.error('格式不对');
        }}
      >
        <MonacoEditor
          style={{
            height: 400,
          }}
          language={editorType}
          value={val}
          onChange={setVal}
          onValidate={(errors) => {
            console.log(errors);
            // 参数变量未使用时不校验
            isJsonValidate.current =
              errors.filter((item) => item?.code !== '6133').length === 0;
          }}
          options={{
            tabSize: 2,
          }}
        />
      </Modal>
    </div>
  );
});
