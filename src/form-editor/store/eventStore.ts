/**
 * 存储事件源和事件目标间的映射关系, 用于实时通知事件失效
 */
import { makeAutoObservable } from 'mobx';
import { Modal } from 'antd';
import { Emitter } from '@/components';
import { EEventType, TCustomEvents } from '@/types';

class EventStore {
  constructor() {
    makeAutoObservable(this);
  }

  emitter = new Emitter();

  eventMap = new Map();

  addRelation(targetId: string, sourceId: string) {
    const set = this.eventMap.get(targetId) ?? new Set();
    set.add(sourceId);
    this.eventMap.set(targetId, set);
  }

  deleteId(id: string, emitter: Emitter) {
    const set = this.eventMap.get(id);
    if (!set) return Promise.resolve(true);
    return new Promise((resolve) => {
      Modal.confirm({
        title: '组件/服务有事件关联, 确认删除?',
        onOk() {
          for (const sourceId in set.keys()) {
            emitter.emit(sourceId, { eventType: EEventType.EVENT_FAILURE });
          }
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    });
  }

  iterate(events: TCustomEvents = []) {
    events.forEach((event) => {
      const { eventTargets } = event;
      console.log('eventTargets', eventTargets);
      eventTargets?.forEach((target) => {
        const { targetElementId, targetServiceId, sourceId } = target;
        targetElementId && this.addRelation(sourceId, targetElementId);
        targetServiceId && this.addRelation(sourceId, targetServiceId);
      });
    });
  }
}

export default new EventStore();
