import { type TCustomEvent, type TFormSerive, EEventType } from '@/types';
import store from '@/store';

const handleDealService = (type: 'link' | 'unlink', event: TCustomEvent) => {
  const { eventTargets, eventType } = event;
  if (eventType !== EEventType.LINK_SERVICE) return;

  eventTargets?.forEach((target) => {
    const { targetServiceId, sourceElementId, linkRefreshField } = target;
    if (!targetServiceId) return;
    if (!store.hasService(targetServiceId!)) return;
    const service = store.getService(targetServiceId) as TFormSerive;
    const { linkingElements } = service;
    if (type === 'link') {
      const linkData = { id: sourceElementId, field: linkRefreshField };
      if (!linkingElements) {
        store.setService(targetServiceId, { linkingElements: [linkData] });
      } else {
        linkingElements.push(linkData);
        store.setService(targetServiceId, { linkingElements });
      }
    } else {
      if (linkingElements && linkingElements.length) {
        const idx = linkingElements.findIndex(
          (item) => item.id === sourceElementId,
        );
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
