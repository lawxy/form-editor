import React from 'react';
import { observer } from 'mobx-react-lite';
import { TabsSetting, EventSetting } from '@/components';
import store from '@/store';
import { useEditorContext } from '@/context';

const ElementSetting = () => {
  const { ElementsMap } = useEditorContext();
  if (!store.selectedElement?.id) return null;

  const { setting: Component, eventActions } =
    ElementsMap[store.selectedElement.type!];

  return store.selectedElement?.id ? (
    <TabsSetting
      attributes={<Component element={store.selectedElement} setElementProp={store.setSelectedProp} />}
      events={<EventSetting eventActions={eventActions} type="element" />}
    />
  ) : null;
};

export default observer(ElementSetting);
