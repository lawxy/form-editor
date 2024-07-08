import { cloneDeep } from 'lodash-es';
import { EEventType } from '@/types';
import type { TCustomEvent, TFormSerive, TLinkElement } from '@/types';
import store from '@/store';

const handleDealService = (type: 'link' | 'unlink', event: TCustomEvent) => {
  const { eventTargets, eventType } = event;
  if (eventType !== EEventType.LINK_SERVICE) return;

  eventTargets?.forEach((target) => {
    const { targetServiceId, sourceId, linkRefreshField, getFieldFromService } =
      target;
    if (!targetServiceId || !store.getService(targetServiceId!)) return;
    const service = store.getService(targetServiceId) as TFormSerive;
    const { linkingElements } = service;
    // 关联
    if (type === 'link') {
      const linkData = {
        id: sourceId,
        field: linkRefreshField,
        getFieldFromService,
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

// 处理关联服务的数据
export const handleLinkService = (event: TCustomEvent) => {
  handleDealService('link', event);
};

// 解除关联数据
export const handleUnLinkService = (event: TCustomEvent) => {
  handleDealService('unlink', event);
};

const getServicesFromElement = (elId: string): string[] => {
  const element = store.getElement(elId);
  const { linkServices } = element;
  return linkServices ?? [];
};

const getElementFromService = (servId: string): TLinkElement[] => {
  const service = store.getService(servId);
  return service?.linkingElements ?? [];
};

export const bindService = (elId: string, serviceId: string) => {
  const services = getServicesFromElement(elId);
  if (services.indexOf(serviceId) > -1) return;
  services.push(serviceId);
  store.setElementProp(elId, 'linkServices', services);
};

export const unBindService = (elId: string, serviceId: string) => {
  const services = getServicesFromElement(elId);
  const idx = services.findIndex((serv) => serv === serviceId);
  if (idx === -1) return;
  services.splice(idx, 1);
  store.setElementProp(elId, 'linkServices', services);
};
// 删除元素 通过id操作关联服务的linkingElements
export const unBindFromElement = (elId: string) => {
  const services = getServicesFromElement(elId);
  services.forEach((servId) => {
    const linkingElements = cloneDeep(getElementFromService(servId));
    const idx = linkingElements.findIndex((el) => el.id === elId);
    if (idx === -1) return;
    linkingElements.splice(idx, 1);
    store.setService(servId, { linkingElements });
  });
};

// export const copyServices = ()
