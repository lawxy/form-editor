import { idCreator } from '@/utils';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef, useState } from 'react';
import store from '../../../store';
import type { IBaseElement } from '../../../types';
import { SelectedActions } from './selected-actions';
import { DesignWrapDiv, HoverLine, Mask } from './styled';

export const WrapEl: React.FC<{
  el: IBaseElement;
  children: React.ReactNode;
  isVirtual?: boolean;
}> = observer(({ children, el, isVirtual }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {
    store.setSelectedElement(el);
    store.setFormSettingTab('element');
  }, [el]);

  return (
    <DesignWrapDiv
      selected={store.selectedElement?.id === el.id}
      onMouseDownCapture={handleSelect}
      isVirtual={!!isVirtual}
      // style={{width: `${el.widthPercent}%`}}
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
