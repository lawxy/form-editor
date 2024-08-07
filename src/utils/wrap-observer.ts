import { observer } from 'mobx-react-lite';
import type {
  TDragElement,
  TDragElementObject,
  IDragElementProp,
} from '@/types';
import { hasObservered } from '@/utils'

export const wrapObserver = (elements: TDragElement, custom?: boolean) => {
  if (Array.isArray(elements)) {
    elements = elements.reduce(
      (memo: TDragElementObject, el: IDragElementProp) => {
        memo[el.type] = el;
        return memo;
      },
      {},
    );
  }
  Object.values(elements).forEach((element) => {
    if(!hasObservered(element.render)){
      element.render = observer(element.render);
    }
    if(!hasObservered(element.setting)){
      element.setting = observer(element.setting);
    }
    if (custom) {
      Reflect.defineMetadata('custom', true, element);
    }
  });
  return elements;
};
