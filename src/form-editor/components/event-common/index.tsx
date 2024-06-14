import React from 'react'
import { Button } from 'antd';
import store from '@/store';
import { observer } from 'mobx-react-lite';
import { produce } from 'immer'
import { prefixCls } from '@/const';
import { EEventAction, eventActionInChinese, CustomEvent } from '@/types';
import { EventModal } from './event-modal';
import { EditItem } from '../edit-item';
import './style.less'

const EventCommon: React.FC<{
  eventActions: EEventAction[];
}> = ({eventActions}) => {
  const handleSaveEvents = (type: 'add' | 'edit', event: CustomEvent, idx?: number) => {
    if(type === 'add'){
      const customEvents = store.selectedElement?.customEvents || [];
      store.setSelectedProp('customEvents', customEvents.concat(event))
    }else{
      const customEvents = produce(store.selectedElement.customEvents, draft => {
        draft![idx!] = event
      })
      store.setSelectedProp('customEvents', customEvents)
    }
  }
  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal eventActions={eventActions} onOk={(evt: CustomEvent) => handleSaveEvents('add', evt)}>
        <Button type="dashed" className={prefixCls('event-button-add')}>+ 新增事件</Button>
      </EventModal>
      {
        store.selectedElement?.customEvents?.map((evt: CustomEvent, i) => {
          return (
            <EditItem 
              name='事件'
              key={i}
              onCopy={() => {}}
              onDelete={() => {}}
              EditComponent={({children}) => {
                return (
                  <EventModal eventActions={eventActions} onOk={(evt: CustomEvent) => handleSaveEvents('edit', evt, i)}>
                    {children}
                  </EventModal>
                )
              }}
            />
          )
        })
      }
    </div>
  )
}

export default observer(EventCommon)