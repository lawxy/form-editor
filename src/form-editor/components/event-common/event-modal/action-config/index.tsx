import { prefixCls } from '@/const';
import { CustomEvent, EEventType, IEventTarget } from '@/types';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import { cloneDeep } from 'lodash-es';
import React, { useContext, useEffect } from 'react';
import { EventContext } from '../event-context';
import RefreshService from './refresh-service';

const ActionItem: React.FC<{
  type: EEventType;
  onChange: (v: IEventTarget) => void;
  eventTarget?: IEventTarget;
}> = ({ type, onChange, eventTarget }) => {
  return (
    <div className={prefixCls('event-action-config')}>
      <RefreshService onChange={onChange} eventTarget={eventTarget} />
      <Space>
        <Popconfirm title="确认删除">
          <span onClick={() => {}}>
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
  currentEvent: CustomEvent;
}> = ({ title, className, currentEvent }) => {
  const { handleChangeEvent } = useContext(EventContext);

  const handleChange = (
    type: 'add' | 'edit',
    targetAttr: Partial<IEventTarget>,
    idx?: number,
  ) => {
    if (type === 'edit') {
      const newEventTargets = cloneDeep(currentEvent!.eventTargets);
      newEventTargets![idx!] = Object.assign(
        newEventTargets![idx!],
        targetAttr,
      );

      handleChangeEvent('eventTargets', newEventTargets);
    } else {
      handleChangeEvent(
        'eventTargets',
        (currentEvent.eventTargets || []).concat(targetAttr),
      );
    }
  };

  useEffect(() => {
    if (currentEvent?.eventTargets?.length) return;
    handleChange('add', {});
  }, [currentEvent?.eventTargets]);

  return (
    <div className={c(prefixCls('event-modal-column'), className)}>
      <div
        className={prefixCls('event-modal-title')}
        style={{ borderRight: 'none' }}
      >
        {title}
      </div>
      {currentEvent?.eventAction && currentEvent?.eventType && (
        <>
          {currentEvent?.eventTargets?.map((eventTarget, i) => (
            <ActionItem
              key={i}
              type={currentEvent.eventType!}
              onChange={(targetAttr) => handleChange('edit', targetAttr, i)}
              eventTarget={eventTarget}
            />
          ))}
        </>
      )}
    </div>
  );
};
