import { prefixCls } from '@/const';
import {
  CustomEvent,
  CustomEvents,
  EEventAction,
  EEventType,
  eventActionInChinese,
  eventTypeChinese,
  IEventTarget,
} from '@/types';
import type { MenuProps } from 'antd';
import { Modal } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { ActionConfig } from './action-config';
import { EventContext } from './event-context';
import { SelectComponent } from './select-component';

export type MenuItem = Required<MenuProps>['items'][number];

const eventTypeMenus: MenuItem[] = Object.entries(eventTypeChinese).map(
  ([key, label]) => ({ key, label }),
);

export const EventModal: FC<
  PropsWithChildren<{
    event?: CustomEvent;
    eventActions: EEventAction[];
    onOk: (evt: CustomEvent) => void;
  }>
> = ({ children, event, eventActions, onOk }) => {
  const [open, setOpen] = useState(false);
  const [tempEvent, setTempEvent] = useState<CustomEvent>(event || {});

  useEffect(() => {
    if (event) {
      setTempEvent(event);
    }
  }, [event]);

  const eventActionsMenus = useMemo<MenuItem[]>(() => {
    return eventActions.map((action) => {
      return {
        key: action,
        label: eventActionInChinese[action],
      };
    });
  }, [eventActions]);

  const handleChangeEvent = <T extends keyof CustomEvent>(
    field: T,
    value: CustomEvent[T],
  ) => {
    setTempEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(tempEvent)

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        width={840}
        open={open}
        title="新增事件"
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          onOk(tempEvent)
          setOpen(false);
        }}
      >
        <EventContext.Provider value={{ currentEvent: tempEvent, handleChangeEvent }}>
          <div className={prefixCls('event-modal-wrap')}>
            <div className={prefixCls('event-modal-content')}>
              <SelectComponent
                className={prefixCls('event-select')}
                title="选择事件"
                menuItems={eventActionsMenus}
                onChange={(v) => handleChangeEvent('eventAction', v)}
              />
              <SelectComponent
                className={prefixCls('action-select')}
                title="选择对应的动作"
                menuItems={tempEvent.eventAction ? eventTypeMenus : []}
                onChange={(v) => handleChangeEvent('eventType', v)}
              />
              <ActionConfig
                className={prefixCls('event-relation-config')}
                title="动作相关配置"
                // onChange={(v)=> handleChangeEvent('eventTargets', v)}
              />
            </div>
          </div>
        </EventContext.Provider>
      </Modal>
    </>
  );
};
