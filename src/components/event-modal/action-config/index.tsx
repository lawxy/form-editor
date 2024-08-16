import React, { useContext, useEffect } from 'react';
import { Popconfirm, Space } from 'antd';
import c from 'classnames';
import { cloneDeep } from 'lodash-es';
import { ReactSortable } from '@roddan/ui';
import { arrayMoveImmutable } from 'array-move';

import { MinusIcon, PlusIcon, QuestionPopover } from '@/components';
import { prefixCls } from '@/const';
import { TCustomEvent, EEventType, IEventTarget, EChangeType, EChangeStatePayload } from '@/types';
import { idCreator } from '@/utils';
import { WithCommon } from './with-common';

import LinkServcie from './link-service';
import RefreshService from './refresh-service';
import SetElementValue from './set-element-value';
import Validate from './validate';
import JumpLink from './jump-link';
import { EventModalContext } from '../context';
export interface IConfig {
  onChange?: (v: Omit<IEventTarget, 'id' | 'sourceId'>) => void;
  eventTarget?: IEventTarget;
}

const ActionItem: React.FC<
  IConfig & {
    last: boolean;
    onAdd: () => void;
    onDelete: () => void;
    event: TCustomEvent;
  }
> = ({ onChange, eventTarget, last, onAdd, onDelete, event }) => {
  const renderConfig = () => {
    switch (event.eventType) {
      case EEventType.SETTING_VALUE:
        return <SetElementValue />;
      case EEventType.UPDATE_SERVICE:
        return <RefreshService />;
      case EEventType.LINK_SERVICE:
        return <LinkServcie />;
      case EEventType.VALIDATE:
        return <Validate />;
      case EEventType.JMUP:
        return <JumpLink />;
      default:
        return null;
    }
  };

  const Config = renderConfig();

  return (
    Config && (
      <div className={prefixCls('event-action-config')}>
        {Config ? (
          <WithCommon
            event={event}
            onChange={onChange}
            eventTarget={eventTarget}
          >
            {Config}
          </WithCommon>
        ) : null}
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
    ) {
      return;
    }
    handleChange(EChangeType.ADD);
  }, [currentEvent?.eventTargets, operationType]);

  return (
    <div className={c(prefixCls('event-modal-column'), className)}>
      <div
        className={prefixCls('event-modal-title')}
        style={{ borderRight: 'none' }}
      >
        {title}
        <QuestionPopover content="可拖拽排序" />
      </div>
      {currentEvent?.eventAction && currentEvent?.eventType && (
        <ReactSortable
          list={currentEvent?.eventTargets || []}
          animation={150}
          // handle=".fe-event-action-config"
          onSort={({ newIndex, oldIndex }) => {
            const newEventTargets = cloneDeep(currentEvent!.eventTargets);
            const afterMove = arrayMoveImmutable(
              newEventTargets!,
              newIndex!,
              oldIndex!,
            );
            handleChangeEvent('eventTargets', afterMove);
          }}
        >
          {currentEvent?.eventTargets?.map((eventTarget, i) => (
            <ActionItem
              key={eventTarget.id}
              onChange={(targetAttr) =>
                handleChange(EChangeType.EDIT, targetAttr, i)
              }
              event={currentEvent}
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
        </ReactSortable>
      )}
    </div>
  );
};
