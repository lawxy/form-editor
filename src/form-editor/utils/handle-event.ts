import { EEventAction, EEventType, IEventTarget, CustomEvent } from '@/types';
import { Emitter } from '@/components/event-context';


const handleSettingValue = (target: IEventTarget) => {
  const { targetElementId, setValue, targetPayload } = target;
  if(!targetElementId || !setValue || !targetPayload) return;
  // const fn = (value) => {
  //   emitter.emit(targetElementId!, value)
  // }
}

export const handleEvent = (emitter: Emitter, event: CustomEvent) => {
  const { eventAction, eventType, eventTargets } = event;
  eventTargets?.forEach(target => {
    switch (eventType) {
      case EEventType.SETTING_VALUE: 
      handleSettingValue(target)
      break;
    }
   
    // if(functions[eventAction!]){
    //   functions[eventAction!]?.push(fn)
    // }else {
    //   functions[eventAction!] = [fn]
    // }
  })
}