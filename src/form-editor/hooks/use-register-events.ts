import { useEffect, useRef } from 'react';
import { useEventContext } from '@/components';
import type { IBaseElement } from '@/types';
import {
  handleEmitEvent,
  handleOnEvent,
  type TEventFormatFunctions,
} from '@/utils';
import { useForceRender } from '.';

export * from '@/utils/handle-emit-event';

interface IRegisterEvents {
  (element: Pick<IBaseElement, 'id' | 'events'>): any;
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { emitter } = useEventContext();
  const { events, id } = element;
  const eventFunctions = useRef<TEventFormatFunctions>({});
  const forceRender = useForceRender();

  useEffect(() => {
    emitter.on(id!, handleOnEvent);
    return () => {
      emitter.off(id!, handleOnEvent);
    };
  }, [id, emitter]);

  useEffect(() => {
    if (!events?.length) return;
    const functions = handleEmitEvent(emitter, events);
    eventFunctions.current = functions;
    forceRender();
  }, [events, emitter]);

  return { eventFunctions: eventFunctions.current };
};
