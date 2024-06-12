import { prefixCls } from '@/const';
import { EEventAction, EEventType } from '@/types';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import React from 'react';
import RefreshService from './refresh-service';

const ActionItem: React.FC<{
  type: EEventType;
  action: EEventAction;
}> = ({ type, action }) => {
  return (
    <div className={prefixCls('event-action-config')}>
      <RefreshService />
      <Space>
        <Popconfirm title="确认删除">
          <span
            onClick={() => {
              // const newOptions = cloneDeep(valueOptions)
              // newOptions.splice(idx, 1);
              // setOption(newOptions)
              // if(!newOptions.length) {
              //   setOption( [{label: '', value: '', id: idCreator('option')}])
              // }
            }}
          >
            <MinusCircleOutlined
              style={{ color: '#D40000', cursor: 'pointer' }}
            />
          </span>
        </Popconfirm>
        <span>
          <PlusCircleOutlined style={{ color: '#287DFA', cursor: 'pointer' }} />
        </span>
      </Space>
    </div>
  );
};

export const ActionConfig: React.FC<{
  title: string;
  className?: string;
  type?: EEventType;
  action?: EEventAction;
}> = ({ title, className, type, action }) => {
  return (
    <div className={c(prefixCls('event-modal-column'), className)}>
      <div
        className={prefixCls('event-modal-title')}
        style={{ borderRight: 'none' }}
      >
        {title}
      </div>
      {action && type && (
        <>
          <ActionItem type={type} action={action} />
        </>
      )}
    </div>
  );
};
