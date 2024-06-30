import { useEffect, useContext, useRef } from 'react';
import { EventContext } from '@/components';
import type { IBaseElement } from '@/types';
import {
  handleEmitEvent,
  handleOnEvent,
  type TEventFormatFunctions,
} from '@/utils';
import { useForceRender } from '.';

export * from '@/utils/handle-emit-event';

interface IRegisterEvents {
  (element: IBaseElement): any;
}

export const useRegisterEvents: IRegisterEvents = (element) => {
  const { emitter } = useContext(EventContext);
  const { customEvents, id } = element;
  const eventFunctions = useRef<TEventFormatFunctions>({});
  const forceRender = useForceRender();

  useEffect(() => {
    emitter.on(id!, handleOnEvent);
    return () => {
      emitter.off(id!, handleOnEvent);
    };
  }, [id, emitter]);

  useEffect(() => {
    if (!customEvents?.length) return;
    const functions = handleEmitEvent(emitter, customEvents);
    eventFunctions.current = functions;
    forceRender();
  }, [customEvents, emitter]);

  return { eventFunctions: eventFunctions.current };
};
