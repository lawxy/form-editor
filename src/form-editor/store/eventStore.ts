/**
 * 存储事件源和事件目标间的映射关系, 用于实时通知事件失效
 */
import { makeAutoObservable } from 'mobx';
import { Modal } from 'antd';
import { EventEmitter } from '@/utils';
import { EEventType, TCustomEvents } from '@/types';

class EventStore {
  constructor() {
    makeAutoObservable(this);
  }

  emitter = new EventEmitter();

  eventMap = new Map();

  addRelation(targetId: string, sourceId: string) {
    const set = this.eventMap.get(targetId) ?? new Set();
    set.add(sourceId);
    this.eventMap.set(targetId, set);
  }

  deleteId(targetId: string) {
    const set = this.eventMap.get(targetId);
    if (!set) return Promise.resolve(true);
    return new Promise((resolve) => {
      Modal.confirm({
        title: '此组件或服务有事件关联, 确认删除?',
        onOk() {
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
      eventTargets?.forEach((target) => {
        const { targetElementId, targetServiceId, sourceId } = target;
        targetElementId && this.addRelation(targetElementId, sourceId);
        targetServiceId && this.addRelation(targetServiceId, sourceId);
      });
    });
  }
}

export default new EventStore();
