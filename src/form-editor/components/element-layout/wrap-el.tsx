import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef, type PropsWithChildren } from 'react';
import store, { tabStore } from '@/store';
import type { IBaseElement, TMode } from '@/types';
import { SelectedActions } from './selected-actions';
import { DesignWrapDiv, Mask } from './styled';

const WrapDesignEl: React.FC<PropsWithChildren<{
  el: IBaseElement;
}>> = observer(({ children, el }) => {

  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {
    store.setSelectedElement(el);
    tabStore.init();
  }, [el]);

  return (
    <DesignWrapDiv
      selected={store.selectedElement?.id === el.id}
      onMouseDownCapture={handleSelect}
      ref={ref}
    >
      <Mask
        horizontal={store.formAttrs.horizontalGap + 2}
        vertical={store.formAttrs.verticalGap + 2}
      />
      {store.selectedElement?.id === el.id && <SelectedActions />}
      {children}
    </DesignWrapDiv>
  );
});

export const WrapEl: React.FC<PropsWithChildren<{
  el: IBaseElement;
  mode: TMode;
}>> = ({ children, el, mode }) => {
  if(mode !== 'design') return <>{children}</>

  return <WrapDesignEl el={el}>{children}</WrapDesignEl>
};
