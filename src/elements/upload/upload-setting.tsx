import React from 'react';
import { Input } from 'antd';
import store from '@/store';
import { SettingItem } from '@/components';
import type { TElementSetting } from '@/types';

export const SettingUpload: TElementSetting = ({ element, setElementProp }) => {
  return (
    <>
      <SettingItem label="上传地址">
        <Input
          value={element.uploadUrl}
          onChange={(e) => {
            setElementProp('uploadUrl', e.target.value);
          }}
        />
      </SettingItem>
    </>
  );
};
