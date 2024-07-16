/**
 * 存储事件源和事件目标间的映射关系, 用于实时通知事件失效
 */
import { makeAutoObservable } from 'mobx';
import { EventEmitter, ModalPromisify } from '@/utils';
import { TCustomEvents } from '@/types';
import baseStore from '.';

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
    // 删除元素对应的事件源 判断是否还存在
    let exist = false;
    for (const sourceId of set.keys()) {
      if (baseStore.getElement(sourceId) || baseStore.getService(sourceId)) {
        exist = true;
      } else {
        set.delete(sourceId);
      }
    }
    if (!exist) return Promise.resolve(true);
    const map = this.eventMap;
    return ModalPromisify({
      title: '此组件或服务有事件关联, 确认删除?',
      onOk() {
        map.delete(targetId);
      },
    });
  }

  iterate(events: TCustomEvents = []) {
    events.forEach((event) => {
      const { eventTargets } = event;
      eventTargets?.forEach((target) => {
        const { targetElementId, targetServiceId, sourceId } = target;
        if (targetElementId) this.addRelation(targetElementId, sourceId);
        if (targetServiceId) this.addRelation(targetServiceId, sourceId);
      });
    });
  }
}

export default new EventStore();
