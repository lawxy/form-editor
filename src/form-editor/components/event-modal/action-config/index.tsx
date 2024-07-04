import React, { useContext, useEffect } from 'react';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import { cloneDeep } from 'lodash-es';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { prefixCls } from '@/const';
import { TCustomEvent, EEventType, IEventTarget } from '@/types';
import { idCreator } from '@/utils';

import LinkServcie from './link-service';
import RefreshService from './refresh-service';
import SetElementValue from './set-element-value';
import Validate from './validate';
import { EventModalContext } from '../context';

const ActionItem: React.FC<{
  type: EEventType;
  onChange: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
  last: boolean;
  onAdd: () => void;
  onDelete: () => void;
}> = ({ type, onChange, eventTarget, last, onAdd, onDelete }) => {
  const renderConfig = () => {
    const props = { onChange, eventTarget };
    switch (type) {
      case EEventType.SETTING_VALUE:
        return <SetElementValue {...props} />;
      case EEventType.UPDATE_SERVICE:
        return <RefreshService {...props} />;
      case EEventType.LINK_SERVICE:
        return <LinkServcie {...props} />;
      case EEventType.VALIDATE:
        return <Validate {...props}/>
      default:
        return null;
    }
  };

  const Config = renderConfig();

  return (
    Config && (
      <div className={prefixCls('event-action-config')}>
        {Config}
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
    )
  );
};

const getNewTarget = (sourceId: string) => ({
  id: idCreator('event-target'),
  sourceId,
});
export const ActionConfig: React.FC<{
  title: string;
  className?: string;
  currentEvent: TCustomEvent;
}> = ({ title, className, currentEvent }) => {
  const { handleChangeEvent, setEdit, sourceId } =
    useContext(EventModalContext);

  const handleChange = (
    type: 'add' | 'edit',
    targetAttr?: Omit<IEventTarget, 'id' | 'sourceId'>,
    idx?: number,
  ) => {
    if (type === 'edit') {
      const newEventTargets = cloneDeep(currentEvent!.eventTargets);
      newEventTargets![idx!] = Object.assign(
        newEventTargets![idx!],
        targetAttr,
      );
      handleChangeEvent('eventTargets', newEventTargets);
      setEdit(true);
    } else {
      handleChangeEvent(
        'eventTargets',
        (currentEvent.eventTargets || []).concat(getNewTarget(sourceId)),
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
    handleChange('add');
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
              onAdd={() => handleChange('add')}
              onDelete={() => handleDelete(i)}
            />
          ))}
        </>
      )}
    </div>
  );
};
