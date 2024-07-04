import React from 'react';
import { Button, message } from 'antd';
import { cloneDeep, groupBy } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import { handleLinkService, handleUnLinkService } from '@/utils';
import {
  TCustomEvent,
  EChangeType,
  EEventAction,
  eventActionInChinese,
} from '@/types';

import { EventCollapse } from './event-collapse';
import { EventModal } from '../event-modal';

export * from './event-collapse';

import './style.less';

const formatForCollapse = (events: TCustomEvent[]) => {
  const group = groupBy(events, 'eventAction');
  return Object.entries(group).map(([action, events]) => {
    return {
      label: eventActionInChinese[action as EEventAction],
      events,
    };
  });
};

export const EventSetting: React.FC<{
  eventActions: EEventAction[];
  type: 'element' | 'form';
}> = observer(({ eventActions, type }) => {
  
  const { source, setProp } = (() => {
    if(type === 'element') return {
      source: store.selectedElement,
      setProp: store.setSelectedProp as any
    }
    return {
      source: store.formAttrs,
      setProp: store.setFormAttr as any
    }
  })()

  const sourceId = source.id;

  const handleSaveEvents = (type: EChangeType, event: TCustomEvent) => {
    const events = cloneDeep(source?.events || []);
    if (type === EChangeType.ADD) {
      let sameActionEvent: TCustomEvent | undefined = events.find(
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
        events.push(event);
      }
      handleLinkService(event);
    } else {
      const idx = source?.events?.findIndex(
        (evt) => event.id === evt.id,
      );
      handleUnLinkService(events[idx!]);
      events[idx!] = event;
      handleLinkService(event);
    }
    // modal过度效果
    setTimeout(() => {
      setProp('events', events);
    }, 200);
  };

  const handleDelete = (id: string) => {
    const events = cloneDeep(source?.events);
    const idx = source?.events?.findIndex(
      (event) => event.id === id,
    );
    handleUnLinkService(events![idx!]);
    events!.splice(idx!, 1);
    setProp('events', events);
  };

  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal
        eventActions={eventActions}
        onOk={(evt: TCustomEvent) => handleSaveEvents(EChangeType.ADD, evt)}
        type={EChangeType.ADD}
        sourceId={sourceId!}
      >
        <Button type="dashed" className={prefixCls('event-button-add')}>
          + 新增事件
        </Button>
      </EventModal>
      <EventCollapse
        collopaseItems={formatForCollapse(
          source?.events || [],
        )}
        onDelete={handleDelete}
        EditComponent={({ children, evt }) => {
          return (
            <EventModal
              eventActions={eventActions}
              onOk={(evt: TCustomEvent) =>
                handleSaveEvents(EChangeType.EDIT, evt)
              }
              event={evt}
              type={EChangeType.EDIT}
              sourceId={sourceId!}
            >
              {children}
            </EventModal>
          );
        }}
      />
    </div>
  );
});
