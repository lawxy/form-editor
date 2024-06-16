import { prefixCls } from '@/const';
import store from '@/store';
import {
  CustomEvent,
  EChangeType,
  EEventAction,
  eventActionInChinese,
} from '@/types';
import { Button, message } from 'antd';
import { cloneDeep, groupBy } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { EventCollapse } from './event-collapse';
import { EventModal } from './event-modal';
import './style.less';

const formatForCollapse = (customEvents: CustomEvent[]) => {
  const group = groupBy(customEvents, 'eventAction');
  return Object.entries(group).map(([action, events]) => {
    return {
      label: eventActionInChinese[action as EEventAction],
      events,
    };
  });
};

const EventCommon: React.FC<{
  eventActions: EEventAction[];
}> = ({ eventActions }) => {
  const handleSaveEvents = (type: EChangeType, event: CustomEvent) => {
    const customEvents = cloneDeep(store.selectedElement?.customEvents || []);
    if (type === EChangeType.ADD) {
      let sameActionEvent: CustomEvent | undefined = customEvents.find(
        (existEvent) =>
          existEvent.eventAction === event.eventAction &&
          existEvent.eventType === event.eventType,
      );
      if (sameActionEvent) {
        sameActionEvent.eventTargets = sameActionEvent.eventTargets?.concat(
          event.eventTargets || [],
        );
        message.success('新增事件已被合并');
      } else {
        customEvents.push(event);
      }
    } else {
      const idx = store.selectedElement?.customEvents?.findIndex(
        (evt) => event.id === evt.id,
      );
      customEvents[idx!] = event;
    }
    // modal效果
    setTimeout(() => {
      store.setSelectedProp('customEvents', customEvents);
    }, 200);
  };

  const handleDelete = (id: string) => {
    const customEvents = cloneDeep(store.selectedElement?.customEvents);
    const idx = store.selectedElement?.customEvents?.findIndex(
      (event) => event.id === id,
    );
    customEvents!.splice(idx!, 1);
    store.setSelectedProp('customEvents', customEvents);
  };

  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal
        eventActions={eventActions}
        onOk={(evt: CustomEvent) => handleSaveEvents(EChangeType.ADD, evt)}
        type={EChangeType.ADD}
      >
        <Button type="dashed" className={prefixCls('event-button-add')}>
          + 新增事件
        </Button>
      </EventModal>
      <EventCollapse
        collopaseItems={formatForCollapse(
          store.selectedElement?.customEvents || [],
        )}
        onDelete={handleDelete}
        EditComponent={({ children, evt }) => {
          return (
            <EventModal
              eventActions={eventActions}
              onOk={(evt: CustomEvent) =>
                handleSaveEvents(EChangeType.EDIT, evt)
              }
              event={evt}
              type={EChangeType.EDIT}
            >
              {children}
            </EventModal>
          );
        }}
      />
    </div>
  );
};

export default observer(EventCommon);
