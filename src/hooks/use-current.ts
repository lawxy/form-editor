import store from '@/store';

export const useCurrent = (type: 'element' | 'form') => {
  if (type === 'element') {
    return {
      current: store.selectedElement,
      setProp: store.setSelectedProp as any,
    };
  }
  return {
    current: store.formAttrs,
    setProp: store.setFormAttr as any,
  };
};
