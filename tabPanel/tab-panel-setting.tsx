import React from 'react';
import { observer } from 'mobx-react-lite';
import { SettingWrap, SettingItem } from '@/components';
import store from '@/store';

const SettingTabPanelContent = () => {
  const { defaultImgSrc, placeholder, preview, previewSrc } =
    store.selectedElement;
  return (
    <SettingWrap title="元素属性">
      <SettingItem label="可删除">123</SettingItem>
    </SettingWrap>
  );
};
export const SettingTabPanel = observer(SettingTabPanelContent);
