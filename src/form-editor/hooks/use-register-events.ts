import { useEffect, useContext, useState, memo } from 'react';
import { EventContext } from '@/components/event-context';
import { EEventAction, EEventType, IEventTarget } from '@/types';
import type { IBaseElement } from '@/types';
import {
  handleEmitEvent,
  type TEventFormatFunctions,
} from '@/utils/handle-emit-event';
import { handleOnEvent } from '@/utils/handle-on-event';

export * from '@/utils/handle-emit-event';

interface IRegisterEvents {
  (element: IBaseElement): any;
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { emitter } = useContext(EventContext);
  const { customEvents, id } = element;
  const [eventFunctions, setFunctions] = useState<TEventFormatFunctions>({});

  useEffect(() => {
    emitter.on(id!, handleOnEvent);
    return () => {
      emitter.off(id!, handleOnEvent);
    };
  }, [id, emitter]);

  useEffect(() => {
    if (!customEvents?.length) return;
    const functions = handleEmitEvent(emitter, customEvents);
    setFunctions(functions);
  }, [customEvents, emitter]);

  return { eventFunctions };
};
