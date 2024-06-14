import { prefixCls } from '@/const';
import { EEventAction, EEventType, IEventTarget, CustomEvent } from '@/types';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import React, { useContext } from 'react';
import RefreshService from './refresh-service';
import { EventContext } from '../event-context';

const ActionItem: React.FC<{
  type: EEventType;
  onChange: (v: IEventTarget) => void;
  eventTarget?: IEventTarget;
}> = ({ type, onChange, eventTarget }) => {
  return (
    <div className={prefixCls('event-action-config')}>
      <RefreshService onChange={onChange} eventTarget={eventTarget}/>
      <Space>
        <Popconfirm title="确认删除">
          <span
            onClick={() => {
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
  onChange: (v: IEventTarget[]) => void;
}> = ({ title, className }) => {
  const { currentEvent: event } = useContext(EventContext)
  
  const handleChange = (v: IEventTarget) => {
    console.log(v)
  }
  
  return (
    <div className={c(prefixCls('event-modal-column'), className)}>
      <div
        className={prefixCls('event-modal-title')}
        style={{ borderRight: 'none' }}
      >
        {title}
      </div>
      {event?.eventAction && event?.eventType && (
        <>
          {
              event?.eventTargets?.length ? event?.eventTargets?.map((eventTarget, i) => (
              <ActionItem key={i} type={event.eventType!} onChange={handleChange} eventTarget={eventTarget}/>
            )): (
              <ActionItem type={event.eventType!} onChange={handleChange}/>
            )
          }
        </>
      )}
    </div>
  );
};
