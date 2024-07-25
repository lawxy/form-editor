import React, { useState, useRef } from 'react';
import { Input, Modal, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { prefixCls } from '@/const';

export const EditInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const inp = useRef<any>();

  return (
    <div className={prefixCls('edit-input')}>
      <Typography.Text
        style={{ width: 60, fontSize: 13 }}
        ellipsis={{ tooltip: true }}
      >
        {value}
      </Typography.Text>

      <EditOutlined onClick={() => setOpen(true)} />

      <Modal
        open={open}
        title="编辑名称"
        onCancel={() => setOpen(false)}
        onOk={() => {
          onChange(inp.current.input.value);
          setOpen(false);
        }}
        destroyOnClose
      >
        <Input defaultValue={value} ref={inp} />
      </Modal>
    </div>
  );
};
