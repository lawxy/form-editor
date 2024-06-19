import { Emitter } from '@/components/event-context';
import { EEventType, EChangeStatePayload } from '@/types';
import store from '@/store';
import { triggerService } from './trigger-service';
import type { TEventFunctions, TEmitData } from './handle-emit-event';

// 设置组件值
export const triggerSettingValue = (params: TEmitData) => {
  const { setValue, value, targetPayload, targetElementId } = params;
  if (targetPayload === EChangeStatePayload.SYNC) {
    store.setFieldValue(targetElementId!, value);
  } else {
    store.setFieldValue(targetElementId!, setValue);
  }
};
// 刷新服务
export const triggerRefreshService = (params: TEmitData) => {
  const { targetServiceId, eventType, updateField, targetPayload, value } =
    params;

  triggerService(targetServiceId!, {})
};

export const handleOnEvent = (params: TEmitData) => {
  const { eventType } = params;
  switch (eventType) {
    case EEventType.SETTING_VALUE:
      triggerSettingValue(params);
      break;
    case EEventType.REFRESH_SERVICE:
      triggerRefreshService(params);
      break;
  }
};
