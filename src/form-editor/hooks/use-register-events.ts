import { useEffect, useContext, useState, useRef } from 'react';
import { EventContext } from '@/components/event-context';
import { EEventAction, EEventType, IEventTarget } from '@/types';
import type { IBaseElement } from '@/types';
import {
  handleEmitEvent,
  handleOnEvent,
  type TEmitData,
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
    const emitterOnEvent = (params: TEmitData) =>
      handleOnEvent(params, emitter);
    emitter.on(id!, emitterOnEvent);
    return () => {
      emitter.off(id!, emitterOnEvent);
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
