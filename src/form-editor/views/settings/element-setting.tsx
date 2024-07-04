import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { TabsSetting } from '@/components';
import { EventSetting } from '@/components';
import { ElementsList } from '@/elements';
import store from '@/store';

const ElementSetting = () => {
  if (!store.selectedElement?.id) return null;

  const { setting: Component, eventActions } =
    ElementsList[store.selectedElement.type!];

  return store.selectedElement?.id ? (
    <TabsSetting
      attributes={<Component />}
      events={<EventSetting eventActions={eventActions} type='element'/>}
    />
  ) : null;
};

export default observer(ElementSetting);
