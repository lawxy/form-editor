import { Emitter } from '@/components';
import { cloneDeep } from 'lodash-es';
import {
  EEventType,
  EChangeStatePayload,
  TFormSerive,
  ELinkRefreshField,
} from '@/types';
import store from '@/store';
import { triggerService, appendUrl } from './trigger-service';
import type { TEmitData } from './handle-emit-event';
import { validateParams } from '.';

// 设置组件值
export const triggerSettingValue = (params: TEmitData) => {
  const { setValue, value, targetPayload, targetElementId } = params;
  if (!store.getElement(targetElementId!)) return;
  if (targetPayload === EChangeStatePayload.SYNC) {
    store.setFieldValue(targetElementId!, value);
  } else {
    store.setFieldValue(targetElementId!, setValue);
  }
};

// 刷新服务
export const triggerRefreshService = async (params: TEmitData) => {
  const { targetServiceId, updateField, targetPayload, value, refreshFlag } =
    params;

  const servId = targetServiceId!;
  const currentService = store.getService(servId) as TFormSerive;
  // 拼接参数
  if (targetPayload === EChangeStatePayload.APPEND) {
    const { url } = currentService;
    const newUrl = appendUrl(url, { [updateField!]: value });
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
    const serviceRes: any = await triggerService(targetServiceId!);
    // 触发关联服务
    const { linkingElements } = currentService;
    linkingElements?.forEach((item) => {
      const { id, field } = item;
      const element = store.getElement(id);
      if (!element || !field) return;
      if (field === ELinkRefreshField.VALUEOPTIONS) {
        store.setElementProp(id, ELinkRefreshField.VALUEOPTIONS, serviceRes);
      } else {
        store.setFieldValue(id, serviceRes);
      }
    });
  }
};

export const handleOnEvent = (params: TEmitData) => {
  const { eventType } = params;
  switch (eventType) {
    case EEventType.SETTING_VALUE:
      triggerSettingValue(params);
      break;
    case EEventType.UPDATE_SERVICE:
      triggerRefreshService(params);
      break;
  }
};
