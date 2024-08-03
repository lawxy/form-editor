import { observer } from 'mobx-react-lite';
import type { TDragElement, TDragElementObject, IDragElementProp } from '@/types';


export const wrapObserver = (elements: TDragElement, custom?: boolean) => {
  if (Array.isArray(elements)) {
    elements = elements.reduce((memo: TDragElementObject, el: IDragElementProp) => {
      memo[el.type] = el
      return memo
    }, {})
  }
  Object.values(elements).forEach((element) => {
    element.render = observer(element.render);
    element.setting = observer(element.setting)
    if (custom) {
      Reflect.defineMetadata('custom', true, element);
    }
  });
  return elements
};
