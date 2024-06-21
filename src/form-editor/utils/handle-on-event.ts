import { Emitter } from '@/components/event-context';
import { cloneDeep } from 'lodash-es';
import { EEventType, EChangeStatePayload, TFormSerive } from '@/types';
import store from '@/store';
import {
  triggerService,
  toSearchString,
  appendUrl,
  type IServiceParams,
} from './trigger-service';
import type { TEventFunctions, TEmitData } from './handle-emit-event';

// 设置组件值
export const triggerSettingValue = (params: TEmitData) => {
  const { setValue, value, targetPayload, targetElementId } = params;
  if (!store.hasElement(targetElementId!)) return;
  if (targetPayload === EChangeStatePayload.SYNC) {
    store.setFieldValue(targetElementId!, value);
  } else {
    store.setFieldValue(targetElementId!, setValue);
  }
};

// 刷新服务
export const triggerRefreshService = async (
  params: TEmitData,
  emitter: Emitter,
) => {
  const {
    targetServiceId,
    eventType,
    updateField,
    targetPayload,
    value,
    refreshFlag,
  } = params;

  const servId = targetServiceId!;
  const currentService = store.getService(servId) as TFormSerive;
  // console.log('currentService')
  // console.log(JSON.stringify(currentService))
  // 拼接参数
  if (targetPayload === EChangeStatePayload.APPEND) {
    const { url } = currentService;
    const newUrl = appendUrl(url, { [updateField!]: value });
    // console.log('newUrl', newUrl)
    store.setService(servId, { url: newUrl });
  }
  // 更新参数
  if (targetPayload === EChangeStatePayload.UPDATE) {
    const { data = {} } = currentService;
    const newData = cloneDeep(data);
    newData[updateField!] = value;
    store.setService(servId, { data: newData });
  }
  // 清空参数
  if (targetPayload === EChangeStatePayload.CLEAR) {
    store.setService(servId, { data: {} });
  }

  // 刷新服务
  if (refreshFlag) {
    const serviceRes = await triggerService(targetServiceId!);
    const { linkingElements } = currentService;
    linkingElements?.forEach((elId) => {
      if (!store.hasElement(elId)) return;
      store.setFieldValue(elId, serviceRes);
    });
  }
};

// 关联服务
// export const triggerLinkService = (params: TEmitData) => {
// };

export const handleOnEvent = (params: TEmitData, emitter: Emitter) => {
  const { eventType } = params;
  switch (eventType) {
    case EEventType.SETTING_VALUE:
      triggerSettingValue(params);
      break;
    case EEventType.REFRESH_SERVICE:
      triggerRefreshService(params, emitter);
      break;
  }
};
