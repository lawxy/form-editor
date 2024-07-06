import React, { useEffect, useMemo, useState, useRef } from 'react';
import { MenuProps, message, Modal } from 'antd';
import type { FC, PropsWithChildren } from 'react';

import { ActionConfig } from './action-config';
import { EventModalContext } from './context';
import { SelectComponent } from './select-component';

import { prefixCls } from '@/const';
import {
  TCustomEvent,
  EChangeType,
  EEventAction,
  eventActionInChinese,
  eventTypeChinese,
  EEventType,
} from '@/types';
import { idCreator } from '@/utils';
import './style.less';

export type MenuItem = Required<MenuProps>['items'][number];

const getNewEvent = (newProps = {}) => ({
  id: idCreator('event'),
  ...newProps,
});

export const EventModal: FC<
  PropsWithChildren<{
    event?: TCustomEvent;
    eventActions: EEventAction[];
    onOk: (evt: TCustomEvent) => void;
    type: EChangeType;
    sourceId: string;
    eventTypeOptions?: EEventType[];
  }>
> = ({
  children,
  event,
  eventActions,
  onOk,
  type,
  sourceId,
  eventTypeOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [tempEvent, setTempEvent] = useState<TCustomEvent>(
    event || getNewEvent(),
  );
  const edit = useRef<boolean>(false);
  const setEdit = (flag: boolean) => {
    edit.current = flag;
  };
  useEffect(() => {
    if (!open) {
      edit.current = false;
      setTempEvent(getNewEvent({ eventAction: eventActions[0] }));
    }
    if (event) {
      setTempEvent(event);
    }
  }, [event, open]);

  // 选择事件 菜单项
  const eventActionsMenus = useMemo<MenuItem[]>(() => {
    return eventActions.map((action) => {
      const menuItem: MenuItem = {
        key: action,
        label: eventActionInChinese[action],
      };
      if (type === EChangeType.EDIT && action !== event?.eventAction) {
        menuItem.disabled = true;
      }
      return menuItem;
    });
  }, [eventActions, type, event?.eventAction]);

  // 选择对应动作 菜单项
  const eventTypeMenus: MenuItem[] = useMemo(() => {
    return Object.entries(eventTypeChinese)
      .map(([key, label]) => {
        const menuItem: MenuItem = { key, label };
        if (type === EChangeType.EDIT && key !== event?.eventType) {
          menuItem.disabled = true;
        }
        return menuItem;
      })
      .filter(({ key }) => {
        if (eventTypeOptions?.length) {
          if (eventTypeOptions.indexOf(key as EEventType) === -1) return false;
        }
        // 只有组件加载后的动作才能关联服务
        if (tempEvent.eventAction === EEventAction.ON_LOADED) return true;
        return key !== EEventType.LINK_SERVICE;
      });
  }, [type, event?.eventType, tempEvent.eventAction, eventTypeOptions]);

  const handleChangeEvent = <T extends keyof TCustomEvent>(
    field: T,
    value: TCustomEvent[T],
  ) => {
    if ((field === 'eventAction' || field === 'eventType') && edit.current) {
      if (tempEvent[field] === value) return;
      Modal.confirm({
        title: '编辑数据未保存，切换后将清除数据，确认切换？',
        onOk() {
          setEdit(false);
          setTempEvent((prev) => ({
            ...prev,
            [field]: value,
            eventTargets: [],
          }));
        },
      });
    } else {
      setTempEvent((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const eventContextValue = useMemo(() => {
    return {
      currentEvent: tempEvent,
      handleChangeEvent,
      setEdit,
      sourceId,
    };
  }, [tempEvent, handleChangeEvent, setEdit, sourceId]);

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        width={840}
        open={open}
        title={`${type === EChangeType.ADD ? '新增' : '编辑'}事件`}
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        destroyOnClose
        onOk={() => {
          if (!tempEvent.eventAction) {
            return message.error('选择事件');
          }
          if (!tempEvent.eventType) {
            return message.error('选择对应动作');
          }
          onOk(tempEvent);
          setOpen(false);
        }}
      >
        <EventModalContext.Provider value={eventContextValue}>
          <div className={prefixCls('event-modal-wrap')}>
            <div className={prefixCls('event-modal-content')}>
              <SelectComponent
                className={prefixCls('action-select')}
                title="选择事件"
                menuItems={eventActionsMenus}
                onChange={(v) => handleChangeEvent('eventAction', v)}
                value={tempEvent?.eventAction}
              />
              <SelectComponent
                className={prefixCls('type-select')}
                title="选择对应的动作"
                menuItems={tempEvent.eventAction ? eventTypeMenus : []}
                onChange={(v) => handleChangeEvent('eventType', v)}
                value={tempEvent?.eventType}
              />
              <ActionConfig
                className={prefixCls('event-relation-config')}
                title="动作相关配置"
                currentEvent={tempEvent}
              />
            </div>
          </div>
        </EventModalContext.Provider>
      </Modal>
    </>
  );
};
