import React, { useState, useMemo, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import { EEventAction, eventActionInChinese, CustomEvent, EEventType, eventTypeChinese, IEventTarget } from '@/types';
import { prefixCls } from '@/const';
import { SelectComponent } from './select-component';
import { ActionConfig } from './action-config';
import { EventContext } from './event-context';

export type MenuItem = Required<MenuProps>['items'][number];

const eventTypeMenus: MenuItem[] = Object.entries(eventTypeChinese).map(([key, label]) => ({ key, label }))

export const EventModal: FC<PropsWithChildren<{
  event?: CustomEvent;
  eventActions: EEventAction[];
}>> = ({ children, event = {}, eventActions }) => {
  const [open, setOpen] = useState(false);
  const [, forceRandom] = useState(Math.random())
  // const [tempEvent, setTempEvent] = useState<CustomEvent>(event || {});

  // useEffect(() => {
  //   if(event){
  //    setTempEvent(event)
  //   }
  // }, [event])

  const tempEvent = useMemo(() => new Proxy(event, {
    set(target, prop, value) {
      console.log('prop')
      console.log(prop)
      target[prop]= value;
      if(['eventAction', 'eventType'].includes(prop)){
        console.log('in')
        forceRandom(Math.random())
      }
      return true
    }
  }), [event])


  const eventActionsMenus = useMemo<MenuItem[]>(() => {
    return eventActions.map(action => {
      return {
        key: action,
        label: eventActionInChinese[action]
      }
    })
  }, [eventActions])


  const handleActionChange = (key: EEventAction) => {
    // setTempEvent(prev => ({
    //   ...prev,
    //   eventAction: key
    // }))
    tempEvent.eventAction = key
  }

  const handleTypeChange = (key: EEventType) => {
    // setTempEvent(prev => ({
    //   ...prev,
    //   eventType: key
    // }))
    tempEvent.eventType = key

  }
  const handleConfigChange = (val: IEventTarget[]) => {
    // setTempEvent(prev => ({
    //   ...prev,
    //   eventTargets: val
    // }))
    tempEvent.eventTargets = val
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
        <EventContext.Provider value={{ currentEvent: tempEvent }}>
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
                onChange={handleConfigChange}
              />
            </div>
          </div>
        </EventContext.Provider>
      </Modal>
    </>
  );
};
