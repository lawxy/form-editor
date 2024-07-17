import React from 'react';
import { observer } from 'mobx-react-lite';
import { SettingWrap, SettingItem } from '@/components';
import store from '@/store';

const SettingContainerContent = () => {
  const { defaultImgSrc, placeholder, preview, previewSrc } =
    store.selectedElement;
  return <></>;
};
export const SettingContainer = observer(SettingContainerContent);
