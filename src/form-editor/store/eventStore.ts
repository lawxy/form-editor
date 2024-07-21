/**
 * 存储事件源和事件目标间的映射关系, 用于实时通知事件失效
 */
import { makeAutoObservable } from 'mobx';
import { EventEmitter, ModalPromisify } from '@/utils';
import { IBaseElement, TCustomEvents } from '@/types';
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

  getSetsFromId(targetId: string) {
    const sets: Array<Set<string>> = [];
    const set = this.eventMap.get(targetId);
    if (set) sets.push(set);

    const targetElement = baseStore.getElement(targetId);

    baseStore.dfsEl(targetElement, (child) => {
      sets.push(...this.getSetsFromId(child.id!));
    });

    // 容器组件要判断内部子组件
    // if (targetElement && targetElement?.children?.length) {
    //   targetElement.children.forEach((child) => {
    //     sets.push(...this.getSetsFromId(child.id!));
    //   });
    // }
    return sets;
  }

  deleteId(targetId: string) {
    const sets = this.getSetsFromId(targetId);

    if (!sets.length) return Promise.resolve(true);

    let exist = false;

    sets.forEach((set) => {
      for (const sourceId of set.keys()) {
        if (baseStore.getElement(sourceId) || baseStore.getService(sourceId)) {
          exist = true;
        } else {
          set.delete(sourceId);
        }
      }
    });

    if (!exist) return Promise.resolve(true);

    const map = this.eventMap;

    return ModalPromisify({
      // title: `${exist ? '此组件或服务有事件关联, ' : ''}确认删除?`,
      title: '此组件(含内部组件)或服务有事件关联, 确认删除?',
      onOk() {
        if (exist) {
          map.delete(targetId);
        }
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

  iterateEl(el: IBaseElement) {
    const { events } = el;
    this.iterate(events);
    baseStore.dfsEl(el, (child) => {
      this.iterateEl(child);
    });
  }
}

export default new EventStore();
