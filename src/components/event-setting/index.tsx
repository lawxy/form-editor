import React from 'react';
import { Button } from 'antd';
import { cloneDeep, groupBy } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { arrayMoveImmutable } from 'array-move';
import { prefixCls } from '@/const';
import { useCurrent } from '@/hooks';
import { handleLinkService, handleUnLinkService } from '@/utils';
import {
  TCustomEvent,
  EChangeType,
  EEventAction,
  eventActionInChinese,
  EEventType,
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
  eventTypeOptions?: EEventType[];
  type: 'element' | 'form';
}> = observer(({ eventActions, type, eventTypeOptions }) => {
  const { current, setProp } = useCurrent(type);

  const sourceId = current.id;

  const handleSaveEvents = (type: EChangeType, event: TCustomEvent) => {
    const events = cloneDeep(current?.events || []);
    if (type === EChangeType.ADD) {
      if (!event?.eventTargets?.length) return;
      // let sameActionEvent: TCustomEvent | undefined = events.find(
      //   (existEvent) =>
      //     existEvent.eventAction === event.eventAction &&
      //     existEvent.eventType === event.eventType,
      // );
      // if (sameActionEvent) {
      //   sameActionEvent.eventTargets = sameActionEvent.eventTargets?.concat(
      //     event.eventTargets || [],
      //   );
      //   message.success('新增事件已被合并');
      // } else {
      // }
      // @ts-ignore
      const lastIndex = events.findLastIndex(
        (evt: TCustomEvent) => evt.eventAction === event.eventAction,
      );

      events.splice(lastIndex + 1, 0, event);
      handleLinkService(event);
    } else {
      const idx = current?.events?.findIndex((evt) => event.id === evt.id);
      handleUnLinkService(events[idx!]);
      events[idx!] = event;
      if (event?.eventTargets?.length) {
        handleLinkService(event);
      } else {
        events.splice(idx!, 1);
      }
    }
    // modal过度效果
    setTimeout(() => {
      setProp('events', events);
    }, 200);
  };

  const handleDelete = (id: string) => {
    const events = cloneDeep(current?.events);
    const idx = current?.events?.findIndex((event) => event.id === id);
    handleUnLinkService(events![idx!]);
    events!.splice(idx!, 1);
    setProp('events', events);
  };

  const collopaseItems = formatForCollapse(current?.events || []);

  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal
        eventActions={eventActions}
        onOk={(evt: TCustomEvent) => handleSaveEvents(EChangeType.ADD, evt)}
        type={EChangeType.ADD}
        sourceId={sourceId!}
        eventTypeOptions={eventTypeOptions}
      >
        <Button
          type="dashed"
          className={prefixCls('add-button')}
          style={{ marginBottom: 8 }}
        >
          + 新增事件
        </Button>
      </EventModal>
      <EventCollapse
        collopaseItems={collopaseItems}
        onSort={({ newIndex, oldIndex, listIndex }) => {
          // 事件是平铺的，但是展示却分类了，分类后可以排序，需要计算真实的索引
          if (listIndex > 0) {
            let i = 0;
            while (i < listIndex) {
              oldIndex += collopaseItems[i].events.length;
              newIndex += collopaseItems[i].events.length;
              i++;
            }
          }

          const newEvents = cloneDeep(current?.events || []);
          const afterSort = arrayMoveImmutable(newEvents, oldIndex!, newIndex!);
          setProp('events', afterSort);
        }}
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
              eventTypeOptions={eventTypeOptions}
            >
              {children}
            </EventModal>
          );
        }}
      />
    </div>
  );
});
