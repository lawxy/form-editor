import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import { cloneDeep } from 'lodash-es';
import React, { useContext, useEffect } from 'react';

import LinkServcie from './link-service';
import RefreshService from './refresh-service';
import SetElementValue from './set-element-value';
import { EventContext } from '../event-context';

import { prefixCls } from '@/const';
import { CustomEvent, EEventType, IEventTarget } from '@/types';
import { idCreator } from '@/utils';

const ActionItem: React.FC<{
  type: EEventType;
  onChange: (v: IEventTarget) => void;
  eventTarget?: IEventTarget;
  last: boolean;
  onAdd: () => void;
  onDelete: () => void;
}> = ({ type, onChange, eventTarget, last, onAdd, onDelete }) => {
  const renderConfig = () => {
    const props = { onChange, eventTarget };
    switch (type) {
      case EEventType.REFRESH_SERVICE:
        return <RefreshService {...props} />;
      case EEventType.LINK_SERVICE:
        return <LinkServcie {...props} />;
      default:
        return <SetElementValue {...props} />;
    }
  };

  return (
    <div className={prefixCls('event-action-config')}>
      {/* <RefreshService onChange={onChange} eventTarget={eventTarget} /> */}
      {renderConfig()}
      <Space>
        <Popconfirm title="确认删除" onConfirm={onDelete}>
          <span>
            <MinusCircleOutlined
              style={{ color: '#D40000', cursor: 'pointer' }}
            />
          </span>
        </Popconfirm>
        {last && (
          <span>
            <PlusCircleOutlined
              style={{ color: '#287DFA', cursor: 'pointer' }}
              onClick={onAdd}
            />
          </span>
        )}
      </Space>
    </div>
  );
};

const getNewTarget = () => ({ id: idCreator('event-target') });
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

  const handleDelete = (idx: number) => {
    const newEventTargets = cloneDeep(currentEvent!.eventTargets);
    newEventTargets!.splice(idx, 1);
    handleChangeEvent('eventTargets', newEventTargets);
  };

  useEffect(() => {
    if (currentEvent?.eventTargets?.length) return;
    handleChange('add', getNewTarget());
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
              key={eventTarget.id}
              type={currentEvent.eventType!}
              onChange={(targetAttr) => handleChange('edit', targetAttr, i)}
              eventTarget={eventTarget}
              last={i === currentEvent?.eventTargets!.length - 1}
              onAdd={() => handleChange('add', getNewTarget())}
              onDelete={() => handleDelete(i)}
            />
          ))}
        </>
      )}
    </div>
  );
};
