import React, { useState, useMemo, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import { EEventAction, eventActionInChinese, CustomEvent, EEventType, eventTypeChinese, IEventTarget } from '@/types';
import { prefixCls } from '@/const';
import { SelectComponent } from './select-component';
import { ActionConfig } from '../action-config';

export type MenuItem = Required<MenuProps>['items'][number];

const eventTypeMenus: MenuItem[] = Object.entries(eventTypeChinese).map(([key, label]) => ({key, label}))

export const EventModal: FC<PropsWithChildren<{
  event?: CustomEvent;
  eventActions: EEventAction[];
}>> = ({ children, event, eventActions }) => {
  const [open, setOpen] = useState(false);
  const [tempEvent, setTempEvent] = useState<CustomEvent>(event || {});

  useEffect(() => {
    event && setTempEvent(event)
  }, [event])

  const eventActionsMenus = useMemo<MenuItem[]>(() => {
    return eventActions.map(action => {
      return {
        key: action,
        label: eventActionInChinese[action]
      }
    })
  }, [eventActions])


  const handleActionChange = (key: EEventAction) => {
    setTempEvent(prev => ({
      ...prev,
      eventAction: key
    }))
  }

  const handleTypeChange = (key: EEventType) => {
    setTempEvent(prev => ({
      ...prev,
      eventType: key
    }))
  }
  const handleConfigChange = (val: IEventTarget[]) => {
    setTempEvent(prev => ({
      ...prev,
      eventTargets: val
    }))
  }

  // const handleChange = <T>(field: keyof CustomEvent) => (val: T) => {
  //   setTempEvent(prev => ({
  //     ...prev,
  //     [field]: val
  //   }))
  // }

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement<any>(children, {
          onClick: () => setOpen(true),
        })}
      <Modal
        width={840}
        open={open}
        title='新增事件'
        maskClosable={false}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
         
        }}
      >
        <div className={prefixCls('event-modal-wrap')}>
          <div className={prefixCls('event-modal-content')}>
            <SelectComponent 
              className={prefixCls('event-select')} 
              title='选择事件'
              menuItems={eventActionsMenus}
              onChange={handleActionChange}
            />
            <SelectComponent 
              className={prefixCls('action-select')} 
              title='选择对应的动作'
              menuItems={tempEvent.eventAction ? eventTypeMenus : []}
              onChange={handleTypeChange}
            />
            <ActionConfig 
              className={prefixCls('event-relation-config')} 
              title='动作相关配置'
              action={tempEvent.eventAction}
              type={tempEvent.eventType}
              onChange={handleConfigChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
