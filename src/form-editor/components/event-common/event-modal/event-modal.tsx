import { prefixCls } from '@/const';
import {
  CustomEvent,
  EChangeType,
  EEventAction,
  eventActionInChinese,
  eventTypeChinese,
} from '@/types';
import { idCreator } from '@/utils';
import { MenuProps, message, Modal } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { ActionConfig } from './action-config';
import { EventContext } from './event-context';
import { SelectComponent } from './select-component';

export type MenuItem = Required<MenuProps>['items'][number];

const getNewEvent = () => ({ id: idCreator('event') });

export const EventModal: FC<
  PropsWithChildren<{
    event?: CustomEvent;
    eventActions: EEventAction[];
    onOk: (evt: CustomEvent) => void;
    type: EChangeType;
  }>
> = ({ children, event, eventActions, onOk, type }) => {
  const [open, setOpen] = useState(false);
  const [tempEvent, setTempEvent] = useState<CustomEvent>(
    event || getNewEvent(),
  );

  useEffect(() => {
    if (!open) {
      setTempEvent(getNewEvent());
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
    return Object.entries(eventTypeChinese).map(([key, label]) => {
      const menuItem: MenuItem = { key, label };
      if (type === EChangeType.EDIT && key !== event?.eventType) {
        menuItem.disabled = true;
      }
      return menuItem;
    });
  }, [type, event?.eventType]);

  const handleChangeEvent = <T extends keyof CustomEvent>(
    field: T,
    value: CustomEvent[T],
  ) => {
    setTempEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
        <EventContext.Provider
          value={{ currentEvent: tempEvent, handleChangeEvent }}
        >
          <div className={prefixCls('event-modal-wrap')}>
            <div className={prefixCls('event-modal-content')}>
              <SelectComponent
                className={prefixCls('event-select')}
                title="选择事件"
                menuItems={eventActionsMenus}
                onChange={(v) => handleChangeEvent('eventAction', v)}
                defaultValue={event?.eventAction}
              />
              <SelectComponent
                className={prefixCls('action-select')}
                title="选择对应的动作"
                menuItems={tempEvent.eventAction ? eventTypeMenus : []}
                onChange={(v) => handleChangeEvent('eventType', v)}
                defaultValue={event?.eventType}
              />
              <ActionConfig
                className={prefixCls('event-relation-config')}
                title="动作相关配置"
                currentEvent={tempEvent}
              />
            </div>
          </div>
        </EventContext.Provider>
      </Modal>
    </>
  );
};
