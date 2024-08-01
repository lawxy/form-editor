import { observer } from 'mobx-react-lite';
import type { TDragElement } from '@/types';

export const wrapObserver = (elements: TDragElement, custom?: boolean) => {
  Object.values(elements).forEach((element) => {
    element.render = observer(element.render);
    if (custom) {
      Reflect.defineMetadata('custom', true, element);
    }
  });
};
