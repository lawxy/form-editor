import { cloneDeep } from 'lodash-es';
import { EEventType } from '@/types';
import type { TCustomEvent, TFormSerive, TLinkElement } from '@/types';
import eventStore from '@/store/eventStore';
import { dynamicGetStore } from '.';

const handleDealService = (type: 'link' | 'unlink', event: TCustomEvent) => {
  const { eventTargets, eventType } = event;
  if (eventType !== EEventType.LINK_SERVICE) return;

  const store = dynamicGetStore();

  eventTargets?.forEach((target) => {
    const {
      targetServiceId,
      sourceId,
      linkRefreshType,
      getFieldFromService,
      customRefreshField,
    } = target;
    if (!targetServiceId || !store.getService(targetServiceId!)) return;
    const service = store.getService(targetServiceId) as TFormSerive;
    const { linkingElements } = service;
    // 关联
    if (type === 'link') {
      const linkData = {
        id: sourceId,
        linkRefreshType,
        getFieldFromService,
        customRefreshField,
      };
      if (!linkingElements) {
        store.setService(targetServiceId, { linkingElements: [linkData] });
      } else {
        linkingElements.push(linkData);
        store.setService(targetServiceId, { linkingElements });
      }
      bindService(sourceId, targetServiceId);
    } else {
      // 取消关联
      if (linkingElements && linkingElements.length) {
        const idx = linkingElements.findIndex((item) => item.id === sourceId);
        if (idx > -1) {
          unBindService(linkingElements[idx].id, targetServiceId);
          linkingElements.splice(idx, 1);
          store.setService(targetServiceId, { linkingElements });
        }
      }
    }
  });
};

// 事件 - 处理关联服务的数据
export const handleLinkService = (event: TCustomEvent) => {
  handleDealService('link', event);
};

// 事件 - 解除关联数据
export const handleUnLinkService = (event: TCustomEvent) => {
  handleDealService('unlink', event);
};

const getServicesFromElement = (elId: string): string[] => {
  const store = dynamicGetStore();

  const element = store.getElement(elId);
  const { linkServices } = element;
  return linkServices ?? [];
};

const getElementFromService = (servId: string): TLinkElement[] => {
  const store = dynamicGetStore();

  const service = store.getService(servId);
  return service?.linkingElements ?? [];
};

export const bindService = (elId: string, serviceId: string) => {
  const store = dynamicGetStore();

  const services = getServicesFromElement(elId);
  // console.log('services', services)
  if (services.indexOf(serviceId) > -1) return;
  services.push(serviceId);
  store.setElementProp(elId, 'linkServices', services);
};

export const unBindService = (elId: string, serviceId: string) => {
  const store = dynamicGetStore();

  const services = getServicesFromElement(elId);
  const idx = services.findIndex((serv) => serv === serviceId);
  if (idx === -1) return;
  services.splice(idx, 1);
  store.setElementProp(elId, 'linkServices', services);
};
// 删除元素 解绑服务
export const unBindFromElement = (elId: string) => {
  const store = dynamicGetStore();

  const services = getServicesFromElement(elId);
  services.forEach((servId) => {
    const linkingElements = cloneDeep(getElementFromService(servId));
    const idx = linkingElements.findIndex((el) => el.id === elId);
    if (idx === -1) return;
    linkingElements.splice(idx, 1);
    store.setService(servId, { linkingElements });
  });
};

export const unBindFromService = (servId: string) => {
  const elements = getElementFromService(servId);
  elements.forEach((el) => {
    unBindService(el.id, servId);
  });
};

// 复制元素 关联服务
export const bindFromCopiedElement = (oldId: string, newId: string) => {
  const services = getServicesFromElement(oldId);
  const store = dynamicGetStore();

  services.forEach((servId) => {
    const linkingElements = cloneDeep(getElementFromService(servId));
    const linkData = linkingElements.find((el) => el.id === oldId);
    linkingElements.push({ ...linkData, id: newId });
    store.setService(servId, { linkingElements });
  });
};
