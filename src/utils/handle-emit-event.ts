import {
  EEventAction,
  EEventType,
  IEventTarget,
  TCustomEvent,
  TCustomEvents,
  EValidateType,
  eventActionInChinese,
  eventTypeChinese,
  EDelay,
} from '@/types';
import { EventEmitter, getValueFromInput, dynamicGetStore } from '@/utils';
import { validateParams, asyncDebounce, asyncThrottle } from '.';
interface IParams {
  emitter: EventEmitter;
  eventType: EEventType;
  target: IEventTarget;
}

export interface IEventFunction {
  (v?: any): Promise<void>;
  sourceId: string;
  series?: boolean;
  eventType: EEventType;
}

export type TEventFunctions = {
  [key in EEventAction]?: Array<IEventFunction>;
};

export type TEventFormatFunctions = {
  [key in EEventAction]?: IEventFunction;
};

export type TEmitData = Partial<IEventTarget> & {
  eventType: EEventType;
  value?: any;
};

const withConfig = (fn: (v: IParams) => Promise<any>, target: IEventTarget) => {
  const { series, delayTime, delayType, sourceId } = target;
  if (delayType === EDelay.DEBOUNCE && delayTime) {
    fn = asyncDebounce(fn, delayTime);
  }
  if (delayType === EDelay.THROTTLE && delayTime) {
    fn = asyncThrottle(fn, delayTime);
  }
  Object.assign(fn, { series, sourceId });
  return fn;
};

// 设置组件值
export const emitSettingValue = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetElementId, setValue, targetPayload } = target;
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

// 更新服务
export const emitRefreshService = (params: IParams) => {
  const { emitter, eventType, target } = params;
  const { targetServiceId, targetPayload, refreshFlag, updateField, urlAppended } = target;
  console.log('targetPayload', targetPayload)
  const validate = validateParams([targetServiceId, targetPayload]);
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
        urlAppended
      } as TEmitData),
    target,
  );
};

// 表单校验
export const emitValidateForm = (params: IParams) => {
  const store = dynamicGetStore();

  const { target } = params;
  const { validateField, sourceId } = target;
  const fields =
    validateField === EValidateType.CURRENT ? [sourceId] : undefined;

  return withConfig(
    () => store.formInstance?.validateFields(fields) as Promise<any>,
    target,
  );
};

// 跳转链接
export const emitJumpUrl = (params: IParams) => {
  const { target } = params;
  const { jumpUrl } = target;
  const validate = validateParams([jumpUrl]);
  if (!validate) return;

  return withConfig(async () => {
    if (jumpUrl?.startsWith('http')) {
      window.location.href = jumpUrl;
    } else {
      window.location.href = `${window.location.origin}${jumpUrl!}`;
    }
  }, target);
};

const handleError = ({
  emitFn,
  error,
  action,
}: {
  emitFn: IEventFunction;
  error: any;
  action: EEventAction;
}) => {
  const { sourceId, eventType } = emitFn;
  const store = dynamicGetStore();
  const el = store.getElement(sourceId);
  console.log(`
    事件报错:\n 
    组件: ${el.elementName ?? sourceId}\n 
    事件动作: ${eventActionInChinese[action as EEventAction]} - ${
    eventTypeChinese[eventType]
  } \n
    错误返回: ${JSON.stringify(error)}`);
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
      let emitFn: IEventFunction | undefined;
      switch (eventType) {
        case EEventType.SETTING_VALUE:
          emitFn = emitSettingValue(params) as IEventFunction;
          break;
        case EEventType.UPDATE_SERVICE:
          emitFn = emitRefreshService(params) as IEventFunction;
          break;
        case EEventType.VALIDATE:
          emitFn = emitValidateForm(params) as IEventFunction;
          break;
        case EEventType.JMUP:
          emitFn = emitJumpUrl(params) as IEventFunction;
          break;
      }

      if (!emitFn) return;
      Object.assign(emitFn, { eventType });
      if (functions[eventAction!]) {
        functions[eventAction!]?.push(emitFn);
      } else {
        functions[eventAction!] = [emitFn];
      }
    });
  });

  const formatFunctions: TEventFormatFunctions = Object.entries(
    functions,
  ).reduce((memo: TEventFormatFunctions, [action, emitFns]: any) => {
    // @ts-ignore
    memo[action] = async (v: any) => {
      for (let i = 0; i < emitFns.length; i++) {
        const emitFn: any = emitFns[i];
        try {
          if (emitFn?.series) {
            await emitFn?.(v);
          } else {
            emitFn(v)?.catch((e: any) => {
              handleError({
                emitFn,
                error: e,
                action,
              });
            });
          }
        } catch (e) {
          return handleError({
            emitFn,
            error: e,
            action,
          });
        }
      }
    };

    return memo;
  }, {});

  return formatFunctions;
};
