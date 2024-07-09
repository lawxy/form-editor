import {
  EEventAction,
  EEventType,
  IEventTarget,
  TCustomEvent,
  TCustomEvents,
  EValidateType
} from '@/types';
import { Emitter } from '@/components';
import store from '@/store';
import { validateParams } from '.';

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
  if (!store.getService(targetServiceId!)) return;
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

// 表单校验
export const emitValidateForm = (params: IParams) => {
  const { target } = params;
  const { validateField, sourceId } = target;
  const fields = validateField === EValidateType.CURRENT ? [sourceId] : undefined;
  return () => store.formInstance?.validateFields(fields);
};

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
        case EEventType.UPDATE_SERVICE:
          emitFn = emitRefreshService(params);
          break;
        case EEventType.VALIDATE:
          emitFn = emitValidateForm(params);
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
