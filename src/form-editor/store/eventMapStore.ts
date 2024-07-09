/**
 * 存储事件源和事件目标间的映射关系  
*/
import { makeAutoObservable } from 'mobx';
import type { Emitter } from '@/components';
import baseStore from '.'

export enum EMapType {
  element = 'element',
  service = 'service'
}

export class EventMapStore {
  constructor() {
    makeAutoObservable(this);
  }

  eventMap = new Map();

  /**
   * { sourceId: { [targetType]: Set } }
  */
  add({ sourceId, targetId, targetType, sourceType, once }: { sourceId: string, targetId: string, targetType: EMapType, sourceType: EMapType, once?: boolean }) {
    const map = this.eventMap.get(sourceId) ?? new Map();
    const set = map.get(targetType) ?? new Set();
    set.add(targetId);
    map.set(targetType, set)
    this.eventMap.set(sourceId, map)
    if(!once) { 
      this.add({
        once: true,
        sourceId: targetId,
        targetId: sourceId,
        targetType: sourceType,
        sourceType: targetType
      })
    }
  }

  deleteId(id: string, emitter: Emitter) {
    // this.eventMap.delete(id)
    const map = this.eventMap.get(id);
    if(!map) return;
    // for(const type in EMapType) {
    //   if(map.get(type)?.size) {
    //     // map.get(type).delete(id)
    //     for()
    //   }
    // }
  }
}
