import React, { useState, useRef } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal, message } from 'antd';
import { MonacoEditor } from '@roddan/ui';
import { injectSchema } from '@/index';

export const InjectJson: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState('');
  const valid = useRef(true);

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}

      <Modal
        width={600}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          if (!valid.current) {
            return message.error('json格式不正确');
          }
          try {
            const schema = JSON.parse(temp);
            if (!schema || typeof schema !== 'object') {
              return message.error('必须输入对象');
            }
            injectSchema(schema);
            setOpen(false);
          } catch (e) {
            return message.error('json解析出错');
          }
        }}
        destroyOnClose
      >
        <div style={{ marginTop: 20 }}>
          <MonacoEditor
            language="json"
            onChange={(v) => setTemp(v as string)}
            onValidate={(err) => {
              valid.current = err.length === 0;
            }}
            style={{
              width: '100%',
              height: 560,
            }}
          />
        </div>
      </Modal>
    </>
  );
};
