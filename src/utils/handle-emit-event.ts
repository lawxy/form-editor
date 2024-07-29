import { message } from 'antd';
import { debounce, throttle } from 'lodash-es';
import {
  EEventAction,
  EEventType,
  IEventTarget,
  TCustomEvent,
  TCustomEvents,
  EValidateType,
  eventActionInChinese,
  EDelay,
} from '@/types';
import { EventEmitter, getValueFromInput, dynamicGetStore } from '@/utils';
import { validateParams } from '.';
interface IParams {
  emitter: EventEmitter;
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

const withSeries = (fn: (v: IParams) => Promise<any>, series?: boolean) => {
  Object.assign(fn, { series });
  return fn;
};

const debounceProsify = (fn, wait) => {
  const debouncedFunc = debounce(async (...args) => {
    await fn(...args);
  }, wait);

  return (...args) =>
    new Promise((resolve) => debouncedFunc(...args)?.then(resolve));
};

const throttleProsify = (fn, wait) => {
  const throttledFunc = throttle(async (...args) => {
    await fn(...args);
  }, wait);

  return (...args) =>
    new Promise((resolve) => throttledFunc(...args)?.then(resolve));
};

const withConfig = (fn: (v: IParams) => Promise<any>, target: IEventTarget) => {
  const { series, delayTime, delayType } = target;
  if (delayType === EDelay.DEBOUNCE && delayTime) {
    fn = debounceProsify(fn, delayTime);
  }
  if (delayType === EDelay.THROTTLE && delayTime) {
    fn = throttleProsify(fn, delayTime);
  }
  Object.assign(fn, { series });
  return fn;
};

// 设置组件值
export const emitSettingValue = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetElementId, setValue, targetPayload, series } = target;
  const validate = validateParams([targetElementId, targetPayload]);
  if (!validate) return;

  return withConfig(
    async (value: any) =>
      await emitter.emit(targetElementId!, {
        targetElementId,
        eventType,
        setValue: getValueFromInput(setValue),
        targetPayload,
        value,
      } as TEmitData),
    target,
  );
};

// 刷新服务
export const emitRefreshService = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetServiceId, targetPayload, refreshFlag, updateField, series } =
    target;
  const validate = validateParams([
    targetServiceId,
    targetPayload,
    refreshFlag,
  ]);
  if (!validate) return;
  const store = dynamicGetStore();

  if (!store.getService(targetServiceId!)) return;

  return withConfig(
    async (value: any) =>
      await emitter.emit(targetServiceId!, {
        targetServiceId,
        eventType,
        updateField,
        targetPayload,
        value,
        refreshFlag,
      } as TEmitData),
    target,
  );
};

// 表单校验
export const emitValidateForm = (params: IParams) => {
  const store = dynamicGetStore();

  const { target } = params;
  const { validateField, sourceId, series } = target;
  const fields =
    validateField === EValidateType.CURRENT ? [sourceId] : undefined;
  /**
   * 为什么直接返回 async () => await validateFn(fields) 每次校验报错都会重新加载umi.js
   * 仅开发环境会这样？测试umi框架也会这样，只要validateFields方法通过await接收，就会重新加载umi.js
   * */

  return withConfig(
    () => store.formInstance?.validateFields(fields) as Promise<any>,
    target,
  );
};

export const handleEmitEvent = (
  emitter: EventEmitter,
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
    memo[action] = async (v: any) => {
      for (let i = 0; i < emitFns.length; i++) {
        const fn: any = emitFns[i];
        try {
          if (fn?.series) {
            await fn?.(v);
          } else {
            fn(v);
          }
        } catch (e) {
          console.log(e);
          return message.error(
            `${eventActionInChinese[action as EEventAction]}事件报错`,
          );
        }
      }
    };

    return memo;
  }, {});

  return formatFunctions;
};
