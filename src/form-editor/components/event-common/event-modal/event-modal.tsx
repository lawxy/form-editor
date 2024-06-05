import React, { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';
import { prefixCls } from '@/const';
import { SelectComponent } from './select-component';

export const EventModal: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        width={840}
        open={open}
        title='新增事件'
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
         
        }}
      >
        <div className={prefixCls('event-modal-wrap')}>
          <div className={prefixCls('event-modal-content')}>
            <SelectComponent 
              className={prefixCls('event-select')} 
              title='选择事件'
            />
            <SelectComponent 
              className={prefixCls('action-select')} 
              title='选择对应的动作'
            />
            <SelectComponent 
              className={prefixCls('event-relation-config')} 
              title='动作相关配置'
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
