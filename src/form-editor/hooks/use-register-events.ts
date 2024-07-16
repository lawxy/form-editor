import { useRef, useEffect } from 'react';
import type { IBaseElement } from '@/types';
import {
  handleEmitEvent,
  handleOnEvent,
  type TEventFormatFunctions,
} from '@/utils';
import { useForceRender, useFormEffect } from '.';
import eventStore from '@/store/eventStore';

export * from '@/utils/handle-emit-event';

interface IRegisterEvents {
  (element: Pick<IBaseElement, 'id' | 'events'>): any;
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { events, id } = element;
  const eventFunctions = useRef<TEventFormatFunctions>({});
  const forceRender = useForceRender();

  useFormEffect(() => {
    if (!id) return;
    eventStore.emitter.on(id!, handleOnEvent);
    return () => {
      eventStore.emitter.off(id!, handleOnEvent);
    };
  }, [id]);

  useEffect(() => {
    if (!events?.length) return;
    const functions = handleEmitEvent(eventStore.emitter, events);
    eventFunctions.current = functions;
    forceRender();
  }, [events]);

  return { eventFunctions: eventFunctions.current };
};
