import React from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'antd';
import store from '@/store';
import { SettingItem } from '@/components';

const SettingUploadContent = () => {
  return (
    <>
      <SettingItem label="上传地址">
        <Input
          value={store.selectedElement.defaultImgSrc}
          onChange={(e) => {
            store.setSelectedProp('defaultImgSrc', e.target.value);
          }}
        />
      </SettingItem>
    </>
  );
};
export const SettingUpload = observer(SettingUploadContent);
