import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { CommonTabsSetting } from '@/components/common-tabs-setting';
import EventSettingCommon from '@/components/event-setting-common';
import { ElementsList } from '@/elements';
import store from '@/store';

const ElementSetting = () => {
  if (!store.selectedElement?.id) return null;

  const { setting: Component, eventActions } =
    ElementsList[store.selectedElement.type!];

  return store.selectedElement?.id ? (
    <CommonTabsSetting
      attributes={<Component />}
      events={<EventSettingCommon eventActions={eventActions} />}
    />
  ) : null;
};

export default observer(ElementSetting);
