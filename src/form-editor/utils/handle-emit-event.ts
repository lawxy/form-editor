import { isNil } from 'lodash-es';
import {
  EEventAction,
  EEventType,
  IEventTarget,
  TCustomEvent,
  TCustomEvents,
} from '@/types';
import { Emitter } from '@/components/event-context';
import store from '@/store';

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

const validateParams = (values: any[]) =>
  values.every((value) => !isNil(value));

// 设置组件值
export const emitSettingValue = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetElementId, setValue, targetPayload } = target;
  const validate = validateParams([targetElementId, targetPayload]);
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

// 刷新服务
export const emitRefreshService = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetServiceId, targetPayload, refreshFlag, updateField } = target;
  const validate = validateParams([
    targetServiceId,
    targetPayload,
    refreshFlag,
  ]);
  if (!validate) return;
  if(!store.hasService(targetServiceId!)) return;
  return (value: any) => {
    emitter.emit(targetServiceId!, {
      targetServiceId,
      eventType,
      updateField,
      targetPayload,
      value,
      refreshFlag,
    } as TEmitData);
  };
};

// 关联服务
// export const emitLinkService = (params: IParams) => {
//   const { emitter, eventType, target } = params;
//   const { targetServiceId, sourceElementId } = target;
//   const validate = validateParams([targetServiceId]);
//   if (!validate) return;
//   return () => {
//     emitter.emit(targetServiceId!, {
//       targetServiceId,
//       eventType,
//       sourceElementId,
//     } as TEmitData);
//   };
// };

export const handleEmitEvent = (
  emitter: Emitter,
  events: TCustomEvents,
): TEventFormatFunctions => {
  const functions: TEventFunctions = {};
  events.forEach((event: TCustomEvent) => {
    const { eventAction, eventType, eventTargets } = event;
    eventTargets?.forEach((target) => {
      const params = { emitter, eventType, target } as IParams;
      let emitFn: TEventFunction | undefined;
      switch (eventType) {
        case EEventType.SETTING_VALUE:
          emitFn = emitSettingValue(params);
          break;
        case EEventType.REFRESH_SERVICE:
          emitFn = emitRefreshService(params);
          break;
        // case EEventType.LINK_SERVICE:
        //   emitFn = emitLinkService(params);
        //   break;
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
