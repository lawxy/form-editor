import { type TCustomEvent, type TFormSerive, EEventType } from '@/types';
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
    } else {
      if (linkingElements && linkingElements.length) {
        const idx = linkingElements.findIndex((item) => item.id === sourceId);
        if (idx > -1) {
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
