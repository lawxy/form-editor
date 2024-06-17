import { isNil } from 'lodash-es';
import {
  EEventAction,
  EEventType,
  IEventTarget,
  CustomEvent,
  CustomEvents,
} from '@/types';
import { Emitter } from '@/components/event-context';

interface IParams {
  emitter: Emitter;
  eventType: EEventType;
  target: IEventTarget;
}

export type TEventFunction = (v?: any) => void;

export type TEventFunctions = {
  [key in EEventAction]?: Array<TEventFunction>;
};

export type TEventFormatFunctions = {
  [key in EEventAction]?: TEventFunction;
};

export type TEmitData = Partial<IEventTarget> & {
  eventType: EEventType;
  value?: any;
};

const validateValues = (values: any[]) =>
  values.every((value) => !isNil(value));

// 设置组件值
export const emitSettingValue = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetElementId, setValue, targetPayload } = target;
  const validate = validateValues([targetElementId, targetPayload]);
  if (!validate) return;
  return (value: any) => {
    emitter.emit(targetElementId!, {
      targetElementId,
      eventType,
      setValue,
      targetPayload,
      value,
    } as TEmitData);
  };
};

export const handleEmitEvent = (
  emitter: Emitter,
  events: CustomEvents,
): TEventFormatFunctions => {
  const functions: TEventFunctions = {};
  events.forEach((event: CustomEvent) => {
    const { eventAction, eventType, eventTargets } = event;
    eventTargets?.forEach((target) => {
      const params = { emitter, eventType, target } as IParams;
      let emitFn: TEventFunction | undefined;
      switch (eventType) {
        case EEventType.SETTING_VALUE:
          emitFn = emitSettingValue(params);
          break;
      }

      if (!emitFn) return;
      if (functions[eventAction!]) {
        functions[eventAction!]?.push(emitFn);
      } else {
        functions[eventAction!] = [emitFn];
      }
    });
  });

  const formatFunctions: TEventFormatFunctions = Object.entries(
    functions,
  ).reduce((memo: TEventFormatFunctions, [action, emitFns]) => {
    // @ts-ignore
    memo[action] = (v: any) => emitFns.forEach((fn) => fn?.(v));
    return memo;
  }, {});

  return formatFunctions;
};
