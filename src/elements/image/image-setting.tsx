import React from 'react';
import { Input, Switch } from 'antd';
import { observer } from 'mobx-react-lite';
import { SettingWrap, SettingItem } from '@/components';
import store from '@/store';

const SettingImageContent = () => {
  const { defaultImgSrc, placeholder, preview, previewSrc } =
    store.selectedElement;
  return (
    <>
      <SettingWrap title="元素设置">
        <SettingItem label="默认地址">
          <Input
            value={defaultImgSrc}
            onChange={(e) => {
              store.setSelectedProp('defaultImgSrc', e.target.value);
            }}
          />
        </SettingItem>
        <SettingItem label="占位地址">
          <Input
            value={placeholder}
            onChange={(e) => {
              store.setSelectedProp('placeholder', e.target.value);
            }}
          />
        </SettingItem>
        <SettingItem label="支持预览">
          <Switch
            checked={preview}
            size="small"
            onChange={(val) => store.setSelectedProp('preview', val)}
          />
        </SettingItem>
        {preview && (
          <SettingItem label="预览地址">
            <Input
              value={previewSrc}
              onChange={(e) => {
                store.setSelectedProp('previewSrc', e.target.value);
              }}
            />
          </SettingItem>
        )}
      </SettingWrap>
    </>
  );
};
export const SettingImage = observer(SettingImageContent);
