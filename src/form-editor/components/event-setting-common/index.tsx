import React from 'react';
import { Button, message } from 'antd';
import { cloneDeep, groupBy } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { prefixCls } from '@/const';
import store from '@/store';
import { handleLinkService, handleUnLinkService } from '@/utils';
import {
  TCustomEvent,
  EChangeStatePayload,
  EChangeType,
  EEventAction,
  EEventType,
  eventActionInChinese,
  TFormSerive
} from '@/types';

import { EventCollapse } from './event-collapse';
import { EventModal } from '../event-modal';

import './style.less';

const formatForCollapse = (customEvents: TCustomEvent[]) => {
  const group = groupBy(customEvents, 'eventAction');
  return Object.entries(group).map(([action, events]) => {
    return {
      label: eventActionInChinese[action as EEventAction],
      events,
    };
  });
};


// 处理关联服务的数据
// const handleLinkService = (newEvent: TCustomEvent, oldEvent?: TCustomEvent) => {
//   const { eventTargets, eventType } = newEvent;
//   if(eventType !== EEventType.LINK_SERVICE) return;

//   // debugger
//   if(oldEvent) {
//     const { eventTargets: oldTargets } = newEvent;
//     oldTargets?.forEach((target) => {
//       const { targetServiceId, sourceElementId } = target;
//       if(!targetServiceId) return;
//       const { linkingElements } = store.servicesMap.get(targetServiceId) as TFormSerive
//       if(linkingElements && linkingElements.length) {
//         const idx = linkingElements.findIndex(elId => elId === sourceElementId)
//         if(idx > -1) {
//           linkingElements.splice(idx, 1);
//           store.setService(targetServiceId, { linkingElements })
//         }
//       }
//     })
//   }

//   eventTargets?.forEach((target) => {
//     const { targetServiceId, sourceElementId } = target;
//     if(!targetServiceId) return;
//     const service = store.servicesMap.get(targetServiceId) as TFormSerive;
//     const { linkingElements } = service
//     if(!linkingElements) {
//       store.setService(targetServiceId, { linkingElements: [sourceElementId]})
//     }else {
//       linkingElements.push(sourceElementId)
//       store.setService(targetServiceId, { linkingElements })
//     }
//   })
// }

const EventSettingCommon: React.FC<{
  eventActions: EEventAction[];
}> = ({ eventActions }) => {
  const sourceElementId = store.selectedElement.id;

  const handleSaveEvents = (type: EChangeType, event: TCustomEvent) => {
    const customEvents = cloneDeep(store.selectedElement?.customEvents || []);
    if (type === EChangeType.ADD) {
      let sameActionEvent: TCustomEvent | undefined = customEvents.find(
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
      handleLinkService(event)
    } else {
      const idx = store.selectedElement?.customEvents?.findIndex(
        (evt) => event.id === evt.id,
      );
      handleUnLinkService(customEvents[idx!])
      customEvents[idx!] = event;
      handleLinkService(event)
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
    handleUnLinkService(customEvents![idx!])
    customEvents!.splice(idx!, 1);
    store.setSelectedProp('customEvents', customEvents);
  };

  return (
    <div className={prefixCls('event-common-wrap')}>
      <EventModal
        eventActions={eventActions}
        onOk={(evt: TCustomEvent) => handleSaveEvents(EChangeType.ADD, evt)}
        type={EChangeType.ADD}
        sourceElementId={sourceElementId!}
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
              onOk={(evt: TCustomEvent) =>
                handleSaveEvents(EChangeType.EDIT, evt)
              }
              event={evt}
              type={EChangeType.EDIT}
              sourceElementId={sourceElementId!}
            >
              {children}
            </EventModal>
          );
        }}
      />
    </div>
  );
};

export default observer(EventSettingCommon);
