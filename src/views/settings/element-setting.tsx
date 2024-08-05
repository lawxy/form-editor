import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { TabsSetting, EventSetting } from '@/components';
import store from '@/store';
import { useEditorContext } from '@/context';

const ElementSetting = () => {
  const { ElementsMap } = useEditorContext();

  const setFieldValue = useCallback(
    (value: any) => {
      if (!store.selectedElement?.id) return null;
      store.setFieldValue(store.selectedElement.id, value);
    },
    [store.selectedElement.id],
  );

  if (!store.selectedElement?.id) return null;
  const { setting: Component, eventActions } =
    ElementsMap[store.selectedElement.type!];
  return store.selectedElement?.id ? (
    <TabsSetting
      attributes={
        <Component
          element={store.selectedElement}
          setElementProp={store.setSelectedProp}
          setFieldValue={setFieldValue}
        />
      }
      events={<EventSetting eventActions={eventActions} type="element" />}
    />
  ) : null;
};

export default observer(ElementSetting);
