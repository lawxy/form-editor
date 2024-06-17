import { Emitter } from '@/components/event-context';
import { EEventType, EChangeStatePayload } from '@/types';
import store from '@/store';
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

export const handleOnEvent = (params: TEmitData) => {
  const { eventType } = params;
  switch (eventType) {
    case EEventType.SETTING_VALUE:
      triggerSettingValue(params);
      break;
  }
};
