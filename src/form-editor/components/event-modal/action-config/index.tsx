import React, { useContext, useEffect } from 'react';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import { cloneDeep } from 'lodash-es';

import { MinusIcon, PlusIcon } from '@/components/common-icon';
import { prefixCls } from '@/const';
import { TCustomEvent, EEventType, IEventTarget, EChangeType } from '@/types';
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
        return <Validate {...props} />;
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
              <MinusIcon />
            </span>
          </Popconfirm>
          {last && (
            <span>
              <PlusIcon onClick={onAdd} />
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
  operationType: EChangeType;
}> = ({ title, className, currentEvent, operationType }) => {
  const { handleChangeEvent, setEdit, sourceId } =
    useContext(EventModalContext);

  const handleChange = (
    type: EChangeType,
    targetAttr?: Omit<IEventTarget, 'id' | 'sourceId'>,
    idx?: number,
  ) => {
    if (type === EChangeType.EDIT) {
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
    setEdit(true);
  };

  useEffect(() => {
    if (
      currentEvent?.eventTargets?.length ||
      operationType === EChangeType.EDIT
    )
      return;
    handleChange(EChangeType.ADD);
  }, [currentEvent?.eventTargets, operationType]);

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
              onChange={(targetAttr) =>
                handleChange(EChangeType.EDIT, targetAttr, i)
              }
              eventTarget={eventTarget}
              last={i === currentEvent?.eventTargets!.length - 1}
              onAdd={() => handleChange(EChangeType.ADD)}
              onDelete={() => handleDelete(i)}
            />
          ))}
          {!currentEvent?.eventTargets?.length && (
            <div
              className={prefixCls('event-action-config')}
              style={{ justifyContent: 'flex-end' }}
            >
              <PlusIcon onClick={() => handleChange(EChangeType.ADD)} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
