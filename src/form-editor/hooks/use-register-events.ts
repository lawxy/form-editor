import { useEffect, useContext, useState } from 'react';
import { EventContext } from '@/components/event-context';
import { EEventAction, EEventType, IEventTarget } from '@/types';
import type { IBaseElement } from '@/types';

interface IRegisterEvents {
  (element: IBaseElement): any;
}

export type TEventFunction = (v?: any) => any
export type TEventFunctions = {
  [key in EEventAction]?: Array<(v?: any) => any>
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { emitter } = useContext(EventContext);
  const { customEvents, id } = element;
  const [eventFunctions, setFunctions] = useState<TEventFunctions>({});

  useEffect(() => {
    const fn = (v) => {
      console.log(id)
      console.log('事件接收', v)
    }
    emitter.on(id!, fn)
    return () => {
      emitter.off(id!, fn)
    }
  }, [id, emitter])

  useEffect(() => {
    const functions: TEventFunctions = {};
    customEvents?.forEach(customEvent => {
      const { eventAction, eventType, eventTargets } = customEvent;
      eventTargets?.forEach(target => {
        const { targetElementId } = target;
        if(!targetElementId) return;
        const fn = (value) => {
          emitter.emit(targetElementId!, value)
        }
        if(functions[eventAction!]){
          functions[eventAction!]?.push(fn)
        }else {
          functions[eventAction!] = [fn]
        }
      })
    })

    setFunctions(functions)
  }, [customEvents, emitter]);


  return {eventFunctions};
};
