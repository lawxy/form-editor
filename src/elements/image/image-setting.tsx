import React from 'react';
import { Input, Switch } from 'antd';
import { SettingWrap, SettingItem } from '@/components';
import type { TElementSetting } from '@/types';

export const SettingImage: TElementSetting = ({ element, setElementProp }) => {
  const { defaultImgSrc, placeholder, preview, previewSrc } = element;
  return (
    <>
      <SettingWrap title="元素设置">
        <SettingItem label="默认地址">
          <Input
            value={defaultImgSrc}
            onChange={(e) => {
              setElementProp('defaultImgSrc', e.target.value);
            }}
          />
        </SettingItem>
        <SettingItem label="占位地址">
          <Input
            value={placeholder}
            onChange={(e) => {
              setElementProp('placeholder', e.target.value);
            }}
          />
        </SettingItem>
        <SettingItem label="支持预览">
          <Switch
            checked={preview}
            size="small"
            onChange={(val) => setElementProp('preview', val)}
          />
        </SettingItem>
        {preview && (
          <SettingItem label="预览地址">
            <Input
              value={previewSrc}
              onChange={(e) => {
                setElementProp('previewSrc', e.target.value);
              }}
            />
          </SettingItem>
        )}
      </SettingWrap>
    </>
  );
};
