import React, { useCallback, useRef, type PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import store, { tabStore } from '@/store';
import type { IBaseElement, TCustomEvents, TMode } from '@/types';
import { useDesignEffect } from '@/hooks';
import eventStore from '@/store/eventStore';
import { SelectedActions } from './selected-actions';
import { DesignWrapDiv, Mask, Icon } from './styled';
import { CONTAINERS } from '@/const';

const EventIcon: React.FC<{
  events?: TCustomEvents;
}> = observer(({ events }) => {
  if (!events?.length) return null;

  const validate = events.every((event) => {
    const { eventTargets } = event;
    if (!eventTargets?.length) return true;
    return eventTargets.every((target) => {
      const { targetElementId, targetServiceId } = target;
      if (!targetElementId && !targetServiceId) return true;
      if (targetElementId) return !!store.getElement(targetElementId);
      if (targetServiceId) return !!store.getService(targetServiceId);
      return true;
    });
  });

  return <Icon validate={validate} />;
});

const WrapDesignEl: React.FC<
  PropsWithChildren<{
    el: IBaseElement;
  }>
> = observer(({ children, el }) => {
  const ref = useRef<HTMLDivElement>(null);

  useDesignEffect(() => {
    eventStore.iterateEl(el);
  }, [el.events]);

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
        hide={CONTAINERS.includes(el.type!)}
      />
      {store.selectedElement?.id === el.id && <SelectedActions />}
      {children}
      <EventIcon events={el.events} />
    </DesignWrapDiv>
  );
});

export const WrapEl: React.FC<
  PropsWithChildren<{
    el: IBaseElement;
    mode: TMode;
  }>
> = ({ children, el, mode }) => {
  if (mode !== 'design') return <>{children}</>;

  return <WrapDesignEl el={el}>{children}</WrapDesignEl>;
};
